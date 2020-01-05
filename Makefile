build-up:
	docker-compose up --build

up:
	docker-compose up

down:
	docker-compose down


build-server:
	docker-compose build api

build-client:
	docker-compose build client

build-worker:
	docker-compose build worker
