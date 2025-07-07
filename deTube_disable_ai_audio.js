// ==UserScript==
// @name            deTube Disable AI Audio
// @name:de         deTube KI-Audio deaktivieren
// @name:es         deTube Desactivar Audio IA
// @name:fr         deTube Désactiver Audio IA
// @name:it         deTube Disattiva Audio IA
// @name:pt         deTube Desativar Áudio IA
// @name:ru         deTube Отключить ИИ Аудио
// @name:ja         deTube AI音声を無効化
// @name:ko         deTube AI 오디오 비활성화
// @name:zh-CN      deTube 禁用AI音频
// @name:zh-TW      deTube 停用AI音訊
// @name:nl         deTube AI-Audio uitschakelen
// @name:pl         deTube Wyłącz Audio AI
// @name:sv         deTube Inaktivera AI-ljud
// @name:da         deTube Deaktiver AI-lyd
// @name:no         deTube Deaktiver AI-lyd
// @name:fi         deTube Poista AI-ääni käytöstä
// @name:tr         deTube AI Sesini Devre Dışı Bırak
// @name:ar         deTube تعطيل الصوت بالذكاء الاصطناعي
// @name:he         deTube השבת אודיו AI
// @name:hi         deTube AI ऑडियो अक्षम करें
// @name:th         deTube ปิดใช้งานเสียง AI
// @name:vi         deTube Tắt Âm thanh AI
// @version         0.2.10
// @description     Disables automatically applied AI/translated audio and hides all short-form doom-scroll videos.
// @description:de  Deaktiviert automatisch angewendete KI-/Übersetzungs-Audios und blendet alle Kurzform-Doomscroll-Videos aus.
// @description:es  Desactiva el audio traducido por IA aplicado automáticamente y oculta todos los vídeos de formato corto de desplazamiento interminable.
// @description:fr  Désactive l'audio IA/traduit appliqué automatiquement et masque toutes les vidéos courtes à défilement infini.
// @description:it  Disattiva l'audio AI/tradotto applicato automaticamente e nasconde tutti i video brevi da scorrimento continuo.
// @description:pt  Desativa o áudio traduzido por IA aplicado automaticamente e oculta todos os vídeos de formato curto do tipo “doom-scroll”.
// @description:ru  Отключает автоматически применённый ИИ/переведённый звук и скрывает все короткие видео с бесконечной прокруткой.
// @description:ja  自動的に適用されるAI/翻訳音声を無効化し、すべての短尺動画のドゥームスクロールを非表示にします。
// @description:ko  자동으로 적용된 AI/번역 오디오를 비활성화하고 모든 숏폼 둠스크롤 비디오를 숨깁니다.
// @description:zh-CN 禁用自动启用的AI/翻译音频，并隐藏所有短视频“末日滚动”内容。
// @description:zh-TW 停用自動套用的AI/翻譯音訊，並隱藏所有短片末日滾動內容。
// @description:nl  Schakelt automatisch toegepaste AI/vertaalde audio uit en verbergt alle short-form doom-scroll video's.
// @description:pl  Wyłącza automatycznie stosowane audio AI/tłumaczenia i ukrywa wszystkie krótkie filmy typu doom-scroll.
// @description:sv  Inaktiverar automatiskt tillämpat AI/översatt ljud och döljer alla kortformade doom-scroll-videor.
// @description:da  Deaktiverer automatisk anvendt AI/oversat lyd og skjuler alle kortformede doom-scroll-videoer.
// @description:no  Deaktiverer automatisk brukt AI/oversatt lyd og skjuler alle kortformede doom-scroll-videoer.
// @description:fi  Poistaa automaattisesti käytetyn AI/käännetyn äänen käytöstä ja piilottaa kaikki lyhyet doom-scroll-videot.
// @description:tr  Otomatik olarak uygulanan AI/çevrilmiş sesi devre dışı bırakır ve tüm kısa biçimli doom-scroll videolarını gizler.
// @description:ar  يعطّل الصوت المُترجم أو المطبّق تلقائيًا بالذكاء الاصطناعي ويخفي جميع فيديوهات التمرير القصيرة المملة.
// @description:he  משבית אודיו AI/מתורגם המופעל אוטומטית ומסתיר את כל סרטוני הדום-סקרול הקצרים.
// @description:hi  स्वचालित रूप से लागू AI/अनुवादित ऑडियो को अक्षम करता है और सभी शॉर्ट-फॉर्म डूम-स्क्रॉल वीडियो छुपाता है।
// @description:th  ปิดใช้งานเสียง AI/แปลอัตโนมัติ และซ่อนไว้วิดีโอสั้นๆ แบบ doom-scroll ทั้งหมดบน YT
// @description:vi  Tắt âm thanh AI/được dịch tự động và ẩn tất cả video dạng ngắn doom-scroll.
// @author          polymegos & MK2112
// @namespace       https://github.com/MK2112/deTube_disable_ai_audio
// @supportURL      https://github.com/MK2112/deTube_disable_ai_audio/issues
// @license         MIT
// @match           *://www.youtube.com/*
// @match           *://www.youtube-nocookie.com/*
// @match           *://m.youtube.com/*
// @match           *://music.youtube.com/*
// @grant           GM_getValue
// @grant           GM_setValue
// @run-at          document-start
// @compatible      firefox
// @compatible      edge
// @compatible      safari
// ==/UserScript==

