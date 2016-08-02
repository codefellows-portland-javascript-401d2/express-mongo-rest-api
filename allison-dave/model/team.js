const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorPalette = ['green', 'gold', 'red', 'b&w checkers', 'black', 'pink', 'blue', 'silver'];

var Team = mongoose.model('Team', new Schema({

  teamName: {
    type: String,
    required: true
  },
  color: {
    base: {
      type: String,
      enum: colorPalette,
      required: true
    },
    accent:{
      type: String,
      enum: colorPalette,
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
