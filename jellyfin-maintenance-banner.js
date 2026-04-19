(function () {
    "use strict";

    const CONFIG = {
        message: "⚠️ Server maintenance scheduled in a few minutes.",
        subMessage: "Temporary outages may occur.",
        show: true, // set false to deactivate
        duration: 0 // 0 = it doesn't close on its own
    };

    if (!CONFIG.show) return;

    function injectCSS() {
        if (document.getElementById("maintenance-banner-css")) return;

        const style = document.createElement("style");
        style.id = "maintenance-banner-css";

        style.textContent = `
        .mf-banner {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translate(-50%, -120%);
            width: min(520px, 92vw);
            background: rgba(20,20,20,0.92);
            backdrop-filter: blur(14px);
            color: white;
            border-radius: 14px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.45);
            padding: 14px 16px;
            z-index: 999999;
            display: flex;
            flex-direction: column;
            gap: 6px;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            transition: transform 0.5s ease, opacity 0.5s ease;
            opacity: 0;
        }

        .mf-banner.show {
            transform: translate(-50%, 0);
            opacity: 1;
        }

        .mf-title {
            font-size: 14px;
            font-weight: 600;
        }

        .mf-sub {
            font-size: 12px;
            opacity: 0.75;
        }

        .mf-close {
            position: absolute;
            top: 8px;
            right: 10px;
            cursor: pointer;
            font-size: 14px;
            opacity: 0.7;
        }

        .mf-close:hover {
            opacity: 1;
        }
        `;

        document.head.appendChild(style);
    }

    function createBanner() {
        const banner = document.createElement("div");
        banner.className = "mf-banner";

        banner.innerHTML = `
            <div class="mf-close">✕</div>
            <div class="mf-title">${CONFIG.message}</div>
            <div class="mf-sub">${CONFIG.subMessage}</div>
        `;

        document.body.appendChild(banner);

        const closeBtn = banner.querySelector(".mf-close");

        function close() {
            banner.classList.remove("show");
            setTimeout(() => banner.remove(), 500);
        }

        closeBtn.onclick = close;

        if (CONFIG.duration > 0) {
            setTimeout(close, CONFIG.duration);
        }

        requestAnimationFrame(() => {
            banner.classList.add("show");
        });
    }

    injectCSS();
    setTimeout(createBanner, 800);
})();
