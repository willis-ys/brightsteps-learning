# BrightSteps 3.2

BrightSteps 3.2 is an iPad-friendly, offline-capable early-learning app for GitHub Pages.

## Changes in 3.2

- Story House has been rewritten around short, connected events that a five-year-old can follow.
- Each story now has:
  - a spoken Owl introduction that explains the situation;
  - one character or situation carried through every page;
  - page-specific picture scenes;
  - tappable individual words;
  - a tappable picture that reads the complete sentence;
  - clearly marked heart words introduced before reading.
- The first read earns two stars; rereading earns one star and supports fluency.
- Completed stories are marked on the Story House shelf.
- Phonics interactions remain content-led: tap letters for sounds and words or pictures for whole-word pronunciation.
- The healthy screen-time cycle remains enabled: 20 minutes of active use, then a five-minute minimum eye break, with ten minutes recommended.
- Existing BrightSteps progress, stars, garden items, phonics progress and screen-time state are retained.

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
