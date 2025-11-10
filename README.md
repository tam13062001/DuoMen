# Start ứng dụng

Yêu cầu:

- Đã cài đặt docker

Làm theo các bước sau để start wordpress dev

Cài đặt biến môi trường, có thể sao chép file mẫu bằng lệnh sau: 
```text
cp .env.example .env
```

Vào trong file : docker-compose.yml chạy run service của php admin 
<img src="image.png" alt="docker-compose up -d" />

Start ứng dụng: 
```text
docker-compose up -d
```
Khởi tạo project :
```text
npm start
```
Các đường dẫn :
```text
Url local : localhost:8000
Url DB : localhost:8001
```
Nhập data vào DB :
```text
Vào thư mục HR-Rocket\local\bin
file các table : init.template.sql
file data tạm thời : data.template.sql
```
Nếu bị lỗi không tìm thấy database thì cần phải tạo mới database đó:

```text

# List docker container
docker ps

CONTAINER ID   IMAGE                          COMMAND                  CREATED          STATUS          PORTS                  NAMES
01fdb7949bae   phpmyadmin/phpmyadmin:latest   "/docker-entrypoint.…"   6 minutes ago    Up 6 minutes    0.0.0.0:8001->80/tcp   wp-boilerplate-phpmyadmin-1
2c1717ee9e54   mysql:5.7                      "docker-entrypoint.s…"   7 minutes ago    Up 7 minutes    3306/tcp, 33060/tcp    wp-boilerplate-db-1
d8f8623b5a3e   wordpress:latest               "docker-entrypoint.s…"   10 minutes ago   Up 10 minutes   0.0.0.0:8000->80/tcp   wp-boilerplate-wordpress-1

```


## Resources

```text
Dashicons: https://developer.wordpress.org/resource/dashicons/#admin-generic
```

screenshot.png

size: 1200x900

## Build theme:

Mã nguồn được build bằng lệnh
```text
npm run build
```

Sau đó zip thư mục theme lại và cài đặt lên wordpress
