export const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
export const STRING_PC = [4,9,2,7,11,4];

export const QUALITIES = [
  { key:'maj', label:'Major', suffix:'', intervals:[0,4,7] },
  { key:'5', label:'5', suffix:'5', intervals:[0,7] },
  { key:'6', label:'6', suffix:'6', intervals:[0,4,7,9] },
  { key:'6/9', label:'6/9', suffix:'6/9', intervals:[0,4,7,9,14] },
  { key:'maj7', label:'maj7', suffix:'maj7', intervals:[0,4,7,11] },
  { key:'maj9', label:'maj9', suffix:'maj9', intervals:[0,4,7,11,14] },
  { key:'maj11', label:'maj11', suffix:'maj11', intervals:[0,4,7,11,14,17] },
  { key:'maj13', label:'maj13', suffix:'maj13', intervals:[0,4,7,11,14,21] },
  { key:'maj7#11', label:'maj7#11', suffix:'maj7#11', intervals:[0,4,7,11,18] },
  { key:'maj9#11', label:'maj9#11', suffix:'maj9#11', intervals:[0,4,7,11,14,18] },
  { key:'maj7#5', label:'maj7#5', suffix:'maj7#5', intervals:[0,4,8,11] },

  { key:'min', label:'Minor', suffix:'m', intervals:[0,3,7] },
  { key:'m6', label:'m6', suffix:'m6', intervals:[0,3,7,9] },
  { key:'m7', label:'m7', suffix:'m7', intervals:[0,3,7,10] },
  { key:'m9', label:'m9', suffix:'m9', intervals:[0,3,7,10,14] },
  { key:'m11', label:'m11', suffix:'m11', intervals:[0,3,7,10,14,17] },
  { key:'m13', label:'m13', suffix:'m13', intervals:[0,3,7,10,14,21] },
  { key:'mMaj7', label:'mMaj7', suffix:'mMaj7', intervals:[0,3,7,11] },
  { key:'mMaj9', label:'mMaj9', suffix:'mMaj9', intervals:[0,3,7,11,14] },
  { key:'m7b5', label:'m7♭5', suffix:'m7♭5', intervals:[0,3,6,10] },
  { key:'m9b5', label:'m9♭5', suffix:'m9♭5', intervals:[0,3,6,10,14] },

  { key:'7', label:'7', suffix:'7', intervals:[0,4,7,10] },
  { key:'9', label:'9', suffix:'9', intervals:[0,4,7,10,14] },
  { key:'11', label:'11', suffix:'11', intervals:[0,4,7,10,14,17] },
  { key:'13', label:'13', suffix:'13', intervals:[0,4,7,10,14,21] },
  { key:'7b9', label:'7♭9', suffix:'7♭9', intervals:[0,4,7,10,13] },
  { key:'7#9', label:'7#9', suffix:'7#9', intervals:[0,4,7,10,15] },
  { key:'7b5', label:'7♭5', suffix:'7♭5', intervals:[0,4,6,10] },
  { key:'7#5', label:'7#5', suffix:'7#5', intervals:[0,4,8,10] },
  { key:'7#11', label:'7#11', suffix:'7#11', intervals:[0,4,7,10,18] },
  { key:'7b13', label:'7♭13', suffix:'7♭13', intervals:[0,4,7,10,20] },
  { key:'9#11', label:'9#11', suffix:'9#11', intervals:[0,4,7,10,14,18] },
  { key:'13b9', label:'13♭9', suffix:'13♭9', intervals:[0,4,7,10,13,21] },
  { key:'13#11', label:'13#11', suffix:'13#11', intervals:[0,4,7,10,18,21] },
  { key:'7alt', label:'7alt', suffix:'7alt', intervals:[0,4,10,13,15,20] },


  { key:'add11', label:'add11', suffix:'add11', intervals:[0,4,7,17] },
  { key:'maj9#5', label:'maj9#5', suffix:'maj9#5', intervals:[0,4,8,11,14] },
  { key:'maj13#11', label:'maj13#11', suffix:'maj13#11', intervals:[0,4,7,11,18,21] },

  { key:'m6/9', label:'m6/9', suffix:'m6/9', intervals:[0,3,7,9,14] },
  { key:'m7b9', label:'m7♭9', suffix:'m7♭9', intervals:[0,3,7,10,13] },
  { key:'m9add11', label:'m9add11', suffix:'m9add11', intervals:[0,3,7,10,14,17] },
  { key:'m7#5', label:'m7#5', suffix:'m7#5', intervals:[0,3,8,10] },
  { key:'m11b5', label:'m11♭5', suffix:'m11♭5', intervals:[0,3,6,10,14,17] },

  { key:'7b9b13', label:'7♭9♭13', suffix:'7♭9♭13', intervals:[0,4,7,10,13,20] },
  { key:'7#9b13', label:'7#9♭13', suffix:'7#9♭13', intervals:[0,4,7,10,15,20] },
  { key:'7#9#5', label:'7#9#5', suffix:'7#9#5', intervals:[0,4,8,10,15] },
  { key:'7b9#5', label:'7♭9#5', suffix:'7♭9#5', intervals:[0,4,8,10,13] },
  { key:'7b9#11', label:'7♭9#11', suffix:'7♭9#11', intervals:[0,4,7,10,13,18] },
  { key:'9b13', label:'9♭13', suffix:'9♭13', intervals:[0,4,7,10,14,20] },
  { key:'9#5', label:'9#5', suffix:'9#5', intervals:[0,4,8,10,14] },
  { key:'9b5', label:'9♭5', suffix:'9♭5', intervals:[0,4,6,10,14] },
  { key:'13#9', label:'13#9', suffix:'13#9', intervals:[0,4,7,10,15,21] },
  { key:'13b5', label:'13♭5', suffix:'13♭5', intervals:[0,4,6,10,14,21] },
  { key:'13#5', label:'13#5', suffix:'13#5', intervals:[0,4,8,10,14,21] },

  { key:'sus2', label:'sus2', suffix:'sus2', intervals:[0,2,7] },
  { key:'sus4', label:'sus4', suffix:'sus4', intervals:[0,5,7] },
  { key:'7sus4', label:'7sus4', suffix:'7sus4', intervals:[0,5,7,10] },
  { key:'9sus4', label:'9sus4', suffix:'9sus4', intervals:[0,5,7,10,14] },
  { key:'13sus4', label:'13sus4', suffix:'13sus4', intervals:[0,5,7,10,14,21] },


  { key:'7sus4b9', label:'7sus4♭9', suffix:'7sus4♭9', intervals:[0,5,7,10,13] },
  { key:'7sus4b13', label:'7sus4♭13', suffix:'7sus4♭13', intervals:[0,5,7,10,20] },
  { key:'9sus4b13', label:'9sus4♭13', suffix:'9sus4♭13', intervals:[0,5,7,10,14,20] },

  { key:'dim', label:'dim', suffix:'dim', intervals:[0,3,6] },
  { key:'dim7', label:'dim7', suffix:'dim7', intervals:[0,3,6,9] },
  { key:'aug', label:'aug', suffix:'aug', intervals:[0,4,8] },
  { key:'aug7', label:'aug7', suffix:'aug7', intervals:[0,4,8,10] },
  { key:'add9', label:'add9', suffix:'add9', intervals:[0,4,7,14] },
  { key:'madd9', label:'madd9', suffix:'madd9', intervals:[0,3,7,14] },

  { key:'dimMaj7', label:'dimMaj7', suffix:'dimMaj7', intervals:[0,3,6,11] },
  { key:'augadd9', label:'augadd9', suffix:'augadd9', intervals:[0,4,8,14] },
  { key:'maj7sus4', label:'maj7sus4', suffix:'maj7sus4', intervals:[0,5,7,11] },
  { key:'maj9sus4', label:'maj9sus4', suffix:'maj9sus4', intervals:[0,5,7,11,14] }
];

