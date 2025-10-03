
// import { openModal, closeModal } from './modal.js';

// export function initTips() {
//   const grid = document.getElementById('tipsGrid');
//   const selCategory = document.getElementById('category');
//   const selDifficulty = document.getElementById('difficulty');
//   const modal = document.getElementById('tipModal');
//   const modalBody = document.getElementById('modalBody');

//   let allTips = [];

//   async function load() {
//     try {
//       const res = await fetch('data/tips.json');
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       allTips = await res.json();
//       render();
//     } catch (err) {
//       grid.innerHTML = `<p class="card pad">Failed to load tips. <code>${String(err)}</code></p>`;
//       console.error(err);
//     }
//   }

//   function filterTips() {
//     const cat = selCategory.value;
//     const diff = selDifficulty.value;
//     return allTips.filter(t =>
//       (cat === 'all' || t.category === cat) &&
//       (diff === 'all' || t.difficulty === diff)
//     );
//   }

//   function cardTemplate(tip) {
//     return `
//       <article class="card" data-id="${tip.id}">
//         <img src="${tip.image}" alt="${tip.title}" loading="lazy" width="400" height="240">
//         <div class="pad">
//           <h3>${tip.title}</h3>
//           <div class="meta">
//             <span>Category: ${tip.category}</span>
//             <span>Difficulty: ${tip.difficulty}</span>
//             <span>Time: ${tip.time}</span>
//           </div>
//           <p>${tip.summary}</p>
//           <button class="button" data-view>View details</button>
//         </div>
//       </article>
//     `;
//   }

//   function render() {
//     const list = filterTips();
//     if (!list.length) {
//       grid.innerHTML = `<p class="card pad">No tips match your filters.</p>`;
//       return;
//     }
//     grid.innerHTML = list.map(cardTemplate).join('');
//   }

//   grid.addEventListener('click', (e) => {
//     const btn = e.target.closest('[data-view]');
//     if (!btn) return;
//     const card = btn.closest('[data-id]');
//     const id = Number(card.dataset.id);
//     const tip = allTips.find(t => t.id === id);
//     if (!tip) return;

//     modalBody.innerHTML = `
//       <h2>${tip.title}</h2>
//       <p><em>${tip.category} • ${tip.difficulty} • ${tip.time}</em></p>
//       <p>${tip.description}</p>
//     `;
//     openModal(modal);
//   });

//   modal.addEventListener('click', (e) => {
//     if (e.target.hasAttribute('data-close') || e.target === modal) {
//       closeModal(modal);
//     }
//   });

//   selCategory.addEventListener('change', render);
//   selDifficulty.addEventListener('change', render);

//   load();
// }


// tips.js
import { openModal, closeModal } from './modal.js';

export function initTips() {
  const grid = document.getElementById('tipsGrid');
  const selCategory = document.getElementById('category');
  const selDifficulty = document.getElementById('difficulty');
  const modal = document.getElementById('tipModal');
  const modalBody = document.getElementById('modalBody');

  let allTips = [];

  // Load tips from local JSON file
  async function load() {
    try {
      const res = await fetch('data/tips.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      allTips = await res.json();
      render();
    } catch (err) {
      grid.innerHTML = `
        <p class="card pad">
          Failed to load tips. <code>${String(err)}</code>
        </p>`;
      console.error('Error loading tips:', err);
    }
  }

  // Apply filters
  function filterTips() {
    const cat = selCategory.value;
    const diff = selDifficulty.value;
    return allTips.filter(t =>
      (cat === 'all' || t.category === cat) &&
      (diff === 'all' || t.difficulty === diff)
    );
  }

  // Template for each tip card
  function cardTemplate(tip) {
    return `
      <article class="card" data-id="${tip.id}">
        <img src="${tip.image}" alt="${tip.title}" loading="lazy" width="400" height="240">
        <div class="pad">
          <h3>${tip.title}</h3>
          <div class="meta">
            <span>Category: ${tip.category}</span>
            <span>Difficulty: ${tip.difficulty}</span>
            <span>Time: ${tip.time}</span>
          </div>
          <p>${tip.summary}</p>
          <button class="button" data-view>View details</button>
        </div>
      </article>
    `;
  }

  // Render filtered tips into the grid
  function render() {
    const list = filterTips();
    if (!list.length) {
      grid.innerHTML = `<p class="card pad">No tips match your filters.</p>`;
      return;
    }
    grid.innerHTML = list.map(cardTemplate).join('');
  }

  // Handle clicks on "View details"
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-view]');
    if (!btn) return;

    const card = btn.closest('[data-id]');
    const id = Number(card.dataset.id);
    const tip = allTips.find(t => t.id === id);
    if (!tip) return;

    modalBody.innerHTML = `
      <h2>${tip.title}</h2>
      <p><em>${tip.category} • ${tip.difficulty} • ${tip.time}</em></p>
      <p>${tip.description}</p>
    `;
    openModal(modal);
  });

  // Handle modal close button & backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-close') || e.target === modal) {
      closeModal(modal);
    }
  });

  // Listen to filter changes
  selCategory.addEventListener('change', render);
  selDifficulty.addEventListener('change', render);

  // Load tips on init
  load();
}
