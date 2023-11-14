const fullScreenable = document.querySelectorAll('.full-screenable');
const body = document.querySelector('body');

fullScreenable.forEach(item => {
  item.addEventListener('click', () => {
    const isFullScreen = item.classList.contains('full-screen');
    if (!isFullScreen) {
      item.classList.add('full-screen');
      body.style.overflow = 'hidden'; // Prevent scrolling when in full screen
    } else {
      item.classList.remove('full-screen');
      body.style.overflow = 'auto'; // Enable scrolling when exiting full screen
    }
  });
});
