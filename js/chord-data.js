export const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
export const STRING_PC = [4,9,2,7,11,4];

export const QUALITIES = [
  { key:'maj7', label:'maj7', suffix:'maj7', intervals:[0,4,7,11] },
  { key:'m7', label:'m7', suffix:'m7', intervals:[0,3,7,10] },
  { key:'7', label:'7', suffix:'7', intervals:[0,4,7,10] },
  { key:'m7b5', label:'m7♭5', suffix:'m7♭5', intervals:[0,3,6,10] },
  { key:'dim7', label:'dim7', suffix:'dim7', intervals:[0,3,6,9] },
  { key:'maj9', label:'maj9', suffix:'maj9', intervals:[0,4,7,11,14] },
  { key:'m9', label:'m9', suffix:'m9', intervals:[0,3,7,10,14] },
  { key:'9', label:'9', suffix:'9', intervals:[0,4,7,10,14] },
  { key:'13', label:'13', suffix:'13', intervals:[0,4,7,10,14,21] },
  { key:'6/9', label:'6/9', suffix:'6/9', intervals:[0,4,7,9,14] },
  { key:'m11', label:'m11', suffix:'m11', intervals:[0,3,7,10,14,17] },
  { key:'7sus4', label:'7sus4', suffix:'7sus4', intervals:[0,5,7,10] },
  { key:'7alt', label:'7alt', suffix:'7alt', intervals:[0,4,10,13,15,20] },
  { key:'6', label:'6', suffix:'6', intervals:[0,4,7,9] },
  { key:'m6', label:'m6', suffix:'m6', intervals:[0,3,7,9] },
  { key:'mMaj7', label:'mMaj7', suffix:'mMaj7', intervals:[0,3,7,11] },
  { key:'7b9', label:'7♭9', suffix:'7♭9', intervals:[0,4,7,10,13] },
  { key:'7#9', label:'7#9', suffix:'7#9', intervals:[0,4,7,10,15] },
  { key:'7#11', label:'7#11', suffix:'7#11', intervals:[0,4,7,10,18] },
  { key:'7b13', label:'7♭13', suffix:'7♭13', intervals:[0,4,7,10,20] },
];

export const FAMILIES = ['all','open','caged','shell','drop2','drop3','rootless','compact','spread'];
export const USAGES = ['all','beginner','pop','jazz-comping','bossa','solo-guitar','funk','blues','chord-melody'];
export const LEVELS = ['all','1','2','3','4'];

const QUALITY_STYLE = {
  maj7:{ pop:78, jazz:88, usage:['jazz-comping','bossa','pop'] },
  m7:{ pop:82, jazz:88, usage:['jazz-comping','bossa','pop'] },
  '7':{ pop:86, jazz:86, usage:['jazz-comping','blues','funk'] },
  m7b5:{ pop:54, jazz:94, usage:['jazz-comping'] },
  dim7:{ pop:48, jazz:91, usage:['jazz-comping','solo-guitar'] },
  maj9:{ pop:68, jazz:94, usage:['jazz-comping','bossa','chord-melody'] },
  m9:{ pop:70, jazz:94, usage:['jazz-comping','bossa'] },
  '9':{ pop:74, jazz:92, usage:['jazz-comping','funk','blues'] },
  '13':{ pop:66, jazz:95, usage:['jazz-comping','funk'] },
  '6/9':{ pop:62, jazz:93, usage:['bossa','jazz-comping','pop'] },
  m11:{ pop:55, jazz:94, usage:['jazz-comping','bossa'] },
  '7sus4':{ pop:64, jazz:88, usage:['jazz-comping','funk','pop'] },
  '7alt':{ pop:56, jazz:98, usage:['jazz-comping'] },
  '6':{ pop:58, jazz:86, usage:['pop','bossa','jazz-comping'] },
  m6:{ pop:50, jazz:89, usage:['bossa','jazz-comping'] },
  mMaj7:{ pop:38, jazz:92, usage:['jazz-comping','chord-melody'] },
  '7b9':{ pop:58, jazz:96, usage:['jazz-comping'] },
  '7#9':{ pop:58, jazz:94, usage:['jazz-comping','funk','blues'] },
  '7#11':{ pop:46, jazz:96, usage:['jazz-comping','chord-melody'] },
  '7b13':{ pop:48, jazz:96, usage:['jazz-comping'] },
};

