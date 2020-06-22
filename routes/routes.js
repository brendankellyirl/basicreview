const EventCategoryController = require('../controllers/eventCategory_controller');
const EventController = require('../controllers/event_controller');
const config = require('../config');

module.exports = (app) => {
  // Event Category endpoints
  app.post(config.api.prefix + '/v1/eventcategory', EventCategoryController.create);
  app.put(config.api.prefix + '/v1/eventcategory/:id', EventCategoryController.edit);
  app.delete(config.api.prefix + '/v1/eventcategory/:id', EventCategoryController.delete);
  app.get(config.api.prefix + '/v1/eventcategory', EventCategoryController.index);

  // Events endpoints
  app.get(config.api.prefix + '/v1/events', EventController.index);
  app.get(config.api.prefix + '/v1/events/:id', EventController.single);
  app.post(config.api.prefix + '/v1/events', EventController.create);
  app.put(config.api.prefix + '/v1/events/:id', EventController.edit);
  app.delete(config.api.prefix + '/v1/events/:id', EventController.delete);
};
