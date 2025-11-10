#!/bin/sh

dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Resize video
video_assets_dir=$(realpath "$dir/../assets/videos")
video_out_dir=$(realpath "$dir/../theme/assets/videos")

#ffmpeg -i "$video_assets_dir/cloud_banner_video.mp4" -filter:v scale=1280:-2 -c:a copy "$video_out_dir/cloud_banner_video.mp4"
#ffmpeg -i "$video_assets_dir/homepage_data_ai.mp4" -filter:v scale=1280:-2 -c:a copy "$video_out_dir/homepage_data_ai.mp4"
ffmpeg -i "$video_assets_dir/software_banner_video.mov" -filter:v scale=1280:-2 -c:a copy "$video_out_dir/software_banner_video.mp4"

# Resize images
#ffmpeg -y -i ./public/images/2.jpg -vf scale=720:-1 ./public/images/2.jpg