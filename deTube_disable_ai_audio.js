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
// @version         0.2.8
// @description     Disables automatically applied AI/translated audio and blocks selected channels on YT.
// @description:de  Deaktiviert automatisch angewendete KI-/Übersetzungs-Audios und blockiert ausgewählte Kanäle auf YT.
// @description:es  Desactiva el audio traducido por IA aplicado automáticamente y bloquea canales seleccionados en YT.
// @description:fr  Désactive l'audio IA/traduit appliqué automatiquement et bloque certains canaux sur YT.
// @description:it  Disattiva l'audio AI/tradotto applicato automaticamente e blocca i canali selezionati su YT.
// @description:pt  Desativa o áudio traduzido por IA aplicado automaticamente e bloqueia canais selecionados no YT.
// @description:ru  Отключает автоматически применённый ИИ/переведённый звук и блокирует выбранные каналы на YT.
// @description:ja  自動的に適用されるAI/翻訳音声を無効化し、指定されたチャンネルをYTでブロックします。
// @description:ko  자동으로 적용된 AI/번역 오디오를 비활성화하고 선택한 채널을 YT에서 차단합니다.
// @description:zh-CN 禁用自动启用的AI/翻译音频，并在YT上屏蔽选定的频道。
// @description:zh-TW 停用自動套用的AI/翻譯音訊，並封鎖在YT上選定的頻道。
// @description:nl  Schakelt automatisch toegepaste AI/vertaalde audio uit en blokkeert geselecteerde kanalen op YT.
// @description:pl  Wyłącza automatycznie stosowane audio AI/tłumaczenia i blokuje wybrane kanały na YT.
// @description:sv  Inaktiverar automatiskt tillämpat AI/översatt ljud och blockerar valda kanaler på YT.
// @description:da  Deaktiverer automatisk anvendt AI/oversat lyd og blokerer udvalgte kanaler på YT.
// @description:no  Deaktiverer automatisk brukt AI/oversatt lyd og blokkerer valgte kanaler på YT.
// @description:fi  Poistaa automaattisesti käytetyn AI/käännetyn äänen käytöstä ja estää valitut kanavat YTssa.
// @description:tr  Otomatik olarak uygulanan AI/çevrilmiş sesi devre dışı bırakır ve seçili kanalları YT'da engeller.
// @description:ar  يعطّل الصوت المُترجم أو المطبّق تلقائيًا بالذكاء الاصطناعي ويمنع القنوات المحددة على YT.
// @description:he  משבית אודיו AI/מתורגם המופעל אוטומטית וחוסם ערוצים נבחרים ביוטיוב.
// @description:hi  स्वचालित रूप से लागू AI/अनुवादित ऑडियो को अक्षम करता है और YT पर चयनित चैनलों को ब्लॉक करता है।
// @description:th  ปิดใช้งานเสียง AI/แปลอัตโนมัติ และบล็อกช่องที่เลือกบน YT
// @description:vi  Tắt âm thanh AI/được dịch tự động và chặn các kênh đã chọn trên YT.
// @author          MK2112 (https://github.com/MK2112)
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


  // Block Channels
  // ==============
  (function blockChannelScript() {
    const STORAGE_KEY = 'detube_blocked_channels';
    let blocked = new Set();
    let lastRenderer = null;

    const log = (...a) => console.log('%c[detube] [Channel Block]', 'color: green; font-weight: bold;', ...a);

    async function loadBlocked() {
      try {
        const raw = await GM_getValue(STORAGE_KEY, '[]');
        blocked = new Set(JSON.parse(raw));
        log('Loaded blocked:', [...blocked]);
      } catch (e) {
        blocked = new Set();
        log('Load-error', e);
      }
    }

    async function saveBlocked() {
      await GM_setValue(STORAGE_KEY, JSON.stringify([...blocked]));
      log('Saved blocked list:', [...blocked]);
    }

    function tagVideo(el) {
      const selectorsToTry = [
        'span.yt-core-attributed-string.yt-content-metadata-view-model-wiz__metadata-text',
        'a[href*="/@"]',
        '.yt-lockup-byline a',
        '.yt-lockup-metadata-view-model-wiz__title a',
        'yt-formatted-string a',
        'yt-formatted-string',
        '.yt-lockup-metadata-view-model-wiz__title',
        '.yt-lockup-metadata-view-model-wiz',
      ];

      for (const selector of selectorsToTry) {
        const candidate = el.querySelector(selector);
        if (candidate && candidate.textContent.trim()) {
          const name = candidate.textContent.trim();
          el.dataset.detube = name;
          return true;
        }
      }

      log('❌ Could not find channel name inside:', el);
      return false;
    }

    function tagAllVideos() {
      const els = document.querySelectorAll('yt-lockup-view-model');
      for (let el of els) tagVideo(el);
    }

    function applyCSS() {
      let s = document.getElementById('detube_style_v4');
      if (!s) {
        s = document.createElement('style');
        s.id = 'detube_style_v4';
        document.head.appendChild(s);
      }
      const rules = [...blocked].map(name =>
        `yt-lockup-view-model[data-detube="${CSS.escape(name)}"] { display: none !important; }`
      ).join('\n');
      s.textContent = rules;
    }

    function injectOrUpdateButton(channel) {
      const menu = document.querySelector('yt-list-view-model');
      if (!menu) return;

      // Remove existing button if present
      const oldButton = menu.querySelector('.detube-block-button');
      if (oldButton) oldButton.remove();

      // Don't inject if already blocked
      if (blocked.has(channel)) return;

      const button = document.createElement('div');
      button.className = 'detube-block-button';
      button.setAttribute('role', 'menuitem');
      button.setAttribute('tabindex', '0');
      button.style.cursor = 'pointer';
      button.style.padding = '10px 16px';
      button.style.fontSize = '14px';
      button.style.color = 'red';
      button.style.fontWeight = 'bold';
      button.style.borderTop = '1px solid #ccc';

      button.textContent = `🚫 Block "${channel}"`;

      button.addEventListener('click', () => {
        blocked.add(channel);
        saveBlocked();
        applyCSS();
        tagAllVideos();
        log(`Blocked channel: ${channel}`);
        if (menu && menu.parentElement) {
          menu.parentElement.style.display = 'none';
        }
      });

      menu.appendChild(button);
    }

    function observeMenus() {
      const observer = new MutationObserver(() => {
        const menu = document.querySelector('yt-list-view-model');
        if (menu && lastRenderer) {
          tagVideo(lastRenderer);
          const channel = lastRenderer.dataset.detube;
          if (channel) {
            injectOrUpdateButton(channel);
          }
          lastRenderer = null;
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    }

    function main() {
      document.body.addEventListener('click', e => {
        const dot = e.target.closest('div.yt-spec-touch-feedback-shape__fill');
        if (!dot) return;
        const renderer = dot.closest('yt-lockup-view-model');
        if (renderer) {
          tagVideo(renderer);
          lastRenderer = renderer;
        }
      }, true);

      (async () => {
        await loadBlocked();
        tagAllVideos();
        applyCSS();
        observeMenus();
        log('Ready. Click "⋮" on a video to block channel.');
      })();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', main);
    } else {
      main();
    }
  })();

})();
