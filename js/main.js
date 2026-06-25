import { NOTE_NAMES, FAMILIES, USAGES, LEVELS, VOICES, QUALITIES, CHORD_LIBRARY } from './chord-data.js';
import { getAvailableQualities, findChordForms, chordName } from './chord-engine.js';
import { renderDiagram } from './renderer.js';

const $ = id => document.getElementById(id);
const mod12 = n => ((n % 12) + 12) % 12;
const sortOptions = [
  ['recommended','おすすめ'], ['difficulty','簡単順'], ['popularity','使用頻度'], ['jazz','Jazz適性'], ['family','Family順'], ['voice','Voice順']
];

const FREQUENT_QUALITIES = ['maj','min','5','7','maj7','m7','sus4','add9','6','6/9','9','m9','13'];
const QUALITY_CATEGORIES = [
  { key:'major', label:'Major', test:q => q.key === 'maj' || q.key === '6' || q.key === '6/9' || q.key.startsWith('maj') || q.key === 'add9' || q.key === 'add11' || q.key === 'add13' },
  { key:'minor', label:'Minor', test:q => q.key === 'min' || q.key.startsWith('m') },
  { key:'dominant', label:'Dominant', test:q => /^7|^9|^11|^13/.test(q.key) },
  { key:'sus', label:'Sus', test:q => q.key.includes('sus') },
  { key:'dim', label:'Dim', test:q => q.key.includes('dim') || q.key.includes('m7b5') || q.key.includes('m9b5') || q.key.includes('m11b5') },
  { key:'aug', label:'Aug', test:q => q.key.includes('aug') || q.key.includes('#5') },
  { key:'power', label:'Power', test:q => q.key === '5' },
  { key:'other', label:'Other', test:q => true }
];

let availableQualities = [];
let selectedQualityCategory = 'major';

function option(value, label=value){ return `<option value="${value}">${label}</option>`; }
function qualityLabel(key){ return availableQualities.find(q => q.key === key)?.label ?? key; }

function qualitiesForCategory(categoryKey){
  const category = QUALITY_CATEGORIES.find(c => c.key === categoryKey) ?? QUALITY_CATEGORIES[0];
  if(category.keys){
    const set = new Set(category.keys);
    return availableQualities.filter(q => set.has(q.key));
  }
  if(category.key === 'other'){
    const categorized = new Set();
    QUALITY_CATEGORIES.filter(c => c.key !== 'other').forEach(c => {
      availableQualities.filter(c.test).forEach(q => categorized.add(q.key));
    });
    const other = availableQualities.filter(q => !categorized.has(q.key));
    return other.length ? other : availableQualities;
  }
  return availableQualities.filter(category.test);
}

function init(){
  availableQualities = getAvailableQualities();
  $('rootSelect').innerHTML = NOTE_NAMES.map(n => option(n)).join('');
  $('qualitySelect').innerHTML = availableQualities.map(q => option(q.key, q.label)).join('');
  $('bassSelect').innerHTML = [option('none', 'なし'), ...NOTE_NAMES.map(n => option(n))].join('');
  $('capoSelect').innerHTML = Array.from({length: 8}, (_, n) => option(String(n), n === 0 ? 'なし' : `Capo ${n}`)).join('');
  $('sortSelect').innerHTML = sortOptions.map(([v,l]) => option(v,l)).join('');
  $('difficultySelect').innerHTML = [1,2,3,4,5].map(n => option(n, `${n}以下`)).join('');
  $('difficultySelect').value = '3';
  $('familySelect').innerHTML = FAMILIES.map(f => option(f, f === 'all' ? 'すべて' : f)).join('');
  $('usageSelect').innerHTML = USAGES.map(u => option(u, u === 'all' ? 'すべて' : u)).join('');
  $('levelSelect').innerHTML = LEVELS.map(l => option(l, l === 'all' ? 'すべて' : `Level ${l}`)).join('');
  $('voiceSelect').innerHTML = VOICES.map(v => option(v, v === 'all' ? 'すべて' : v)).join('');

  if(availableQualities.some(q => q.key === 'maj7')) $('qualitySelect').value = 'maj7';
  updateQualityButton();
  renderQualityPalette();

  $('templateCount').textContent = CHORD_LIBRARY.length;
  $('qualityCount').textContent = new Set(CHORD_LIBRARY.map(x => x.quality)).size;
  $('jazzCount').textContent = CHORD_LIBRARY.filter(x => x.jazz >= 80).length;

  ['rootSelect','bassSelect','capoSelect','sortSelect','difficultySelect','familySelect','usageSelect','levelSelect','voiceSelect','jazzOnly','allowRootless']
    .forEach(id => $(id).addEventListener('change', render));
  $('qualitySelect').addEventListener('change', () => { updateQualityButton(); renderQualityPalette(); render(); });
  $('qualityButton').addEventListener('click', openQualityPalette);
  $('qualityClose').addEventListener('click', closeQualityPalette);
  $('qualityOverlay').addEventListener('click', closeQualityPalette);
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeQualityPalette(); });

  $('densityBtn').addEventListener('click', () => {
    const active = !document.body.classList.contains('compact-mode');
    document.body.classList.toggle('compact-mode', active);
    $('densityBtn').setAttribute('aria-pressed', String(active));
    $('densityBtn').textContent = active ? 'Roomy' : 'Compact';
  });
  if (window.matchMedia('(max-width: 900px)').matches) document.body.classList.add('compact-mode');
  render();
}

