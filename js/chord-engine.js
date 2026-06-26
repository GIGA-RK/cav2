import { NOTE_NAMES, STRING_PC, QUALITIES, CHORD_LIBRARY } from './chord-data.js';

export const qualityByKey = Object.fromEntries(QUALITIES.map(q => [q.key, q]));
export const mod12 = n => ((n % 12) + 12) % 12;
export const noteNameToPc = name => NOTE_NAMES.indexOf(name);
export const pcToName = pc => NOTE_NAMES[mod12(pc)];

function pcOnString(stringIdx, fret){ return mod12(STRING_PC[stringIdx] + fret); }
function playedFrets(frets){ return frets.filter(f => f !== null); }
function positiveFrets(frets){ return frets.filter(f => f !== null && f > 0); }
function fretSpan(frets){
  const p = positiveFrets(frets);
  if(!p.length) return 0;
  return Math.max(...p) - Math.min(...p);
}
function lowestString(frets){ return frets.findIndex(f => f !== null); }
function lowestPc(frets){
  const s = lowestString(frets);
  return s < 0 ? null : pcOnString(s, frets[s]);
}
function voicingKey(item){
  // Physical duplicate detection.
  // The same fret shape can arrive from several sources/families (standard, caged, generated, etc.).
  // For display purposes it should appear only once for the current searched chord.
  // Do NOT include family/name/tags here; those are metadata, not a different voicing.
  return item.frets.map(f => f === null ? 'x' : String(f)).join('-');
}


export function normalizeShapeFamily(item){
  const family = item.family ?? 'special';
  const tags = item.tags || [];
  if(family === 'power') return 'power';
  if(family === 'open') return 'open';
  if(family === 'standard') return tags.includes('barre') ? 'barre' : 'open';
  if(family === 'caged') return tags.includes('barre') ? 'barre' : 'caged';
  if(family === 'drop2' || family === 'drop3') return 'drop';
  if(family === 'shell') return 'shell';
  if(family === 'compact') return 'compact';
  if(family === 'rootless') return 'rootless';
  if(family === 'spread' || family === 'upper-structure') return 'special';
  return family;
}

function usageMatches(item, selected){
  if(selected === 'all') return true;
  const usage = item.usage || [];
  const tags = item.tags || [];
  if(usage.includes(selected) || tags.includes(selected)) return true;
  if(selected === 'jazz') return usage.includes('jazz-comping') || usage.includes('chord-melody') || tags.includes('jazz') || item.jazz >= 80;
  if(selected === 'solo') return usage.includes('solo-guitar') || usage.includes('chord-melody');
  if(selected === 'folk') return usage.includes('beginner') || usage.includes('pop') || tags.includes('cowboy');
  return false;
}

function hasTag(item, tag){
  return (item.tags || []).includes(tag);
}

function dedupeVoicingsByBestScore(rows){
  const best = new Map();
  for(const item of rows){
    const key = voicingKey(item);
    const prev = best.get(key);
    if(!prev){
      best.set(key, item);
      continue;
    }

    // Prefer the row that is more useful to the user.
    // Score first, then lower difficulty, then more familiar families.
    const familyRank = f => ({open:8, barre:8, power:7, caged:6, shell:5, drop:4, compact:2, rootless:1, special:0}[f] ?? 0);
    const itemRank = (item.score ?? 0) * 100 + (6 - (item.difficulty ?? 3)) * 8 + familyRank(normalizeShapeFamily(item));
    const prevRank = (prev.score ?? 0) * 100 + (6 - (prev.difficulty ?? 3)) * 8 + familyRank(normalizeShapeFamily(prev));

    if(itemRank > prevRank){
      best.set(key, {
        ...item,
        tags:[...new Set([...(prev.tags || []), ...(item.tags || [])])],
        duplicateSources:[...(prev.duplicateSources || [prev.name]).filter(Boolean), item.name].filter(Boolean)
      });
    }else{
      best.set(key, {
        ...prev,
        tags:[...new Set([...(prev.tags || []), ...(item.tags || [])])],
        duplicateSources:[...(prev.duplicateSources || [prev.name]).filter(Boolean), item.name].filter(Boolean)
      });
    }
  }
  return [...best.values()];
}
function nearestBassFret(stringIdx, bassPc, anchor=4){
  let best = null;
  for(let f = 0; f <= 17; f++){
    if(pcOnString(stringIdx, f) !== mod12(bassPc)) continue;
    const penalty = Math.abs(f - anchor) + (f === 0 ? -0.7 : 0) + (f > 12 ? 4 : 0);
    if(!best || penalty < best.penalty) best = {fret:f, penalty};
  }
  return best ? best.fret : null;
}

export function transposeFrets(frets, semitones){
  return frets.map(f => f === null ? null : f + semitones);
}

