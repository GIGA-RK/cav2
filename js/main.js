import { NOTE_NAMES, FAMILIES, USAGES, LEVELS, VOICES, CHORD_LIBRARY } from './chord-data.js';
import { getAvailableQualities, findChordForms, chordName } from './chord-engine.js';
import { renderDiagram } from './renderer.js';

const $ = id => document.getElementById(id);
const sortOptions = [
  ['recommended','おすすめ'], ['difficulty','簡単順'], ['popularity','使用頻度'], ['jazz','Jazz適性'], ['family','Family順'], ['voice','Voice順']
];

function option(value, label=value){ return `<option value="${value}">${label}</option>`; }

function init(){
  $('rootSelect').innerHTML = NOTE_NAMES.map(n => option(n)).join('');
  $('qualitySelect').innerHTML = getAvailableQualities().map(q => option(q.key, q.label)).join('');
  $('bassSelect').innerHTML = [option('none', 'なし'), ...NOTE_NAMES.map(n => option(n))].join('');
  $('sortSelect').innerHTML = sortOptions.map(([v,l]) => option(v,l)).join('');
  $('difficultySelect').innerHTML = [1,2,3,4,5].map(n => option(n, `${n}以下`)).join('');
  $('difficultySelect').value = '3';
  $('familySelect').innerHTML = FAMILIES.map(f => option(f, f === 'all' ? 'すべて' : f)).join('');
  $('usageSelect').innerHTML = USAGES.map(u => option(u, u === 'all' ? 'すべて' : u)).join('');
  $('levelSelect').innerHTML = LEVELS.map(l => option(l, l === 'all' ? 'すべて' : `Level ${l}`)).join('');
  $('voiceSelect').innerHTML = VOICES.map(v => option(v, v === 'all' ? 'すべて' : v)).join('');

  $('templateCount').textContent = CHORD_LIBRARY.length;
  $('qualityCount').textContent = new Set(CHORD_LIBRARY.map(x => x.quality)).size;
  $('jazzCount').textContent = CHORD_LIBRARY.filter(x => x.jazz >= 80).length;

  document.querySelectorAll('select,input').forEach(el => el.addEventListener('change', render));
  $('densityBtn').addEventListener('click', () => {
    const active = !document.body.classList.contains('compact-mode');
    document.body.classList.toggle('compact-mode', active);
    $('densityBtn').setAttribute('aria-pressed', String(active));
    $('densityBtn').textContent = active ? 'Roomy' : 'Compact';
  });
  if (window.matchMedia('(max-width: 900px)').matches) document.body.classList.add('compact-mode');
  render();
}

function render(){
  const rootPc = NOTE_NAMES.indexOf($('rootSelect').value);
  const qualityKey = $('qualitySelect').value;
  const bassPc = $('bassSelect').value === 'none' ? null : NOTE_NAMES.indexOf($('bassSelect').value);
  const params = {
    rootPc,
    qualityKey,
    bassPc,
    sortMode: $('sortSelect').value,
    maxDifficulty: Number($('difficultySelect').value),
    family: $('familySelect').value,
    usage: $('usageSelect').value,
    level: $('levelSelect').value,
    voice: $('voiceSelect').value,
    jazzOnly: $('jazzOnly').checked,
    allowRootless: $('allowRootless').checked
  };
  const rows = findChordForms(params);
  $('currentChord').textContent = chordName(rootPc, qualityKey, bassPc);
  $('resultMeta').textContent = `${rows.length}件 / ${$('sortSelect').selectedOptions[0].textContent}`;
  $('cards').innerHTML = rows.length ? rows.map(cardHtml).join('') : `<div class="empty">条件に合うフォームがありません。Difficulty や詳細フィルタを緩めてください。</div>`;
}

function shortUsage(item){
  const usage = Array.isArray(item.usage) ? item.usage : [];
  if (!usage.length) return '';
  return usage.slice(0, 2).join(' / ');
}

function cardHtml(item){
  const tags = [...new Set([item.family, item.voice, ...item.usage, ...(item.tags || [])])].filter(Boolean);
  return `<article class="card">
    <div class="card-head">
      <div class="title-wrap">
        <h3>${item.displayName}</h3>
        <p class="subtitle">${item.name}</p>
      </div>
      <div class="score" title="score">${item.score}</div>
    </div>
    <div class="diagram">${renderDiagram(item.frets)}</div>
    <div class="pills">
      <span class="pill">難${item.difficulty}</span>
      <span class="pill">人${item.popularity}</span>
      <span class="pill">Jazz ${item.jazz}</span>
      <span class="pill ${item.rootless ? 'rootless' : 'soft'}">${item.rootless ? 'Rootless' : 'Root'}</span>
      ${item.slash ? `<span class="pill">/${item.bass}</span>` : ''}
      <span class="pill">${item.family}</span>
      <span class="pill">Lv${item.level ?? 2}</span>
      <span class="pill">${item.voice ?? 'general'}</span>
    </div>
    <div class="frets">${item.frets.map(f => f === null ? 'x' : f).join(' - ')}</div>
    <div class="tags">${shortUsage(item)} ${tags.map(t => `#${t}`).join(' ')}</div>
  </article>`;
}

init();
