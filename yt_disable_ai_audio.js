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
// @version         0.2.0
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

    // Enhanced logging function
    function log(message, level = 'info') {
        const prefix = '[YT Disable AI Audio]';
        switch(level) {
            case 'error':
                console.error(prefix, message);
                break;
            case 'warn':
                console.warn(prefix, message);
                break;
            default:
                console.log(prefix, message);
        }
    }

    // Enhanced element clicking with multiple fallback methods
    function clickElement(element) {
        if (!element) {
            log('Attempted to click null/undefined element', 'warn');
            return false;
        }

        try {
            // Method 1: Standard click
            element.click();
            return true;
        } catch (e1) {
            try {
                // Method 2: Mouse event
                const event = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    button: 0
                });
                element.dispatchEvent(event);
                return true;
            } catch (e2) {
                try {
                    // Method 3: Focus and simulate Enter key
                    element.focus();
                    const keyEvent = new KeyboardEvent('keydown', {
                        key: 'Enter',
                        code: 'Enter',
                        keyCode: 13,
                        which: 13,
                        bubbles: true
                    });
                    element.dispatchEvent(keyEvent);
                    return true;
                } catch (e3) {
                    log(`Failed to click element: ${e3.message}`, 'error');
                    return false;
                }
            }
        }
    }

    function redirectToDesktop() {
        const isMobile = window.location.hostname === 'm.youtube.com' ||
                        (window.location.hostname === 'www.youtube.com' &&
                        (document.documentElement.classList.contains('mobile')));
        const hasDesktopParam = window.location.search.includes('app=desktop');

        if (isMobile && !hasDesktopParam) {
            let newUrl = window.location.href;
            if (newUrl.includes('?')) {
                newUrl += '&app=desktop';
            } else {
                newUrl += '?app=desktop';
            }
            log('Redirecting to desktop version...');
            window.location.href = newUrl;
            return true;
        }
        return false;
    }

    // Enhanced element waiting with better error handling
    function waitForElement(selector, timeout = 15000) {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();

            const checkElement = () => {
                const element = document.querySelector(selector);
                if (element) {
                    log(`Found element: ${selector}`);
                    return resolve(element);
                }

                if (Date.now() - startTime > timeout) {
                    return reject(new Error(`Timeout: Element ${selector} not found within ${timeout}ms`));
                }

                setTimeout(checkElement, 100);
            };

            checkElement();
        });
    }

    // Enhanced ad waiting with better detection
    function waitForNoAds(timeout = 15000) {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();

            const checkAds = () => {
                const player = document.querySelector('.html5-video-player');
                if (!player) {
                    if (Date.now() - startTime > timeout) {
                        return reject(new Error('Player not found'));
                    }
                    return setTimeout(checkAds, 100);
                }

                const hasAd = player.classList.contains('ad-showing') ||
                             player.classList.contains('ad-interrupting') ||
                             document.querySelector('.video-ads') ||
                             document.querySelector('.ytp-ad-module');

                if (!hasAd) {
                    log('No ads detected, proceeding...');
                    return resolve();
                }

                if (Date.now() - startTime > timeout) {
                    log('Ad timeout reached, proceeding anyway...', 'warn');
                    return resolve();
                }

                setTimeout(checkAds, 500);
            };

            checkAds();
        });
    }

    // Track processed videos
    let currentVideoId = null;
    let isProcessing = false;
    let processingTimeout = null;

    // Enhanced audiotrack strings with more comprehensive translations
    const audioTrackStrings = {
        menu: [
            'audiotrack', 'audio track', 'audio tracks',
            'piste audio', 'pistes audio', 'son', // French
            'audiospur', 'tonspur', 'audio-spur', // German
            'pista de audio', 'pista audio', 'audio', // Spanish
            'traccia audio', 'audio traccia', // Italian
            'faixa de áudio', 'trilha sonora', // Portuguese
            'аудиодорожка', 'звуковая дорожка', // Russian
            'オーディオトラック', '音声トラック', // Japanese
            '오디오 트랙', '음성 트랙', // Korean
            '音轨', '音频轨道', // Chinese
            'audiotrack', 'geluidsspoor', // Dutch
            'ścieżka dźwiękowa', 'audio ścieżka', // Polish
            'ljudspår', 'audio spår', // Swedish
            'lydspor', 'audio spor', // Danish/Norwegian
            'ääniraita', 'ääni', // Finnish
            'ses parçası', 'ses izi', // Turkish
            'מסלול אודיו', 'רצועת אודיו', // Hebrew
            'เสียง', 'แทร็กเสียง', // Thai
            'âm thanh', 'bản âm thanh' // Vietnamese
        ],
        original: [
            'original', 'origine', 'ursprünglich', 'originale', 'orijinal',
            'オリジナル', 'оригинал', '오리지널', '原声', '原版', '原音',
            'origineel', 'oryginalny', 'alkuperäinen', 'asli', 'gốc',
            'מקורי', 'ต้นฉบับ', 'eredeti', 'pôvodný', 'izvirnik',
            'मूल', 'মূল', 'ਮੂਲ', 'மூலம்', 'ಮೂಲ', 'ప్రాథమిక',
            'الأصلي', 'मूल', 'native', 'natif', 'nativo'
        ]
    };

    // Enhanced text matching function
    function matchesText(element, strings) {
        if (!element || !element.textContent) return false;
        const text = element.textContent.toLowerCase().trim();
        return strings.some(str => text.includes(str.toLowerCase()));
    }

    // Main audiotrack checking function with enhanced error handling
    async function checkAudiotrack() {
        if (isProcessing) {
            log('Already processing, skipping...');
            return;
        }

        // Clear any existing timeout
        if (processingTimeout) {
            clearTimeout(processingTimeout);
        }

        try {
            if (redirectToDesktop()) {
                return;
            }

            // Get current video ID
            const videoId = new URLSearchParams(window.location.search).get('v');
            if (!videoId) {
                log('No video ID found, skipping...');
                return;
            }

            if (videoId === currentVideoId) {
                log('Same video ID, skipping...');
                return;
            }

            log(`Processing video: ${videoId}`);
            isProcessing = true;
            currentVideoId = videoId;

            // Set a timeout to prevent infinite processing
            processingTimeout = setTimeout(() => {
                log('Processing timeout reached, resetting...', 'warn');
                isProcessing = false;
            }, 30000);

            // Wait for video element with longer timeout
            await waitForElement('video', 20000);
            log('Video element found');

            // Wait for no ads with extended timeout
            await waitForNoAds(20000);
            log('No ads detected or timeout reached');

            // Extended delay for player stabilization
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Multiple attempts to find and click settings button
            let settingsButton = null;
            const settingsSelectors = [
                '.ytp-settings-button',
                '.ytp-chrome-controls .ytp-settings-button',
                'button[class*="settings"]',
                '[aria-label*="Settings"]',
                '[aria-label*="Paramètres"]', // French
                '[aria-label*="Einstellungen"]', // German
                '[aria-label*="Configuración"]', // Spanish
                '[aria-label*="Impostazioni"]' // Italian
            ];

            for (const selector of settingsSelectors) {
                try {
                    settingsButton = await waitForElement(selector, 3000);
                    if (settingsButton) {
                        log(`Settings button found with selector: ${selector}`);
                        break;
                    }
                } catch (e) {
                    log(`Settings button not found with selector: ${selector}`);
                }
            }

            if (!settingsButton) {
                throw new Error('Settings button not found with any selector');
            }

            // Click settings button
            if (!clickElement(settingsButton)) {
                throw new Error('Failed to click settings button');
            }

            log('Settings button clicked');
            await new Promise(resolve => setTimeout(resolve, 800));

            // Wait for settings menu with multiple selectors
            let settingsMenu = null;
            const menuSelectors = [
                '.ytp-popup.ytp-settings-menu',
                '.ytp-settings-menu',
                '.ytp-popup',
                '[class*="settings-menu"]'
            ];

            for (const selector of menuSelectors) {
                try {
                    settingsMenu = await waitForElement(selector, 3000);
                    if (settingsMenu && settingsMenu.querySelectorAll('.ytp-menuitem').length > 0) {
                        log(`Settings menu found with selector: ${selector}`);
                        break;
                    }
                } catch (e) {
                    log(`Settings menu not found with selector: ${selector}`);
                }
            }

            if (!settingsMenu) {
                throw new Error('Settings menu not found');
            }

            // Find audiotrack menu item with enhanced search
            const menuItems = Array.from(settingsMenu.querySelectorAll('.ytp-menuitem, [class*="menuitem"]'));
            log(`Found ${menuItems.length} menu items`);

            let audioTrackItem = null;
            for (const item of menuItems) {
                if (matchesText(item, audioTrackStrings.menu)) {
                    audioTrackItem = item;
                    log(`Audio track menu item found: "${item.textContent.trim()}"`);
                    break;
                }
            }

            if (!audioTrackItem) {
                log('Audio track menu item not found, menu items:', 'warn');
                menuItems.forEach((item, index) => {
                    log(`  ${index}: "${item.textContent.trim()}"`);
                });
                throw new Error('Audio track menu item not found');
            }

            // Click audiotrack item
            if (!clickElement(audioTrackItem)) {
                throw new Error('Failed to click audio track menu item');
            }

            log('Audio track menu item clicked');
            await new Promise(resolve => setTimeout(resolve, 800));

            // Wait for audiotrack submenu
            let audioTrackMenu = null;
            for (const selector of menuSelectors) {
                try {
                    audioTrackMenu = await waitForElement(selector, 3000);
                    if (audioTrackMenu && audioTrackMenu.querySelectorAll('.ytp-menuitem').length > 0) {
                        log(`Audio track submenu found with selector: ${selector}`);
                        break;
                    }
                } catch (e) {
                    log(`Audio track submenu not found with selector: ${selector}`);
                }
            }

            if (!audioTrackMenu) {
                throw new Error('Audio track submenu not found');
            }

            // Find and click original option
            const trackOptions = Array.from(audioTrackMenu.querySelectorAll('.ytp-menuitem, [class*="menuitem"]'));
            log(`Found ${trackOptions.length} track options`);

            let originalOption = null;
            for (const option of trackOptions) {
                if (matchesText(option, audioTrackStrings.original)) {
                    originalOption = option;
                    log(`Original track option found: "${option.textContent.trim()}"`);
                    break;
                }
            }

            if (!originalOption) {
                log('Original track option not found, available options:', 'warn');
                trackOptions.forEach((option, index) => {
                    log(`  ${index}: "${option.textContent.trim()}"`);
                });

                // Try to find any option that looks like original/native language
                for (const option of trackOptions) {
                    const text = option.textContent.toLowerCase();
                    if (text.includes('(') && !text.includes('dub') && !text.includes('generated')) {
                        originalOption = option;
                        log(`Fallback original option found: "${option.textContent.trim()}"`);
                        break;
                    }
                }
            }

            if (originalOption) {
                if (clickElement(originalOption)) {
                    log('Successfully switched to original audiotrack');
                } else {
                    throw new Error('Failed to click original option');
                }
            } else {
                log('No original audio track option found', 'warn');
            }

            // Wait before closing menu
            await new Promise(resolve => setTimeout(resolve, 500));

        } catch (error) {
            log(`Error in checkAudiotrack: ${error.message}`, 'error');
        } finally {
            // Always try to close settings menu
            try {
                const settingsButton = document.querySelector('.ytp-settings-button');
                if (settingsButton) {
                    clickElement(settingsButton);
                    log('Settings menu closed');
                }
            } catch (cleanupError) {
                log(`Error closing menu: ${cleanupError.message}`, 'warn');
            }

            // Reset processing state
            isProcessing = false;
            if (processingTimeout) {
                clearTimeout(processingTimeout);
                processingTimeout = null;
            }
        }
    }

    // Enhanced debounce function
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

    const debouncedCheckAudiotrack = debounce(checkAudiotrack, 1500);

    // Initialize script
    function initialize() {
        log('Script initialized');

        // Initial check with delay
        setTimeout(() => {
            debouncedCheckAudiotrack();
        }, 3000);
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    // Enhanced navigation event handling
    const navigationEvents = [
        'yt-navigate-finish',
        'yt-page-data-updated',
        'yt-navigate-start',
        'popstate'
    ];

    navigationEvents.forEach(event => {
        document.addEventListener(event, () => {
            log(`Navigation event detected: ${event}`);
            setTimeout(() => {
                debouncedCheckAudiotrack();
            }, 2000);
        });
    });

    // Additional URL change detection
    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            log('URL change detected via MutationObserver');
            setTimeout(() => {
                debouncedCheckAudiotrack();
            }, 2000);
        }
    }).observe(document, { subtree: true, childList: true });

    log('YT Disable AI Audio script loaded successfully');
})();
