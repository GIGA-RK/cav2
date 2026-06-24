import { NOTES, QUALITIES, FORM_TEMPLATES } from './chord-data.js';
import { getForms } from './chord-engine.js';
import { renderDiagram } from './renderer.js';

const $ = id => document.getElementById(id);
const rootSelect = $('rootSelect');
const qualitySelect = $('qualitySelect');
const sortSelect = $('sortSelect');
const difficultySelect = $('difficultySelect');
const jazzOnly = $('jazzOnly');
const rootlessOk = $('rootlessOk');
const resultGrid = $('resultGrid');

rootSelect.innerHTML = NOTES.map(n => `<option>${n}</option>`).join('');
qualitySelect.innerHTML = QUALITIES.map(q => `<option value="${q.key}">${q.label}</option>`).join('');
qualitySelect.value = 'maj7';

function renderStats(){
  const byQuality = new Map();
  FORM_TEMPLATES.forEach(f => byQuality.set(f.quality, (byQuality.get(f.quality) || 0) + 1));
  $('stats').innerHTML = `
    <div><strong>${FORM_TEMPLATES.length}</strong><span>templates</span></div>
    <div><strong>${byQuality.size}</strong><span>qualities</span></div>
    <div><strong>${FORM_TEMPLATES.filter(f => f.tags.includes('jazz')).length}</strong><span>jazz</span></div>
  `;
}

function render(){
  const forms = getForms({
    root: rootSelect.value,
    quality: qualitySelect.value,
    sort: sortSelect.value,
    maxDifficulty: difficultySelect.value,
    jazzOnly: jazzOnly.checked,
    rootlessOk: rootlessOk.checked
  });
  $('resultTitle').textContent = `${rootSelect.value}${QUALITIES.find(q => q.key === qualitySelect.value).suffix}`;
  $('resultMeta').textContent = `${forms.length}件 / ${sortSelect.options[sortSelect.selectedIndex].textContent}順`;
  resultGrid.innerHTML = forms.map(form => `
    <article class="card">
      <div class="card-top">
        <div>
          <h3>${form.displayName}</h3>
          <p>${form.name}</p>
        </div>
        <strong class="score">${form.score}</strong>
      </div>
      <div class="diagram">${renderDiagram(form.frets)}</div>
      <div class="badges">
        <span>難易度 ${form.difficulty}</span>
        <span>人気 ${form.popularity}</span>
        <span>Jazz ${form.jazzUse}</span>
        <span>${form.rootless ? 'Rootless' : 'Rootあり'}</span>
      </div>
      <p class="frets">${form.frets.map(f => f === null ? 'x' : f).join(' - ')}</p>
      <p class="tags">${form.tags.map(t => `#${t}`).join(' ')}</p>
    </article>
  `).join('') || `<div class="empty">条件に合うフォームがありません。</div>`;
}

[rootSelect, qualitySelect, sortSelect, difficultySelect, jazzOnly, rootlessOk].forEach(el => el.addEventListener('change', render));
renderStats();
render();
