/* =========================================================
   Gallery Preview — click a thumbnail to update main image
   ========================================================= */

// ---------- DOM references ----------
const mainImage   = document.getElementById('mainImage');
const thumbnails  = document.querySelectorAll('.thumb-item');
const thumbStrip  = document.getElementById('thumbStrip');

// ---------- State ----------
let activeIndex = 0; // index of currently active thumbnail

// ---------- Preload images for snappier switching ----------
thumbnails.forEach(thumb => {
  const src = thumb.dataset.src;
  if (src) {
    const img = new Image();
    img.src = src;
  }
});

/* ---------------------------------------------------------
   Update the main preview to match a given thumbnail
   --------------------------------------------------------- */
function setActiveThumbnail(element, index) {
  // 1. Remove active class from all thumbs
  thumbnails.forEach(t => t.classList.remove('active'));

  // 2. Mark the clicked one as active
  element.classList.add('active');

  // 3. Update the active index
  activeIndex = index;

  // 4. Get high-res source
  const newSrc = element.dataset.src;
  if (!newSrc) return;

  // 5. Smooth fade transition
  mainImage.style.opacity = '0';

  // Wait for the fade-out, swap, then fade back in
  setTimeout(() => {
    mainImage.src = newSrc;

    // When the new image finishes loading, fade in
    mainImage.onload = () => {
      mainImage.style.opacity = '1';
      mainImage.onload = null; // clean up
    };

    // Fallback in case onload doesn't fire (cached images)
    if (mainImage.complete) {
      mainImage.style.opacity = '1';
    }
  }, 150);
}

/* ---------------------------------------------------------
   Attach click listeners to each thumbnail
   --------------------------------------------------------- */
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    setActiveThumbnail(thumb, index);

    // Scroll the active thumb into view (nice on mobile)
    thumb.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  });

  // Keyboard accessibility: Enter or Space activates the thumb
  thumb.setAttribute('tabindex', '0');
  thumb.setAttribute('role', 'button');

  thumb.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveThumbnail(thumb, index);
    }
  });
});

/* ---------------------------------------------------------
   Keyboard navigation: ← / → to move between thumbnails
   --------------------------------------------------------- */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

  // Ignore if user is typing in an input (future-proofing)
  const tag = document.activeElement.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;

  e.preventDefault();

  let nextIndex;
  if (e.key === 'ArrowRight') {
    nextIndex = (activeIndex + 1) % thumbnails.length;
  } else {
    nextIndex = (activeIndex - 1 + thumbnails.length) % thumbnails.length;
  }

  setActiveThumbnail(thumbnails[nextIndex], nextIndex);

  // Scroll the newly active thumb into view
  thumbnails[nextIndex].scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center'
  });
});

/* ---------------------------------------------------------
   Optional: handle image load error gracefully
   --------------------------------------------------------- */
mainImage.addEventListener('error', () => {
  console.warn('Failed to load image:', mainImage.src);
  mainImage.style.opacity = '1'; // still show something
});

/* ---------------------------------------------------------
   Optional: mouse wheel horizontal scroll on the strip
   --------------------------------------------------------- */
thumbStrip.addEventListener('wheel', (e) => {
  // Only hijack if the user is scrolling vertically over the strip
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    e.preventDefault();
    thumbStrip.scrollLeft += e.deltaY;
  }
}, { passive: false });

/* ---------------------------------------------------------
   Overlay control icons (stubs — wire these later)
   --------------------------------------------------------- */
const controlIcons = document.querySelectorAll('.control-icon');

controlIcons.forEach((icon, i) => {
  icon.addEventListener('click', () => {
    if (i === 0) {
      console.log('Screenshot / Cast icon clicked');
      // TODO: e.g. toggle fullscreen
      // document.querySelector('.main-preview').requestFullscreen();
    } else if (i === 1) {
      console.log('Picture-in-Picture icon clicked');
      // TODO: e.g. toggle PiP if there was a <video> element
    }
  });
});