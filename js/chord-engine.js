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
function uniqueFretsKey(item){
  return `${item.quality}|${item.family}|${item.fixedRootPc ?? ''}|${item.root ?? ''}|${item.bass ?? ''}|${item.frets.map(f => f === null ? 'x' : f).join('-')}`;
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
  let bonus = 0;
  if(item.family === 'standard') bonus += 16;
  if(item.family === 'open') bonus += 14;
  if(item.family === 'power') bonus += 14;
  if(tags.includes('textbook')) bonus += 14;
  if(tags.includes('cowboy')) bonus += 10;
  if(tags.includes('barre')) bonus += 10;
  if(tags.includes('movable')) bonus += 4;
  if(item.usage?.includes('beginner')) bonus += 8;
  if(item.usage?.includes('pop')) bonus += 5;
  if(item.usage?.includes('rock')) bonus += 5;
  return bonus;
}

export function computeScore(item, sortMode){
  const ease = 100 - item.difficulty * 18;
  const levelBonus = item.level ? (5 - item.level) * 2 : 0;
  const slashBonus = item.slash ? 3 : 0;
  const practicalBonus = getPracticalFormBonus(item);
  const positionBonus = getPositionBonus(item);

  // Recommended is for everyday use, not only jazz color.
  // Popularity / practicality / low-position chord-book forms are intentionally weighted high.
  const base = item.popularity * .42 + ease * .22 + item.jazz * .12 + levelBonus + slashBonus + practicalBonus + positionBonus - (item.rootless ? 2 : 0);

  if(sortMode === 'difficulty') {
    const familyBonus = item.family === 'open' ? 24 : item.family === 'standard' ? 22 : item.family === 'power' ? 22 : item.family === 'shell' ? 6 : item.family === 'caged' ? 2 : 0;
    const beginnerBonus = item.usage?.includes('beginner') ? 14 : 0;
    return ease + item.popularity * .22 + familyBonus + beginnerBonus + positionBonus + practicalBonus * .45 - (item.rootless ? 12 : 0);
  }
  if(sortMode === 'popularity') return item.popularity + ease * .12 + practicalBonus * .35 + positionBonus * .5;
  if(sortMode === 'jazz') return item.jazz + (item.rootless ? 8 : 0) + item.popularity * .12 + slashBonus;
  if(sortMode === 'family') return base;
  if(sortMode === 'voice') return base + (item.voice === 'guide-tone' ? 5 : item.voice === 'rootless-color' ? 4 : 0);
  return base;
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
    .filter(item => family === 'all' || item.family === family)
    .filter(item => usage === 'all' || item.usage.includes(usage))
    .filter(item => level === 'all' || String(item.level ?? 2) === String(level))
    .filter(item => voice === 'all' || item.voice === voice)
    .filter(item => !jazzOnly || item.jazz >= 80 || item.tags.includes('jazz'))
    .filter(item => allowRootless || !item.rootless)
    .filter(item => !item.frets.some(f => f !== null && f > 17));

  const seen = new Set();
  rows = rows.filter(item => {
    const key = uniqueFretsKey(item);
    if(seen.has(key)) return false;
    seen.add(key);
    return true;
  }).map(item => ({
    ...item,
    displayName: chordName(rootPc, item.quality, bassPc),
    score: Math.round(computeScore(item, sortMode))
  }));

  rows.sort((a,b) => {
    if(sortMode === 'family' && a.family !== b.family) return a.family.localeCompare(b.family);
    if(sortMode === 'voice' && (a.voice ?? '') !== (b.voice ?? '')) return (a.voice ?? '').localeCompare(b.voice ?? '');
    if(b.score !== a.score) return b.score - a.score;
    return a.difficulty - b.difficulty;
  });
  return rows;
}
