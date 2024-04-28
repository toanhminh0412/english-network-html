window.onload = () => {
    // Close card when clicking the card's "X" button inside of relationship modal
    $('.card-btn-close').on('click', function() {
        const card = $(this).closest('.card');
        card.hide();
    });

    // Render all cards when opening a relationship modal
    // Even when the cards were closed previously
    $('.relationship-modal').on('show.bs.modal', function() {
        $(this).find('.card').show();
    })

    // Show the corresponding comment card when aletter is opened in relationship modals
    $(".letter-open-button").on('click', function() {
        const comment = $(this).data('comment');
        $(this).closest('.modal-body').find('.letter-comment').attr("src", comment);
    });
};