const fullScreenable = document.querySelectorAll('.full-screenable');
const body = document.querySelector('body');

function toggleFullScreen(item) {
  const isFullScreen = item.classList.contains('full-screen');
  if (!isFullScreen) {
    item.classList.add('full-screen');
    body.style.overflow = 'hidden'; // Prevent scrolling when in full screen
    fitImageToScreen(item.querySelector('img'));
  } else {
    item.classList.remove('full-screen');
    body.style.overflow = 'auto'; // Enable scrolling when exiting full screen
    resetImageSize(item.querySelector('img'));
  }
}

function fitImageToScreen(img) {
  const maxWidth = window.innerWidth * 0.9; // Adjust this value as needed
  const maxHeight = window.innerHeight * 0.9; // Adjust this value as needed

  const widthRatio = maxWidth / img.naturalWidth;
  const heightRatio = maxHeight / img.naturalHeight;

  const minRatio = Math.min(widthRatio, heightRatio);
  const newWidth = img.naturalWidth * minRatio;
  const newHeight = img.naturalHeight * minRatio;

  img.style.width = `${newWidth}px`;
  img.style.height = `${newHeight}px`;
}

function resetImageSize(img) {
  img.style.width = 'auto';
  img.style.height = 'auto';
}

fullScreenable.forEach(item => {
  item.addEventListener('click', () => {
    toggleFullScreen(item);
  });
});
