## Rose City Rollers API

Written with Express, MongoDB, and Mongoose

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