export const FAMILIES = ['all','open','standard','power','caged','shell','drop2','drop3','rootless','compact','spread','upper-structure'];
export const USAGES = ['all','beginner','pop','rock','jazz-comping','bossa','solo-guitar','funk','blues','chord-melody','neo-soul'];


export const QUALITY_ALIASES = {
  'M':'maj7', '△':'maj7', 'Δ':'maj7', 'major7':'maj7',
  'min':'min', '-':'min', '-7':'m7', 'minor7':'m7',
  'ø':'m7b5', 'half-dim':'m7b5', 'half diminished':'m7b5',
  'o':'dim', '°':'dim', 'o7':'dim7', '°7':'dim7',
  '+':'aug', '+7':'aug7',
  'alt':'7alt', 'dom7':'7', 'power':'5', 'pow':'5',
  'sus':'sus4', 'sus7':'7sus4',
  '69':'6/9', 'm69':'m6/9'
};

export const LEVELS = ['all','1','2','3','4','5'];
export const VOICES = ['all','basic','guide-tone','close','spread','rootless-color','upper-structure','quartal','altered','sus'];

const QUALITY_STYLE = {
  '5':{ pop:96, jazz:45, usage:['beginner','rock','pop'] },
  maj:{ pop:90, jazz:70, usage:['beginner','pop','rock'] },
  '6':{ pop:62, jazz:86, usage:['pop','bossa','jazz-comping'] },
  '6/9':{ pop:68, jazz:94, usage:['bossa','jazz-comping','pop'] },
  maj7:{ pop:84, jazz:89, usage:['jazz-comping','bossa','pop'] },
  maj9:{ pop:72, jazz:95, usage:['jazz-comping','bossa','chord-melody'] },
  maj11:{ pop:42, jazz:88, usage:['chord-melody','jazz-comping'] },
  maj13:{ pop:58, jazz:94, usage:['jazz-comping','chord-melody'] },
  'maj7#11':{ pop:54, jazz:97, usage:['jazz-comping','chord-melody'] },
  'maj9#11':{ pop:48, jazz:97, usage:['jazz-comping','chord-melody'] },
  'maj7#5':{ pop:34, jazz:90, usage:['chord-melody','jazz-comping'] },

  min:{ pop:88, jazz:70, usage:['beginner','pop','rock'] },
  m6:{ pop:54, jazz:89, usage:['bossa','jazz-comping'] },
  m7:{ pop:86, jazz:90, usage:['jazz-comping','bossa','pop'] },
  m9:{ pop:74, jazz:96, usage:['jazz-comping','bossa','neo-soul'] },
  m11:{ pop:62, jazz:95, usage:['jazz-comping','bossa','neo-soul'] },
  m13:{ pop:42, jazz:91, usage:['jazz-comping','chord-melody'] },
  mMaj7:{ pop:38, jazz:92, usage:['jazz-comping','chord-melody'] },
  mMaj9:{ pop:32, jazz:92, usage:['chord-melody','jazz-comping'] },
  m7b5:{ pop:56, jazz:95, usage:['jazz-comping'] },
  m9b5:{ pop:38, jazz:94, usage:['jazz-comping'] },

  '7':{ pop:88, jazz:86, usage:['jazz-comping','blues','funk'] },
  '9':{ pop:78, jazz:93, usage:['jazz-comping','funk','blues'] },
  '11':{ pop:50, jazz:88, usage:['jazz-comping','funk'] },
  '13':{ pop:70, jazz:96, usage:['jazz-comping','funk'] },
  '7b9':{ pop:60, jazz:97, usage:['jazz-comping'] },
  '7#9':{ pop:61, jazz:95, usage:['jazz-comping','funk','blues'] },
  '7b5':{ pop:42, jazz:91, usage:['jazz-comping','blues'] },
  '7#5':{ pop:44, jazz:93, usage:['jazz-comping'] },
  '7#11':{ pop:48, jazz:97, usage:['jazz-comping','chord-melody'] },
  '7b13':{ pop:52, jazz:97, usage:['jazz-comping'] },
  '9#11':{ pop:44, jazz:97, usage:['jazz-comping','chord-melody'] },
  '13b9':{ pop:42, jazz:98, usage:['jazz-comping'] },
  '13#11':{ pop:40, jazz:97, usage:['jazz-comping'] },
  '7alt':{ pop:58, jazz:99, usage:['jazz-comping'] },

  sus2:{ pop:70, jazz:68, usage:['beginner','pop','rock'] },
  sus4:{ pop:78, jazz:72, usage:['beginner','pop','rock'] },
  '7sus4':{ pop:66, jazz:88, usage:['jazz-comping','funk','pop'] },
  '9sus4':{ pop:58, jazz:91, usage:['jazz-comping','funk'] },
  '13sus4':{ pop:50, jazz:93, usage:['jazz-comping','funk'] },

  dim:{ pop:44, jazz:88, usage:['jazz-comping','solo-guitar'] },
  dim7:{ pop:50, jazz:93, usage:['jazz-comping','solo-guitar'] },
  aug:{ pop:40, jazz:84, usage:['jazz-comping','chord-melody'] },
  aug7:{ pop:34, jazz:88, usage:['jazz-comping'] },
  add9:{ pop:76, jazz:74, usage:['pop','rock','neo-soul'] },
  madd9:{ pop:66, jazz:76, usage:['pop','neo-soul'] },

  add11:{ pop:64, jazz:72, usage:['pop','rock','neo-soul'] },
  'maj9#5':{ pop:30, jazz:91, usage:['chord-melody','jazz-comping'] },
  'maj13#11':{ pop:40, jazz:97, usage:['jazz-comping','chord-melody'] },
  'm6/9':{ pop:48, jazz:91, usage:['bossa','jazz-comping'] },
  'm7b9':{ pop:36, jazz:90, usage:['jazz-comping','chord-melody'] },
  m9add11:{ pop:52, jazz:94, usage:['jazz-comping','neo-soul','bossa'] },
  'm7#5':{ pop:28, jazz:88, usage:['jazz-comping','chord-melody'] },
  m11b5:{ pop:32, jazz:94, usage:['jazz-comping'] },
  '7b9b13':{ pop:46, jazz:99, usage:['jazz-comping'] },
  '7#9b13':{ pop:44, jazz:99, usage:['jazz-comping'] },
  '7#9#5':{ pop:40, jazz:98, usage:['jazz-comping'] },
  '7b9#5':{ pop:40, jazz:98, usage:['jazz-comping'] },
  '7b9#11':{ pop:38, jazz:98, usage:['jazz-comping'] },
  '9b13':{ pop:48, jazz:97, usage:['jazz-comping'] },
  '9#5':{ pop:38, jazz:94, usage:['jazz-comping'] },
  '9b5':{ pop:38, jazz:94, usage:['jazz-comping'] },
  '13#9':{ pop:44, jazz:98, usage:['jazz-comping','funk'] },
  '13b5':{ pop:38, jazz:96, usage:['jazz-comping'] },
  '13#5':{ pop:38, jazz:96, usage:['jazz-comping'] },
  '7sus4b9':{ pop:38, jazz:92, usage:['jazz-comping','funk'] },
  '7sus4b13':{ pop:36, jazz:92, usage:['jazz-comping','funk'] },
  '9sus4b13':{ pop:34, jazz:93, usage:['jazz-comping','funk'] },
  dimMaj7:{ pop:24, jazz:88, usage:['chord-melody','jazz-comping'] },
  augadd9:{ pop:28, jazz:86, usage:['chord-melody','jazz-comping'] },
  maj7sus4:{ pop:42, jazz:84, usage:['pop','neo-soul','jazz-comping'] },
  maj9sus4:{ pop:38, jazz:86, usage:['neo-soul','jazz-comping'] },
};


