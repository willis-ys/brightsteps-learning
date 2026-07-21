#!/usr/bin/env bash
set -euo pipefail
TARGET="${1:-audio/phonemes}"
BASE="https://raw.githubusercontent.com/hellodeborahuk/buzzphonics/main/public/sounds"
FILES=(a ai air ar b c ch d e ear ee er f g h i igh j l m n ng o oa oi oo ooo or ow p qu r s sh t th u ur ure v w x y z)
mkdir -p "$TARGET"
for name in "${FILES[@]}"; do
  echo "Downloading $name.m4a"
  curl -fL --retry 5 --retry-delay 2 "$BASE/$name.m4a" -o "$TARGET/$name.m4a"
  test -s "$TARGET/$name.m4a"
done
echo "Installed ${#FILES[@]} local phonics files in $TARGET"
