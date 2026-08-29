import './style.css';

import { starterMessage } from './greeting';

const root = document.querySelector<HTMLDivElement>('#app');

if (root === null) {
  throw new Error('App root was not found.');
}

root.innerHTML = `
  <main class="shell">
    <p class="eyebrow">GitHub-centered AI development</p>
    <h1>Web App Starter</h1>
    <p class="intro">${starterMessage('your next idea')}</p>
    <section class="card" aria-labelledby="counter-title">
      <div>
        <h2 id="counter-title">A tiny interaction</h2>
        <p>Replace this screen with a game or app, then let CI verify it.</p>
      </div>
      <button type="button" data-counter>Count: 0</button>
    </section>
  </main>
`;

const counter = root.querySelector<HTMLButtonElement>('[data-counter]');

if (counter === null) {
  throw new Error('Counter button was not found.');
}

let count = 0;
counter.addEventListener('click', () => {
  count += 1;
  counter.textContent = `Count: ${count}`;
});