const FIXED_BASIC_FORMS = [
  // Beginner open major chords
  {fixedRootPc:0, quality:'maj', name:'Open C', frets:[null,3,2,0,1,0], family:'open', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:99, jazz:55, level:1, tags:['open','beginner','cowboy']},
  {fixedRootPc:2, quality:'maj', name:'Open D', frets:[null,null,0,2,3,2], family:'open', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:99, jazz:50, level:1, tags:['open','beginner','cowboy']},
  {fixedRootPc:4, quality:'maj', name:'Open E', frets:[0,2,2,1,0,0], family:'open', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:99, jazz:48, level:1, tags:['open','beginner','cowboy']},
  {fixedRootPc:7, quality:'maj', name:'Open G', frets:[3,2,0,0,0,3], family:'open', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:99, jazz:48, level:1, tags:['open','beginner','cowboy']},
  {fixedRootPc:9, quality:'maj', name:'Open A', frets:[null,0,2,2,2,0], family:'open', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:99, jazz:50, level:1, tags:['open','beginner','cowboy']},

  // Beginner open minor chords
  {fixedRootPc:9, quality:'min', name:'Open Am', frets:[null,0,2,2,1,0], family:'open', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:99, jazz:52, level:1, tags:['open','beginner','cowboy']},
  {fixedRootPc:2, quality:'min', name:'Open Dm', frets:[null,null,0,2,3,1], family:'open', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:96, jazz:54, level:1, tags:['open','beginner','cowboy']},
  {fixedRootPc:4, quality:'min', name:'Open Em', frets:[0,2,2,0,0,0], family:'open', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:99, jazz:52, level:1, tags:['open','beginner','cowboy']},

  // Beginner/open dominant chords
  {fixedRootPc:9, quality:'7', name:'Open A7', frets:[null,0,2,0,2,0], family:'open', voice:'basic', usage:['beginner','pop','rock','blues'], difficulty:1, popularity:97, jazz:64, level:1, tags:['open','beginner','dominant']},
  {fixedRootPc:11, quality:'7', name:'Open B7', frets:[null,2,1,2,0,2], family:'open', voice:'basic', usage:['beginner','pop','rock','blues'], difficulty:2, popularity:90, jazz:66, level:1, tags:['open','dominant']},
  {fixedRootPc:0, quality:'7', name:'Open C7', frets:[null,3,2,3,1,0], family:'open', voice:'basic', usage:['beginner','pop','rock','blues'], difficulty:1, popularity:92, jazz:68, level:1, tags:['open','dominant']},
  {fixedRootPc:2, quality:'7', name:'Open D7', frets:[null,null,0,2,1,2], family:'open', voice:'basic', usage:['beginner','pop','rock','blues'], difficulty:1, popularity:97, jazz:66, level:1, tags:['open','dominant']},
  {fixedRootPc:4, quality:'7', name:'Open E7', frets:[0,2,0,1,0,0], family:'open', voice:'basic', usage:['beginner','pop','rock','blues'], difficulty:1, popularity:98, jazz:66, level:1, tags:['open','dominant']},
  {fixedRootPc:7, quality:'7', name:'Open G7', frets:[3,2,0,0,0,1], family:'open', voice:'basic', usage:['beginner','pop','rock','blues'], difficulty:1, popularity:95, jazz:62, level:1, tags:['open','dominant']},

  // Essential open sus/add color chords for pop/rock
  {fixedRootPc:9, quality:'sus2', name:'Open Asus2', frets:[null,0,2,2,0,0], family:'open', voice:'sus', usage:['beginner','pop','rock'], difficulty:1, popularity:88, jazz:52, level:1, tags:['open','sus','pop']},
  {fixedRootPc:9, quality:'sus4', name:'Open Asus4', frets:[null,0,2,2,3,0], family:'open', voice:'sus', usage:['beginner','pop','rock'], difficulty:1, popularity:88, jazz:52, level:1, tags:['open','sus','pop']},
  {fixedRootPc:2, quality:'sus2', name:'Open Dsus2', frets:[null,null,0,2,3,0], family:'open', voice:'sus', usage:['beginner','pop','rock'], difficulty:1, popularity:90, jazz:52, level:1, tags:['open','sus','pop']},
  {fixedRootPc:2, quality:'sus4', name:'Open Dsus4', frets:[null,null,0,2,3,3], family:'open', voice:'sus', usage:['beginner','pop','rock'], difficulty:1, popularity:90, jazz:52, level:1, tags:['open','sus','pop']},
  {fixedRootPc:4, quality:'sus4', name:'Open Esus4', frets:[0,2,2,2,0,0], family:'open', voice:'sus', usage:['beginner','pop','rock'], difficulty:1, popularity:86, jazz:52, level:1, tags:['open','sus','pop']},
  {fixedRootPc:7, quality:'add9', name:'Open Gadd9', frets:[3,0,0,0,0,3], family:'open', voice:'basic', usage:['pop','rock'], difficulty:1, popularity:82, jazz:54, level:1, tags:['open','add9','pop']},

  // Power chord templates, authored as C-root movable shapes.
  {quality:'5', name:'C5 power 5th-string root', frets:[null,3,5,5,null,null], family:'power', voice:'basic', usage:['beginner','rock','pop'], difficulty:1, popularity:98, jazz:30, level:1, tags:['power','rock','movable']},
  {quality:'5', name:'C5 power 5th-string two-note', frets:[null,3,5,null,null,null], family:'power', voice:'basic', usage:['beginner','rock','pop'], difficulty:1, popularity:96, jazz:28, level:1, tags:['power','rock','movable','two-note']},
  {quality:'5', name:'C5 power 6th-string root', frets:[8,10,10,null,null,null], family:'power', voice:'basic', usage:['rock','pop'], difficulty:2, popularity:90, jazz:26, level:1, tags:['power','rock','movable']},
  {quality:'5', name:'C5 power 4th-string root', frets:[null,null,10,12,13,null], family:'power', voice:'basic', usage:['rock','pop'], difficulty:2, popularity:76, jazz:26, level:1, tags:['power','rock','movable','higher']},

  // Open power chords that should appear first for rock/easy search.
  {fixedRootPc:4, quality:'5', name:'Open E5', frets:[0,2,2,null,null,null], family:'power', voice:'basic', usage:['beginner','rock','pop'], difficulty:1, popularity:99, jazz:20, level:1, tags:['open','power','rock']},
  {fixedRootPc:9, quality:'5', name:'Open A5', frets:[null,0,2,2,null,null], family:'power', voice:'basic', usage:['beginner','rock','pop'], difficulty:1, popularity:99, jazz:20, level:1, tags:['open','power','rock']},
  {fixedRootPc:2, quality:'5', name:'Open D5', frets:[null,null,0,2,3,null], family:'power', voice:'basic', usage:['beginner','rock','pop'], difficulty:1, popularity:94, jazz:20, level:1, tags:['open','power','rock']}
];


