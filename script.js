window.onload = () => {
    console.log('Calling script.js');
    
    // Close person card when clicking the card's "X" button inside of relationship modal
    $('.card-btn-close').on('click', function() {
        const personCard = $(this).closest('.card');
        personCard.hide();
    });

    // Render all person cards when opening a relationship modal
    // Even when the cards were closed previously
    $('.relationship-modal').on('show.bs.modal', function() {
        $(this).find('.card').show();
    })
};