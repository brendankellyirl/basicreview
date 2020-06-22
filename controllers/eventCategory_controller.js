const EventCategory = require('../models/eventCategory');

module.exports = {
  //----------------------------------------------------------------------
  // List event categories
  //----------------------------------------------------------------------
  index(req, res, next) {
    EventCategory.find()
      .then((eventCategorys) => res.send(eventCategorys))
      .catch(next);
  },

  //----------------------------------------------------------------------
  // Create a new event categories
  //----------------------------------------------------------------------
  create(req, res, next) {
    const eventCategoryProps = req.body;

    EventCategory.create(eventCategoryProps)
      .then((eventCategory) => res.send(eventCategory))
      .catch(next);
  },

  //----------------------------------------------------------------------
  // Update an existing event categories
  //----------------------------------------------------------------------
  edit(req, res, next) {
    const eventCategoryId = req.params.id.toString();
    const eventCategoryProps = req.body;

    EventCategory.findByIdAndUpdate({ _id: eventCategoryId }, eventCategoryProps)
      .then(() => EventCategory.findById({ _id: eventCategoryId }))
      .then((eventCategory) => res.send(eventCategory))
      .catch(next);
  },

  //----------------------------------------------------------------------
  // Delete an event categories
  //----------------------------------------------------------------------
  delete(req, res, next) {
    const eventCategoryId = req.params.id;

    EventCategory.findByIdAndRemove({ _id: eventCategoryId })
      .then((eventCategory) => res.status(204).send(eventCategory))
      .catch(next);
  },
};