const STANDARD_FORMS = [
  // Standard textbook / chord-book forms. These are manually curated so they appear
  // before generated jazz voicings when sorting by easy or recommended order.

  // Major standard movable shapes, authored in C and transposed for all roots.
  {quality:'maj', name:'Standard C A-shape', frets:[null,3,5,5,5,3], family:'standard', voice:'basic', usage:['beginner','pop','rock'], difficulty:2, popularity:96, jazz:54, level:1, tags:['standard','textbook','movable','barre']},
  {quality:'maj', name:'Standard C E-shape', frets:[8,10,10,9,8,8], family:'standard', voice:'basic', usage:['pop','rock','blues'], difficulty:3, popularity:88, jazz:50, level:2, tags:['standard','movable','barre']},
  {quality:'maj', name:'Standard C triad top', frets:[null,null,10,9,8,null], family:'standard', voice:'basic', usage:['pop','rock','funk'], difficulty:2, popularity:74, jazz:58, level:2, tags:['standard','triad','top-set']},
  {quality:'maj', name:'Standard C small triad', frets:[null,null,null,5,5,3], family:'standard', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:78, jazz:48, level:1, tags:['standard','triad','small']},
  {quality:'maj', name:'Standard C compact middle', frets:[null,3,5,5,5,null], family:'standard', voice:'basic', usage:['pop','rock','funk'], difficulty:2, popularity:82, jazz:50, level:1, tags:['standard','compact','movable']},

  // Minor standard movable shapes.
  {quality:'min', name:'Standard Cm A-shape', frets:[null,3,5,5,4,3], family:'standard', voice:'basic', usage:['beginner','pop','rock'], difficulty:2, popularity:94, jazz:58, level:1, tags:['standard','textbook','movable','barre']},
  {quality:'min', name:'Standard Cm E-shape', frets:[8,10,10,8,8,8], family:'standard', voice:'basic', usage:['pop','rock','blues'], difficulty:3, popularity:86, jazz:54, level:2, tags:['standard','movable','barre']},
  {quality:'min', name:'Standard Cm triad top', frets:[null,null,10,8,8,null], family:'standard', voice:'basic', usage:['pop','rock','funk'], difficulty:2, popularity:72, jazz:58, level:2, tags:['standard','triad','top-set']},
  {quality:'min', name:'Standard Cm small triad', frets:[null,null,null,5,4,3], family:'standard', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:76, jazz:50, level:1, tags:['standard','triad','small']},

  // Dominant 7 standard shapes.
  {quality:'7', name:'Standard C7 A-shape', frets:[null,3,5,3,5,3], family:'standard', voice:'basic', usage:['beginner','pop','rock','blues'], difficulty:2, popularity:92, jazz:68, level:1, tags:['standard','dominant','movable']},
  {quality:'7', name:'Standard C7 E-shape', frets:[8,10,8,9,8,8], family:'standard', voice:'basic', usage:['pop','rock','blues'], difficulty:3, popularity:84, jazz:70, level:2, tags:['standard','dominant','movable']},
  {quality:'7', name:'Standard C7 compact top', frets:[null,null,10,9,11,null], family:'standard', voice:'basic', usage:['blues','funk','jazz-comping'], difficulty:2, popularity:74, jazz:74, level:2, tags:['standard','dominant','top-set']},

  // maj7 / m7 standard chord-book forms.
  {quality:'maj7', name:'Standard Cmaj7 A-shape', frets:[null,3,5,4,5,3], family:'standard', voice:'basic', usage:['pop','bossa','jazz-comping'], difficulty:2, popularity:86, jazz:84, level:2, tags:['standard','maj7','movable']},
  {quality:'maj7', name:'Standard Cmaj7 E-shape', frets:[8,10,9,9,8,8], family:'standard', voice:'basic', usage:['bossa','jazz-comping','pop'], difficulty:3, popularity:78, jazz:86, level:2, tags:['standard','maj7','movable']},
  {quality:'m7', name:'Standard Cm7 A-shape', frets:[null,3,5,3,4,3], family:'standard', voice:'basic', usage:['pop','bossa','jazz-comping'], difficulty:2, popularity:88, jazz:86, level:2, tags:['standard','m7','movable']},
  {quality:'m7', name:'Standard Cm7 E-shape', frets:[8,10,8,8,8,8], family:'standard', voice:'basic', usage:['bossa','jazz-comping','pop'], difficulty:3, popularity:80, jazz:86, level:2, tags:['standard','m7','movable']},

  // Common textbook diminished / half-dim shapes.
  {quality:'dim', name:'Standard Cdim', frets:[null,3,4,2,4,null], family:'standard', voice:'basic', usage:['pop','jazz-comping'], difficulty:3, popularity:56, jazz:82, level:2, tags:['standard','dim']},
  {quality:'dim7', name:'Standard Cdim7', frets:[null,3,4,2,4,2], family:'standard', voice:'basic', usage:['pop','jazz-comping'], difficulty:3, popularity:60, jazz:88, level:2, tags:['standard','dim7']},
  {quality:'m7b5', name:'Standard Cm7b5', frets:[null,3,4,3,4,null], family:'standard', voice:'basic', usage:['jazz-comping','bossa'], difficulty:3, popularity:66, jazz:92, level:2, tags:['standard','half-dim']},

  // Sus and add forms often found in pop/rock chord books.
  {quality:'sus4', name:'Standard Csus4 A-shape', frets:[null,3,5,5,6,3], family:'standard', voice:'sus', usage:['pop','rock'], difficulty:3, popularity:80, jazz:58, level:2, tags:['standard','sus','movable']},
  {quality:'sus2', name:'Standard Csus2 A-shape', frets:[null,3,5,5,3,3], family:'standard', voice:'sus', usage:['pop','rock'], difficulty:2, popularity:76, jazz:56, level:2, tags:['standard','sus','movable']},
  {quality:'add9', name:'Standard Cadd9 A-shape', frets:[null,3,5,5,3,3], family:'standard', voice:'basic', usage:['pop','rock'], difficulty:2, popularity:82, jazz:62, level:2, tags:['standard','add9','movable']},

  // Open-position C-family standard variants like common printed chord diagrams.
  {fixedRootPc:0, quality:'maj', name:'Standard C open', frets:[null,3,2,0,1,0], family:'standard', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:100, jazz:55, level:1, tags:['standard','open','textbook','cowboy']},
  {fixedRootPc:0, quality:'maj', name:'Standard C 3rd-fret A-shape', frets:[null,3,5,5,5,3], family:'standard', voice:'basic', usage:['beginner','pop','rock'], difficulty:2, popularity:94, jazz:54, level:1, tags:['standard','textbook','movable']},
  {fixedRootPc:0, quality:'maj', name:'Standard C open high-G', frets:[null,3,2,0,1,3], family:'standard', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:84, jazz:55, level:1, tags:['standard','open','high-g']},
  {fixedRootPc:0, quality:'maj', name:'Standard C easy top voicing', frets:[null,null,2,0,1,3], family:'standard', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:80, jazz:54, level:1, tags:['standard','open','small']},
  {fixedRootPc:0, quality:'maj', name:'Standard C mini top', frets:[null,null,null,0,1,3], family:'standard', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:72, jazz:48, level:1, tags:['standard','small','top-set']},

  // Other open-position textbook forms beyond C.
  {fixedRootPc:7, quality:'maj', name:'Standard G open 320003', frets:[3,2,0,0,0,3], family:'standard', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:99, jazz:48, level:1, tags:['standard','open','cowboy']},
  {fixedRootPc:7, quality:'maj', name:'Standard G open 320033', frets:[3,2,0,0,3,3], family:'standard', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:96, jazz:46, level:1, tags:['standard','open','cowboy']},
  {fixedRootPc:2, quality:'maj', name:'Standard D open', frets:[null,null,0,2,3,2], family:'standard', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:99, jazz:50, level:1, tags:['standard','open','cowboy']},
  {fixedRootPc:4, quality:'maj', name:'Standard E open', frets:[0,2,2,1,0,0], family:'standard', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:99, jazz:48, level:1, tags:['standard','open','cowboy']},
  {fixedRootPc:9, quality:'maj', name:'Standard A open', frets:[null,0,2,2,2,0], family:'standard', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:99, jazz:50, level:1, tags:['standard','open','cowboy']},
  {fixedRootPc:9, quality:'min', name:'Standard Am open', frets:[null,0,2,2,1,0], family:'standard', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:99, jazz:52, level:1, tags:['standard','open','cowboy']},
  {fixedRootPc:4, quality:'min', name:'Standard Em open', frets:[0,2,2,0,0,0], family:'standard', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:99, jazz:52, level:1, tags:['standard','open','cowboy']},
  {fixedRootPc:2, quality:'min', name:'Standard Dm open', frets:[null,null,0,2,3,1], family:'standard', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:96, jazz:54, level:1, tags:['standard','open','cowboy']}
];

