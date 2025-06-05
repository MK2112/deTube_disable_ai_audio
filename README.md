# YT Disable AI Voice

**YT Disable AI Voice** is a userscript to disable automatically activated AI voiceovers (translated audio tracks) on YouTube.<br>
The script forces playback using the original audio track.

Many videos now default to AI-generated voiceovers based on your region or language preferences. While intended to improve accessibility, this can result in:

- Mismatched or low-quality AI narrations
- Removal of the creator's original voice
- Disruption in tone, nuance, humor, pace or entertainment

**YT Disable AI Voice** restores the original audio by overriding the automatic selection of dubbed audio tracks.

## How it works

The YT Disable AI Voice userscript operates by altering the default audio track selection on the client side, without modifying anything but the audiotrack selection.<br>
It doesn't interact with YouTube's API services, because that wouldn't allow for setting the audiotrack in the first place, but instead adjusts playback preferences within the user's browser session.
The script was tested on PC and Android.

## Supported Browsers

- Firefox
- Chrome
- Edge
- Safari

## Installation

To use this userscript, you will need a userscript manager extension installed in your browser:

- [Violentmonkey](https://violentmonkey.github.io/)
- [Greasemonkey (for Firefox)](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)

### Steps:

1. Install a userscript manager above.
2. Create a new, empty userscipt in the manager.
3. Copy-paste the script into the empty userscript.
4. Enjoy YouTube with the original voices intact.

## Technical Notes

```
yt_disable_ai_voice/
├── yt_disable_ai_voice.js  # Main userscript file
├── README.md               # This file
└── LICENSE                 # MIT License
```

- The script hooks into YouTube’s player configuration before the page fully loads to avoid race conditions.
- It monitors navigation events (important for SPA behavior) to maintain behavior on dynamically loaded pages.
- It does **not** collect or transmit any user data at any point

## 📄 License

MIT.
