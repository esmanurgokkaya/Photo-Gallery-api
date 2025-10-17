docker exec -it mysql-container sh -c "mysql -u gallery_user -pgallery_pass photo_gallery"

docker exec -it mysql-container sh -c "mysql -u root -pmy-secret-pw"

SHOW DATABASES;

USE photo_gallery;
SHOW TABLES;

