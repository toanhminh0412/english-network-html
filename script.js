window.onload = () => {
    console.log('Calling script.js');
    
    // Close card when clicking the card's "X" button inside of relationship modal
    $('.card-btn-close').on('click', function() {
        console.log('Clicked on close btn');
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

    // Zoom in to the graph
    let minX = 0;
    let minY = 0;
    let width = 1500;
    let height = 500;
    let widthStep = 100;        // Amount of width change when zoom in/out
    let heightStep = 7/10 * widthStep;       // Amount of height change when zoom in/out
    $('#zoom-in-btn').on('click', function() {
        // Prevent zooming in too much
        if (width === 900) {
            return;
        }
        width -= widthStep;
        height -= heightStep;
        minX += widthStep / 2;
        minY += heightStep / 2;
        document.getElementById('container').setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`);
    });

    $('#zoom-out-btn').on('click', function() {
        // Prevent zooming out too much
        if (width === 2000) {
            return;
        }
        width += widthStep;
        height += heightStep;
        minX -= widthStep / 2;
        minY -= heightStep / 2;
        document.getElementById('container').setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`);
    });
};