const MANUAL_OPEN_FORMS = [
  {quality:'maj', name:'Open C', frets:[null,3,2,0,1,0], family:'open', voice:'basic', usage:['beginner','pop','rock'], difficulty:1, popularity:96, jazz:60, level:1, tags:['open','beginner']},
  {quality:'maj7', name:'Open Cmaj7', frets:[null,3,2,0,0,0], family:'open', voice:'basic', usage:['beginner','pop','bossa'], difficulty:1, popularity:88, jazz:78, level:1, tags:['open','beginner']},
  {quality:'7', name:'Open C7', frets:[null,3,2,3,1,0], family:'open', voice:'basic', usage:['beginner','pop','blues'], difficulty:1, popularity:90, jazz:76, level:1, tags:['open','beginner']},
  {quality:'6', name:'Open C6', frets:[null,3,2,2,1,0], family:'open', voice:'basic', usage:['beginner','pop','bossa'], difficulty:2, popularity:68, jazz:84, level:1, tags:['open']},
  {quality:'6/9', name:'Open C6/9 color', frets:[null,3,2,2,3,3], family:'open', voice:'close', usage:['bossa','pop'], difficulty:3, popularity:56, jazz:88, level:2, tags:['open','bossa']},
  {quality:'m7', name:'Open Cm7 color', frets:[null,3,1,3,1,null], family:'open', voice:'close', usage:['pop','bossa'], difficulty:2, popularity:56, jazz:76, level:2, tags:['open-ish']},
  {quality:'m9', name:'Open Cm9 color', frets:[null,3,1,3,3,null], family:'open', voice:'close', usage:['bossa','jazz-comping'], difficulty:3, popularity:50, jazz:88, level:2, tags:['open-ish','9th']},
  {quality:'7sus4', name:'Open C7sus4', frets:[null,3,3,3,1,1], family:'open', voice:'sus', usage:['pop','funk'], difficulty:3, popularity:60, jazz:82, level:2, tags:['open-ish','sus']},
  {quality:'sus2', name:'Open Csus2', frets:[null,3,0,0,1,3], family:'open', voice:'sus', usage:['beginner','pop','rock'], difficulty:2, popularity:72, jazz:62, level:1, tags:['open','sus']},
  {quality:'sus4', name:'Open Csus4', frets:[null,3,3,0,1,1], family:'open', voice:'sus', usage:['beginner','pop','rock'], difficulty:2, popularity:74, jazz:62, level:1, tags:['open','sus']},
  {quality:'add9', name:'Open Cadd9', frets:[null,3,2,0,3,0], family:'open', voice:'basic', usage:['pop','rock'], difficulty:2, popularity:82, jazz:66, level:1, tags:['open','add9']},
  {quality:'madd9', name:'Open Cmadd9 color', frets:[null,3,1,0,3,null], family:'open', voice:'close', usage:['pop','neo-soul'], difficulty:3, popularity:48, jazz:70, level:2, tags:['open-ish','add9']}
];

