const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema of the object
const EventCategorySchema = new Schema({
  displayName: String,
  url: String,
  className: String,
});

// Full text index on the collection
EventCategorySchema.index({ '$**': 'text' });

//Create the new modal in Mongo
const EventCategory = mongoose.model('eventCategory', EventCategorySchema);
module.exports = EventCategory;
