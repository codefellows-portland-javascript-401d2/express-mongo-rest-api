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

All requests must have `application/json` for `content-type` in the headers.

### Register
Format: {username: *String*, password: *String* [, admin: *Boolean*]}
* username must be unique; both fields are required
* *admin: true* will allow PUT

```
POST /register
```

### Login
Format: {username: *String*, password: *String*}
* both fields are required

```
POST /login
```

### Monsters
* Must be signed in as a registered user to make requests
* The headers or params (query) requires a token

#### Get all monsters

```
GET /monsters
```

#### Get single monster

```
GET /monsters/:name
```

#### Get the total of cities-razed pulled from each monster.

```
GET /monsters/totalDestruction
```

#### Create monster
Format: {name: *string*, citiesRazed: *number*}
* Name is required and citiesRazed must be a positive value.

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
* Must be signed in as a registered user to make requests
* The headers or params (query) requires a token.

#### Get all users

```
GET /users
```

#### Get single user

```
GET /users/:username
```

#### Create user
Format: {username: *string*, password: *string*}
* Username and password field required

```
POST /users
```

#### Update user

```
PUT /users/:username
PATCH /users/:username
```

#### Remove user

```
DELETE /users/:username
```

## Tests

Run `npm test` see unit and end to end testing.
