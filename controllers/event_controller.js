const EventM = require('../models/event');
const config = require('../config');
const moment = require('moment');

const CATEGORY_COLLECTION = 'category';

module.exports = {
  //----------------------------------------------------------------------
  //Default select all events function
  //----------------------------------------------------------------------
  index(req, res, next) {
    const offset = req.query.offset || config.filters.skip;
    const limit = req.query.limit || config.filters.limit;
    const sortField = req.query.sorter || config.filters.sort;

    // Set the current date on the server
    var currentDate = moment().toDate();

    // Create the full query with limit, etc
    const fullQuery = EventM.find({
      active: true,
      endDate: { $gt: currentDate },
    })
      .populate(CATEGORY_COLLECTION)
      .sort({ [sortField]: 1 })
      .skip(parseFloat(offset))
      .limit(parseFloat(limit));

    // Combine both queries in a promise
    return Promise.all([
      fullQuery,
      EventM.find({
        active: true,
        endDate: { $gt: currentDate },
      }).count(),
    ])
      .then((results) => {
        res.send({
          events: results[0],
          count: results[1],
        });
      })
      .catch(next);
  },

  //----------------------------------------------------------------------
  //Select a single event based on ID passed in the URL
  //----------------------------------------------------------------------
  single(req, res, next) {
    const eventID = req.params.id;
    const fullQuery = EventM.findById({ _id: eventID, active: true }).populate(CATEGORY_COLLECTION);

    return Promise.all([
      fullQuery,
      EventM.findById({
        _id: eventID,
        active: true,
      }).count(),
    ])
      .then((results) => {
        res.send({
          event: results[0],
          count: results[1],
        });
      })
      .catch(next);
  },

  //----------------------------------------------------------------------
  //Create a new event
  //----------------------------------------------------------------------
  create(req, res, next) {
    const EventProps = req.body;

    EventM.create(EventProps)
      .then((event) => res.send(event))
      .catch(next);
  },

  //----------------------------------------------------------------------
  //Edit an existing event based on ID
  //----------------------------------------------------------------------
  edit(req, res, next) {
    const eventId = req.params.id;
    const eventProps = req.body;

    EventM.findByIdAndUpdate({ _id: eventId }, eventProps)
      .then(() => EventM.findById({ _id: eventId }))
      .then((event) => res.send(event))
      .catch(next);
  },

  //----------------------------------------------------------------------
  //Delete an event based on ID
  //----------------------------------------------------------------------
  delete(req, res, next) {
    const eventId = req.params.id;

    EventM.findByIdAndRemove({ _id: eventId })
      .then((event) => res.status(204).send(event))
      .catch(next);
  },
};
