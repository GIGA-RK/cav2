import { NOTE_NAMES, FAMILIES, USAGES, LEVELS, CHORD_LIBRARY } from './chord-data.js';
import { getAvailableQualities, findChordForms, chordName } from './chord-engine.js';
import { renderDiagram } from './renderer.js';

const $ = id => document.getElementById(id);
const sortOptions = [
  ['recommended','おすすめ'], ['difficulty','難易度が低い'], ['popularity','使用頻度'], ['jazz','Jazz適性'], ['family','Family順']
];

function option(value, label=value){ return `<option value="${value}">${label}</option>`; }

function init(){
  $('rootSelect').innerHTML = NOTE_NAMES.map(n => option(n)).join('');
  $('qualitySelect').innerHTML = getAvailableQualities().map(q => option(q.key, q.label)).join('');
  $('sortSelect').innerHTML = sortOptions.map(([v,l]) => option(v,l)).join('');
  $('difficultySelect').innerHTML = [1,2,3,4,5].map(n => option(n, `${n}以下`)).join('');
  $('difficultySelect').value = '3';
  $('familySelect').innerHTML = FAMILIES.map(f => option(f, f === 'all' ? 'すべて' : f)).join('');
  $('usageSelect').innerHTML = USAGES.map(u => option(u, u === 'all' ? 'すべて' : u)).join('');
  $('levelSelect').innerHTML = LEVELS.map(l => option(l, l === 'all' ? 'すべて' : `Level ${l}`)).join('');

  $('templateCount').textContent = CHORD_LIBRARY.length;
  $('qualityCount').textContent = new Set(CHORD_LIBRARY.map(x => x.quality)).size;
  $('jazzCount').textContent = CHORD_LIBRARY.filter(x => x.jazz >= 80).length;

  document.querySelectorAll('select,input').forEach(el => el.addEventListener('change', render));
  render();
}

function render(){
  const rootPc = NOTE_NAMES.indexOf($('rootSelect').value);
  const qualityKey = $('qualitySelect').value;
  const params = {
    rootPc,
    qualityKey,
    sortMode: $('sortSelect').value,
    maxDifficulty: Number($('difficultySelect').value),
    family: $('familySelect').value,
    usage: $('usageSelect').value,
    level: $('levelSelect').value,
    jazzOnly: $('jazzOnly').checked,
    allowRootless: $('allowRootless').checked
  };
  const rows = findChordForms(params);
  $('currentChord').textContent = chordName(rootPc, qualityKey);
  $('resultMeta').textContent = `${rows.length}件 / ${$('sortSelect').selectedOptions[0].textContent}順`;
  $('cards').innerHTML = rows.length ? rows.map(cardHtml).join('') : `<div class="empty">条件に合うフォームがありません。Difficulty や Family / Usage を緩めてください。</div>`;
}

function cardHtml(item){
  const tags = [...new Set([item.family, ...item.usage, ...(item.tags || [])])];
  return `<article class="card">
    <div class="score">${item.score}</div>
    <h3>${item.displayName}</h3>
    <p class="subtitle">${item.name}</p>
    <div class="diagram">${renderDiagram(item.frets)}</div>
    <div class="pills">
      <span class="pill">難易度 ${item.difficulty}</span>
      <span class="pill">人気 ${item.popularity}</span>
      <span class="pill">Jazz ${item.jazz}</span>
      <span class="pill">${item.rootless ? 'Rootless' : 'Rootあり'}</span>
      <span class="pill">Family: ${item.family}</span>
      <span class="pill">Level ${item.level ?? 2}</span>
    </div>
    <div class="frets">${item.frets.map(f => f === null ? 'x' : f).join(' - ')}</div>
    <div class="tags">${tags.map(t => `#${t}`).join(' ')}</div>
  </article>`;
}

init();
