
Assignment:
Create a rest API with Express that's backed by Mongo with two resources (for example, /users and /birds).
Be sure to implement full REST operations for each resource
Enforce required fields and validation and return meaningful errors.

Finally, implement a non CRUD endpoint (meaning that is does not simply Create, Read, Update, or Destroy information in your database). When a user hits a url endpoint, the server will do something with the data that is not a CRUD operation and return the data.
For example, /users/averageAge might return the average age of all users. This could be something that happens in JavaScript, or using advanced features of Mongoose.

---

Data:

Rose City Rollers
database: rose-city-rollers

Skaters
- name (required)
- number (string) (required)
- team (foreign object)
- position [ ]
- captain (bool)
- retired

Teams
- team name (required)
- colors - [ {base: }  {accent: } ] - (required)
- mascot
- sponsors [  ]

- rank
- current wins
- current losses

(- array of skaters???)
(- array of matches, dates???)


---

Files:

server.js

lib
 - app.js
 - setup-mongoose.js

test
 - skaters.api.test.js  ??
 - teams.api.test.js  ??
( - skater.model.test.js ??)
( - team.model.test.js ??)

routes
 - skaters
 - teams

models
 - skater
 - team


---

End Points:

GET: /teams/  ->  returns JSON list of all team names (and info?)
GET: /teams/<id>  ->  returns JSON object of id
POST: /teams/ (JSON body)  ->  returns JSON object (with db generated fields like id)  
DELETE: /teams/<id>  ->  returns JSON object ... or .... JSON message with name and id of deleted object
PUT: /teams/<id> (JSON body)  ->  returns JSON object

GET: /skaters/  ->  returns JSON list of all skater names (and info?)
GET: /skaters/<id>  ->  returns JSON object of id
POST: /skaters/ (JSON body)  ->  returns JSON object (with db generated fields like id)  
DELETE: /skaters/<id>  ->  returns JSON object ... or .... JSON message with name and id of deleted object
PUT: /skaters/<id> (JSON body)  ->  returns JSON object

... and...

Teams stats?
List of team skaters with stats?
Enter a match result? t
