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
// @version         0.2.1
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
// @author          Polymegos (https://github.com/polymegos)
// @namespace       https://github.com/polymegos/yt_disable_ai_audio
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
// @downloadURL https://update.greasyfork.org/scripts/540430/YT%20Disable%20AI%20Audio.user.js
// @updateURL https://update.greasyfork.org/scripts/540430/YT%20Disable%20AI%20Audio.meta.js
// ==/UserScript==

(function() {
    'use strict';

    // Logging, we need this genuinely
    function log(message, level = 'info') {
        const prefix = '[YT Disable AI Audio]';
        switch(level) {
            case 'error': console.error(prefix, message); break;
            case 'warn':  console.warn(prefix, message); break;
            default:      console.log(prefix, message);
        }
    }

    // Logic for clicking elements
    function clickElement(element) {
        if (!element) return false;
        try {
            element.click();
            return true;
        } catch (e1) {
            try {
                element.dispatchEvent(new MouseEvent('click', {bubbles:true,cancelable:true}));
                return true;
            } catch (e2) {
                try {
                    element.focus();
                    element.dispatchEvent(new KeyboardEvent('keydown', {key:'Enter',bubbles:true}));
                    return true;
                } catch (e3) {
                    log(`Click failed: ${e3.message}`, 'error');
                    return false;
                }
            }
        }
    }

    // Await existinence of DOM element
    function waitForElement(selector, timeout = 10000) {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            (function poll() {
                const el = document.querySelector(selector);
                if (el) return resolve(el);
                if (Date.now() - start > timeout) return reject(new Error(`Timeout: ${selector}`));
                setTimeout(poll, 100);
            })();
        });
    }

    // Match text content
    function matchesText(el, patterns) {
        if (!el || !el.textContent) return false;
        const text = el.textContent.toLowerCase();
        return patterns.some(str => text.includes(str.toLowerCase()));
    }

    // Audio track switching core
    async function forceOriginalAudioTrack() {
        try {
            const settingsButton = await waitForElement('.ytp-settings-button', 5000);
            clickElement(settingsButton);
            await new Promise(res => setTimeout(res, 300));

            const menu = document.querySelector('.ytp-settings-menu');
            if (!menu) throw new Error('Settings menu not found');

            const items = Array.from(menu.querySelectorAll('.ytp-menuitem'));
            const audioTrackStrings = ['audiotrack', 'audio track', 'audio tracks',
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
                                      ];
            const originalTrackStrings = ['original', 'origine', 'ursprünglich', 'originale', 'orijinal',
                                          'オリジナル', 'оригинал', '오리지널', '原声', '原版', '原音',
                                          'origineel', 'oryginalny', 'alkuperäinen', 'asli', 'gốc',
                                          'מקורי', 'ต้นฉบับ', 'eredeti', 'pôvodný', 'izvirnik',
                                          'मूल', 'মূল', 'ਮੂਲ', 'மூலம்', 'ಮೂಲ', 'ప్రాథమిక',
                                          'الأصلي', 'मूल', 'native', 'natif', 'nativo'
                                         ];

            const audioItem = items.find(el => matchesText(el, audioTrackStrings));
            if (!audioItem) {
                log('Audio track menu item not found', 'warn');
                setTimeout(() => clickElement(settingsButton), 300); // Close menu
                return;
            }

            clickElement(audioItem);
            await new Promise(res => setTimeout(res, 300));

            const submenu = document.querySelector('.ytp-settings-menu');
            const subitems = submenu ? Array.from(submenu.querySelectorAll('.ytp-menuitem')) : [];
            const originalOption = subitems.find(el => matchesText(el, originalTrackStrings));

            if (originalOption) {
                clickElement(originalOption);
                log('Switched to original audio track');
            } else {
                log('Original audio track not found', 'warn');
            }
        } catch (err) {
            log(`Audio switch failed: ${err.message}`, 'error');
        } finally {
          // Ensure settings menu is closed in all cases
          if (settingsButton) {
            setTimeout(() => clickElement(settingsButton), 300);
          }
        }
    }

    // Watch video state and trigger audio fix on playing
    function monitorVideoPlayback() {
        const video = document.querySelector('video');
        if (!video) {
            new MutationObserver((_, obs) => {
                const v = document.querySelector('video');
                if (v) {
                    obs.disconnect();
                    monitorVideoPlayback();
                }
            }).observe(document.body, { childList: true, subtree: true });
            return;
        }

        video.addEventListener('playing', () => {
            log('Video playing detected');
            setTimeout(forceOriginalAudioTrack, 500); // Small delay for settings menu to render / be usable
        }, { once: true });
    }

    // Hook on page events and URL changes
    function init() {
        monitorVideoPlayback();
        [
            'yt-navigate-finish',
            'yt-page-data-updated',
            'yt-navigate-start',
            'popstate'
        ].forEach(e => document.addEventListener(e, monitorVideoPlayback));

        let lastUrl = location.href;
        new MutationObserver(() => {
            const currentUrl = location.href;
            if (currentUrl !== lastUrl) {
                lastUrl = currentUrl;
                log('URL changed');
                monitorVideoPlayback();
            }
        }).observe(document.body, { childList: true, subtree: true });

        log('Script initialized');
    }

    document.readyState === 'loading' ?
        document.addEventListener('DOMContentLoaded', init) :
        init();
})();
