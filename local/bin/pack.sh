#!/bin/sh

npm run build
theme_version=$(npm pkg get version --workspaces=false | tr -d \")
theme_name=$(npm pkg get name --workspaces=false | tr -d \")

current_dir=$(dirname $0)

cd ../ || exit

echo "Zip Theme $theme_name $theme_version"
out="$theme_name-$theme_version.zip"
zip -r "$out" theme
mv "$out" "$current_dir"