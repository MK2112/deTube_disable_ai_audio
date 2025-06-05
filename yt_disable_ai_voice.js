// ==UserScript==
// @name            YT Disable AI Voice
// @name:zh-TW      YT 停用 AI 配音
// @name:zh-HK      YT 停用 AI 配音
// @name:zh-CN      YT 停用 AI 语音
// @name:ja         YT AIナレーション無効化
// @name:kr         YT AI 음성 비활성화
// @name:ar         تعطيل الصوت الآلي في YT
// @name:bg         YT Забрани AI озвучаване
// @name:cs         YT Zakázat AI hlas
// @name:da         YT Deaktiver AI-fortællerstemme
// @name:de         YT KI-Stimme deaktivieren
// @name:tel        YT AI వాయిస్ డిసేబుల్ చేయి
// @name:es         Desactivar voz IA en YT
// @name:en         YT Disable AI Voice
// @name:fr         YT Désactiver la voix IA
// @name:fr-CA      YT Désactivation de la voix IA
// @name:he         השבתת קול AI ב-YT
// @name:hu         YT Mesterséges hang kikapcsolása
// @name:id         YT Nonaktifkan Suara AI
// @name:it         YT Disattiva voce AI
// @name:ko         YT AI 보이스 비활성화
// @name:nb         YT Deaktiver AI-stemme
// @name:nl         YT AI-stem uitschakelen
// @name:pl         YT Wyłącz głos AI
// @name:pt-BR      Desativar voz por IA no YT
// @name:ro         YT Dezactivează vocea AI
// @name:ru         YT Отключить голос ИИ
// @name:sk         YT Zakázať AI hlas
// @name:sr         YT Onemogući AI naraciju
// @name:sv         YT Inaktivera AI-röst
// @name:th         ปิดเสียง AI ใน YT
// @name:tr         YT AI sesini devre dışı bırak
// @name:uk         YT Вимкнути голос ШІ
// @name:ug         YT دىكى AI ئاۋازىنى ئىناۋەتسىز قىل
// @name:vi         Tắt giọng AI trên YT
// @version         0.1.6
// @description     Overrides automatic use of generated, translated audiotracks on YouTube videos. Resets to original audio.
// @description:zh-TW 覆蓋YouTube視頻上自動生成的翻譯音軌。重置為原始音軌。
// @description:zh-HK 覆蓋YouTube視頻上自動生成的翻譯音軌。重置為原始音軌。
// @description:zh-CN 覆盖YouTube视频上自动生成的翻译音轨。重置为原始音轨。
// @description:ja YouTube動画の自動生成された翻訳音声トラックを上書きします。元の音声にリセットします。
// @description:kr YouTube 비디오에서 자동으로 생성된 번역된 오디오 트랙을 덮어씁니다. 원래 오디오로 재설정합니다。
// @description:ar يتجاوز الاستخدام التلقائي للمسارات الصوتية المترجمة المولدة على مقاطع الفيديو الخاصة بـ YouTube. يعيد تعيين الصوت الأصلي.
// @description:bg Пренаписва автоматичното използване на генерирани преведени аудиотреки в YouTube видеа. Нулира до оригиналния звук.
// @description:cs Přepisuje automatické použití generovaných přeložených zvukových stop u videí YouTube. Resetuje na původní zvuk.
// @description:da Omgår automatisk brug af genererede, oversatte lydspor på YouTube-videoer. Nulstiller til original lyd.
// @description:de Überschreibt die automatische Verwendung von generierten, übersetzten Audiotracks in YouTube-Videos. Setzt auf den Originalton zurück.
// @description:tel YouTube వీడియోలపై స్వయంచాలకంగా ఉత్పత్తి చేసిన అనువాద ఆడియో ట్రాక్స్‌ని ఓవర్‌రైడ్ చేస్తుంది. మౌలిక ఆడియోకి రీసెట్ చేస్తుంది.
// @description:es Sobrescribe el uso automático de pistas de audio generadas y traducidas en videos de YouTube. Restablece el audio original.
// @description:en Overrides automatic use of generated, translated audiotracks on YouTube videos. Resets to original audio.
// @description:fr Remplace l'utilisation automatique des pistes audio générées et traduites dans les vidéos YouTube. Réinitialise l'audio original.
// @description:fr-CA Remplace l'utilisation automatique des pistes audio générées et traduites dans les vidéos YouTube. Réinitialise l'audio original.
// @description:he עוקף את השימוש האוטומטי במסלולי אודיו מתורגמים שנוצרו בסרטוני YouTube. מחזיר לאודיו המקורי.
// @description:hu Felülírja a YouTube videók automatikusan generált, lefordított audiótracks használatát. Visszaállítja az eredeti hangot.
// @description:id Menggantikan penggunaan otomatis trek audio terjemahan yang dihasilkan pada video YouTube. Mengatur ulang ke audio asli.
// @description:it Sovrascrive l'uso automatico delle tracce audio tradotte generate nei video di YouTube. Ripristina l'audio originale.
// @description:ko YouTube 비디오에서 자동 생성된 번역된 오디오 트랙의 자동 사용을 덮어씁니다. 원래 오디오로 재설정합니다.
// @description:nb Omgår automatisk bruk av genererte, oversatte lydspor på YouTube-videoer. Tilbakestiller til original lyd.
// @description:nl Overschrijft automatisch gebruik van gegenereerde, vertaalde audiotracks op YouTube-video's. Zet terug naar het originele geluid.
// @description:pl Nadpisuje automatyczne użycie generowanych, przetłumaczonych ścieżek dźwiękowych w filmach YouTube. Resetuje do oryginalnego dźwięku.
// @description:pt-BR Substitui o uso automático de faixas de áudio geradas e traduzidas nos vídeos do YouTube. Restaura para o áudio original.
// @description:ro Suprascrie utilizarea automată a pieselor audio traduse generate pe videoclipurile YouTube. Resetează la audio original.
// @description:ru Перезаписывает автоматическое использование сгенерированных переведенных аудиотреков в видео на YouTube. Возвращает к оригинальному аудио.
// @description:sk Prepisuje automatické použitie generovaných preložených zvukových stôp na videách YouTube. Resetuje na pôvodný zvuk.
// @description:sr Prepisuje automatsko korišćenje generisanih, prevedenih audio traka na YouTube video zapisima. Vraća na originalni zvuk.
// @description:sv Överskriver automatisk användning av genererade översatta ljudspår på YouTube-videor. Återställer till original ljud.
// @description:th แทนที่การใช้แทร็กเสียงที่แปลและสร้างโดยอัตโนมัติในวิดีโอ YouTube รีเซ็ตเป็นเสียงต้นฉบับ
// @description:tr YouTube videolarındaki otomatik olarak oluşturulmuş, çevrilmiş ses izlerinin kullanımını geçersiz kılar. Orijinal sesine sıfırlar.
// @description:uk Перезаписує автоматичне використання згенерованих, переведених аудіотреків на відео YouTube. Скидає до оригінального аудіо.
// @description:ug يۇتۇب ۋىدىئولارىدىكى ئاپتوماتىك تەرجىمە قىلىنغان، ياراتىلغان ئاۋازلارنى ئايرىپ قويىدۇ. ئەسلى ئاۋازغا قايتۇرۇلىدۇ.
// @description:vi Ghi đè việc sử dụng tự động các bản nhạc âm thanh đã được tạo và dịch trên video YouTube. Đặt lại về âm thanh gốc.
// @author          MK2112 (https://github.com/MK2112)
// @namespace       https://github.com/MK2112/yt_disable_ai_voice
// @supportURL      https://github.com/MK2112/yt_disable_ai_voice/issues
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
            const element = document.querySelector(selector);
            if (element) return resolve(element);
            const observer = new MutationObserver((mutations, obs) => {
                const target = document.querySelector(selector);
                if (target) {
                    obs.disconnect();
                    resolve(target);
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Timeout: Element ${selector} not found within ${timeout}ms`));
            }, timeout);
        });
    }
 
    // Simulate a click on the given element
    function clickElement(element) {
        if (element) {
            element.click();
        }
    }
 
    // Wait until no ad shown
    function waitForNoAds(timeout = 10000) {
        return new Promise((resolve, reject) => {
            const player = document.querySelector('.html5-video-player');
            if (!player || !player.classList.contains('ad-showing')) return resolve();
            const observer = new MutationObserver((mutations, obs) => {
                if (!player.classList.contains('ad-showing')) {
                    obs.disconnect();
                    resolve();
                }
            });
            observer.observe(player, { attributes: true, attributeFilter: ['class'] });
            setTimeout(() => {
                observer.disconnect();
                reject(new Error('Timeout: Ad still showing.'));
            }, timeout);
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
 
                // Click the "Original" option
                const originalOption = Array.from(audioTrackMenu.querySelectorAll('.ytp-menuitem'))
                    .find(item => item.textContent.toLowerCase().includes('original'));
 
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
    checkAudiotrack();
 
    // Re-run the script after SPA navigation events (when switching videos)
    document.addEventListener('yt-navigate-finish', () => {
        checkAudiotrack();
    });
})();
