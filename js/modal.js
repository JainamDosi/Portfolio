import { setGamePaused } from './game.js';

export function setupModal() {
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const portfolioModal = document.getElementById('portfolio-modal');
    modalCloseBtn.addEventListener('click', () => {
        portfolioModal.classList.add('hidden');
        setGamePaused(false);
    });
}

export function openSectionModal(sectionId, sectionContent) {
    const portfolioModal = document.getElementById('portfolio-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    setGamePaused(true);
    const content = sectionContent[sectionId];
    modalTitle.textContent = content.title;
    modalBody.innerHTML = content.body;
    portfolioModal.classList.remove('hidden');
}