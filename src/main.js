import './style.css';
import { audiences, getCategories, getPrompt } from './prompts.js';

const app = document.querySelector('#app');
const defaultSettings = {
  readAloud: false,
  reducedAnimation: false,
  categories: {
    children: getCategories('children'),
    adults: getCategories('adults'),
  },
};

function getSettings() {
  try {
    return { ...defaultSettings, ...JSON.parse(localStorage.getItem('tekenmoment-settings')) };
  } catch {
    return defaultSettings;
  }
}

const state = {
  audience: localStorage.getItem('tekenmoment-audience') || null,
  prompt: null,
  seen: [],
  settings: getSettings(),
};

function saveSettings() {
  localStorage.setItem('tekenmoment-settings', JSON.stringify(state.settings));
  document.documentElement.classList.toggle('reduce-animation', state.settings.reducedAnimation);
}

saveSettings();

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

function focusPageHeading() {
  requestAnimationFrame(() => app.querySelector('h1')?.focus());
}

function renderHome() {
  app.innerHTML = `
    <section class="welcome" aria-labelledby="welcome-title">
      <p class="eyebrow">Een klein tekenmoment</p>
      <h1 id="welcome-title" tabindex="-1">Van kijken<br>naar tekenen.</h1>
      <p class="intro">Pak papier en een potlood. Kies een rustige tekenimpuls en geef de vorm alle tijd die zij nodig heeft.</p>
      <div class="paper-scribble" aria-hidden="true"><span></span><span></span><span></span></div>
      <button class="primary-button" type="button" data-action="choose">Begin rustig</button>
      <p class="quiet-note">Er is niets te winnen. Alleen iets om te maken.</p>
      <button class="text-button" type="button" data-action="settings">Instellingen</button>
    </section>
  `;
  focusPageHeading();
}

function renderAudienceChoice() {
  app.innerHTML = `
    <section class="page" aria-labelledby="choose-title">
      <button class="back-link" type="button" data-action="home">← Terug</button>
      <p class="eyebrow">Kies een verzameling</p>
      <h1 id="choose-title" tabindex="-1">Voor wie is dit tekenmoment?</h1>
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
  focusPageHeading();
}

function nextPrompt() {
  state.prompt = getPrompt(
    state.audience,
    state.seen,
    state.settings.categories[state.audience],
  );
  state.seen.push(state.prompt.id);
  renderPrompt();
}

function renderPrompt() {
  const { prompt } = state;
  app.innerHTML = `
    <section class="page drawing-page" aria-labelledby="prompt-title">
      <header class="round-header">
        <button class="back-link" type="button" data-action="choose">← Andere verzameling</button>
        <div class="round-tools">
          <p>${audiences[state.audience].label}</p>
          <button class="icon-button" type="button" data-action="settings" aria-label="Instellingen">⚙</button>
        </div>
      </header>
      <div class="prompt-card">
        <div class="prompt-art prompt-art--${prompt.shape}" role="img" aria-label="${prompt.description}">${icon(prompt.shape)}</div>
        <p class="eyebrow">Tekenimpuls</p>
        <h1 id="prompt-title" tabindex="-1">${prompt.title}</h1>
        <p class="invitation">${prompt.invitation}</p>
      </div>
      <div class="drawing-actions">
        <button class="secondary-button" type="button" data-action="skip">Andere impuls</button>
        ${state.settings.readAloud && 'speechSynthesis' in window ? '<button class="secondary-button" type="button" data-action="read">Lees voor</button>' : ''}
        <button class="primary-button" type="button" data-action="done">Ik ben klaar</button>
      </div>
      <p class="quiet-note">Neem de tijd die voor jou goed voelt.</p>
    </section>
  `;
  focusPageHeading();
}

function renderDone() {
  app.innerHTML = `
    <section class="welcome" aria-labelledby="done-title">
      <p class="eyebrow">Mooi zo</p>
      <div class="completion-mark" aria-hidden="true">❋</div>
      <h1 id="done-title" tabindex="-1">Je tekening<br>mag er zijn.</h1>
      <p class="intro">Leg je potlood even neer en kijk naar wat er op het papier is ontstaan.</p>
      <button class="primary-button" type="button" data-action="next">Nog een tekenimpuls</button>
      <button class="text-button" type="button" data-action="home">Voor nu afronden</button>
    </section>
  `;
  focusPageHeading();
}

function renderSettings() {
  const categories = getCategories(state.audience || 'children');
  const selectedCategories = state.settings.categories[state.audience || 'children'];
  const mode = state.audience || 'children';

  app.innerHTML = `
    <section class="page settings-page" aria-labelledby="settings-title">
      <button class="back-link" type="button" data-action="${state.prompt ? 'prompt' : 'home'}">← Terug</button>
      <p class="eyebrow">Eigen voorkeuren</p>
      <h1 id="settings-title" tabindex="-1">Instellingen</h1>
      <form class="settings-form">
        <label class="setting-row">
          <span><strong>Voorleesknop</strong><small>Lees een tekenimpuls voor wanneer je dat wilt.</small></span>
          <input type="checkbox" name="readAloud" ${state.settings.readAloud ? 'checked' : ''}>
        </label>
        <label class="setting-row">
          <span><strong>Rustige beweging</strong><small>Verminder kleine bewegingen in de vormgeving.</small></span>
          <input type="checkbox" name="reducedAnimation" ${state.settings.reducedAnimation ? 'checked' : ''}>
        </label>
        <fieldset>
          <legend>Verzamelingen voor ${audiences[mode].label.toLowerCase()}</legend>
          <p class="field-help">Kies de onderwerpen die je graag terugziet.</p>
          <div class="category-list">
            ${categories.map((category) => `
              <label class="category-option">
                <input type="checkbox" name="category" value="${category}" ${selectedCategories.includes(category) ? 'checked' : ''}>
                <span>${category}</span>
              </label>
            `).join('')}
          </div>
        </fieldset>
        <button class="primary-button" type="submit">Voorkeuren bewaren</button>
      </form>
      <button class="text-button" type="button" data-action="reset">Herstel standaardinstellingen</button>
    </section>
  `;
  focusPageHeading();
}

function readPrompt() {
  if (!state.prompt || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(`${state.prompt.title}. ${state.prompt.invitation}`);
  utterance.lang = 'nl-NL';
  window.speechSynthesis.speak(utterance);
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
    case 'prompt':
      renderPrompt();
      break;
    case 'skip':
    case 'next':
      nextPrompt();
      break;
    case 'done':
      renderDone();
      break;
    case 'settings':
      renderSettings();
      break;
    case 'read':
      readPrompt();
      break;
    case 'reset':
      state.settings = structuredClone(defaultSettings);
      saveSettings();
      renderSettings();
      break;
    default:
      break;
  }
});

app.addEventListener('submit', (event) => {
  if (!event.target.matches('.settings-form')) return;
  event.preventDefault();

  const formData = new FormData(event.target);
  const mode = state.audience || 'children';
  const selectedCategories = formData.getAll('category');

  state.settings = {
    ...state.settings,
    readAloud: formData.has('readAloud'),
    reducedAnimation: formData.has('reducedAnimation'),
    categories: {
      ...state.settings.categories,
      [mode]: selectedCategories.length ? selectedCategories : getCategories(mode),
    },
  };
  saveSettings();
  state.seen = [];
  state.prompt ? nextPrompt() : renderHome();
});

renderHome();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/service-worker.js'));
}