const MANUAL_OPEN_FORMS = [
  {quality:'maj7', name:'Open Cmaj7', frets:[null,3,2,0,0,0], family:'open', usage:['beginner','pop','bossa'], difficulty:1, popularity:88, jazz:78, level:1, tags:['open','beginner']},
  {quality:'7', name:'Open C7', frets:[null,3,2,3,1,0], family:'open', usage:['beginner','pop','blues'], difficulty:1, popularity:90, jazz:76, level:1, tags:['open','beginner']},
  {quality:'6', name:'Open C6', frets:[null,3,2,2,1,0], family:'open', usage:['beginner','pop','bossa'], difficulty:2, popularity:68, jazz:84, level:1, tags:['open']},
  {quality:'6/9', name:'Open C6/9 color', frets:[null,3,2,2,3,3], family:'open', usage:['bossa','pop'], difficulty:3, popularity:56, jazz:88, level:2, tags:['open','bossa']},
  {quality:'m7', name:'Open Cm7 color', frets:[null,3,1,3,1,null], family:'open', usage:['pop','bossa'], difficulty:2, popularity:56, jazz:76, level:2, tags:['open-ish']},
  {quality:'m9', name:'Open Cm9 color', frets:[null,3,1,3,3,null], family:'open', usage:['bossa','jazz-comping'], difficulty:3, popularity:50, jazz:88, level:2, tags:['open-ish','9th']},
  {quality:'7sus4', name:'Open C7sus4', frets:[null,3,3,3,1,1], family:'open', usage:['pop','funk'], difficulty:3, popularity:60, jazz:82, level:2, tags:['open-ish','sus']},
];

const BLUEPRINTS = [
  { family:'shell', label:'Shell 5th string root', strings:[1,2,3], roles:['root','third','seventh'], base:1, difficulty:1, popularity:82, jazz:93, usage:['jazz-comping','bossa'], level:1, tags:['shell','guide-tones'] },
  { family:'shell', label:'Shell 6th string root', strings:[0,2,3], roles:['root','seventh','third'], base:6, difficulty:2, popularity:74, jazz:92, usage:['jazz-comping'], level:1, tags:['shell','guide-tones'] },
  { family:'shell', label:'Guide tone mini', strings:[2,3], roles:['third','seventh'], base:1, difficulty:1, popularity:58, jazz:88, usage:['jazz-comping'], level:1, tags:['guide-tones','minimal'] },
  { family:'caged', label:'CAGED A-shape', strings:[1,2,3,4,5], roles:['root','fifth','seventh','third','root'], base:1, difficulty:2, popularity:82, jazz:86, usage:['jazz-comping','pop','bossa'], level:2, tags:['movable','caged'] },
  { family:'caged', label:'CAGED E-shape', strings:[0,1,2,3,4,5], roles:['root','fifth','seventh','third','fifth','root'], base:6, difficulty:3, popularity:72, jazz:84, usage:['jazz-comping','blues'], level:2, tags:['movable','barre'] },
  { family:'drop2', label:'Drop2 5th string root', strings:[1,2,3,4], roles:['root','fifth','seventh','third'], base:1, difficulty:3, popularity:74, jazz:94, usage:['jazz-comping','bossa'], level:2, tags:['drop2'] },
  { family:'drop2', label:'Drop2 6th string root', strings:[0,2,3,4], roles:['root','seventh','third','fifth'], base:6, difficulty:3, popularity:72, jazz:95, usage:['jazz-comping'], level:2, tags:['drop2','compact'] },
  { family:'drop2', label:'Drop2 top-set', strings:[2,3,4,5], roles:['root','third','seventh','fifth'], base:7, difficulty:4, popularity:48, jazz:91, usage:['solo-guitar','chord-melody'], level:3, tags:['drop2','top-set'] },
  { family:'drop3', label:'Drop3 6th string root', strings:[0,1,2,3], roles:['root','third','seventh','fifth'], base:5, difficulty:4, popularity:46, jazz:89, usage:['solo-guitar','jazz-comping'], level:3, tags:['drop3'] },
  { family:'drop3', label:'Drop3 low spread', strings:[0,1,3,4], roles:['root','seventh','third','fifth'], base:5, difficulty:5, popularity:35, jazz:88, usage:['solo-guitar'], level:3, tags:['drop3','spread'] },
  { family:'compact', label:'Compact middle', strings:[1,2,3,4], roles:['root','third','seventh','color'], base:1, difficulty:2, popularity:64, jazz:90, usage:['jazz-comping','funk'], level:2, tags:['compact'] },
  { family:'compact', label:'Top compact color', strings:[2,3,4,5], roles:['third','seventh','color','fifth'], base:4, difficulty:3, popularity:54, jazz:91, usage:['jazz-comping','funk'], level:2, tags:['compact','top-set'] },
  { family:'rootless', label:'Rootless 3-7-color-5', strings:[2,3,4,5], roles:['third','seventh','color','fifth'], base:1, difficulty:3, popularity:64, jazz:97, usage:['jazz-comping','bossa'], level:4, tags:['rootless','upper-structure'], rootless:true },
  { family:'rootless', label:'Rootless 7-3-color-9', strings:[2,3,4,5], roles:['seventh','third','color','ninth'], base:3, difficulty:4, popularity:54, jazz:96, usage:['jazz-comping'], level:4, tags:['rootless','upper-structure'], rootless:true },
  { family:'rootless', label:'Rootless high color', strings:[2,3,4,5], roles:['color','third','seventh','ninth'], base:7, difficulty:5, popularity:38, jazz:96, usage:['chord-melody','jazz-comping'], level:4, tags:['rootless','high'], rootless:true },
  { family:'spread', label:'Spread chord melody', strings:[0,2,4,5], roles:['root','seventh','third','color'], base:5, difficulty:5, popularity:32, jazz:90, usage:['chord-melody','solo-guitar'], level:3, tags:['spread','chord-melody'] },
];

