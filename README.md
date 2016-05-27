# ![cf](http://i.imgur.com/7v5ASc8.png) Express Mongo Rest API

[![Build Status](https://travis-ci.org/DonChatelain/express-mongo-rest-api.svg?branch=master)](https://travis-ci.org/DonChatelain/express-mongo-rest-api)

Godzilla Monster database and community.

__Team__: Don Jon

__Team Members__: [Don](https://github.com/DonChatelain), [Johnny](https://github.com/jluangphasy)

## Getting Started

1. Install [Node.js](https://nodejs.org/en/).
2. Install [MongoDB](https://docs.mongodb.com/manual/installation/).
3. Install [Postman](https://www.getpostman.com).
4. Run `git clone https://github.com/DonChatelain/express-mongo-rest-api.git`.
5. Run `cd express-mongo-rest-api`.
6. Run `npm install`.
7. Run `npm start`.
8. Use Postman to make requests.

## API

All requests must have `content-type="application/json"` in headers.

### Monsters

#### Get all monsters

```
GET /monsters
```

#### Get single monster

```
GET /monsters/:name
```

#### Get total destruction of all monsters

```
GET /monsters/totalDestruction
```

#### Create monster

```
POST /monsters
```

#### Update monster

```
PUT /monsters/:name
PATCH /monsters/:name
```

#### Remove monster

```
DELETE /monsters/:name
```

### Users

#### Get all users

```
GET /users
```

#### Get single user

```
GET /users/:name
```

#### Create user

```
POST /users
```

#### Update user

```
PUT /users/:name
PATCH /users/:name
```

#### Remove user

```
DELETE /users/:name
```

## Tests

Run `npm test` see unit and end to end testing.
