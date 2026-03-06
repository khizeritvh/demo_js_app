up:
	docker start jenkins
	docker compose -f ./docker-testapp-main/compose.yml up -d

down:
	docker compose -f ./docker-testapp-main/compose.yml down
	docker stop jenkins

clean:
	docker compose -f ./docker-testapp-main/compose.yml down -v 
	docker stop jenkins

status:
	docker ps