function minPositiveFret(frets){
  const positives = frets.filter(f => f !== null && f > 0);
  return positives.length ? Math.min(...positives) : 0;
}
function maxFret(frets){
  const played = frets.filter(f => f !== null);
  return played.length ? Math.max(...played) : 0;
}
function transposeTemplateCandidates(template, rootPc){
  // Movable templates are authored as C forms. A target root can often be reached
  // by shifting either up or down an octave. Prefer practical low positions, e.g.
  // C E-shape 8-10-10-9-8-8 -> F E-shape 1-3-3-2-1-1, not 13-15-15-14-13-13.
  const baseShift = mod12(rootPc);
  return [-12, 0, 12]
    .map(octave => baseShift + octave)
    .map(shift => ({ shift, frets: transposeFrets(template.frets, shift) }))
    .filter(c => !c.frets.some(f => f !== null && (f < 0 || f > 17)));
}

export function transposeTemplate(template, rootPc){
  // Fixed open forms are authored for a specific root and should not be transposed.
  if(template.fixedRootPc !== undefined){
    if(mod12(template.fixedRootPc) !== mod12(rootPc)) return null;
    return { ...template, frets:[...template.frets], root: pcToName(rootPc) };
  }

  const candidates = transposeTemplateCandidates(template, rootPc);
  if(!candidates.length) return null;

  candidates.sort((a,b) => {
    const amin = minPositiveFret(a.frets), bmin = minPositiveFret(b.frets);
    const amax = maxFret(a.frets), bmax = maxFret(b.frets);
    // Strongly prefer low, chord-book positions. This fixes missing F-barre, Bm-barre, etc.
    if(amin !== bmin) return amin - bmin;
    if(amax !== bmax) return amax - bmax;
    return Math.abs(a.shift) - Math.abs(b.shift);
  });

  return { ...template, frets: candidates[0].frets, root: pcToName(rootPc) };
}

export function chordName(rootPc, qualityKey, bassPc=null){
  const base = `${pcToName(rootPc)}${qualityByKey[qualityKey]?.suffix ?? qualityKey}`;
  return bassPc === null ? base : `${base}/${pcToName(bassPc)}`;
}

export function getAvailableQualities(){
  return QUALITIES.filter(q => CHORD_LIBRARY.some(item => item.quality === q.key));
}

function getPositionBonus(item){
  const minF = minPositiveFret(item.frets || []);
  const maxF = maxFret(item.frets || []);
  // Chord-book low positions should win over high-position generated jazz shapes.
  // This is especially important for F 1-3-3-2-1-1, Bb x-1-3-3-3-1, etc.
  if(minF === 0) return 12;
  if(minF <= 1 && maxF <= 4) return 18;
  if(minF <= 3 && maxF <= 6) return 14;
  if(minF <= 5 && maxF <= 8) return 8;
  if(minF <= 7 && maxF <= 10) return 3;
  if(minF >= 8) return -4;
  return 0;
}

function getPracticalFormBonus(item){
  const tags = item.tags || [];
  const shape = normalizeShapeFamily(item);
  let bonus = 0;
  if(shape === 'open') bonus += 16;
  if(shape === 'barre') bonus += 16;
  if(shape === 'power') bonus += 14;
  if(shape === 'shell') bonus += 5;
  if(tags.includes('textbook')) bonus += 18;
  if(tags.includes('cowboy')) bonus += 12;
  if(tags.includes('barre')) bonus += 12;
  if(tags.includes('movable')) bonus += 4;
  if(item.usage?.includes('beginner')) bonus += 8;
  if(item.usage?.includes('pop')) bonus += 5;
  if(item.usage?.includes('rock')) bonus += 5;
  return bonus;
}

function textbookScore(item){
  const shape = normalizeShapeFamily(item);
  const ease = 100 - item.difficulty * 18;
  let score = 0;
  score += ease * .28;
  score += item.popularity * .32;
  score += getPositionBonus(item) * 1.7;
  score += getPracticalFormBonus(item) * 1.45;
  if(shape === 'open') score += 22;
  if(shape === 'barre') score += 20;
  if(shape === 'power') score += 18;
  if(hasTag(item, 'textbook')) score += 20;
  if(hasTag(item, 'cowboy')) score += 14;
  if(item.rootless) score -= 26;
  if(item.difficulty >= 4) score -= 10;
  return score;
}

function practicalScore(item){
  const ease = 100 - item.difficulty * 18;
  const shape = normalizeShapeFamily(item);
  let score = 0;
  score += item.popularity * .46;
  score += ease * .24;
  score += item.jazz * .10;
  score += getPositionBonus(item) * 1.1;
  score += getPracticalFormBonus(item);
  if(shape === 'open' || shape === 'barre' || shape === 'power') score += 9;
  if(shape === 'rootless') score -= 4;
  if(item.slash) score += 3;
  return score;
}

function jazzScore(item){
  const shape = normalizeShapeFamily(item);
  let score = item.jazz + item.popularity * .10;
  if(shape === 'shell') score += 9;
  if(shape === 'drop') score += 8;
  if(shape === 'rootless') score += 10;
  if(shape === 'compact') score += 5;
  if(item.voice === 'guide-tone') score += 8;
  if(item.voice === 'rootless-color') score += 8;
  if(item.slash) score += 3;
  return score;
}

