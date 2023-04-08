# backend

> Contacts API server

Runs in VSCode devcontainers based on `Dockerfile`.

## Set-up databases
Start up local minio and mongodb by running `docker-compose up -d`. Access minio frontend by going "localhost:9001"

NOTE: If docker running on WSL, need to use WSL IPv4 instead of `localhost`

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/backend
    npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Testing

Create read only user in mongoDB. SSH into the mongoDB container and run:
```
mongosh -u root

use admin; // Make sure we go to the admin database 

// Create user and read access only to DB. 
db.createUser({ 
  user: "readuser", 
  pwd: "userpassword",
  roles: [ { role: "read", db: "contactsdb" } ] 
});

// Check that user created
db.getUsers()
```

Simply run `npm test` and all your tests in the `test/` directory will be run.



## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).


Referenced from: https://github.com/sitepoint-editors/react-crud-app?ref=morioh.com&utm_source=morioh.com