(function() {
  'use strict';

  // Disable AI Audio Tracks
  // =======================
  (function audioTrackScript() {
    let lastProcessedUrl = '';
    let liftFromAudioTrack = false;
    function log(message, level = 'info') {
      const prefix = "[deTube] [Disable AI Audio]";
      switch(level) {
        case 'error':
          console.error(`%c${prefix}`, 'color: red; font-weight: bold;', message);
          break;
        case 'warn':
          console.warn(`%c${prefix}`, 'color: orange; font-weight: bold;', message);
          break;
        default:
          console.log(`%c${prefix}`, 'color: green; font-weight: bold;', message);
      }
    }

    function clickElement(element) {
      if (!element) return false;
      try {
        element.click();
        return true;
      } catch (e1) {
        try {
          element.dispatchEvent(new MouseEvent('click', {bubbles:true, cancelable:true}));
          return true;
        } catch (e2) {
          try {
            element.focus();
            element.dispatchEvent(new KeyboardEvent('keydown', {key:'Enter', bubbles:true}));
            return true;
          } catch (e3) {
            log(`Click failed: ${e3.message}`, 'error');
            return false;
          }
        }
      }
    }

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

    function matchesText(el, patterns) {
      if (!el || !el.textContent) return false;
      const text = el.textContent.toLowerCase();
      return patterns.some(str => text.includes(str.toLowerCase()));
    }

    function hideSettingsMenu() {
      const menu = document.querySelector('.ytp-settings-menu');
      if (menu) {
        menu.dataset.detubeHidden = "true";
        menu.style.visibility = 'hidden';
        menu.style.pointerEvents = 'none';
      }
    }

    function restoreSettingsMenuVisibility() {
      const menu = document.querySelector('.ytp-settings-menu');
      if (menu && menu.dataset.detubeHidden === "true") {
        menu.style.visibility = '';
        menu.style.pointerEvents = '';
        delete menu.dataset.detubeHidden;
      }
    }

    async function forceOriginalAudioTrack() {
      let settingsButton;
      hideSettingsMenu();
      try {
        settingsButton = await waitForElement('.ytp-settings-button', 5000);
        clickElement(settingsButton);
        await new Promise(res => setTimeout(res, 300));

        const menu = document.querySelector('.ytp-settings-menu');
        if (!menu) throw new Error('Settings menu not found');

        const items = Array.from(menu.querySelectorAll('.ytp-menuitem'));
        const audioTrackStrings = [
                                    'audiotrack', 'audio track', 'audio tracks', // English
                                    'piste audio', 'pistes audio', 'son', // French
                                    'audiospur', 'tonspur', 'audio-spur', // German
                                    'pista de audio', 'pista audio', 'audio', // Spanish
                                    'traccia audio', 'audio traccia', // Italian
                                    'faixa de áudio', 'trilha sonora', // Portuguese
                                    'аудиодорожка', 'звуковая дорожка', // Russian
                                    'オーディオトラック', '音声トラック', // Japanese
                                    '오디오 트랙', '음성 트랙', // Korean
                                    '音轨', '音频轨道', // Chinese (Simplified/Traditional)
                                    'geluidsspoor', // Dutch
                                    'ścieżka dźwiękowa', 'audio ścieżka', // Polish
                                    'ljudspår', 'audio spår', // Swedish
                                    'lydspor', 'audio spor', // Danish / Norwegian
                                    'ääniraita', 'ääni', // Finnish
                                    'ses parçası', 'ses izi', // Turkish
                                    'מסלול אודיו', 'רצועת אודיו', // Hebrew
                                    'เสียง', 'แทร็กเสียง', // Thai
                                    'âm thanh', 'bản âm thanh', // Vietnamese
                                    'مسار صوتي', 'المسار الصوتي', 'الصوت', // Arabic
                                    'ऑडियो ट्रैक', 'ध्वनि पथ', // Hindi
                                    'jalur audio', 'trek audio', // Indonesian
                                    'trek audio', 'laluan audio', // Malay
                                    'ηχητικό κομμάτι', 'ήχος', // Greek
                                    'pistă audio', 'traseu audio', // Romanian
                                    'zvuková stopa', 'audio stopa', // Czech
                                    'hangsáv', 'audió sáv', // Hungarian
                                    'аудіодоріжка', 'звукова доріжка', // Ukrainian
                                    'аудио пътека', 'звукова пътека', // Bulgarian
                                    'অডিও ট্র্যাক', 'শব্দ ট্র্যাক', // Bengali
                                    'sauti ya sauti', 'kifuatilia sauti', // Swahili
                                    'tunog na landas', // Filipino (Tagalog)
                                    'hljóðrás', // Icelandic
                                    'audio celiņš', // Latvian
                                    'garso takelis', // Lithuanian
                                    'zvuková stopa' // Slovak
                                  ];
            const originalTrackStrings = [
                                          'original',  // English, German, Spanish, Romanian, Indonesian
                                          'origine',   // French
                                          'originale', // Italian
                                          'nativo',    // Portuguese
                                          'оригинал',  // Russian
                                          'オリジナル',  // Japanese
                                          '오리지널',    // Korean
                                          '原版', '原声', '原始', // Chinese (Simplified/Traditional)
                                          'origineel',    // Dutch
                                          'oryginalny',   // Polish
                                          'ursprunglig',  // Swedish
                                          'opprinnelig',  // Danish / Norwegian
                                          'alkuperäinen', // Finnish
                                          'orijinal', // Turkish
                                          'מקורי',    // Hebrew
                                          'ต้นฉบับ', 'ดั้งเดิม', // Thai
                                          'nguyên bản', 'gốc', // Vietnamese
                                          'الأصلي', 'النسخة الأصلية', // Arabic
                                          'मूल', 'असली', // Hindi
                                          'asli', // Indonesian
                                          'asli', 'asal', // Malay
                                          'πρωτότυπο', 'αυθεντικό', // Greek
                                          'nativ', // Romanian
                                          'původní', 'originální', // Czech
                                          'eredeti', // Hungarian
                                          'початковий', // Ukrainian
                                          'оригинален', 'първоначален', // Bulgarian
                                          'মূল', 'আসল', // Bengali
                                          'asili', 'halisi', // Swahili
                                          'orihinal', 'likas', // Filipino (Tagalog)
                                          'frumlegur', // Icelandic
                                          'oriģināls', // Latvian
                                          'originalus', // Lithuanian
                                          'pôvodný' // Slovak
                                         ];

        const audioItem = items.find(el => matchesText(el, audioTrackStrings));
        if (!audioItem) {
          log('Audio track menu item not found', 'warn');
          setTimeout(() => clickElement(settingsButton), 200);
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
        try {
          const menu = document.querySelector('.ytp-settings-menu');
          if (menu?.offsetParent !== null) {
            log('Closing settings menu...');
            if (settingsButton) {
              clickElement(settingsButton);
              setTimeout(() => {
                const menuStillOpen = document.querySelector('.ytp-settings-menu');
                if (menuStillOpen?.offsetParent !== null) {
                  clickElement(settingsButton);
                  log('Retrying menu close');
                }
              }, 400);
            }
          }
        } catch (closeErr) {
          log(`Menu close logic failed: ${closeErr.message}`, 'error');
        } finally {
          setTimeout(() => {
            document.querySelectorAll('.ytp-settings-menu').forEach(menu => {
              if (menu.offsetParent !== null) {
                menu.style.display = 'none';
                log('Force-hid lingering settings menu (fallback)', 'warn');
              }
            });
          }, 500);
        }
        setTimeout(restoreSettingsMenuVisibility, 1000);
      }
    }

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
        if (!liftFromAudioTrack) {
          setTimeout(forceOriginalAudioTrack, 500);
        }
      }, { once: true });
    }

    function init() {
      liftFromAudioTrack = false;
      if (location.href !== lastProcessedUrl && (location.pathname.startsWith('/watch') || location.pathname.startsWith('/embed'))) {
        lastProcessedUrl = location.href;
        log('New video page detected. Monitoring for playback.');
        monitorVideoPlayback();
        ['yt-navigate-finish','yt-page-data-updated','yt-navigate-start','popstate'].forEach(e => document.addEventListener(e, monitorVideoPlayback));
        let lastUrl = location.href;
        new MutationObserver(() => {
          const currentUrl = location.href;
          if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            log('URL changed');
            liftFromAudioTrack = false;
            monitorVideoPlayback();
          }
        }).observe(document.body, { childList: true, subtree: true });
      }

      document.addEventListener('click', (e) => {
        const el = e.target?.closest('.ytp-menuitem');
        if (el) {
          liftFromAudioTrack = true;
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'r') {
          log('Manual audio track reset triggered (CTRL+ALT+R)');
          forceOriginalAudioTrack();
        }
      });
    }

    document.readyState === 'loading' ?
      document.addEventListener('DOMContentLoaded', init) :
      init();
  })();

  (function blockShorts() {

    function log(message, level = 'info') {
      const prefix = "[deTube] [Shorts Block]";
      switch(level) {
        case 'error':
          console.error(`%c${prefix}`, 'color: red; font-weight: bold;', message);
          break;
        case 'warn':
          console.warn(`%c${prefix}`, 'color: orange; font-weight: bold;', message);
          break;
        default:
          console.log(`%c${prefix}`, 'color: green; font-weight: bold;', message);
      }
    }

    // Redirect Shorts URL to normal watch URL
    function redirectIfShortsURL(url) {
        const shortsRegex = /^https:\/\/(www\.youtube\.com|www\.youtube-nocookie\.com|m\.youtube\.com|music\.youtube\.com)\/shorts\/([a-zA-Z0-9_-]{11})(\?.*)?$/;
        const match = url.match(shortsRegex);
        if (match) {
            const videoId = match[2];
            const query = window.location.search || '';
            const newUrl = `https://www.youtube.com/watch?v=${videoId}${query}`;
            window.location.replace(newUrl);
        }
    }

    // Initial check on script start
    redirectIfShortsURL(window.location.href);

    // Monitor for SPA navigations (URL changes)
    let lastUrl = location.href;
    new MutationObserver(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            redirectIfShortsURL(currentUrl);
        }
    }).observe(document, { subtree: true, childList: true });

    // --- Block Shorts UI elements ---
    const BLOCK_SELECTORS = [
        'ytd-reel-shelf-renderer',
        'grid-shelf-view-model',
        'a[title="Shorts"]',
        'div#dismissible.style-scope.ytd-rich-shelf-renderer'
    ];

    function removeShortsElements() {
        BLOCK_SELECTORS.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => el.remove());
        });
    }

    const observer = new MutationObserver(removeShortsElements);

    const initElementObserver = () => {
        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
            removeShortsElements();
        } else {
            requestAnimationFrame(initElementObserver);
        }
    };
    log("Active");
    initElementObserver();
  })();

})();
