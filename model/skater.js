const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    type: [String]
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
