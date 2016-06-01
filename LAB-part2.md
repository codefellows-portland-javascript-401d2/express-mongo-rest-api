![cf](http://i.imgur.com/7v5ASc8.png) express-mongo-rest-api
====

# Part 2: Add User Management and Authorization

You can continue working in original assignment pairs.

##Description

Add User Management and Authentication to your app:

* Create endpoints for signing up (registering) and signing in (log in)
	* Password should not be saved in plain text to database (hash with bcrypt)
	* Choose an identifying field for the user (e.g. username, email).
		* Don't allow registering with same user identifier
	* return a JWT when signup or signin successful
	* return appropriate error responses
* Protect your "resources" by requiring and valid JWT
* Test above functionality using chai-http

## Bonus

* Introduce the concept of authorization by having one of your resources, or 
a new endpoint if you want, that requires an elevated privilege, aka authorization) **3pts**

##Rubric
* User Management (Sign up): **2pts**
* Authentication( Sign in): **2pts**
* Protect Routes: **1pts**
* Code Quality: **2pts**
* Tests: **3pts**