# BrightSteps 3.4.1

BrightSteps is an iPad-friendly, offline-capable early-learning app for GitHub Pages.

## Changes in 3.4.1

- Fixed garden animals appearing to walk backwards. Their facing direction now changes exactly when their travel direction changes.
- Fixed the previous turn-around animation, which flipped an animal while it was still moving in the opposite direction.
- Animal names no longer flip backwards with the emoji.
- Each of the four garden animals now has its own roaming lane, reducing collisions and overlap.
- The selected garden animal is easier to identify.
- Feeding and animal-arrival feedback now works in both the animal card and the living garden.
- Fixed garden watering feedback: the growth animation had been attached to the wrong container selector.
- Added reduced-motion behaviour so the animals remain visible without continuous movement when the device requests reduced motion.
- Version numbers and offline cache identifiers are now consistent at 3.4.1.

## Retained features

- Always-open Sound Explorer with A-Z and additional phonics sounds.
- Guided Phonics Forest paths.
- Interactive Story House.
- Maths Mountain.
- Permanent garden collection and animal happiness.
- 20-minute learning session and five-minute minimum eye break.
- Existing local progress, stars, plants, animals and phonics progress remain compatible.

## Update an existing GitHub repository

Replace the files supplied in the update patch in the repository root. Keep the existing `.github/workflows/deploy-pages.yml` and phonics audio deployment.

Do not clear Safari website data unless necessary because progress is stored locally. After GitHub Pages deploys, refresh Safari and reopen the Home Screen app so the new service-worker cache is activated.
