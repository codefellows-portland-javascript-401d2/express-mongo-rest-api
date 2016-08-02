const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('People', new Schema( {
  name: {
    type: String,
    required: true
  },
  allegiance: {
    type: String,
    required: true,
    enum: ['Stark', 'Lannister', 'Targaryen', 'Bolton', 'Night\'s Watch', 'Tyrell', 'Greyjoy', 'Baratheon', 'Tully', 'Martell', 'Arryn']
  },
  alive: {
    type: Boolean,
    required: true
  },
  killed_by: {
    type: String
  },
  home: {
    type: Schema.Types.ObjectId,
    ref: 'Locations',
    required: true
  }
},{
  timestamps: true

}));