const BLUEPRINTS = [
  { family:'shell', voice:'guide-tone', label:'Shell 5th string root', strings:[1,2,3], roles:['root','third','seventh'], base:1, difficulty:1, popularity:84, jazz:94, usage:['jazz-comping','bossa'], level:1, tags:['shell','guide-tones'] },
  { family:'shell', voice:'guide-tone', label:'Shell 6th string root', strings:[0,2,3], roles:['root','seventh','third'], base:6, difficulty:2, popularity:76, jazz:93, usage:['jazz-comping'], level:1, tags:['shell','guide-tones'] },
  { family:'shell', voice:'guide-tone', label:'Guide tone mini', strings:[2,3], roles:['third','seventh'], base:1, difficulty:1, popularity:60, jazz:89, usage:['jazz-comping'], level:1, tags:['guide-tones','minimal'] },
  { family:'shell', voice:'guide-tone', label:'Guide tone 6th string zone', strings:[2,3,4], roles:['seventh','third','color'], base:5, difficulty:2, popularity:55, jazz:91, usage:['jazz-comping'], level:1, tags:['guide-tones','color'] },

  { family:'caged', voice:'basic', label:'CAGED A-shape', strings:[1,2,3,4,5], roles:['root','fifth','seventh','third','root'], base:1, difficulty:2, popularity:84, jazz:86, usage:['jazz-comping','pop','bossa'], level:2, tags:['movable','caged'] },
  { family:'caged', voice:'basic', label:'CAGED E-shape', strings:[0,1,2,3,4,5], roles:['root','fifth','seventh','third','fifth','root'], base:6, difficulty:3, popularity:72, jazz:84, usage:['jazz-comping','blues','rock'], level:2, tags:['movable','barre'] },
  { family:'caged', voice:'basic', label:'CAGED D top', strings:[2,3,4,5], roles:['root','third','fifth','root'], base:10, difficulty:3, popularity:52, jazz:78, usage:['pop','chord-melody'], level:2, tags:['movable','caged','top-set'] },

  { family:'drop2', voice:'close', label:'Drop2 5th string root', strings:[1,2,3,4], roles:['root','fifth','seventh','third'], base:1, difficulty:3, popularity:76, jazz:95, usage:['jazz-comping','bossa'], level:2, tags:['drop2'] },
  { family:'drop2', voice:'close', label:'Drop2 6th string root', strings:[0,2,3,4], roles:['root','seventh','third','fifth'], base:6, difficulty:3, popularity:74, jazz:96, usage:['jazz-comping'], level:2, tags:['drop2','compact'] },
  { family:'drop2', voice:'close', label:'Drop2 top-set', strings:[2,3,4,5], roles:['root','third','seventh','fifth'], base:7, difficulty:4, popularity:50, jazz:92, usage:['solo-guitar','chord-melody'], level:3, tags:['drop2','top-set'] },
  { family:'drop2', voice:'close', label:'Drop2 inversion color', strings:[1,2,3,4], roles:['third','seventh','color','root'], base:3, difficulty:4, popularity:54, jazz:94, usage:['jazz-comping','bossa'], level:3, tags:['drop2','inversion'] },

  { family:'drop3', voice:'spread', label:'Drop3 6th string root', strings:[0,1,2,3], roles:['root','third','seventh','fifth'], base:5, difficulty:4, popularity:46, jazz:90, usage:['solo-guitar','jazz-comping'], level:3, tags:['drop3'] },
  { family:'drop3', voice:'spread', label:'Drop3 low spread', strings:[0,1,3,4], roles:['root','seventh','third','fifth'], base:5, difficulty:5, popularity:35, jazz:89, usage:['solo-guitar'], level:3, tags:['drop3','spread'] },
  { family:'spread', voice:'spread', label:'Wide spread voicing', strings:[0,2,4,5], roles:['root','seventh','third','color'], base:5, difficulty:5, popularity:34, jazz:91, usage:['chord-melody','solo-guitar'], level:3, tags:['spread','chord-melody'] },

  { family:'compact', voice:'close', label:'Compact middle', strings:[1,2,3,4], roles:['root','third','seventh','color'], base:1, difficulty:2, popularity:66, jazz:91, usage:['jazz-comping','funk'], level:2, tags:['compact'] },
  { family:'compact', voice:'close', label:'Top compact color', strings:[2,3,4,5], roles:['third','seventh','color','fifth'], base:4, difficulty:3, popularity:56, jazz:92, usage:['jazz-comping','funk'], level:2, tags:['compact','top-set'] },
  { family:'compact', voice:'quartal', label:'Quartal-ish color', strings:[2,3,4,5], roles:['root','fourth','seventh','color'], base:5, difficulty:4, popularity:42, jazz:92, usage:['jazz-comping','neo-soul'], level:3, tags:['quartal','modern'] },

  { family:'rootless', voice:'rootless-color', label:'Rootless 3-7-color-5', strings:[2,3,4,5], roles:['third','seventh','color','fifth'], base:1, difficulty:3, popularity:66, jazz:98, usage:['jazz-comping','bossa'], level:4, tags:['rootless','upper-structure'], rootless:true },
  { family:'rootless', voice:'rootless-color', label:'Rootless 7-3-color-9', strings:[2,3,4,5], roles:['seventh','third','color','ninth'], base:3, difficulty:4, popularity:56, jazz:97, usage:['jazz-comping'], level:4, tags:['rootless','upper-structure'], rootless:true },
  { family:'rootless', voice:'rootless-color', label:'Rootless high color', strings:[2,3,4,5], roles:['color','third','seventh','ninth'], base:7, difficulty:5, popularity:40, jazz:97, usage:['chord-melody','jazz-comping'], level:4, tags:['rootless','high'], rootless:true },
  { family:'rootless', voice:'upper-structure', label:'Upper structure triad shell', strings:[2,3,4,5], roles:['third','seventh','sharp-ninth','flat-thirteenth'], base:3, difficulty:5, popularity:38, jazz:98, usage:['jazz-comping'], level:5, tags:['rootless','upper-structure','altered'], rootless:true },
  { family:'upper-structure', voice:'upper-structure', label:'Upper structure color', strings:[1,2,3,4,5], roles:['root','third','seventh','ninth','thirteenth'], base:1, difficulty:5, popularity:35, jazz:96, usage:['chord-melody','jazz-comping'], level:5, tags:['upper-structure','tension'] }
];

