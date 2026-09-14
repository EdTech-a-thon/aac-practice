#!/usr/bin/env bash
set -euo pipefail

# Numbers and letters are just one big character on a card, so they are written
# out here instead of being drawn by hand. Re-run this script after changing the
# colour, the font, or the list of characters:
#
#   bash scripts/make-glyph-images.sh
#
# Every file it writes belongs to a topic in src/lib/topics.js.

root="$(dirname "$0")/.."
ink="#18312d"
font="Arial, Helvetica, system-ui, sans-serif"

write_glyph() {
  local path="$1" character="$2" size="$3"
  cat > "$path" <<SVG
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="$character">
  <text x="200" y="200" text-anchor="middle" dominant-baseline="central"
        font-family="$font" font-size="$size" font-weight="700" fill="$ink">$character</text>
</svg>
SVG
}

mkdir -p "$root/static/Numbers" "$root/static/Letters"

numbers=(one two three four five six seven eight nine ten)
for index in "${!numbers[@]}"; do
  digits="$((index + 1))"
  size=300
  [[ ${#digits} -gt 1 ]] && size=230
  write_glyph "$root/static/Numbers/${numbers[$index]}.svg" "$digits" "$size"
done

for letter in {a..z}; do
  write_glyph "$root/static/Letters/$letter.svg" "$(printf '%s' "$letter" | tr '[:lower:]' '[:upper:]')" 300
done
