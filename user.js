const gen = require('./generator');

class User {
    constructor(seed) {
      this.name = gen.nameGen(seed); 
      this.rank = gen.rankGen(seed);
      this.dateJoined = gen.dateGen(seed, new Date(2010, 1, 1));
    }

}

module.exports = User;