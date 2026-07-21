# BrightSteps 2.0.1

This edition uses an automatic GitHub Pages workflow. **Do not run the PowerShell script and do not manually upload the phonics files.**

## Publish

1. Upload every file and folder in this package to the root of `willis-ys/brightsteps-learning`.
2. Confirm this workflow exists in the repository:
   `.github/workflows/deploy-pages.yml`
3. Open **Settings → Pages** and select **GitHub Actions** as the source.
4. The workflow starts automatically after a commit. Alternatively, open **Actions → Deploy BrightSteps 2.0.1 → Run workflow**.
5. Wait for the **build** and **deploy** jobs to show green check marks.
6. Open `https://willis-ys.github.io/brightsteps-learning/`.

The workflow checks out the MIT-licensed Buzzphonics repository and copies its UK Phase 2 and Phase 3 `.m4a` recordings into the deployed site. The browser therefore plays files from your own GitHub Pages site, not from a third-party server.

## Troubleshooting

- **No workflow appears:** `.github/workflows/deploy-pages.yml` was not uploaded.
- **Workflow failed:** open the failed run, select the red `build` or `deploy` job, and read the first red step.
- **Old app remains on iPad:** remove the Home Screen icon, clear website data for `willis-ys.github.io`, open the site in Safari, and add it again.

See `THIRD_PARTY_NOTICES.md` for audio attribution.
