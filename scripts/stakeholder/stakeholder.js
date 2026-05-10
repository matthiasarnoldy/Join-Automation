/**
 * Initialize arrow back button to navigate back in history
 */
function initArrowBack() {
    const arrowBack = document.querySelector('.stakeholder__arrowBack');
    if (arrowBack) {
        arrowBack.addEventListener('click', () => {
            window.history.back();
        });
    }
}

/**
 * Initialize stakeholder page on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
    initArrowBack();
});
