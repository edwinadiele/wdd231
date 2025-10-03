// modal.js

/**
 * Open a <dialog> modal element
 * @param {HTMLDialogElement} dialogEl
 */
export function openModal(dialogEl) {
  if (!dialogEl) return;

  // Use native dialog if supported
  if (typeof dialogEl.showModal === 'function') {
    dialogEl.showModal();
  } else {
    // Fallback for browsers without <dialog> support
    dialogEl.setAttribute('open', '');
  }

  // Prevent background scrolling when modal is open
  document.body.style.overflow = 'hidden';
}

/**
 * Close a <dialog> modal element
 * @param {HTMLDialogElement} dialogEl
 */
export function closeModal(dialogEl) {
  if (!dialogEl) return;

  // Use native dialog if supported
  if (typeof dialogEl.close === 'function') {
    dialogEl.close();
  } else {
    dialogEl.removeAttribute('open');
  }

  // Restore background scroll
  document.body.style.overflow = '';
}
