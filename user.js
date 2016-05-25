const gen = require('./generator');

class User {
    constructor(seed) {
        this.name = gen.nameGen(seed); 
        this.level = gen.levelGen(seed);
        this.dateJoined = gen.dateGen(seed, new Date(2010, 1, 1));
    }

}

module.exports = User;