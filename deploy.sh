git pull origin $ENVIROMENT_APP

docker-compose down

docker-compose up -d --build

docker-compose logs -f
