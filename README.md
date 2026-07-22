# BrightSteps 3.0

BrightSteps 3.0 is a complete rewrite for iPad and GitHub Pages.

## Main changes

- Every phonics example includes a whole-word pronunciation button.
- Blending plays the individual phonemes and then reads the complete word.
- The same device read-aloud voice is used for words, stories and maths.
- Maths includes 10-question and 30-question sessions with automatic read-aloud.
- My Garden keeps every completed plant permanently and includes animals to unlock and feed.
- Stars are the only spendable reward. There is no daily gift or gem currency.
- Story House provides short read-together stories as phonics trails are completed.
- Existing BrightSteps 2.x progress is migrated automatically.

## Update an existing GitHub repository

Replace these files in the repository root:

- `index.html`
- `styles.css`
- `app.js`
- `service-worker.js`
- `manifest.webmanifest`
- `README.md`

Keep your existing `.github/workflows/deploy-pages.yml`. It will continue placing the local phonics files into `audio/phonemes/` during deployment.

Do not clear Safari website data unless necessary, because progress is stored locally in the browser. After deployment, refresh Safari twice and reopen the Home Screen app.
