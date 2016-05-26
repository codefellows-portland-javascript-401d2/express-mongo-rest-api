const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Team = mongoose.model('Team', new Schema({

  name: {
    type: String,
    required: true
  },
  color: {
    base: String,
    accent: String
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
