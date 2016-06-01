## Rose City Rollers API

Written with Express, MongoDB, and Mongoose

### Authentication

Access to data requires a successful login.

`POST /signup` submit a JSON object with username and password to register a new user
`POST /signin` login using an existing user

Upon successful sign up or sing in, a user token will be returned. Be sure to include the token in subsequent calls either in the header or as a query in the url.

As a URL query
`?token=`_token value_

In the header
key = token, value = _token value_

### users
### Model sample
```
{
  "username": "myName",
  "password": "myPassword",
  "roles": ["optionRole"]
}
```

### match
`/match` enter winning and losing team IDs as PATCH request to increment teams' win/loss records

### teams
##### Model Sample
```
{
  "_id": //populated by DB,
  "teamName": "High Rollers",
  "rank": 1,
  "currentWins": 4,
  "currentLosses": 2,
  "sponsors": ["Upswept Creative", "Prana", "Left Turn Clothing", "Double Barrel Tavern"],
  "color": [
    {
      "base": "green"
    },
    {
      "accent": "gold"
    }
  ]
}
```
`GET /teams` return all teams in the database

`POST /teams` create single team instance

`GET /teams/:id` return single team by id

`GET /teams/:id/roster` return all skaters on a single team

`PATCH /teams/:id` update/modify single team by id

`DELETE /team/:id` delete single team, return confirmation of deletion

Note: team rank and win/loss record taken from 2016 season data

### skaters

Access to skater information is limited to users with _coach_ specified as a user role.

##### Model Sample
```
{
  "_id": //populated by DB,
  "name": "Skeeve Holt!",
  "number": 49,
  "position": [
    "blocker"
  ],
  "captain": false,
  "retired": true,
  "team": //populated by DB reference to team ID
}
```

`GET /skaters` return all skaters in the database

`POST /skaters` create single skater instance

`GET /skaters/:id` return single skater by id

`PATCH /skaters/:id` update/modify single skater by id

`DELETE /skaters/:id` delete single skater, return confirmation of deletion
