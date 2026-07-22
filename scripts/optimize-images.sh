#!/usr/bin/env bash
set -euo pipefail

root="$(dirname "$0")/.."

convert_image() {
  local input="$1"
  local output="$2"
  if [[ ! -f "$output" || "$input" -nt "$output" || "$0" -nt "$output" ]]; then
    if [[ "$input" == *"/School/glue.png" ]]; then
      # Remove one unsupported SVG attribute before rendering and trimming this image.
      perl -pe 's/\s*stroke-linejoin="null"//g' "$input" | \
        convert svg:- -fuzz 10% -trim +repage -resize '1600x>' -quality 80 "$output"
    else
      convert "$input" -fuzz 10% -trim +repage -resize '1600x>' -quality 80 "$output" 2>/dev/null
    fi
  fi
}

shopt -s nullglob
for file in "$root"/public/*/*.{jpg,jpeg,png}; do
  dir="$(dirname "$file")"
  name="$(basename "$file")"
  base="${name%.*}"
  if [[ "$dir" == *"People" && ( "$base" == "astronaut" || "$base" == "scientist" ) ]]; then
    continue
  fi

  convert_image "$file" "$dir/$base.webp"
done
