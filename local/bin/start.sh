#!/bin/sh

docker network inspect wp_net > /dev/null 2>&1 || docker network create wp_net
docker volume inspect wp_db > /dev/null 2>&1 || docker volume create wp_db

basedir=$(dirname $0)
env_path=$(realpath "$basedir/../.env")

if [ ! -f "$env_path" ]; then
  example_env_path=$(realpath "$basedir/../.env.example")
  cp "$example_env_path" "$env_path"
  echo "copy example env"
fi

# Load new env
export $(cat "$env_path" | xargs)


if [ ! -f "$basedir/../theme/style.css" ]; then

  init_theme_template_file=$(realpath "$basedir/../local/style.template.css")
  envsubst < "$init_theme_template_file" > "$basedir/../theme/style.css"

  echo "create theme style"

fi



#docker-compose up -d
#sleep 5