function rarityScore(item){
  const shape = normalizeShapeFamily(item);
  let score = 100 - item.popularity;
  score += Math.max(0, item.jazz - 70) * .35;
  if(shape === 'special') score += 18;
  if(shape === 'rootless') score += 10;
  if(item.difficulty >= 4) score += 8;
  if(item.voice === 'altered' || item.voice === 'upper-structure' || item.voice === 'quartal') score += 15;
  return score;
}

export function computeScore(item, sortMode){
  if(sortMode === 'standard') return textbookScore(item);
  if(sortMode === 'difficulty') {
    const shape = normalizeShapeFamily(item);
    const ease = 100 - item.difficulty * 18;
    const beginnerBonus = item.usage?.includes('beginner') ? 14 : 0;
    const shapeBonus = shape === 'open' ? 24 : shape === 'barre' ? 18 : shape === 'power' ? 22 : shape === 'shell' ? 8 : 0;
    return ease + item.popularity * .22 + shapeBonus + beginnerBonus + getPositionBonus(item) + getPracticalFormBonus(item) * .45 - (item.rootless ? 12 : 0);
  }
  if(sortMode === 'jazz') return jazzScore(item);
  if(sortMode === 'rare') return rarityScore(item);
  // practical is the default everyday ranking.
  return practicalScore(item);
}

function makeSlashVariants(item, rootPc, bassPc){
  const base = transposeTemplate(item, rootPc);
  if(!base) return [];

  // If the original transposed form already has the requested bass, keep it as a clean inversion.
  const out = [];
  if(lowestPc(base.frets) === mod12(bassPc) && playedFrets(base.frets).length >= 3){
    out.push({
      ...base,
      slash:true,
      bass:pcToName(bassPc),
      name:`${base.name} / ${pcToName(bassPc)} bass`,
      tags:[...(base.tags || []), 'slash', 'inversion'],
      popularity:Math.max(20, base.popularity - 2),
      jazz:Math.min(99, base.jazz + 1)
    });
  }

  // Generate practical slash versions by adding a bass note on 6th/5th/4th string and muting lower strings.
  const upperOriginal = base.frets;
  const anchorFrets = positiveFrets(upperOriginal);
  const anchor = anchorFrets.length ? Math.min(...anchorFrets) : 4;
  for(const bassString of [0,1,2]){
    const bassFret = nearestBassFret(bassString, bassPc, anchor);
    if(bassFret === null) continue;
    const frets = Array(6).fill(null);
    frets[bassString] = bassFret;

    for(let s = bassString + 1; s < 6; s++){
      frets[s] = upperOriginal[s];
    }

    if(playedFrets(frets).length < 3) continue;
    if(lowestPc(frets) !== mod12(bassPc)) continue;
    if(fretSpan(frets) > 8) continue;
    if(frets.some(f => f !== null && f > 17)) continue;

    out.push({
      ...base,
      frets,
      slash:true,
      bass:pcToName(bassPc),
      family: base.family === 'open' ? 'compact' : base.family,
      name:`Slash ${base.name} / ${pcToName(bassPc)} bass`,
      difficulty:Math.min(5, base.difficulty + (fretSpan(frets) > 5 ? 1 : 0)),
      popularity:Math.max(20, base.popularity - 8),
      jazz:Math.min(99, base.jazz + 3),
      level:Math.max(base.level ?? 2, 2),
      tags:[...(base.tags || []), 'slash', 'bass-note', 'inversion']
    });
  }
  return out;
}

export function findChordForms({ rootPc, qualityKey, bassPc=null, sortMode, maxDifficulty, family, usage, level, voice='all', jazzOnly, allowRootless }){
  let rows;
  if(bassPc === null){
    rows = CHORD_LIBRARY
      .filter(item => item.quality === qualityKey)
      .map(item => transposeTemplate(item, rootPc))
      .filter(Boolean);
  } else {
    rows = CHORD_LIBRARY
      .filter(item => item.quality === qualityKey)
      .flatMap(item => makeSlashVariants(item, rootPc, bassPc));
  }

  rows = rows
    .filter(item => item.difficulty <= maxDifficulty)
    .filter(item => family === 'all' || normalizeShapeFamily(item) === family)
    .filter(item => usageMatches(item, usage))
    .filter(item => level === 'all' || String(item.level ?? 2) === String(level))
    .filter(item => voice === 'all' || item.voice === voice)
    .filter(item => !jazzOnly || item.jazz >= 80 || item.tags.includes('jazz'))
    .filter(item => allowRootless || !item.rootless)
    .filter(item => !item.frets.some(f => f !== null && f > 17));

  rows = rows.map(item => ({
    ...item,
    displayName: chordName(rootPc, item.quality, bassPc),
    shape: normalizeShapeFamily(item),
    score: Math.round(computeScore(item, sortMode))
  }));

  // Collapse exact duplicate physical shapes after scoring so the best metadata wins.
  rows = dedupeVoicingsByBestScore(rows);

  rows.sort((a,b) => {
    if(b.score !== a.score) return b.score - a.score;
    return a.difficulty - b.difficulty;
  });
  return rows;
}
