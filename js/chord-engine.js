import { NOTES, STRING_PC, QUALITY_BY_KEY, FORM_TEMPLATES } from './chord-data.js';

export function mod12(n){ return ((n % 12) + 12) % 12; }
export function noteToPc(note){ return NOTES.indexOf(note); }
export function pcToNote(pc){ return NOTES[mod12(pc)]; }
export function pitchOnString(stringIndex, fret){ return mod12(STRING_PC[stringIndex] + fret); }
export function minPositiveFret(frets){ const xs = frets.filter(f => f !== null && f > 0); return xs.length ? Math.min(...xs) : 0; }
export function maxPositiveFret(frets){ const xs = frets.filter(f => f !== null && f > 0); return xs.length ? Math.max(...xs) : 0; }
export function span(frets){ const min = minPositiveFret(frets); const max = maxPositiveFret(frets); return max ? max - min : 0; }
export function playedCount(frets){ return frets.filter(f => f !== null).length; }
export function openCount(frets){ return frets.filter(f => f === 0).length; }
export function mutedCount(frets){ return frets.filter(f => f === null).length; }
export function lowestString(frets){ return frets.findIndex(f => f !== null); }
export function chordName(rootPc, qualityKey){ return `${pcToNote(rootPc)}${QUALITY_BY_KEY[qualityKey].suffix}`; }

export function transposeFrets(template, targetRootPc){
  const baseRootPc = noteToPc(template.templateRoot);
  const shift = mod12(targetRootPc - baseRootPc);
  const frets = template.frets.map(f => f === null ? null : f + shift);
  if (frets.some(f => f !== null && f > 15)) return null;
  return { ...template, transposedFrom: template.templateRoot, rootPc: targetRootPc, shift, frets };
}

export function toneSet(rootPc, qualityKey){
  return new Set(QUALITY_BY_KEY[qualityKey].intervals.map(iv => mod12(rootPc + iv)));
}

export function formPitchClasses(form){
  return [...new Set(form.frets.flatMap((f, i) => f === null ? [] : [pitchOnString(i, f)]))];
}

export function scoreForm(form, sortMode='recommended'){
  const easy = (6 - form.difficulty) * 20;
  const lowFret = Math.max(0, 100 - minPositiveFret(form.frets) * 8);
  const compact = Math.max(0, 100 - span(form.frets) * 14);
  const open = openCount(form.frets) * 10;
  const rootlessPenalty = form.rootless ? -8 : 0;
  const weights = {
    recommended: { popularity:.34, easy:.28, jazzUse:.14, lowFret:.12, compact:.08, open:.04 },
    easy:        { popularity:.18, easy:.46, jazzUse:.08, lowFret:.18, compact:.08, open:.02 },
    popular:     { popularity:.62, easy:.14, jazzUse:.08, lowFret:.10, compact:.04, open:.02 },
    jazz:        { popularity:.18, easy:.10, jazzUse:.48, lowFret:.08, compact:.14, open:.02 },
    lowFret:     { popularity:.16, easy:.18, jazzUse:.08, lowFret:.46, compact:.10, open:.02 }
  }[sortMode] || {};
  return Math.round(
    form.popularity * weights.popularity +
    easy * weights.easy +
    form.jazzUse * weights.jazzUse +
    lowFret * weights.lowFret +
    compact * weights.compact +
    open * weights.open + rootlessPenalty
  );
}

export function getForms({root='C', quality='maj7', sort='recommended', maxDifficulty='all', jazzOnly=false, rootlessOk=true}){
  const rootPc = noteToPc(root);
  let forms = FORM_TEMPLATES
    .filter(t => t.quality === quality)
    .map(t => transposeFrets(t, rootPc))
    .filter(Boolean);

  if (maxDifficulty !== 'all') forms = forms.filter(f => f.difficulty <= Number(maxDifficulty));
  if (jazzOnly) forms = forms.filter(f => f.tags.includes('jazz'));
  if (!rootlessOk) forms = forms.filter(f => !f.rootless);

  forms = forms.map(f => ({
    ...f,
    displayName: chordName(rootPc, quality),
    minFret: minPositiveFret(f.frets),
    span: span(f.frets),
    played: playedCount(f.frets),
    score: scoreForm(f, sort),
    tones: formPitchClasses(f).map(pcToNote)
  }));

  return forms.sort((a,b) => b.score - a.score || a.difficulty - b.difficulty || a.minFret - b.minFret);
}
