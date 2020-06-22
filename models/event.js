const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Event schema that will form the model
const EventSchema = new Schema({
  title: {
    type: String,
    validate: {
      validator: (title) => title.length > 2,
      message: 'Event Title must be longer than 2 characters.',
    },
    required: [true, 'Event Title is required.'],
  },
  slug: String,
  description: String,
  topic: String,
  startDate: { type: Date, default: Date.now },
  startTime: String,
  endDate: { type: Date, default: Date.now },
  endTime: String,
  imageUrl: String,
  onlineUrl: String,
  active: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now },
  lastModifiedDate: { type: Date, default: Date.now },
  lastPubishedDate: { type: Date, default: Date.now },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: 'eventCategory',
    },
  ],
});

// Full text index on the collection
EventSchema.index(
  { title: 'text' },
  {
    weights: {
      title: 10,
    },
  },
);

//Create the new modal in Mongo
const EventM = mongoose.model('event', EventSchema);
module.exports = EventM;
