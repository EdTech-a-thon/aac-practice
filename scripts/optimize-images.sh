#!/usr/bin/env bash
set -euo pipefail

root="$(dirname "$0")/.."

convert_image() {
  local input="$1"
  local output="$2"
  if [[ ! -f "$output" || "$input" -nt "$output" ]]; then
    ffmpeg -y -i "$input" -vf "scale='min(1600,iw)':-2:flags=lanczos" -frames:v 1 -c:v libwebp -q:v 80 "$output" >/dev/null 2>&1
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
