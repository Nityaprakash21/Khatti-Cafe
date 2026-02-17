// premium-toggle.js
// Floating premium coffee toggle with QR popup and micro-interactions

(function () {
  // --- CONFIG ---
  const qrImgUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://khatti-cafe.vercel.app/menu.html';
  const menuLink = 'https://khatti-cafe.vercel.app/menu.html';

  // --- BUTTON ---
  const btn = document.createElement('button');
  btn.id = 'premium-coffee-toggle';
  btn.setAttribute('aria-label', 'Premium Menu');
  btn.innerHTML = '<i class="fas fa-mug-hot"></i>';
  document.body.appendChild(btn);

  // --- POPUP ---
  const popup = document.createElement('div');
  popup.id = 'premium-popup';
  popup.innerHTML = `
    <div class="popup-content">
      <span class="popup-title">Scan to View Menu</span>
      <img src="${qrImgUrl}" alt="QR Code" class="popup-qr" />
      <a href="${menuLink}" class="popup-link" target="_blank">Open Menu Link</a>
    </div>
  `;
  document.body.appendChild(popup);

  // --- CSS ---
  const style = document.createElement('style');
  style.innerHTML = `
    #premium-coffee-toggle {
      position: fixed;
      bottom: 70px;
      right: 38px;
      z-index: 10001;
      width: 56px; height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #fffbe6 0%, #ffe6e6 100%);
      /* box-shadow removed */
      border: none;
      outline: none;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 28px;
      color: #a86b1c;
      transition: box-shadow 0.2s, transform 0.18s, background 0.18s;
      will-change: transform;
      animation: popInBtn 0.7s cubic-bezier(.77,0,.18,1);
    }
    @media (max-width: 600px) {
      #premium-coffee-toggle {
        width: 50px;
        height: 50px;
        font-size: 18px;
      }
      #premium-coffee-toggle i {
        font-size: 18px;
      }
    }
    #premium-coffee-toggle:hover {
      /* box-shadow removed */
      background: linear-gradient(135deg, #fffbe6 0%, #ffe6e6 80%);
      transform: scale(1.08) rotate(-6deg);
    }
    #premium-coffee-toggle:active {
      transform: scale(0.96) rotate(2deg);
    }
    #premium-coffee-toggle i {
      transition: transform 0.35s cubic-bezier(.77,0,.18,1), color 0.25s;
      font-size: 28px;
    }
    #premium-coffee-toggle.toggled i {
      transform: rotate(180deg) scale(1.2);
      color: #d32f2f;
    }
    #premium-coffee-toggle.toggled::after {
      content: '\u2715';
      position: absolute;
      font-size: 32px;
      color: #d32f2f;
      background: #fff;
      border-radius: 50%;
      width: 36px; height: 36px;
      display: flex; align-items: center; justify-content: center;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      /* box-shadow removed */
      z-index: 2;
    }
    @keyframes popInBtn {
      0% { transform: scale(0.5) translateY(40px); opacity: 0; }
      80% { transform: scale(1.1) translateY(-6px); opacity: 1; }
      100% { transform: scale(1) translateY(0); opacity: 1; }
    }
    /* crossPop animation removed */
    #premium-popup {
      position: fixed;
      bottom: 140px;
      right: 38px;
      z-index: 10002;
      background: linear-gradient(135deg, #fff 70%, #f5e6c8 100%);
      border-radius: 18px;
      padding: 22px 18px 16px 18px;
      min-width: 220px;
      max-width: 260px;
      display: none;
      flex-direction: column;
      align-items: center;
      animation: popupIn 0.5s cubic-bezier(.77,0,.18,1);
      /* 3D effect */
      transform: perspective(900px) rotateX(8deg) scale(1.01);
      border: 1.5px solid #f3e2c0;
      box-shadow: 0 2px 24px 0 rgba(180,140,80,0.10), 0 1.5px 0 #f3e2c0 inset;
      transition: transform 0.25s cubic-bezier(.77,0,.18,1);
    }
    #premium-popup.open {
      display: flex;
      animation: popupIn 0.5s cubic-bezier(.77,0,.18,1);
      transform: perspective(900px) rotateX(0deg) scale(1.04);
    }
    @keyframes popupIn {
      0% { transform: scale(0.7) translateY(40px); opacity: 0; }
      80% { transform: scale(1.05) translateY(-6px); opacity: 1; }
      100% { transform: scale(1) translateY(0); opacity: 1; }
    }
    .popup-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    .popup-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #a86b1c;
      margin-bottom: 6px;
    }
    .popup-qr {
      width: 140px;
      height: 140px;
      border-radius: 12px;
      /* box-shadow removed */
      margin-bottom: 8px;
    }
    .popup-link {
      margin-top: 6px;
      font-size: 1rem;
      color: #027a2e;
      text-decoration: underline;
      font-weight: 500;
      transition: color 0.2s;
    }
    .popup-link:hover {
      color: #d32f2f;
    }
    @media (max-width: 600px) {
      #premium-coffee-toggle {
        right: 16px;
        bottom: 65px;
      }
      #premium-popup {
        right: 16px;
        bottom: 125px;
        min-width: 170px;
        padding: 16px 8px 12px 8px;
      }
    }
  `;
  document.head.appendChild(style);

  // --- LOGIC ---
  btn.addEventListener('click', function () {
    btn.classList.toggle('toggled');
    popup.classList.toggle('open');
    if (btn.classList.contains('toggled')) {
      btn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      btn.innerHTML = '<i class="fas fa-mug-hot"></i>';
    }
  });

  // Close popup if click outside
  document.addEventListener('mousedown', function (e) {
    if (!popup.contains(e.target) && !btn.contains(e.target)) {
      popup.classList.remove('open');
      btn.classList.remove('toggled');
      btn.innerHTML = '<i class="fas fa-mug-hot"></i>';
    }
  });
})();





