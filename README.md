# deTube Disable AI Audio

**deTube Disable AI Audio** is a userscript to disable automatically activated AI voiceovers (translated audio tracks) on YouTube. 
The script forces playback using the original audio track on PC and Android.

Many videos now default to AI-generated voiceovers based on your region or device language.<br>
While intended to improve accessibility, this can result in:

- **Mismatched or low-quality AI narrations,**
- **Removal of the creator's original voice,**
- **Disruption in tone, nuance, humor, pace or entertainment,**
- **All of the above.**

## How the script works

This userscript operates by altering the default audio track selection on the client side, right when the video starts playing.<br>
It doesn't interact with YouTube's API services, because they don't offer any public option for setting the audiotrack in the first place.<br>
Instead, the script briefly emulates a computer mouse, changing settings on the user's behalf, as soon as the video starts playing.

## Supported Browsers

- Firefox
- ~~Chrome~~
- Brave
- Edge
- Safari

## Installation

To use this userscript, you will need a userscript manager extension installed in your browser:

- [Violentmonkey (Firefox)](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
- [Tampermonkey (Firefox)](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- [Greasemonkey (Firefox)](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
- [Violentmonkey (Chromium-based)](https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
- [Tampermonkey (Chromium-based)](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)

### Steps:

1. Install a userscript manager from above.
3. Create a new, empty userscipt in the manager.
4. Copy-paste the latest release of this script (the contents of the `.js` file from this repository) into the empty userscript.
5. Enjoy videos with their original audio.

## Repository Structure

```
deTube_disable_ai_audio/
├── deTube_disable_ai_audio.js          # Main userscript file, install this one
├── test/
│   └── deTube_disable_ai_audio.test.js # Tests for the userscript
├── .github/
│   └── workflows/
│       └── test.yml                    # GitHub Actions workflow for CI
├── .gitignore
├── LICENSE                             # MIT
└── README.md                           # This file
```

- The script monitors navigation events (important for SPA behavior) to maintain behavior on dynamically loaded YT pages.
- The script only ever runs on YT pages, solely event-based, related to nothing but the videoplayer.
- The script does **not** collect or transmit any user data at any point.

## Running Tests

To run the tests for this userscript, you will need to have [Node.js](https://nodejs.org/) installed.

1. Navigate to the `test` directory: `cd test`
2. Install the dependencies: `npm install`
3. Run the tests: `npm test`

## License

MIT.

This software is provided "as is", without warranty of any kind.<br>
**Use at your own risk.** Intended for educational use.<br>
You assume full responsibility for compliance with YouTube's Terms of Service and for any consequences arising from its use.
