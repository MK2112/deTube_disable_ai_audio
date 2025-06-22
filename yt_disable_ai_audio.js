// ==UserScript==
// @name            YT Disable AI Audio
// @name:de         YT KI-Audio deaktivieren
// @name:es         YT Desactivar Audio IA
// @name:fr         YT Désactiver Audio IA
// @name:it         YT Disattiva Audio IA
// @name:pt         YT Desativar Áudio IA
// @name:ru         YT Отключить ИИ Аудио
// @name:ja         YT AI音声を無効化
// @name:ko         YT AI 오디오 비활성화
// @name:zh-CN      YT 禁用AI音频
// @name:zh-TW      YT 停用AI音訊
// @name:nl         YT AI-Audio uitschakelen
// @name:pl         YT Wyłącz Audio AI
// @name:sv         YT Inaktivera AI-ljud
// @name:da         YT Deaktiver AI-lyd
// @name:no         YT Deaktiver AI-lyd
// @name:fi         YT Poista AI-ääni käytöstä
// @name:tr         YT AI Sesini Devre Dışı Bırak
// @name:ar         YT تعطيل الصوت بالذكاء الاصطناعي
// @name:he         YT השבת אודיו AI
// @name:hi         YT AI ऑडियो अक्षम करें
// @name:th         YT ปิดใช้งานเสียง AI
// @name:vi         YT Tắt Âm thanh AI
// @version         0.1.9
// @description     Overrides automatic use of generated, translated audiotracks on YouTube videos. Resets to original audio.
// @description:de  Überschreibt die automatische Verwendung von generierten, übersetzten Audiospuren in YouTube-Videos. Setzt auf ursprüngliche Tonspur zurück.
// @description:es  Anula el uso automático de pistas de audio generadas y traducidas en videos de YouTube. Restablece al audio original.
// @description:fr  Remplace l'utilisation automatique de pistes audio générées et traduites sur les vidéos YouTube. Remet l'audio original.
// @description:it  Sostituisce l'uso automatico di tracce audio generate e tradotte nei video di YouTube. Ripristina l'audio originale.
// @description:pt  Substitui o uso automático de faixas de áudio geradas e traduzidas em vídeos do YouTube. Restaura para o áudio original.
// @description:ru  Отменяет автоматическое использование сгенерированных, переведенных аудиодорожек в видео YouTube. Возвращает к оригинальному аудио.
// @description:ja  YouTube動画で生成・翻訳されたオーディオトラックの自動使用を無効化します。元の音声に戻します。
// @description:ko  YouTube 동영상에서 생성되고 번역된 오디오 트랙의 자동 사용을 무시합니다. 원본 오디오로 재설정합니다.
// @description:zh-CN 覆盖YouTube视频中自动使用生成、翻译音轨的设置。重置为原始音频。
// @description:zh-TW 覆蓋YouTube影片中自動使用生成、翻譯音軌的設定。重設為原始音訊。
// @description:nl  Overschrijft automatisch gebruik van gegenereerde, vertaalde audiotracks op YouTube-video's. Zet terug naar originele audio.
// @description:pl  Zastępuje automatyczne używanie wygenerowanych, przetłumaczonych ścieżek dźwiękowych w filmach YouTube. Przywraca oryginalny dźwięk.
// @description:sv  Åsidosätter automatisk användning av genererade, översatta ljudspår på YouTube-videor. Återställer till ursprungligt ljud.
// @description:da  Tilsidesætter automatisk brug af genererede, oversatte lydspor på YouTube-videoer. Nulstiller til originalt lyd.
// @description:no  Overstyrer automatisk bruk av genererte, oversatte lydspor på YouTube-videoer. Tilbakestiller til original lyd.
// @description:fi  Ohittaa automaattisen käytön luoduista, käännetyistä ääniraidoista YouTube-videoissa. Palauttaa alkuperäisen äänen.
// @description:tr  YouTube videolarında otomatik olarak kullanılan üretilmiş, çevrilmiş ses parçalarını geçersiz kılar. Orijinal sese sıfırlar.
// @description:ar  يلغي الاستخدام التلقائي للمسارات الصوتية المُولدة والمترجمة في مقاطع فيديو YouTube. يعيد تعيين الصوت الأصلي.
// @description:he  מבטל את השימוש האוטומטי ברצועות אודיו מתורגמות ומופקות בסרטוני YouTube. מחזיר לאודיו המקורי.
// @description:hi  YouTube वीडियो पर उत्पन्न, अनुवादित ऑडियोट्रैक के स्वचालित उपयोग को ओवरराइड करता है। मूल ऑडियो पर रीसेट करता है।
// @description:th  เขียนทับการใช้งานอัตโนมัติของแทร็กเสียงที่สร้างขึ้นและแปลแล้วในวิดีโอ YouTube รีเซ็ตเป็นเสียงต้นฉบับ
// @description:vi  Ghi đè việc sử dụng tự động các bản âm thanh được tạo và dịch trong video YouTube. Đặt lại về âm thanh gốc.
// @author          MK2112 (https://github.com/MK2112)
// @namespace       https://github.com/MK2112/yt_disable_ai_audio
// @supportURL      https://github.com/MK2112/yt_disable_ai_audio/issues
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

    // Missing function that was being called throughout the script
    function clickElement(element) {
        if (!element) {
            console.warn('Attempted to click null/undefined element');
            return;
        }

        // Try different click methods for better compatibility
        try {
            // First try a regular click
            element.click();
        } catch (e1) {
            try {
                // If that fails, try dispatching a click event
                const event = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                element.dispatchEvent(event);
            } catch (e2) {
                console.warn('Failed to click element:', e2);
            }
        }
    }

    function redirectToDesktop() {
        // Check if we're on m.youtube.com / in a mobile setting
        const isMobile = window.location.hostname === 'm.youtube.com' ||
                                (window.location.hostname === 'www.youtube.com' &&
                                (document.documentElement.classList.contains('mobile')));
        // Look if desktop param already in URL
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
        return false; // no redirect, just continue
    }

    // Wait for an element to appear in the DOM
    function waitForElement(selector, timeout = 10000) {
        return new Promise((resolve, reject) => {
            const checkAndObserve = () => {
                const element = document.querySelector(selector);
                if (element) return resolve(element);

                const targetNode = document.body || document.documentElement;
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

    // Track if we've already processed the current video
    let currentVideoId = null;
    let isProcessing = false;

    // Main function to reset the audiotrack
    async function checkAudiotrack() {
        try {
            if (redirectToDesktop()) {
                return; // Early return to redirect to desktop view
            }

            // Get current video ID to prevent duplicate processing
            const videoId = new URLSearchParams(window.location.search).get('v');
            if (!videoId || videoId === currentVideoId || isProcessing) {
                return; // Skip if same video or already processing
            }

            isProcessing = true;
            currentVideoId = videoId;

            // Wait for the video element and ensure no ad is playing
            await waitForElement('video');
            await waitForNoAds();

            // Add a small delay to ensure the player is fully loaded
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Open the settings menu
            const settingsButton = await waitForElement('.ytp-settings-button');
            clickElement(settingsButton);

            // Wait a bit for the menu to open
            await new Promise(resolve => setTimeout(resolve, 300));
            const settingsMenu = await waitForElement('.ytp-popup.ytp-settings-menu');

            // Find and click the "Audiotrack" item
            const audioTrackItem = Array.from(settingsMenu.querySelectorAll('.ytp-menuitem'))
                .find(item => item.textContent.includes('Audiotrack') || item.textContent.includes('Audio track'));

            if (audioTrackItem) {
                clickElement(audioTrackItem);

                // Wait for the audiotrack submenu to appear
                await new Promise(resolve => setTimeout(resolve, 300));
                const audioTrackMenu = await waitForElement('.ytp-popup.ytp-settings-menu');

                const originalStrings = [
                    'original',       // English, German, Spanish, Portuguese, Swedish, Danish, Norwegian
                    'orijinal',       // Turkish
                    'originale',      // Italian
                    'originalny',     // Polish
                    'originale',      // French/Italian
                    '原声',            // Chinese Simplified
                    '原版',            // Chinese Traditional
                    '原音',            // Chinese Traditional (alternative)
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
                    'מקורי',           // Hebrew
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
                    'môd',            // Welsh
                    'môd gwreiddiol', // Welsh (alternative)
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
                    'مُسَجَّل',           // Arabic (Modern Standard)
                    'الأصلي',         // Arabic (Egyptian, Levantine, Gulf, Maghrebi, Sudanese, Iraqi)
                ];

                // Click the "original" option
                const originalOption = Array.from(audioTrackMenu.querySelectorAll('.ytp-menuitem'))
                    .find(item => originalStrings.some(str => item.textContent.toLowerCase().includes(str)));

                if (originalOption) {
                    clickElement(originalOption);
                    console.log('Successfully switched to original audiotrack');
                } else {
                    console.warn('"Original" audiotrack not found.');
                }

                // Wait a bit before closing
                await new Promise(resolve => setTimeout(resolve, 300));
                // Close settings menu
                clickElement(settingsButton);
            } else {
                console.warn('Audiotrack menu not found.');
                // Close half-open settings menu
                clickElement(settingsButton);
            }
        } catch (error) {
            console.error('Error in script:', error);
            // Try to close any open menus if there was an error
            try {
                const settingsButton = document.querySelector('.ytp-settings-button');
                if (settingsButton) {
                    clickElement(settingsButton);
                }
            } catch (cleanupError) {
                console.error('Error during cleanup:', cleanupError);
            }
        } finally {
            // Reset processing flag after completion
            isProcessing = false;
        }
    }

    // Debounce function to prevent multiple rapid executions
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const debouncedCheckAudiotrack = debounce(checkAudiotrack, 1000);

    // Initial trigger on page load
    if (!document.body) {
        new MutationObserver((_, obs) => {
            if (document.body) {
                obs.disconnect();
                debouncedCheckAudiotrack();
            }
        }).observe(document.documentElement, { childList: true });
    } else {
        debouncedCheckAudiotrack();
    }

    // Re-run the script after SPA navigation events (when switching videos)
    document.addEventListener('yt-navigate-finish', () => {
        debouncedCheckAudiotrack();
    });

    // Also listen for other YouTube navigation events
    document.addEventListener('yt-page-data-updated', () => {
        debouncedCheckAudiotrack();
    });
})();
