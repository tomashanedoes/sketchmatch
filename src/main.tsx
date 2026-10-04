import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './styles.css';

const root = document.querySelector('#app');

if (!root) {
  throw new Error('Root element #app not found');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

async function refreshServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  const keys = await caches.keys();
  await Promise.all(keys.map((key) => caches.delete(key)));

  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((registration) => registration.unregister()));

  const swUrl = `${import.meta.env.BASE_URL}service-worker.js`;
  await navigator.serviceWorker.register(swUrl, {
    updateViaCache: 'none',
    scope: import.meta.env.BASE_URL,
  });
}

window.addEventListener('load', () => {
  void refreshServiceWorker();
});
