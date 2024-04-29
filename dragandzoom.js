document.addEventListener('DOMContentLoaded', function() {
    var svg = document.getElementById('container');
    var isDragging = false;
    var lastX = 0;
    var lastY = 0;
    var currentZoom = 1;  // Track the current zoom level
    var zoomFactor = 1.1;  // Defines how much to zoom on each button click or scroll
  
    svg.addEventListener('mousedown', function(e) {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      svg.style.cursor = 'grabbing';
    });
  
    window.addEventListener('mousemove', function(e) {
      if (isDragging) {
        var deltaX = (e.clientX - lastX) / currentZoom;
        var deltaY = (e.clientY - lastY) / currentZoom;
        updateViewBox(deltaX, deltaY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    });
  
    window.addEventListener('mouseup', function(e) {
      isDragging = false;
      svg.style.cursor = 'grab';
    });
  
    svg.addEventListener('wheel', function(e) {
      e.preventDefault();  // Prevent the page from scrolling
      var direction = e.deltaY > 0 ? 1 : -1;
      adjustZoom(direction);
    });
  
    let zoomInButton = document.getElementById('zoom-in-btn');
    let zoomOutButton = document.getElementById('zoom-out-btn');
    zoomInButton.addEventListener('click', function() {
        adjustZoom(-1); // Zoom in
    });
  
    zoomOutButton.addEventListener('click', function() {
        adjustZoom(1); // Zoom out
    });

    function adjustZoom(direction) {
      var viewBox = svg.getAttribute('viewBox').split(' ').map(Number);
      var width = viewBox[2];
      var height = viewBox[3];
      var newWidth = width * Math.pow(zoomFactor, direction);
      var newHeight = height * Math.pow(zoomFactor, direction);
  
      // Calculate new x and y to keep the zoom centered
      viewBox[0] += (width - newWidth) / 2;
      viewBox[1] += (height - newHeight) / 2;
      viewBox[2] = newWidth;
      viewBox[3] = newHeight;
  
      currentZoom *= Math.pow(zoomFactor, -direction);
      svg.setAttribute('viewBox', viewBox.join(' '));
    }
  
    function updateViewBox(deltaX, deltaY) {
      var viewBox = svg.getAttribute('viewBox').split(' ').map(Number);
      viewBox[0] -= deltaX;
      viewBox[1] -= deltaY;
      svg.setAttribute('viewBox', viewBox.join(' '));
    }
  });
  