function mod12(n){ return ((n % 12) + 12) % 12; }
function pcOnString(stringIdx, fret){ return mod12(STRING_PC[stringIdx] + fret); }
function qualityByKey(key){ return QUALITIES.find(q => q.key === key); }
function hasInterval(intervals, target){ return intervals.map(mod12).includes(mod12(target)); }
function toneForRole(intervals, role){
  const has = x => hasInterval(intervals, x);
  if(role === 'root') return 0;
  if(role === 'third') return has(4) ? 4 : has(3) ? 3 : has(5) ? 5 : 4;
  if(role === 'seventh') return has(11) ? 11 : has(10) ? 10 : has(9) ? 9 : has(6) ? 6 : 10;
  if(role === 'fifth') return has(7) ? 7 : has(6) ? 6 : has(8) ? 8 : has(5) ? 5 : 7;
  if(role === 'ninth') return has(14) ? 14 : has(2) ? 2 : 14;
  if(role === 'eleventh') return has(17) ? 17 : has(5) ? 5 : 17;
  if(role === 'thirteenth') return has(21) ? 21 : has(9) ? 9 : 21;
  if(role === 'color'){
    if(has(21)) return 21;
    if(has(20)) return 20;
    if(has(18)) return 18;
    if(has(17)) return 17;
    if(has(15)) return 15;
    if(has(14)) return 14;
    if(has(13)) return 13;
    if(has(9)) return 9;
    return toneForRole(intervals, 'fifth');
  }
  return 0;
}
function nearestFretForPc(stringIdx, targetPc, base, minFret=0, maxFret=15){
  let best = null;
  for(let f = minFret; f <= maxFret; f++){
    if(pcOnString(stringIdx, f) !== mod12(targetPc)) continue;
    const penalty = Math.abs(f - base) + (f === 0 ? -0.5 : 0);
    if(!best || penalty < best.penalty) best = { fret:f, penalty };
  }
  return best ? best.fret : null;
}
function getSpan(frets){
  const p = frets.filter(f => f !== null && f > 0);
  if(!p.length) return 0;
  return Math.max(...p) - Math.min(...p);
}
function uniqueKey(item){ return `${item.quality}|${item.family}|${item.frets.map(f => f === null ? 'x' : f).join('-')}`; }
function makeEntry(quality, blueprint){
  const q = qualityByKey(quality.key);
  const frets = [null,null,null,null,null,null];
  blueprint.strings.forEach((stringIdx, i) => {
    const interval = toneForRole(q.intervals, blueprint.roles[i]);
    frets[stringIdx] = nearestFretForPc(stringIdx, interval, blueprint.base, 0, 15);
  });
  if(blueprint.strings.some(stringIdx => frets[stringIdx] === null)) return null;
  if(getSpan(frets) > 7) return null;
  const style = QUALITY_STYLE[quality.key] || {pop:55,jazz:85,usage:['jazz-comping']};
  const tensionBonus = ['maj9','m9','9','13','6/9','m11','7alt','7b9','7#9','7#11','7b13'].includes(quality.key) ? 5 : 0;
  const rootlessBonus = blueprint.rootless ? 4 : 0;
  const usage = [...new Set([...(blueprint.usage || []), ...(style.usage || [])])].slice(0,4);
  const tags = [...new Set([...(blueprint.tags || []), quality.key, blueprint.family, ...(blueprint.rootless ? ['rootless'] : []), ...(tensionBonus ? ['tension'] : [])])];
  return {
    quality: quality.key,
    name: `${blueprint.label} ${quality.label}`,
    frets,
    family: blueprint.family,
    usage,
    difficulty: Math.min(5, blueprint.difficulty + (tensionBonus ? 1 : 0) + (quality.key === '7alt' ? 1 : 0)),
    popularity: Math.max(25, Math.min(95, style.pop + (blueprint.popularity - 60) * 0.45 - (blueprint.rootless ? 2 : 0))),
    jazz: Math.max(60, Math.min(99, style.jazz + (blueprint.jazz - 90) * 0.55 + rootlessBonus)),
    level: blueprint.level,
    rootless: !!blueprint.rootless,
    tags
  };
}

function buildLibrary(){
  const out = [...MANUAL_OPEN_FORMS];
  for(const quality of QUALITIES){
    for(const blueprint of BLUEPRINTS){
      const item = makeEntry(quality, blueprint);
      if(item) out.push(item);
    }
  }
  const seen = new Set();
  return out.filter(item => {
    const key = uniqueKey(item);
    if(seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export const CHORD_LIBRARY = buildLibrary();

export const LIBRARY_META = {
  version: 'v2-phase2-expanded',
  phase: 'Phase 2',
  templateCount: CHORD_LIBRARY.length,
  focus: 'Phase 1 core plus expanded maj9 / m9 / 9 / 13 / 6/9 / m11 and level workflow',
  nextTarget: 'Add curated altered-dominant and verified song-context examples'
};
