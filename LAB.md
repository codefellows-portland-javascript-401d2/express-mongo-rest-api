![cf](http://i.imgur.com/7v5ASc8.png) express-mongo-rest-api
====

Create a rest API with Express that's backed by Mongo with two resources
 (for example, `/users` and `/birds`).

Highly suggested to **pair up** on this assignment.

##Description

Be sure to implement full REST operations for each resource (`GET`/`POST`/`PUT`/`DELETE`)

Enforce required fields and validation (e.g. a users age should not negative), 
return meaningful errors.

This is pretty open to interpretation. Write this from scratch, don't just copy and paste code 
from class or previous projects.

Finally, implement a non CRUD endpoint (meaning that is does not simply 
Create, Read, Update, or Destroy information in your database). 
When a user hits a url endpoint, the server will do something with the data 
that is not a CRUD operation and return the data. 

For example,  `/users/averageAge` might return the average age of all users. This could 
be something that happens in JavaScript, or using advanced features of Mongoose.

In your assignment submission add a comment that includes how long it 
took to complete and a reflection on the process.

REST API testing required, you may not have any logically unit testable code.

## Bonus

* Make at least one of your resources queryable on a list `GET`,
eg `/birds&flightless=true` **2pts**

* Implement `PATCH` for one of your resources **2pts**

* Make your entities related and store identities of one in the other (e.g. user has birds) **2pts**

* Use Mongoose Promise API **1pt**

##Rubric
* Use of Express: **5pts**
* Use of Mongo: **8pts**
* Tests: **3pts**
* Project Organization: **4pts**