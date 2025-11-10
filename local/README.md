# Start ứng dụng

Yêu cầu:

- Đã cài đặt docker

Làm theo các bước sau để start wordpress dev

1. Tạo network: docker network create wp_net
2. Tạo volume để lưu trữ database: docker volume create wp_db

Cài đặt biến môi trường, có thể sao chép file mẫu bằng lệnh sau: 
```text
cp .env.example .env
```

Start ứng dụng: 
```text
docker-compose up -d
```

Nếu bị lỗi không tìm thấy database thì cần phải tạo mới database đó:

```text

# List docker container
docker ps

CONTAINER ID   IMAGE                          COMMAND                  CREATED          STATUS          PORTS                  NAMES
01fdb7949bae   phpmyadmin/phpmyadmin:latest   "/docker-entrypoint.…"   6 minutes ago    Up 6 minutes    0.0.0.0:8001->80/tcp   wp-boilerplate-phpmyadmin-1
2c1717ee9e54   mysql:5.7                      "docker-entrypoint.s…"   7 minutes ago    Up 7 minutes    3306/tcp, 33060/tcp    wp-boilerplate-db-1
d8f8623b5a3e   wordpress:latest               "docker-entrypoint.s…"   10 minutes ago   Up 10 minutes   0.0.0.0:8000->80/tcp   wp-boilerplate-wordpress-1


# connect to container

docker exec -it 2c1 sh

mysql -u root -p
> Type your password

create database test;

```

Tạo shortcut để tiện cho việc lập trình:

```text

```
