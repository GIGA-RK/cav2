export const NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
export const STRING_PC = [4,9,2,7,11,4]; // E A D G B E

export const QUALITIES = [
  { key:'maj', label:'Major', suffix:'', intervals:[0,4,7], family:'triad' },
  { key:'min', label:'Minor', suffix:'m', intervals:[0,3,7], family:'triad' },
  { key:'6', label:'6', suffix:'6', intervals:[0,4,7,9], family:'sixth' },
  { key:'m6', label:'m6', suffix:'m6', intervals:[0,3,7,9], family:'sixth' },
  { key:'maj7', label:'maj7', suffix:'maj7', intervals:[0,4,7,11], family:'seventh' },
  { key:'m7', label:'m7', suffix:'m7', intervals:[0,3,7,10], family:'seventh' },
  { key:'7', label:'7', suffix:'7', intervals:[0,4,7,10], family:'dominant' },
  { key:'m7b5', label:'m7♭5', suffix:'m7♭5', intervals:[0,3,6,10], family:'half-dim' },
  { key:'dim7', label:'dim7', suffix:'dim7', intervals:[0,3,6,9], family:'dim' },
  { key:'maj9', label:'maj9', suffix:'maj9', intervals:[0,4,7,11,14], family:'jazz' },
  { key:'m9', label:'m9', suffix:'m9', intervals:[0,3,7,10,14], family:'jazz' },
  { key:'9', label:'9', suffix:'9', intervals:[0,4,7,10,14], family:'jazz' },
  { key:'13', label:'13', suffix:'13', intervals:[0,4,7,10,14,21], family:'jazz' },
  { key:'69', label:'6/9', suffix:'6/9', intervals:[0,4,7,9,14], family:'jazz' },
  { key:'7b9', label:'7(♭9)', suffix:'7(♭9)', intervals:[0,4,7,10,13], family:'altered' },
  { key:'7sharp9', label:'7(#9)', suffix:'7(#9)', intervals:[0,4,7,10,15], family:'altered' },
  { key:'7b13', label:'7(♭13)', suffix:'7(♭13)', intervals:[0,4,7,10,20], family:'altered' },
  { key:'7sharp11', label:'7(#11)', suffix:'7(#11)', intervals:[0,4,7,10,18], family:'altered' },
  { key:'7alt', label:'7alt', suffix:'7alt', intervals:[0,4,10,13,15,20], family:'altered' },
  { key:'m11', label:'m11', suffix:'m11', intervals:[0,3,7,10,14,17], family:'jazz' },
  { key:'mMaj7', label:'mMaj7', suffix:'mMaj7', intervals:[0,3,7,11], family:'jazz' },
  { key:'7sus4', label:'7sus4', suffix:'7sus4', intervals:[0,5,7,10], family:'sus' },
  { key:'sus9', label:'sus9', suffix:'sus9', intervals:[0,5,7,10,14], family:'sus' }
];

export const QUALITY_BY_KEY = Object.fromEntries(QUALITIES.map(q => [q.key, q]));

