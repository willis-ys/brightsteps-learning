# BrightSteps 2.0

An offline-first, touch-friendly British phonics and adaptive maths app for an early learner.

## Included

- Structured phonics trails from first sounds through common digraphs
- One consistent UK phonics sound set
- Sound recognition and same-voice phoneme blending
- 30-question adaptive maths sessions and 10-question daily sessions
- Stars, gems, badges, streaks and a reward garden
- Parent dashboard, audio diagnostics and progress export
- PWA support for iPad Home Screen installation
- No analytics, accounts or cloud storage

## Publish on GitHub Pages

1. Upload every extracted file and folder to the root of `willis-ys/brightsteps-learning`. Keep `.github/workflows/deploy-pages.yml`.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Open **Actions → Deploy BrightSteps 2.0** and run the workflow, or make another commit.
4. Open `https://willis-ys.github.io/brightsteps-learning/`.

During deployment, the workflow downloads the MIT-licensed UK phonics files into the site artifact. Lessons then play only local files from your own GitHub Pages site. After the first complete load, the service worker caches the app and audio for offline use.

## Put audio files directly in the repository (optional)

Windows PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\fetch-audio.ps1
```

macOS/Linux:

```bash
bash scripts/fetch-audio.sh
```

Commit the resulting `audio/phonemes/*.m4a` files. The app then also works with simple “Deploy from a branch” hosting.

## Audio licence

See `THIRD_PARTY_NOTICES.md`.
