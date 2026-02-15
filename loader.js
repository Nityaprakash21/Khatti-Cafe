// loader.js
// Premium animated loader using Framer Motion and micro-interactions

// Dynamically injects the loader HTML and CSS, animates using Framer Motion
(function () {
    // Loader HTML
    const loader = document.createElement('div');
    loader.id = 'premium-loader';
    loader.innerHTML = `
      <div class="loader-logo-wrapper">
        <img src="loader.png" alt="Loading..." class="loader-logo" />
      </div>
      <div class="loader-bar-bg">
        <div class="loader-bar"></div>
      </div>
    `;
    document.body.appendChild(loader);

    // Loader CSS
    const style = document.createElement('style');
    style.innerHTML = `
      #premium-loader {
        position: fixed;
        z-index: 10000;
        top: 0; left: 0; right: 0; bottom: 0;
        width: 100vw; height: 100vh;
        background: linear-gradient(135deg, #fff 0%, #e6ffe6 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: opacity 0.7s cubic-bezier(.77,0,.18,1);
        opacity: 1;
        pointer-events: all;
      }
      .loader-logo-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 40px;
        width: 340px;
        height: 180px;
      }
      .loader-logo {
        width: 260px;
        height: 120px;
        object-fit: contain;
        filter: drop-shadow(0 8px 32px rgba(37,211,102,0.18));
        animation: logoScaleUp 1.2s cubic-bezier(.77,0,.18,1) forwards;
      }
      @keyframes logoScaleUp {
        0% { transform: scale(0.5); opacity: 0.2; }
        60% { transform: scale(1.15); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      .loader-bar-bg {
        width: 260px;
        height: 10px;
        background: #e0e0e0;
        border-radius: 6px;
        overflow: hidden;
        box-shadow: 0 2px 12px rgba(37,211,102,0.10);
      }
      .loader-bar {
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, #27df02 0%, #027a2e 100%);
        border-radius: 6px;
        animation: loadingBarAnim 1.4s cubic-bezier(.77,0,.18,1) forwards;
      }
      @keyframes loadingBarAnim {
        0% { width: 0%; }
        80% { width: 92%; }
        100% { width: 100%; }
      }
    `;
    document.head.appendChild(style);

    // Hide loader on page load
    window.addEventListener('load', function () {
      setTimeout(function () {
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        setTimeout(function () {
          loader.remove();
          style.remove();
        }, 800);
      }, 1200); // Show loader for at least 1.2s for animation
    });
})();
