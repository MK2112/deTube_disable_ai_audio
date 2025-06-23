# YT Disable AI Audio

**YT Disable AI Audio** is a userscript to disable automatically activated AI voiceovers (translated audio tracks) on YouTube. 
The script forces playback using the original audio track on PC and Android.

Many videos now default to AI-generated voiceovers based on your region or device language.<br>
While intended to improve accessibility, this can result in:

- Mismatched or low-quality AI narrations,
- Removal of the creator's original voice,
- Disruption in tone, nuance, humor, pace or entertainment,
- All of the above.

## How it works

This userscript operates by altering the default audio track selection on the client side, without modifying anything but the audiotrack selection, right when the video starts playing.<br>
It doesn't interact with YouTube's API services, because they don't offer any setting for the audiotrack in the first place. Instead, the script briefly emulates a computer mouse, changing settings on the user's behalf.

## Supported Browsers

- Firefox
- ~~Chrome~~
- Brave
- Edge
- Safari

## Installation

To use this userscript, you will need a userscript manager extension installed in your browser:

- [Violentmonkey](https://violentmonkey.github.io/)
- [Greasemonkey (for Firefox)](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)

### Steps:

1. Install a userscript manager from above.
2. Install this script from [GreasyFork.org](https://greasyfork.org/scripts/540430-yt-disable-ai-audio)
3. Alternative to step 2, from here on: Create a new, empty userscipt in the manager.
4. Copy-paste the script into the empty userscript.
5. Enjoy YouTube with the original voices intact.

Thank you to [polymegos](https://github.com/polymegos) for keeping this project up-to-date over on [GreasyFork.org](https://greasyfork.org/scripts/540430-yt-disable-ai-audio).

## Technical Notes

```
yt_disable_ai_audio/
├── yt_disable_ai_audio.js  # Main userscript file
├── README.md               # This file
└── LICENSE                 # MIT License
```

- The script hooks into YouTube’s player configuration before the page fully loads to avoid race conditions.
- It monitors navigation events (important for SPA behavior) to maintain behavior on dynamically loaded pages.
- It does **not** collect or transmit any user data at any point

## License

MIT.
