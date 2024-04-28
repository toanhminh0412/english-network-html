document.addEventListener('DOMContentLoaded', function() {
    let svg = document.getElementById('container');
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let currentZoom = 1;  // Keep track of the current zoom level
  
    svg.addEventListener('mousedown', function(e) {
        isDragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        svg.style.cursor = 'grabbing';
    });
  
    window.addEventListener('mousemove', function(e) {
        if (isDragging) {
            let deltaX = (e.clientX - lastX) / currentZoom;  // Adjust for zoom
            let deltaY = (e.clientY - lastY) / currentZoom;  // Adjust for zoom
            let viewBox = svg.getAttribute('viewBox').split(' ').map(Number);
    
            viewBox[0] -= deltaX;
            viewBox[1] -= deltaY;
    
            svg.setAttribute('viewBox', viewBox.join(' '));
    
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });
  
    window.addEventListener('mouseup', function(e) {
        isDragging = false;
        svg.style.cursor = 'grab';
    });
  
    let zoomInButton = document.getElementById('zoom-in-btn');
    let zoomOutButton = document.getElementById('zoom-out-btn');
    let zoomFactor = 1.1;  // Defines how much to zoom on each button click
  
    zoomInButton.addEventListener('click', function() {
        adjustZoom(-1); // Zoom in
    });
  
    zoomOutButton.addEventListener('click', function() {
        adjustZoom(1); // Zoom out
    });
  
    function adjustZoom(direction) {
        let viewBox = svg.getAttribute('viewBox').split(' ').map(Number);
        let width = viewBox[2];
        let height = viewBox[3];
        let newWidth = width * Math.pow(zoomFactor, direction);
        let newHeight = height * Math.pow(zoomFactor, direction);
        
        // Calculate new x and y to keep the zoom centered
        viewBox[0] += (width - newWidth) / 2;
        viewBox[1] += (height - newHeight) / 2;
        viewBox[2] = newWidth;
        viewBox[3] = newHeight;
    
        currentZoom *= Math.pow(zoomFactor, -direction);  // Update the current zoom level
    
        svg.setAttribute('viewBox', viewBox.join(' '));
    }
});
  