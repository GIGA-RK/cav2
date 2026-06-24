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
  { key:'6/9', label:'6/9', suffix:'6/9', intervals:[0,4,7,9,14] }
];

export const FAMILIES = ['all','open','caged','shell','drop2','drop3','rootless','compact'];
export const USAGES = ['all','beginner','pop','jazz-comping','bossa','solo-guitar','funk'];

// frets: 6弦 -> 1弦。null はミュート。rootless は root を含まない実用ジャズフォーム。
export const CHORD_LIBRARY = [
  // maj7
  {quality:'maj7', name:'Open maj7', frets:[null,3,2,0,0,0], family:'open', usage:['beginner','pop'], difficulty:1, popularity:78, jazz:75, tags:['open','beginner']},
  {quality:'maj7', name:'Amaj7 shape', frets:[null,3,5,4,5,3], family:'caged', usage:['jazz-comping','bossa'], difficulty:2, popularity:74, jazz:82, tags:['movable']},
  {quality:'maj7', name:'Drop2 6th string root', frets:[8,null,9,9,8,null], family:'drop2', usage:['jazz-comping'], difficulty:3, popularity:58, jazz:92, tags:['drop2','compact']},
  {quality:'maj7', name:'Shell 5th string root', frets:[null,3,2,4,null,null], family:'shell', usage:['jazz-comping','bossa'], difficulty:1, popularity:70, jazz:88, tags:['shell','guide-tones']},
  {quality:'maj7', name:'Rootless 3-7-9-5', frets:[null,null,2,4,3,3], family:'rootless', usage:['jazz-comping'], difficulty:3, popularity:55, jazz:94, rootless:true, tags:['rootless','9th']},

  // m7
  {quality:'m7', name:'Open m7', frets:[null,0,2,0,1,0], family:'open', usage:['beginner','pop'], difficulty:1, popularity:82, jazz:72, tags:['open','beginner']},
  {quality:'m7', name:'Am7 shape', frets:[null,3,5,3,4,3], family:'caged', usage:['jazz-comping','bossa'], difficulty:2, popularity:76, jazz:84, tags:['movable']},
  {quality:'m7', name:'Drop2 6th string root', frets:[8,null,8,8,8,null], family:'drop2', usage:['jazz-comping'], difficulty:2, popularity:66, jazz:91, tags:['drop2']},
  {quality:'m7', name:'Shell 5th string root', frets:[null,3,1,3,null,null], family:'shell', usage:['jazz-comping','bossa'], difficulty:1, popularity:73, jazz:89, tags:['shell','guide-tones']},
  {quality:'m7', name:'Rootless 3-b7-9-5', frets:[null,null,1,3,3,3], family:'rootless', usage:['jazz-comping'], difficulty:3, popularity:54, jazz:93, rootless:true, tags:['rootless','9th']},

  // dominant 7
  {quality:'7', name:'Open 7', frets:[null,3,2,3,1,0], family:'open', usage:['beginner','pop'], difficulty:1, popularity:85, jazz:73, tags:['open','beginner']},
  {quality:'7', name:'A7 shape', frets:[null,3,5,3,5,3], family:'caged', usage:['jazz-comping','bossa','funk'], difficulty:2, popularity:80, jazz:82, tags:['movable']},
  {quality:'7', name:'Drop2 6th string root', frets:[8,null,8,9,8,null], family:'drop2', usage:['jazz-comping'], difficulty:3, popularity:65, jazz:92, tags:['drop2']},
  {quality:'7', name:'Shell 5th string root', frets:[null,3,2,3,null,null], family:'shell', usage:['jazz-comping','bossa'], difficulty:1, popularity:76, jazz:91, tags:['shell','guide-tones']},
  {quality:'7', name:'Rootless 3-b7-9-13', frets:[null,null,2,3,3,5], family:'rootless', usage:['jazz-comping'], difficulty:4, popularity:57, jazz:96, rootless:true, tags:['rootless','9th','13th']},

  // half diminished
  {quality:'m7b5', name:'m7b5 compact', frets:[null,3,4,3,4,null], family:'compact', usage:['jazz-comping'], difficulty:3, popularity:58, jazz:93, tags:['minor-ii-v','compact']},
  {quality:'m7b5', name:'m7b5 shell', frets:[null,3,1,3,2,null], family:'shell', usage:['jazz-comping'], difficulty:3, popularity:51, jazz:91, tags:['shell']},
  {quality:'m7b5', name:'Rootless m7b5 color', frets:[null,null,1,3,2,2], family:'rootless', usage:['jazz-comping'], difficulty:4, popularity:42, jazz:92, rootless:true, tags:['rootless']},

  // dim7
  {quality:'dim7', name:'dim7 shape', frets:[null,3,4,2,4,2], family:'compact', usage:['jazz-comping','solo-guitar'], difficulty:3, popularity:52, jazz:89, tags:['symmetrical']},
  {quality:'dim7', name:'dim7 high compact', frets:[null,null,4,5,4,5], family:'compact', usage:['jazz-comping'], difficulty:3, popularity:43, jazz:87, tags:['symmetrical','compact']},

  // tension starter set
  {quality:'maj9', name:'Rootless maj9', frets:[null,null,2,4,3,3], family:'rootless', usage:['jazz-comping','bossa'], difficulty:3, popularity:61, jazz:96, rootless:true, tags:['rootless','9th']},
  {quality:'m9', name:'Rootless m9', frets:[null,null,1,3,3,3], family:'rootless', usage:['jazz-comping','bossa'], difficulty:3, popularity:59, jazz:95, rootless:true, tags:['rootless','9th']},
  {quality:'9', name:'9 shell color', frets:[null,3,2,3,3,null], family:'shell', usage:['jazz-comping','funk'], difficulty:2, popularity:72, jazz:92, tags:['9th','shell']},
  {quality:'13', name:'Rootless 13', frets:[null,null,2,3,3,5], family:'rootless', usage:['jazz-comping'], difficulty:4, popularity:61, jazz:97, rootless:true, tags:['rootless','13th']},
  {quality:'6/9', name:'6/9 color', frets:[null,3,2,2,3,3], family:'compact', usage:['bossa','jazz-comping'], difficulty:3, popularity:58, jazz:93, tags:['bossa','6th','9th']}
];