// Template frets are written for templateRoot. They are transposed by root pitch class.
// difficulty: 1 easy - 5 hard. popularity/jazzUse: 0 - 100.
export const FORM_TEMPLATES = [
  // Basic / common open + movable
  {id:'maj-open-c', quality:'maj', templateRoot:'C', name:'Open C', frets:[null,3,2,0,1,0], difficulty:1, popularity:95, jazzUse:35, tags:['open','beginner','pop']},
  {id:'maj-e-barre', quality:'maj', templateRoot:'E', name:'E shape barre', frets:[0,2,2,1,0,0], difficulty:2, popularity:92, jazzUse:35, tags:['barre','movable','rock','pop']},
  {id:'maj-a-barre', quality:'maj', templateRoot:'A', name:'A shape barre', frets:[null,0,2,2,2,0], difficulty:2, popularity:88, jazzUse:35, tags:['barre','movable','pop']},
  {id:'min-em', quality:'min', templateRoot:'E', name:'Em shape', frets:[0,2,2,0,0,0], difficulty:1, popularity:96, jazzUse:30, tags:['open','beginner','movable']},
  {id:'min-am', quality:'min', templateRoot:'A', name:'Am shape', frets:[null,0,2,2,1,0], difficulty:1, popularity:95, jazzUse:30, tags:['open','beginner','movable']},

  // 6 / maj7 / m7 / dominant core
  {id:'6-a', quality:'6', templateRoot:'A', name:'A6 shape', frets:[null,0,2,2,2,2], difficulty:2, popularity:62, jazzUse:70, tags:['jazz','swing','movable']},
  {id:'69-c', quality:'69', templateRoot:'C', name:'C6/9 compact', frets:[null,3,2,2,3,3], difficulty:3, popularity:68, jazzUse:90, tags:['jazz','bossa','compact']},
  {id:'maj7-c-open', quality:'maj7', templateRoot:'C', name:'Open Cmaj7', frets:[null,3,2,0,0,0], difficulty:1, popularity:78, jazzUse:75, tags:['open','jazz','beginner']},
  {id:'maj7-a', quality:'maj7', templateRoot:'A', name:'Amaj7 shape', frets:[null,0,2,1,2,0], difficulty:2, popularity:74, jazzUse:82, tags:['jazz','movable']},
  {id:'maj7-drop2-6', quality:'maj7', templateRoot:'F', name:'Drop2 6th string root', frets:[1,null,2,2,1,null], difficulty:3, popularity:58, jazzUse:92, tags:['jazz','drop2','compact']},
  {id:'maj9-rootless', quality:'maj9', templateRoot:'C', name:'Rootless maj9', frets:[null,null,2,4,3,3], difficulty:3, popularity:55, jazzUse:96, tags:['jazz','rootless','guide-tones','compact'], rootless:true},
  {id:'maj9-root', quality:'maj9', templateRoot:'C', name:'Cmaj9 root', frets:[null,3,2,4,3,null], difficulty:3, popularity:56, jazzUse:90, tags:['jazz','bossa','compact']},

  {id:'m7-am-open', quality:'m7', templateRoot:'A', name:'Open Am7', frets:[null,0,2,0,1,0], difficulty:1, popularity:86, jazzUse:68, tags:['open','beginner','jazz']},
  {id:'m7-em7', quality:'m7', templateRoot:'E', name:'Em7 shape', frets:[0,2,0,0,0,0], difficulty:1, popularity:83, jazzUse:62, tags:['open','beginner','movable']},
  {id:'m7-drop2-6', quality:'m7', templateRoot:'F', name:'Drop2 minor 7', frets:[1,null,1,1,1,null], difficulty:3, popularity:59, jazzUse:92, tags:['jazz','drop2','compact']},
  {id:'m9-rootless', quality:'m9', templateRoot:'D', name:'Rootless m9', frets:[null,null,3,5,5,5], difficulty:3, popularity:57, jazzUse:95, tags:['jazz','rootless','guide-tones'], rootless:true},
  {id:'m11-rootless', quality:'m11', templateRoot:'D', name:'Rootless m11', frets:[null,null,3,5,3,5], difficulty:4, popularity:48, jazzUse:91, tags:['jazz','rootless','modal'], rootless:true},
  {id:'mMaj7-a', quality:'mMaj7', templateRoot:'A', name:'Minor major 7', frets:[null,0,2,1,1,0], difficulty:3, popularity:30, jazzUse:78, tags:['jazz','minor-major']},

  {id:'7-e-open', quality:'7', templateRoot:'E', name:'E7 shape', frets:[0,2,0,1,0,0], difficulty:1, popularity:94, jazzUse:55, tags:['open','beginner','blues','movable']},
  {id:'7-a-open', quality:'7', templateRoot:'A', name:'A7 shape', frets:[null,0,2,0,2,0], difficulty:1, popularity:92, jazzUse:55, tags:['open','beginner','blues','movable']},
  {id:'9-dom', quality:'9', templateRoot:'C', name:'Dominant 9', frets:[null,3,2,3,3,null], difficulty:2, popularity:78, jazzUse:94, tags:['jazz','funk','bossa','compact']},
  {id:'13-rootless', quality:'13', templateRoot:'C', name:'Rootless 13', frets:[null,null,2,3,3,5], difficulty:3, popularity:67, jazzUse:96, tags:['jazz','rootless','guide-tones'], rootless:true},
  {id:'13-root', quality:'13', templateRoot:'C', name:'Dominant 13', frets:[null,3,2,3,5,5], difficulty:4, popularity:58, jazzUse:93, tags:['jazz','swing']},
  {id:'7sus4-a', quality:'7sus4', templateRoot:'A', name:'7sus4 shape', frets:[null,0,2,0,3,0], difficulty:2, popularity:62, jazzUse:67, tags:['sus','pop','jazz']},
  {id:'sus9-a', quality:'sus9', templateRoot:'A', name:'Sus9', frets:[null,0,2,0,0,0], difficulty:1, popularity:50, jazzUse:60, tags:['sus','open','color']},

  // Altered dominant
  {id:'7b9-root', quality:'7b9', templateRoot:'C', name:'7(b9)', frets:[null,3,2,3,2,null], difficulty:3, popularity:55, jazzUse:94, tags:['jazz','altered','dominant']},
  {id:'7sharp9-root', quality:'7sharp9', templateRoot:'E', name:'7(#9) Hendrix', frets:[0,2,0,1,3,3], difficulty:3, popularity:65, jazzUse:80, tags:['altered','blues','jazz']},
  {id:'7b13-rootless', quality:'7b13', templateRoot:'C', name:'Rootless 7(b13)', frets:[null,null,2,3,4,4], difficulty:4, popularity:45, jazzUse:91, tags:['jazz','rootless','altered'], rootless:true},
  {id:'7sharp11-rootless', quality:'7sharp11', templateRoot:'C', name:'Rootless 7(#11)', frets:[null,null,2,3,3,4], difficulty:4, popularity:43, jazzUse:90, tags:['jazz','rootless','lydian-dominant'], rootless:true},
  {id:'7alt-rootless-a', quality:'7alt', templateRoot:'C', name:'Rootless 7alt A', frets:[null,null,2,3,4,3], difficulty:4, popularity:50, jazzUse:96, tags:['jazz','rootless','altered'], rootless:true},
  {id:'7alt-rootless-b', quality:'7alt', templateRoot:'C', name:'Rootless 7alt B', frets:[null,null,2,3,2,3], difficulty:4, popularity:44, jazzUse:92, tags:['jazz','rootless','altered'], rootless:true},

  // Diminished / half diminished
  {id:'m7b5-b', quality:'m7b5', templateRoot:'B', name:'Half-diminished', frets:[null,2,3,2,3,2], difficulty:3, popularity:52, jazzUse:93, tags:['jazz','minor-ii-v']},
  {id:'m7b5-rootless', quality:'m7b5', templateRoot:'B', name:'Rootless m7b5 color', frets:[null,null,3,4,3,5], difficulty:4, popularity:36, jazzUse:86, tags:['jazz','rootless'], rootless:true},
  {id:'dim7-c', quality:'dim7', templateRoot:'C', name:'Diminished 7', frets:[null,3,4,2,4,2], difficulty:3, popularity:48, jazzUse:90, tags:['jazz','passing','symmetric']},
  {id:'dim7-compact', quality:'dim7', templateRoot:'C', name:'Dim7 compact', frets:[null,null,1,2,1,2], difficulty:3, popularity:46, jazzUse:88, tags:['jazz','compact','symmetric']}
];
