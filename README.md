# BrightSteps 3.3

BrightSteps 3.3 is an iPad-friendly, offline-capable early-learning app for GitHub Pages.

## Changes in 3.3

- Added **Sound Explorer** as a second tab inside Phonics Forest.
- Sound Explorer is deliberately **not locked** and is **not a test**. Every sound can be played from the beginning.
- The A-to-Z grid lets a child tap any letter and immediately hear its phonics pronunciation.
- Tapping the picture under a letter reads the example word aloud.
- `q` uses the early-phonics `qu` sound and is labelled accordingly.
- Added an always-open **More phonics sounds** section for `sh`, `ch`, `th`, `ng`, vowel digraphs and other taught spellings.
- Listening in Sound Explorer does not award stars, affect scores or change lesson progress.
- Guided Learn Paths remain available as before for structured progression.
- The 3.2 Story House rewrite and the 20-minute learning / five-minute minimum eye-break system are retained.
- Existing progress, stars, garden items, phonics progress and screen-time state are retained.

## Update an existing GitHub repository

Replace these files in the repository root:

- `index.html`
- `styles.css`
- `app.js`
- `service-worker.js`
- `manifest.webmanifest`
- `README.md`

Keep the existing `.github/workflows/deploy-pages.yml`. It will continue placing the local phonics files in `audio/phonemes/` during deployment.

Do not clear Safari website data unless necessary because progress is stored locally. After GitHub Pages deploys, refresh Safari twice and reopen the Home Screen app.
