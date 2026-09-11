#!/usr/bin/env bash
set -euo pipefail

root="$(dirname "$0")/.."

# The full-size source pictures live in image-sources/<topic>/ so they are not
# published with the site. Each one becomes a trimmed webp in static/<topic>/,
# no bigger than 1200px on its longest side, which is the copy the app loads.
convert_image() {
  local input="$1"
  local output="$2"
  if [[ ! -f "$output" || "$input" -nt "$output" || "$0" -nt "$output" ]]; then
    if [[ "$input" == *"/Colors/"* ]]; then
      # A solid color is the picture itself, not a background to trim away.
      convert "$input" -resize '1200x1200>' -define webp:lossless=true "$output"
    elif [[ "$input" == *"/School/glue.png" ]]; then
      # Remove one unsupported SVG attribute before rendering and trimming this image.
      perl -pe 's/\s*stroke-linejoin="null"//g' "$input" | \
        convert svg:- -fuzz 10% -trim +repage -resize '1200x1200>' -quality 75 "$output"
    else
      convert "$input" -fuzz 10% -trim +repage -resize '1200x1200>' -quality 75 "$output" 2>/dev/null
    fi
  fi
}

shopt -s nullglob
for file in "$root"/image-sources/*/*.{jpg,jpeg,png}; do
  topic="$(basename "$(dirname "$file")")"
  name="$(basename "$file")"
  convert_image "$file" "$root/static/$topic/${name%.*}.webp"
done
