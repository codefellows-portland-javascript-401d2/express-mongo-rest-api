const User = require('./user');

for (var i = 0; i < 10; i++) {
    var user = new User(Math.random());
    console.log(`${user.name} ==> ${user.level} ==> ${user.dateJoined}`);
}