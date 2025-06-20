// ==UserScript==
// @name            YT Disable AI Translation
// @version         0.1.7
// @description     Overrides automatic use of generated, translated audiotracks on YouTube videos. Resets to original audio.
// @author          MK2112 (https://github.com/MK2112)
// @namespace       https://github.com/MK2112/yt_disable_ai_translation
// @supportURL      https://github.com/MK2112/yt_disable_ai_translation/issues
// @license         MIT
// @match           *://www.youtube.com/*
// @match           *://www.youtube-nocookie.com/*
// @match           *://m.youtube.com/*
// @match           *://music.youtube.com/*
// @grant           none
// @run-at          document-start
// @compatible      firefox
// @compatible      edge
// @compatible      safari
// ==/UserScript==

(function() {
    'use strict';

    function redirectToDesktop() {
        // Check if we're on m.youtube.com / in a mobile setting
        const isMobile = window.location.hostname === 'm.youtube.com' ||
                                (window.location.hostname === 'www.youtube.com' &&
                                (document.documentElement.classList.contains('mobile')));
        // Look whether desktop param already in URL
        const hasDesktopParam = window.location.search.includes('app=desktop');
        if (isMobile && !hasDesktopParam) {
            // Appending desktop parameter for new URL
            let newUrl = window.location.href;
            if (newUrl.includes('?')) {
                newUrl += '&app=desktop';
            } else {
                newUrl += '?app=desktop';
            }
            // Redirect to desktop version
            console.log('Redirecting to desktop version of YouTube...');
            window.location.href = newUrl;
            return true; // redirect
        }
        return false; // no redirect needed
    }

    // Wait for an element to appear in the DOM
    function waitForElement(selector, timeout = 10000) {
        return new Promise((resolve, reject) => {
            const checkAndObserve = () => {
                const element = document.querySelector(selector);
                if (element) return resolve(element);

                const targetNode = document.body;
                if (!targetNode) {
                    return setTimeout(checkAndObserve, 50);
                }

                const observer = new MutationObserver((mutations, obs) => {
                    const target = document.querySelector(selector);
                    if (target) {
                        obs.disconnect();
                        resolve(target);
                    }
                });

                observer.observe(targetNode, { childList: true, subtree: true });

                setTimeout(() => {
                    observer.disconnect();
                    reject(new Error(`Timeout: Element ${selector} not found within ${timeout}ms`));
                }, timeout);
            };
            checkAndObserve();
        });
    }


    // Wait until no ad shown
    function waitForNoAds(timeout = 10000) {
        return new Promise((resolve, reject) => {
            // Helper to safely resolve/reject only once
            let settled = false;
            const safeResolve = (...args) => { if (!settled) { settled = true; resolve(...args); } };
            const safeReject = (...args) => { if (!settled) { settled = true; reject(...args); } };

            // Helper to find the player, waiting if necessary
            function getPlayer(attempts = 20) {
                let player = document.querySelector('.html5-video-player');
                if (player) return Promise.resolve(player);
                if (attempts <= 0) return Promise.reject(new Error('Player not found'));
                return new Promise(res => setTimeout(res, 250)).then(() => getPlayer(attempts - 1));
            }

            getPlayer().then(player => {
                if (!player.classList.contains('ad-showing')) return safeResolve();

                const observer = new MutationObserver(() => {
                    if (!player.classList.contains('ad-showing')) {
                        observer.disconnect();
                        safeResolve();
                    }
                });
                observer.observe(player, { attributes: true, attributeFilter: ['class'] });

                // Timeout logic
                const timer = setTimeout(() => {
                    observer.disconnect();
                    safeReject(new Error('Timeout: Ad still showing.'));
                }, timeout);

                // Ensure cleanup
                const cleanup = () => {
                    observer.disconnect();
                    clearTimeout(timer);
                };
                // Patch resolve/reject to cleanup
                const origResolve = safeResolve;
                const origReject = safeReject;
                safeResolve = (...args) => { cleanup(); origResolve(...args); };
                safeReject = (...args) => { cleanup(); origReject(...args); };
            }).catch(safeReject);
        });
    }

    // Main function to reset the audiotrack
    async function checkAudiotrack() {
        try {
            if (redirectToDesktop()) {
                return; // Early return to redirect to desktop view
            }

            // Wait for the video element and ensure no ad is playing
            await waitForElement('video');
            await waitForNoAds();

            // Open the settings menu
            const settingsButton = await waitForElement('.ytp-settings-button');
            clickElement(settingsButton);
            const settingsMenu = await waitForElement('.ytp-popup.ytp-settings-menu');

            // Find and click the "Audiotrack" item
            const audioTrackItem = Array.from(settingsMenu.querySelectorAll('.ytp-menuitem'))
                .find(item => item.textContent.includes('Audiotrack'));

            if (audioTrackItem) {
                clickElement(audioTrackItem);

                // Wait for the audiotrack submenu to appear
                const audioTrackMenu = await waitForElement('.ytp-popup.ytp-settings-menu');

                const originalStrings = [
                    'original',       // English, German, Spanish, Portuguese, Swedish, Danish, Norwegian
                    'orijinal',       // Turkish
                    'originale',      // Italian
                    'originalny',     // Polish
                    'originale',      // French/Italian
                    '原声',            // Chinese Simplified
                    'オリジナル',       // Japanese
                    'оригинал',       // Russian, Serbian
                    '오리지널',         // Korean
                    'origen',         // Spanish
                    'origineel',      // Dutch
                    'orijinal',       // Turkish
                    'ต้นฉบับ',          // Thai
                    'asli',           // Indonesian/Malay
                    'gốc',            // Vietnamese
                    'asıl',           // Turkish
                    'oryginalny',     // Polish
                    'origine',        // Romanian
                    'оригинален',     // Bulgarian
                    'eredeti',        // Hungarian
                    'pôvodný',        // Slovak
                    'izvirnik',       // Slovenian
                    'izvornik',       // Croatian / Serbian (Latin)
                    'alkuperäinen',   // Finnish
                    'għan oriġinali', // Maltese
                    'asili',          // Swahili
                    'wo ṣaaju',       // Yoruba
                    'ya asili',       // Hausa
                    'ekhoyo',         // Zulu
                    'e ya pele',      // Sesotho
                    'मूल',             // Hindi
                    'மூலம்',          // Tamil
                    'ಮೂಲ',           // Kannada
                    'ప్రాథమిక',          // Telugu
                    'মূল',             // Bengali
                    'ਮੂਲ',             // Punjabi
                    'මුල්',            // Sinhala
                    'མཚམས་མ་བརྗེ་པ།',     // Tibetan
                ];

                // Click the "original" option
                const originalOption = Array.from(audioTrackMenu.querySelectorAll('.ytp-menuitem'))
                    .find(item => originalStrings.some(str => item.textContent.toLowerCase().includes(str)));

                if (originalOption) {
                    clickElement(originalOption);
                } else {
                    console.warn('"Original" audiotrack not found.');
                }
                // Close settings menu
                clickElement(settingsButton);
            } else {
                console.warn('Audiotrack menu not found.');
                // Close half-open settings menu
                clickElement(settingsButton);
            }
        } catch (error) {
            console.error('Error in script:', error);
        }
    }

    // Initial trigger on page load
    if (!document.body) {
        new MutationObserver((_, obs) => {
            if (document.body) {
                obs.disconnect();
                checkAudiotrack();
            }
        }).observe(document.documentElement, { childList: true });
    } else {
        checkAudiotrack();
    }

    // Re-run the script after SPA navigation events (when switching videos)
    document.addEventListener('yt-navigate-finish', () => {
        checkAudiotrack();
    });
})();
