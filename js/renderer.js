import { NOTE_NAMES, STRING_PC } from './chord-data.js';

function mod12(n){
  return ((n % 12) + 12) % 12;
}

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
  const W = 194;
  const H = 194;

  const left = 42;
  const right = 182;
  const top = 34;
  const bottom = 176;

  const stepX = (right - left) / 5;
  const stepY = (bottom - top) / 5;

  // null / undefined はミュート
  // 0 は開放弦
  // 1以上のみ、指板上の押弦として扱う
  const positive = frets.filter(f => f !== null && f !== undefined && f > 0);
  const hasOpen = frets.some(f => f === 0);

  const minF = positive.length ? Math.min(...positive) : 0;
  const maxF = positive.length ? Math.max(...positive) : 0;

  // baseFretは、開放弦ではなく「押弦している音」を基準に決める。
  // ただし、低フレット中心のオープンコードはナット表示にする。
  const baseFret =
    positive.length === 0
      ? 0
      : (hasOpen && maxF <= 5)
        ? 0
        : (minF > 1 ? minF : 0);

  const showNut = baseFret === 0;

  let svg = `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true">`;

  svg += `<rect x="28" y="25" width="160" height="160" rx="12" class="board"/>`;

  // frets
  for(let i = 0; i <= 5; i++){
    const y = top + i * stepY;
    svg += `<line x1="${left}" y1="${y}" x2="${right}" y2="${y}" class="fret ${i === 0 && showNut ? 'nut' : ''}"/>`;
  }

  // strings
  for(let s = 0; s < 6; s++){
    const x = left + s * stepX;
    svg += `<line x1="${x}" y1="${top}" x2="${x}" y2="${bottom}" class="string"/>`;
  }

  // ハイポジション時の基準フレット
  if(!showNut){
    svg += `<text x="22" y="${top + stepY * .82}" text-anchor="end" class="base">${baseFret}</text>`;
  }

  const dots = [];

  frets.forEach((f, s) => {
    const x = left + s * stepX;

    // null / undefined は必ずミュート
    if(f === null || f === undefined){
      svg += `<text x="${x}" y="22" text-anchor="middle" class="mute">×</text>`;
      return;
    }

    const pc = pcOnString(s, f);
    const note = NOTE_NAMES[pc];
    const klass = intervalClass(pc, rootPc);

    // 0 は、showNut に関係なく必ず開放弦として上部に ○ を表示する。
    // ハイコード中に開放弦が混ざっても、ここで省略されない。
    if(f === 0){
      svg += `<circle cx="${x}" cy="22" r="6" class="open open-${klass}"/>`;
      return;
    }

    // 1以上は指板上に描画
    const row = showNut ? f : f - baseFret + 1;

    // 図の5フレット範囲外なら描画しない
    // ただし、これは押弦音だけの話。0/×は上部に描画済み。
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

  // -------------------------
  // Auto Barre Detection
  //
  // 条件:
  // ① セーハバーは1本だけ
  // ② 最も開放弦に近い押弦フレットだけを候補にする
  // ③ そのフレットで、1本以上の弦をまたいで押弦している場合のみ表示
  // ④ バー区間内に、より開放弦側の音がある場合は表示しない
  //    0フレット、つまり開放弦も「より開放弦側の音」として扱う
  // -------------------------

  let barre = null;

  if(positive.length){
    const targetFret = minF;

    const stringsOnTarget = [];

    for(let s = 0; s < 6; s++){
      if(frets[s] === targetFret){
        stringsOnTarget.push(s);
      }
    }

    if(stringsOnTarget.length >= 2){
      const from = Math.min(...stringsOnTarget);
      const to = Math.max(...stringsOnTarget);

      // 1本以上の弦をまたいでいるか
      if(to - from >= 1){
        let blocked = false;

        for(let s = from; s <= to; s++){
          const f = frets[s];

          // バー区間内に開放弦があればセーハではない
          if(f === 0){
            blocked = true;
            break;
          }

          // バー区間内に、targetFretより低い押弦があればセーハではない
          if(f !== null && f !== undefined && f > 0 && f < targetFret){
            blocked = true;
            break;
          }
        }

        if(!blocked){
          barre = {
            fret: targetFret,
            from,
            to
          };
        }
      }
    }
  }

  if(barre){
    const first = dots.find(d => d.string === barre.from && d.fret === barre.fret);
    const last = dots.find(d => d.string === barre.to && d.fret === barre.fret);

    if(first && last){
      svg += `<line x1="${first.x}" y1="${first.y}" x2="${last.x}" y2="${last.y}" class="barre-link" stroke="rgba(145,185,255,.60)" stroke-width="11" stroke-linecap="round" style="stroke:rgba(145,185,255,.60);stroke-width:11;"/>`;
    }
  }

  // 押弦●は最後に描く。セーハ補助線より前面に出すため。
  dots.forEach(d => {
    const r = d.klass === 'root' ? 12.4 : 11.6;

    svg += `<circle cx="${d.x}" cy="${d.y}" r="${r}" class="dot dot-${d.klass}"/>`;
    svg += `<text x="${d.x}" y="${d.y + 4.2}" text-anchor="middle" class="dot-note">${d.note}</text>`;
  });

  svg += `</svg>`;

  return svg;
}
