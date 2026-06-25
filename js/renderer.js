import { NOTE_NAMES, STRING_PC } from './chord-data.js';

function mod12(n){ return ((n % 12) + 12) % 12; }
function pcOnString(stringIndex, fret){ return mod12(STRING_PC[stringIndex] + fret); }
function intervalClass(pc, rootPc){
  if(rootPc === null || rootPc === undefined) return 'tone';
  const iv = mod12(pc - rootPc);
  if(iv === 0) return 'root';
  if(iv === 3 || iv === 4) return 'third';
  if(iv === 6 || iv === 7 || iv === 8) return 'fifth';
  if(iv === 10 || iv === 11) return 'seventh';
  return 'tension';
}

export function renderDiagram(frets, rootPc=null){
  const W = 174, H = 184, left = 44, right = 164, top = 34, bottom = 166;
  const stepX = (right-left)/5, stepY = (bottom-top)/5;
  const positive = frets.filter(f => f !== null && f > 0);
  const hasOpen = frets.some(f => f === 0);
  const minF = positive.length ? Math.min(...positive) : 0;
  const baseFret = hasOpen ? 0 : (minF > 1 ? minF : 0);
  const showNut = baseFret === 0;
  let svg = `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true">`;
  svg += `<rect x="32" y="25" width="144" height="150" rx="12" class="board"/>`;
  for(let i=0;i<=5;i++){
    const y = top + i*stepY;
    svg += `<line x1="${left}" y1="${y}" x2="${right}" y2="${y}" class="fret ${i===0 && showNut ? 'nut' : ''}"/>`;
  }
  for(let s=0;s<6;s++){
    const x = left + s*stepX;
    svg += `<line x1="${x}" y1="${top}" x2="${x}" y2="${bottom}" class="string"/>`;
  }
  if(!showNut) svg += `<text x="28" y="${top+stepY*.82}" text-anchor="end" class="base">${baseFret}</text>`;
  frets.forEach((f,s)=>{
    const x = left + s*stepX;
    if(f === null){ svg += `<text x="${x}" y="22" text-anchor="middle" class="mute">×</text>`; return; }
    const pc = pcOnString(s, f);
    const note = NOTE_NAMES[pc];
    if(showNut && f === 0){
      svg += `<circle cx="${x}" cy="22" r="6" class="open open-${intervalClass(pc, rootPc)}"/>`;
      return;
    }
    const row = showNut ? f : f - baseFret + 1;
    if(row < 1 || row > 5) return;
    const y = top + stepY*(row-.5);
    const klass = intervalClass(pc, rootPc);
    const r = klass === 'root' ? 12.4 : 11.6;
    svg += `<circle cx="${x}" cy="${y}" r="${r}" class="dot dot-${klass}"/>`;
    svg += `<text x="${x}" y="${y+4.2}" text-anchor="middle" class="dot-note">${note}</text>`;
  });
  return svg + `</svg>`;
}
