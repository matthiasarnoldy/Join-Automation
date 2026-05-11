/**
 * Initialize arrow back button to navigate back in history
 */
function initArrowBack() {
    const arrowBackElements = document.querySelectorAll('.stakeholder__arrowBack');
    arrowBackElements.forEach((arrowBack) => {
        arrowBack.addEventListener('click', () => {
            window.history.back();
        });
    });
}

/**
 * Fetches today's request count and limit from Firebase and updates the UI.
 */
async function loadRequestCounter() {
    const [countSpan, limitSpan] = document.querySelectorAll('.stakeholder__request--number');
    try {
        const dayKey = getBerlinDayKey();
        const url = getRequestLimitDayUrl(dayKey);
        const response = await fetch(url);
        if (!response.ok) return;
        const data = await response.json();
        if (!data) return;
        const count = data.count ?? 0;
        const limit = data.limit ?? 10;
        if (countSpan) countSpan.textContent = count;
        if (limitSpan) limitSpan.textContent = limit;
        const requestText = document.querySelector('.stakeholder__request--text');
        if (count >= limit) {
            if (requestText) requestText.style.color = '#FF3D00';
            const images = document.querySelectorAll('.stakeholder__info--img');
            images.forEach((img) => {
                img.src = img.src.replace('stakeholderImg', 'stakeholderImgLimit');
            });
            const headline = document.querySelector('.stakeholder__info--headline');
            const limitHeadline = document.querySelector('.stakeholder__limit--headline');
            if (headline) headline.style.display = 'none';
            if (limitHeadline) limitHeadline.style.display = '';
            const defaultBtn = document.getElementById('stakeholder__button--default');
            const limitBtn = document.getElementById('stakeholder__button--limit');
            if (defaultBtn) defaultBtn.style.display = 'none';
            if (limitBtn) limitBtn.style.display = 'flex';
            const texts = document.querySelectorAll('.stakeholder__info--text');
            if (texts[0]) texts[0].remove();
            if (texts[1]) texts[1].textContent = 'Need more? No worries — you can still send emails, but our team will review them manually instead of using AI to create tickets.';
        }
    } catch (e) {}
}

/**
 * Initialize stakeholder page on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
    initArrowBack();
    loadRequestCounter();
});
