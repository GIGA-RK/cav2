export function renderDiagram(frets){
  const W = 150, H = 190, left = 28, right = 125, top = 34, bottom = 168;
  const stepX = (right-left)/5, stepY = (bottom-top)/5;
  const positive = frets.filter(f => f !== null && f > 0);
  const hasOpen = frets.some(f => f === 0);
  const minF = positive.length ? Math.min(...positive) : 0;
  const baseFret = hasOpen ? 0 : (minF > 1 ? minF : 0);
  const showNut = baseFret === 0;
  let svg = `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true">`;
  svg += `<rect x="18" y="25" width="118" height="152" rx="12" class="board"/>`;
  for(let i=0;i<=5;i++){
    const y = top + i*stepY;
    svg += `<line x1="${left}" y1="${y}" x2="${right}" y2="${y}" class="fret ${i===0 && showNut ? 'nut' : ''}"/>`;
  }
  for(let s=0;s<6;s++){
    const x = left + s*stepX;
    svg += `<line x1="${x}" y1="${top}" x2="${x}" y2="${bottom}" class="string"/>`;
  }
  if(!showNut) svg += `<text x="17" y="${top+stepY*.8}" class="base">${baseFret}</text>`;
  frets.forEach((f,s)=>{
    const x = left + s*stepX;
    if(f === null){ svg += `<text x="${x}" y="22" text-anchor="middle" class="mute">×</text>`; return; }
    if(showNut && f === 0){ svg += `<circle cx="${x}" cy="22" r="6" class="open"/>`; return; }
    const row = showNut ? f : f - baseFret + 1;
    if(row < 1 || row > 5) return;
    const y = top + stepY*(row-.5);
    svg += `<circle cx="${x}" cy="${y}" r="8" class="dot"/>`;
  });
  return svg + `</svg>`;
}
