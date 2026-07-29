import './style.css';
import { audiences, getPrompt } from './prompts.js';

const app = document.querySelector('#app');
const state = {
  audience: localStorage.getItem('tekenmoment-audience') || null,
  prompt: null,
  seen: [],
};

function icon(shape) {
  const icons = {
    apple: '●',
    sun: '☼',
    snail: '〰',
    leaf: '❧',
    tree: '♧',
    shell: '◌',
    vase: '⌇',
    hills: '⌒',
  };

  return `<span class="prompt-symbol prompt-symbol--${shape}" aria-hidden="true">${icons[shape]}</span>`;
}

function renderHome() {
  app.innerHTML = `
    <section class="welcome" aria-labelledby="welcome-title">
      <p class="eyebrow">Een klein tekenmoment</p>
      <h1 id="welcome-title">Van kijken<br>naar tekenen.</h1>
      <p class="intro">Pak papier en een potlood. Kies een rustige tekenimpuls en geef de vorm alle tijd die zij nodig heeft.</p>
      <div class="paper-scribble" aria-hidden="true"><span></span><span></span><span></span></div>
      <button class="primary-button" type="button" data-action="choose">Begin rustig</button>
      <p class="quiet-note">Er is niets te winnen. Alleen iets om te maken.</p>
    </section>
  `;
}

function renderAudienceChoice() {
  app.innerHTML = `
    <section class="page" aria-labelledby="choose-title">
      <button class="back-link" type="button" data-action="home">← Terug</button>
      <p class="eyebrow">Kies een verzameling</p>
      <h1 id="choose-title">Voor wie is dit tekenmoment?</h1>
      <div class="audience-grid">
        ${Object.entries(audiences).map(([key, audience]) => `
          <button class="audience-card audience-card--${key}" type="button" data-audience="${key}">
            <span class="card-mark" aria-hidden="true">${key === 'children' ? '✦' : '◒'}</span>
            <span class="eyebrow">${audience.eyebrow}</span>
            <strong>${audience.label}</strong>
            <span>${audience.description}</span>
            <span class="card-arrow" aria-hidden="true">→</span>
          </button>
        `).join('')}
      </div>
    </section>
  `;
}

function nextPrompt() {
  state.prompt = getPrompt(state.audience, state.seen);
  state.seen.push(state.prompt.id);
  renderPrompt();
}

function renderPrompt() {
  const { prompt } = state;
  app.innerHTML = `
    <section class="page drawing-page" aria-labelledby="prompt-title">
      <header class="round-header">
        <button class="back-link" type="button" data-action="choose">← Andere verzameling</button>
        <p>${audiences[state.audience].label}</p>
      </header>
      <div class="prompt-card">
        <div class="prompt-art prompt-art--${prompt.shape}">${icon(prompt.shape)}</div>
        <p class="eyebrow">Tekenimpuls</p>
        <h1 id="prompt-title">${prompt.title}</h1>
        <p class="invitation">${prompt.invitation}</p>
      </div>
      <div class="drawing-actions">
        <button class="secondary-button" type="button" data-action="skip">Andere impuls</button>
        <button class="primary-button" type="button" data-action="done">Ik ben klaar</button>
      </div>
      <p class="quiet-note">Neem de tijd die voor jou goed voelt.</p>
    </section>
  `;
}

function renderDone() {
  app.innerHTML = `
    <section class="welcome" aria-labelledby="done-title">
      <p class="eyebrow">Mooi zo</p>
      <div class="completion-mark" aria-hidden="true">❋</div>
      <h1 id="done-title">Je tekening<br>mag er zijn.</h1>
      <p class="intro">Leg je potlood even neer en kijk naar wat er op het papier is ontstaan.</p>
      <button class="primary-button" type="button" data-action="next">Nog een tekenimpuls</button>
      <button class="text-button" type="button" data-action="home">Voor nu afronden</button>
    </section>
  `;
}

app.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  if (button.dataset.audience) {
    state.audience = button.dataset.audience;
    state.seen = [];
    localStorage.setItem('tekenmoment-audience', state.audience);
    nextPrompt();
    return;
  }

  switch (button.dataset.action) {
    case 'choose':
      renderAudienceChoice();
      break;
    case 'home':
      renderHome();
      break;
    case 'skip':
    case 'next':
      nextPrompt();
      break;
    case 'done':
      renderDone();
      break;
    default:
      break;
  }
});

renderHome();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/service-worker.js'));
}
