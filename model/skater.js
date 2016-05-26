const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positions = ['blocker', 'pivot', 'jammer'];

var Skater = mongoose.model('Skater', new Schema( {

  name: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  positions: {
    type: [
      {
        type: String,
        enum: positions
      }
    ]
  },
  captain: {
    type: Boolean
  },
  retired: {
    type: Boolean
  }
},
  {
    timestamps: true
  }
));

module.exports = Skater;
