import { NOTE_NAMES, QUALITIES, CHORD_LIBRARY } from './chord-data.js';

export const qualityByKey = Object.fromEntries(QUALITIES.map(q => [q.key, q]));
export const mod12 = n => ((n % 12) + 12) % 12;
export const noteNameToPc = name => NOTE_NAMES.indexOf(name);
export const pcToName = pc => NOTE_NAMES[mod12(pc)];

export function transposeFrets(frets, semitones){
  return frets.map(f => f === null ? null : f + semitones);
}

export function transposeTemplate(template, rootPc){
  const semitones = mod12(rootPc); // library is authored in C relative forms
  const frets = transposeFrets(template.frets, semitones);
  if(frets.some(f => f !== null && f > 17)) return null;
  return { ...template, frets, root: pcToName(rootPc) };
}

export function chordName(rootPc, qualityKey){
  return `${pcToName(rootPc)}${qualityByKey[qualityKey]?.suffix ?? qualityKey}`;
}

export function getAvailableQualities(){
  return QUALITIES.filter(q => CHORD_LIBRARY.some(item => item.quality === q.key));
}

export function computeScore(item, sortMode){
  const ease = 100 - item.difficulty * 18;
  const base = item.popularity * .35 + ease * .25 + item.jazz * .25 + (item.rootless ? 4 : 0);
  if(sortMode === 'difficulty') return ease + item.popularity * .15 + item.jazz * .10;
  if(sortMode === 'popularity') return item.popularity + ease * .12;
  if(sortMode === 'jazz') return item.jazz + (item.rootless ? 8 : 0) + item.popularity * .12;
  if(sortMode === 'family') return base;
  return base;
}

export function findChordForms({ rootPc, qualityKey, sortMode, maxDifficulty, family, usage, jazzOnly, allowRootless }){
  const rows = CHORD_LIBRARY
    .filter(item => item.quality === qualityKey)
    .filter(item => item.difficulty <= maxDifficulty)
    .filter(item => family === 'all' || item.family === family)
    .filter(item => usage === 'all' || item.usage.includes(usage))
    .filter(item => !jazzOnly || item.jazz >= 80 || item.tags.includes('jazz'))
    .filter(item => allowRootless || !item.rootless)
    .map(item => transposeTemplate(item, rootPc))
    .filter(Boolean)
    .map(item => ({ ...item, displayName: chordName(rootPc, item.quality), score: Math.round(computeScore(item, sortMode)) }));

  rows.sort((a,b) => {
    if(sortMode === 'family' && a.family !== b.family) return a.family.localeCompare(b.family);
    if(b.score !== a.score) return b.score - a.score;
    return a.difficulty - b.difficulty;
  });
  return rows;
}