function updateQualityButton(){
  $('qualityButtonText').textContent = qualityLabel($('qualitySelect').value);
}

function openQualityPalette(){
  $('qualityOverlay').hidden = false;
  $('qualityPalette').classList.add('open');
  $('qualityPalette').setAttribute('aria-hidden','false');
  $('qualityButton').setAttribute('aria-expanded','true');
  renderQualityPalette();
}

function closeQualityPalette(){
  $('qualityOverlay').hidden = true;
  $('qualityPalette').classList.remove('open');
  $('qualityPalette').setAttribute('aria-hidden','true');
  $('qualityButton').setAttribute('aria-expanded','false');
}

function setQuality(key){
  $('qualitySelect').value = key;
  updateQualityButton();
  renderQualityPalette();
  render();
  closeQualityPalette();
}

function renderQualityPalette(){
  const current = $('qualitySelect').value;
  const frequentSet = new Set(FREQUENT_QUALITIES);
  const frequentItems = FREQUENT_QUALITIES
    .map(key => availableQualities.find(q => q.key === key))
    .filter(Boolean);

  $('qualityFrequent').innerHTML = frequentItems.map(q => qualityChip(q, current, true)).join('');
  $('qualityTabs').innerHTML = QUALITY_CATEGORIES.map(cat => `<button class="quality-tab ${selectedQualityCategory === cat.key ? 'active' : ''}" type="button" data-category="${cat.key}">${cat.label}</button>`).join('');

  let list = qualitiesForCategory(selectedQualityCategory)
    .filter(q => !frequentSet.has(q.key) || selectedQualityCategory !== 'other');

  $('qualityList').innerHTML = list.length ? list.map(q => qualityChip(q, current, false)).join('') : '<p class="quality-empty">該当するコードタイプがありません。</p>';

  $('qualityFrequent').querySelectorAll('[data-quality]').forEach(btn => btn.addEventListener('click', () => setQuality(btn.dataset.quality)));
  $('qualityList').querySelectorAll('[data-quality]').forEach(btn => btn.addEventListener('click', () => setQuality(btn.dataset.quality)));
  $('qualityTabs').querySelectorAll('[data-category]').forEach(btn => btn.addEventListener('click', () => {
    selectedQualityCategory = btn.dataset.category;
    renderQualityPalette();
  }));
}

function qualityChip(q, current, compact){
  const count = CHORD_LIBRARY.filter(item => item.quality === q.key).length;
  return `<button class="quality-chip ${compact ? 'frequent' : ''} ${q.key === current ? 'selected' : ''}" type="button" data-quality="${q.key}">
    <span>${q.label}</span><small>${count}</small>
  </button>`;
}

function render(){
  const soundingRootPc = NOTE_NAMES.indexOf($('rootSelect').value);
  const qualityKey = $('qualitySelect').value;
  const soundingBassPc = $('bassSelect').value === 'none' ? null : NOTE_NAMES.indexOf($('bassSelect').value);
  const capoFret = Number($('capoSelect').value || 0);
  const formRootPc = mod12(soundingRootPc - capoFret);
  const formBassPc = soundingBassPc === null ? null : mod12(soundingBassPc - capoFret);
  const params = {
    rootPc: formRootPc,
    qualityKey,
    bassPc: formBassPc,
    sortMode: $('sortSelect').value,
    maxDifficulty: Number($('difficultySelect').value),
    family: $('familySelect').value,
    usage: $('usageSelect').value,
    level: $('levelSelect').value,
    voice: $('voiceSelect').value,
    jazzOnly: $('jazzOnly').checked,
    allowRootless: $('allowRootless').checked
  };
  const rows = findChordForms(params).map(item => ({
    ...item,
    displayName: chordName(soundingRootPc, qualityKey, soundingBassPc),
    formName: chordName(formRootPc, qualityKey, formBassPc),
    diagramRootPc: formRootPc
  }));
  const soundingName = chordName(soundingRootPc, qualityKey, soundingBassPc);
  const formName = chordName(formRootPc, qualityKey, formBassPc);
  $('currentChord').textContent = capoFret ? `${soundingName} / Capo ${capoFret}` : soundingName;
  $('resultMeta').textContent = capoFret
    ? `${rows.length}件 / ${formName} shape / ${$('sortSelect').selectedOptions[0].textContent}`
    : `${rows.length}件 / ${$('sortSelect').selectedOptions[0].textContent}`;
  $('cards').innerHTML = rows.length ? rows.map(cardHtml).join('') : `<div class="empty">条件に合うフォームがありません。Difficulty や詳細フィルタを緩めてください。</div>`;
}

function cardHtml(item){
  return `<article class="card">
    <div class="card-head">
      <h3>${item.displayName}</h3>
      <div class="score" title="score">${item.score}</div>
    </div>
    <div class="diagram">${renderDiagram(item.frets, item.diagramRootPc ?? NOTE_NAMES.indexOf(item.root))}</div>
  </article>`;
}

init();
