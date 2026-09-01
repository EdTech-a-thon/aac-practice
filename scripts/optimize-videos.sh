#!/usr/bin/env bash
set -euo pipefail

root="$(dirname "$0")/.."

# The celebration videos ship as multi-megabyte 1080p/4K masters, which is far
# more than a few seconds of fullscreen background animation needs. Re-encode
# them in place at 720p30 and drop the audio track (Celebration.svelte plays the
# <video> muted and takes its sound from the matching mp3 instead).
#
# Already-optimised files carry a "bridge-optimized" comment so re-running this
# script does not compound the compression.
convert_video() {
  local file="$1"
  local tmp="${file%.mp4}.optimizing.mp4"

  if ffprobe -v error -show_entries format_tags=comment -of default=nw=1:nk=1 "$file" | grep -q bridge-optimized; then
    return
  fi

  # The fps filter takes no expressions, so only insert it for sources that
  # actually run above 30fps.
  local rate
  rate="$(ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of default=nw=1:nk=1 "$file")"
  local filters="scale='min(1280,iw)':-2:flags=lanczos"
  if (( $(echo "$rate" | awk -F/ '{ print ($1 / $2 > 30.5) }') )); then
    filters="$filters,fps=30"
  fi

  ffmpeg -y -v error -i "$file" \
    -an \
    -vf "$filters" \
    -c:v libx264 -preset slow -crf 30 -profile:v high -level 4.0 -pix_fmt yuv420p \
    -metadata comment=bridge-optimized \
    -movflags +faststart \
    "$tmp"
  mv "$tmp" "$file"
}

shopt -s nullglob
for file in "$root"/static/*/*.mp4; do
  convert_video "$file"
done
