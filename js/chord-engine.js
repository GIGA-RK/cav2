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
  return `${item.quality}|${item.family}|${item.root ?? ''}|${item.bass ?? ''}|${item.frets.map(f => f === null ? 'x' : f).join('-')}`;
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

export function transposeTemplate(template, rootPc){
  const semitones = mod12(rootPc); // library is authored in C relative forms
  const frets = transposeFrets(template.frets, semitones);
  if(frets.some(f => f !== null && f > 17)) return null;
  return { ...template, frets, root: pcToName(rootPc) };
}

export function chordName(rootPc, qualityKey, bassPc=null){
  const base = `${pcToName(rootPc)}${qualityByKey[qualityKey]?.suffix ?? qualityKey}`;
  return bassPc === null ? base : `${base}/${pcToName(bassPc)}`;
}

export function getAvailableQualities(){
  return QUALITIES.filter(q => CHORD_LIBRARY.some(item => item.quality === q.key));
}

export function computeScore(item, sortMode){
  const ease = 100 - item.difficulty * 18;
  const levelBonus = item.level ? (5 - item.level) * 2 : 0;
  const slashBonus = item.slash ? 3 : 0;
  const base = item.popularity * .35 + ease * .25 + item.jazz * .25 + (item.rootless ? 4 : 0) + levelBonus + slashBonus;
  if(sortMode === 'difficulty') return ease + item.popularity * .15 + item.jazz * .10;
  if(sortMode === 'popularity') return item.popularity + ease * .12;
  if(sortMode === 'jazz') return item.jazz + (item.rootless ? 8 : 0) + item.popularity * .12 + slashBonus;
  if(sortMode === 'family') return base;
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

export function findChordForms({ rootPc, qualityKey, bassPc=null, sortMode, maxDifficulty, family, usage, level, jazzOnly, allowRootless }){
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
    if(b.score !== a.score) return b.score - a.score;
    return a.difficulty - b.difficulty;
  });
  return rows;
}
