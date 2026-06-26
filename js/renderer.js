import { NOTE_NAMES, STRING_PC } from './chord-data.js';

function mod12(n){ return ((n % 12) + 12) % 12; }

function pcOnString(stringIndex, fret){
  return mod12(STRING_PC[stringIndex] + fret);
}

function intervalClass(pc, rootPc){
  if(rootPc === null || rootPc === undefined) return 'tone';

  const iv = mod12(pc - rootPc);

  if(iv === 0) return 'root';
  if(iv === 3 || iv === 4) return 'third';
  if(iv === 6 || iv === 7 || iv === 8) return 'fifth';
  if(iv === 10 || iv === 11) return 'seventh';

  return 'tension';
}

export function renderDiagram(frets, rootPc = null){
  const W = 174;
  const H = 184;
  const left = 44;
  const right = 164;
  const top = 34;
  const bottom = 166;

  const stepX = (right - left) / 5;
  const stepY = (bottom - top) / 5;

  const positive = frets.filter(f => f !== null && f > 0);
  const hasOpen = frets.some(f => f === 0);
  const minF = positive.length ? Math.min(...positive) : 0;
  const baseFret = hasOpen ? 0 : (minF > 1 ? minF : 0);
  const showNut = baseFret === 0;

  let svg = `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true">`;

  svg += `<rect x="32" y="25" width="144" height="150" rx="12" class="board"/>`;

  for(let i = 0; i <= 5; i++){
    const y = top + i * stepY;
    svg += `<line x1="${left}" y1="${y}" x2="${right}" y2="${y}" class="fret ${i === 0 && showNut ? 'nut' : ''}"/>`;
  }

  for(let s = 0; s < 6; s++){
    const x = left + s * stepX;
    svg += `<line x1="${x}" y1="${top}" x2="${x}" y2="${bottom}" class="string"/>`;
  }

  if(!showNut){
    svg += `<text x="20" y="${top + stepY * .82}" text-anchor="end" class="base">${baseFret}</text>`;
  }

  const dots = [];

  frets.forEach((f, s) => {
    const x = left + s * stepX;

    if(f === null){
      svg += `<text x="${x}" y="22" text-anchor="middle" class="mute">×</text>`;
      return;
    }

    const pc = pcOnString(s, f);
    const note = NOTE_NAMES[pc];
    const klass = intervalClass(pc, rootPc);

    if(showNut && f === 0){
      svg += `<circle cx="${x}" cy="22" r="6" class="open open-${klass}"/>`;
      return;
    }

    const row = showNut ? f : f - baseFret + 1;
    if(row < 1 || row > 5) return;

    const y = top + stepY * (row - .5);

    dots.push({
      fret: f,
      string: s,
      x,
      y,
      note,
      klass
    });
  });

  // Barre hint:
  // 同じフレット上で、隣接する弦が2本以上続いている場合だけ薄いバーで接続する。
  // 離れた弦同士はつながない。
  const byFret = new Map();

  dots.forEach(d => {
    if(!byFret.has(d.fret)) byFret.set(d.fret, []);
    byFret.get(d.fret).push(d);
  });

  for(const group of byFret.values()){
    if(group.length < 2) continue;

    group.sort((a, b) => a.string - b.string);

    const runs = [];
    let run = [group[0]];

    for(let i = 1; i < group.length; i++){
      const prev = group[i - 1];
      const curr = group[i];

      if(curr.string === prev.string + 1){
        run.push(curr);
      }else{
        if(run.length >= 2) runs.push(run);
        run = [curr];
      }
    }

    if(run.length >= 2) runs.push(run);

    for(const r of runs){
      const first = r[0];
      const last = r[r.length - 1];

      svg += `<line x1="${first.x}" y1="${first.y}" x2="${last.x}" y2="${last.y}" stroke="rgba(145,185,255,.65)" stroke-width="12" stroke-linecap="round" style="stroke:rgba(145,185,255,.65);stroke-width:12;"/>`;
    }
  }

  dots.forEach(d => {
    const r = d.klass === 'root' ? 12.4 : 11.6;

    svg += `<circle cx="${d.x}" cy="${d.y}" r="${r}" class="dot dot-${d.klass}"/>`;
    svg += `<text x="${d.x}" y="${d.y + 4.2}" text-anchor="middle" class="dot-note">${d.note}</text>`;
  });

  svg += `</svg>`;

  return svg;
}
