# Health Sword Challenge

## Dependencies

- Docker
- Docker Compose

## How to run the tests

1. Run `npm test` inside the project folder

## How to run

1. Inside the project folder run `npm i`
2. Rename `.env.sample` to `.env`
3. Inside project folder run `docker-compose up`

## How to use

1. Import Postman collection `Sword challenge.postman_collection.json` that is in the root dir
2. Follow the demo video on the next section, basically this API allows to create users, login and manage tasks, the flow is following
   1. Create users a Manager and a Technician
   2. Login to get the token and use it on the next requests
   3. Create tasks
   4. Update tasks, technicians can only update their own tasks, if a task status is changed to `finished` a message will be queued to inform this event.

## Demo

## Note

There only one consumer that prints the cosumed messages, to see them check the appication container (`swordhealth-challenge_app`) logs (`docker logs -f <container ID>`)
