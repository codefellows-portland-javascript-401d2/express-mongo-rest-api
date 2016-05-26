const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Team = mongoose.model('Team', new Schema({

  name: {
    type: String,
    required: true
  },
  color: {
    base: {
      type: String,
      enum: ['green', 'gold', 'red', 'b&w checkers', 'black', 'pink', 'blue', 'silver'],
      required: true
    },
    accent:{
      type: String,
      enum: ['green', 'gold', 'red', 'b&w checkers', 'black', 'pink', 'blue', 'silver'],
      required: true
    }
  },
  mascot: {
    type: String
  },
  sponsors: {
    type: [String]
  },
  rank: {
    type: Number
  },
  currentWins: {
    type: Number
  },
  currentLosses:{
    type: Number
  }
},
  {
    timestamps: true
  }
));

module.exports = Team;