function mod12(n){ return ((n % 12) + 12) % 12; }
function pcOnString(stringIdx, fret){ return mod12(STRING_PC[stringIdx] + fret); }
function qualityByKey(key){ return QUALITIES.find(q => q.key === key); }
function hasInterval(intervals, target){ return intervals.map(mod12).includes(mod12(target)); }
function toneForRole(intervals, role){
  const has = x => hasInterval(intervals, x);
  if(role === 'root') return 0;
  if(role === 'third') return has(4) ? 4 : has(3) ? 3 : has(5) ? 5 : 4;
  if(role === 'fourth') return has(5) ? 5 : has(17) ? 17 : 5;
  if(role === 'seventh') return has(11) ? 11 : has(10) ? 10 : has(9) ? 9 : has(6) ? 6 : 10;
  if(role === 'fifth') return has(7) ? 7 : has(6) ? 6 : has(8) ? 8 : has(5) ? 5 : 7;
  if(role === 'ninth') return has(14) ? 14 : has(2) ? 2 : has(13) ? 13 : has(15) ? 15 : 14;
  if(role === 'eleventh') return has(18) ? 18 : has(17) ? 17 : has(5) ? 5 : 17;
  if(role === 'thirteenth') return has(21) ? 21 : has(20) ? 20 : has(9) ? 9 : 21;
  if(role === 'sharp-ninth') return has(15) ? 15 : toneForRole(intervals, 'ninth');
  if(role === 'flat-thirteenth') return has(20) ? 20 : toneForRole(intervals, 'thirteenth');
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
    const penalty = Math.abs(f - base) + (f === 0 ? -0.5 : 0) + (f > 12 ? 3 : 0);
    if(!best || penalty < best.penalty) best = { fret:f, penalty };
  }
  return best ? best.fret : null;
}
function getSpan(frets){
  const p = frets.filter(f => f !== null && f > 0);
  if(!p.length) return 0;
  return Math.max(...p) - Math.min(...p);
}
function uniqueKey(item){ return `${item.quality}|${item.family}|${item.voice}|${item.frets.map(f => f === null ? 'x' : f).join('-')}`; }
function makeEntry(quality, blueprint){
  const q = qualityByKey(quality.key);
  const frets = [null,null,null,null,null,null];
  blueprint.strings.forEach((stringIdx, i) => {
    const interval = toneForRole(q.intervals, blueprint.roles[i]);
    frets[stringIdx] = nearestFretForPc(stringIdx, interval, blueprint.base, 0, 15);
  });
  if(blueprint.strings.some(stringIdx => frets[stringIdx] === null)) return null;
  if(getSpan(frets) > 8) return null;
  const style = QUALITY_STYLE[quality.key] || {pop:55,jazz:85,usage:['jazz-comping']};
  const tension = q.intervals.some(iv => iv > 12 || [13,14,15,17,18,20,21].includes(iv));
  const altered = ['7alt','7b9','7#9','7b5','7#5','7#11','7b13','9#11','13b9','13#11','maj7#11','maj9#11'].includes(quality.key);
  const rootlessBonus = blueprint.rootless ? 4 : 0;
  const usage = [...new Set([...(blueprint.usage || []), ...(style.usage || [])])].slice(0,5);
  const tags = [...new Set([...(blueprint.tags || []), quality.key, blueprint.family, blueprint.voice, ...(blueprint.rootless ? ['rootless'] : []), ...(tension ? ['tension'] : []), ...(altered ? ['altered'] : [])])];
  return {
    quality: quality.key,
    name: `${blueprint.label} ${quality.label}`,
    frets,
    family: blueprint.family,
    voice: blueprint.voice || 'basic',
    usage,
    difficulty: Math.min(5, blueprint.difficulty + (tension ? 1 : 0) + (altered ? 1 : 0)),
    popularity: Math.round(Math.max(20, Math.min(96, style.pop + (blueprint.popularity - 60) * 0.45 - (blueprint.rootless ? 2 : 0) - (altered ? 4 : 0)))),
    jazz: Math.round(Math.max(55, Math.min(99, style.jazz + (blueprint.jazz - 90) * 0.55 + rootlessBonus + (altered ? 2 : 0)))),
    level: Math.min(5, Math.max(blueprint.level, altered ? 4 : blueprint.level)),
    rootless: !!blueprint.rootless,
    tags
  };
}
function buildLibrary(){
  const out = [...FIXED_BASIC_FORMS, ...STANDARD_FORMS, ...MANUAL_OPEN_FORMS];
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
  version: 'v2-phase6-standard-forms',
  phase: 'Phase 6',
  templateCount: CHORD_LIBRARY.length,
  focus: 'Standard textbook chord-book forms added and prioritized for everyday pop/rock workflows',
  nextTarget: 'Chord sheet editor, reverse lookup, and continued curation of practical forms'
};
