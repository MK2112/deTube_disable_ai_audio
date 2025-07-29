
// JSDOM requires TextEncoder and TextDecoder, which are not available in the default test environment.
// This polyfill makes them available globally for the tests to use.
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Load the userscript's content directly from the file to test its actual code.
const scriptPath = path.resolve(__dirname, '../deTube_disable_ai_audio.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

/**
 * Generates a mock HTML structure of a YouTube page.
 * This allows tests to control the environment and simulate different scenarios.
 * @param {string[]} menuItems - An array of strings to create the main settings menu items.
 * @param {string[]} submenuItems - An array of strings to create the audio track submenu items.
 * @returns {string} A string of HTML representing a simplified YouTube page.
 */
const getHtml = (menuItems = [], submenuItems = []) => {
    const menuItemsHTML = menuItems.map(item => `<div class="ytp-menuitem" role="menuitem"><div class="ytp-menuitem-label">${item}</div></div>`).join('');
    const submenuItemsHTML = submenuItems.map(item => `<div class="ytp-menuitem" role="menuitem"><div class="ytp-menuitem-label">${item}</div></div>`).join('');

    return `
    <!DOCTYPE html>
    <html>
    <head><title>YouTube</title></head>
    <body>
      <div id="movie_player">
        <video src=""></video>
        <div class="ytp-chrome-bottom">
          <div class="ytp-right-controls">
            <button class="ytp-settings-button"></button>
          </div>
        </div>
        <div class="ytp-settings-menu" style="display: none;">
          <div class="ytp-panel" id="main-menu">
            ${menuItemsHTML}
          </div>
          <div class="ytp-panel" id="audio-submenu" style="display: none;">
            ${submenuItemsHTML}
          </div>
        </div>
      </div>
    </body>
    </html>
`};

// Main test suite for the userscript.
describe('deTube Disable AI Audio Userscript', () => {
    let window, document, video, dom;

    /**
     * Sets up the JSDOM environment for each test.
     * It creates a virtual DOM, injects the userscript, and mocks the console.
     * @param {string} url - The URL to simulate, which determines if the script should run.
     * @param {string} html - The HTML structure for the virtual page.
     */
    const setupDOM = (url, html) => {
        dom = new JSDOM(html, { url, runScripts: 'dangerously', pretendToBeVisual: true });
        window = dom.window;
        document = window.document;

        // Patch: Ensure userAgent includes 'jsdom'
        Object.defineProperty(window.navigator, 'userAgent', {
            value: 'node.js jsdom',
            configurable: true
        });

        // Mock the console methods to spy on script output during tests.
        window.console.log = jest.fn();
        window.console.warn = jest.fn();
        window.console.error = jest.fn();

        // Inject the userscript into the simulated DOM after DOM is ready.
        const scriptEl = document.createElement('script');
        scriptEl.textContent = scriptContent;
        document.body.appendChild(scriptEl);

        // Trigger DOMContentLoaded to run the script's initialization logic.
        document.dispatchEvent(new window.Event('DOMContentLoaded'));
        video = document.querySelector('video');

        // Debug: log userAgent for verification
        // eslint-disable-next-line no-console
        window.console.log('DEBUG-TEST-USERAGENT', window.navigator.userAgent);
    };

    // Use fake timers to control setTimeout and other time-based functions in the script.
    beforeEach(() => {
        jest.useFakeTimers();
    });

    // Restore real timers and clear all mocks after each test to ensure a clean slate.
    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
        if (typeof document !== 'undefined' && document.body) {
            document.body.innerHTML = '';
        }
        global.dom = undefined;
        global.window = undefined;
        global.document = undefined;
        global.video = undefined;
    });

    /**
     * Helper function to ensure all asynchronous operations (like promises and timers) are flushed.
     * This is crucial for testing code that has delays or waits for events.
     */
    const flushAll = async () => {
        for (let i = 0; i < 10; i++) { // Loop to handle nested async operations
            await new Promise(resolve => jest.requireActual('timers').setImmediate(resolve));
            jest.runAllTimers();
        }
    };

    // Test case to ensure the script activates on a standard YouTube video page.
    test('should initialize on a video page', async () => {
        setupDOM('https://www.youtube.com/watch?v=test', getHtml());
        await flushAll();
        const w8 = window.console.log.mock.calls.some(call =>
          call.some(arg => typeof arg === 'string' && arg.includes('New video page detected. Monitoring for playback.'))
        );
        expect(w8).toBeTruthy();
    });


    // Test case to ensure the script does not activate on non-video pages.
    test('should not initialize on a non-video page', async () => {
        setupDOM('https://www.youtube.com/feed/subscriptions', getHtml());
        await flushAll();
        const w9 = window.console.log.mock.calls.some(call =>
          call.some(arg => typeof arg === 'string' && arg.includes('New video page detected. Monitoring for playback.'))
        );
        expect(w9).toBeFalsy();
    });

    // A suite of tests to verify the script works correctly across all specified domains.
    describe('URL Matching for Different Domains', () => {
        const testCases = [
            {
                description: 'should initialize on youtube-nocookie.com embed page',
                url: 'https://www.youtube-nocookie.com/embed/test',
                shouldInit: true
            },
            {
                description: 'should initialize on mobile youtube.com watch page',
                url: 'https://m.youtube.com/watch?v=test',
                shouldInit: true
            },
            {
                description: 'should initialize on music.youtube.com watch page',
                url: 'https://music.youtube.com/watch?v=test',
                shouldInit: true
            },
            {
                description: 'should NOT initialize on music.youtube.com non-watch page',
                url: 'https://music.youtube.com/feed/library',
                shouldInit: false
            }
        ];

        // Iterate through the test cases to avoid repetitive code.
        testCases.forEach(({ description, url, shouldInit }) => {
            test(description, async () => {
                setupDOM(url, getHtml());
                await flushAll();
                if (shouldInit) {
                    const wasCalledWithSubstring = window.console.log.mock.calls.some(call =>
                      call.some(arg => typeof arg === 'string' && arg.includes('New video page detected. Monitoring for playback.'))
                    );
                    expect(wasCalledWithSubstring).toBeTruthy();
                } else {
                    const wasCalledWithSubstring = window.console.log.mock.calls.some(call =>
                      call.some(arg => typeof arg === 'string' && arg.includes('New video page detected. Monitoring for playback.'))
                    );
                    expect(wasCalledWithSubstring).toBeFalsy();
                }
            });
        });
    });

    // A suite of tests for the main logic of the script: finding and switching the audio track.
    describe('Core Audio Switching Functionality', () => {

        /**
         * Helper function to set up the DOM and simulate the click behavior of YouTube's menus.
         * This makes the tests more realistic by mimicking how the DOM changes during user interaction.
         */
        const setupClickSimulations = (menuItems, submenuItems) => {
            setupDOM('https://www.youtube.com/watch?v=test', getHtml(menuItems, submenuItems));

            const settingsButton = document.querySelector('.ytp-settings-button');
            const settingsMenu = document.querySelector('.ytp-settings-menu');
            const mainMenu = document.getElementById('main-menu');
            const audioSubmenu = document.getElementById('audio-submenu');

            // Always start with only main menu visible
            mainMenu.style.display = 'block';
            audioSubmenu.style.display = 'none';
            settingsMenu.style.display = 'none';

            // When the settings button is clicked, show main menu, hide submenu
            settingsButton.addEventListener('click', () => {
                settingsMenu.style.display = 'block';
                mainMenu.style.display = 'block';
                audioSubmenu.style.display = 'none';
                settingsMenu.offsetParent = settingsMenu; // Make it "visible" to the script
            });

            // If an audio track menu item exists, clicking it shows the audio submenu
            const audioTrackMenuItem = [...document.querySelectorAll('.ytp-menuitem-label')].find(el => el.textContent.includes('Audio'));
            if (audioTrackMenuItem) {
                audioTrackMenuItem.parentElement.addEventListener('click', () => {
                    mainMenu.style.display = 'none';
                    audioSubmenu.style.display = 'block';
                });
            }
        };

        // Tests the ideal scenario: the script finds and selects the "Original" audio track.
        test('should successfully find and switch to "Original" audio', async () => {
            setupClickSimulations(['Audio track'], ['Dubbed', 'Original']);
            video.dispatchEvent(new window.Event('playing'));
            await flushAll();

            expect(window.console.error).not.toHaveBeenCalled();
            const w1 = window.console.log.mock.calls.some(call =>
              call.some(arg => typeof arg === 'string' && arg.includes('Switched to original audio track'))
            );
            expect(w1).toBeTruthy();
        });

        // Tests how the script behaves if the "Audio track" menu item is missing.
        test('should gracefully handle no "Audio track" menu item', async () => {
            setupClickSimulations([], []);
            video.dispatchEvent(new window.Event('playing'));
            await flushAll();

            expect(window.console.error).not.toHaveBeenCalled();
            const w2 = window.console.warn.mock.calls.some(call =>
              call.some(arg => typeof arg === 'string' && arg.includes('Audio track menu item not found'))
            );
            expect(w2).toBeTruthy();
        });

        // Tests how the script behaves if the "Original" audio option is not available.
        test('should gracefully handle no "Original" audio track', async () => {
            setupClickSimulations(['Audio track'], ['Dubbed']);
            video.dispatchEvent(new window.Event('playing'));
            await flushAll();

            expect(window.console.error).not.toHaveBeenCalled();
            const w3 = window.console.warn.mock.calls.some(call =>
              call.some(arg => typeof arg === 'string' && arg.includes('Original audio track not found'))
            );
            expect(w3).toBeTruthy();
        });

        // Ensures the script does not run again if the video is paused and resumed.
        test('should only attempt to switch audio once per video', async () => {
            setupClickSimulations(['Audio track'], ['Original']);
            video.dispatchEvent(new window.Event('playing'));
            await flushAll();
            const w4 = window.console.log.mock.calls.some(call =>
              call.some(arg => typeof arg === 'string' && arg.includes('Switched to original audio track'))
            );
            expect(w4).toBeTruthy();

            // Clear the mock to check for new calls.
            window.console.log.mockClear();

            video.dispatchEvent(new window.Event('playing'));
            await flushAll();
            const w5 = window.console.log.mock.calls.some(call =>
              call.some(arg => typeof arg === 'string' && arg.includes('Switched to original audio track'))
            );
            expect(w5).toBeFalsy();
        });

        // Verifies the script re-activates when the user navigates to a new video page.
        test('should run again on a new video page (navigation)', async () => {
            setupClickSimulations(['Audio track'], ['Original']);
            video.dispatchEvent(new window.Event('playing'));
            await flushAll();
            const w6 = window.console.log.mock.calls.some(call =>
              call.some(arg => typeof arg === 'string' && arg.includes('Switched to original audio track'))
            );
            expect(w6).toBeTruthy();

            // Simulate a page navigation in YouTube.
            dom.reconfigure({ url: 'https://www.youtube.com/watch?v=video2' });
            document.dispatchEvent(new window.Event('yt-navigate-finish'));
            await flushAll();
            const w7 = window.console.log.mock.calls.some(call =>
              call.some(arg => typeof arg === 'string' && arg.includes('New video page detected. Monitoring for playback.'))
            );
            expect(w7).toBeTruthy();
        });
    });
});
