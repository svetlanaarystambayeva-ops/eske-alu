
(() => {
  const audio = document.getElementById('audio');
  const toast = document.getElementById('audioToast');
  const enableBtn = document.getElementById('enableAudio');

  const tryPlay = async () => {
    if (!audio) return;
    audio.volume = 1.0;
    try {
      const p = audio.play();
      if (p && typeof p.then === 'function') {
        await p;
      }
      // playing ok
      toast.style.display = 'none';
    } catch (e) {
      // Autoplay blocked on many phones. Show one-tap enable.
      toast.style.display = 'flex';
    }
  };

  // Try immediately and again after first user interaction
  window.addEventListener('load', () => { tryPlay(); }, { once: true });
  const unlock = () => { tryPlay(); window.removeEventListener('touchstart', unlock); window.removeEventListener('click', unlock); };
  window.addEventListener('touchstart', unlock, { once: true, passive: true });
  window.addEventListener('click', unlock, { once: true });

  enableBtn?.addEventListener('click', () => tryPlay());

  // Prevent iOS from stopping audio on silent mode hint is not possible; leave as is.
})();
