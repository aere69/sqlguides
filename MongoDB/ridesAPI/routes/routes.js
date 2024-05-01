// Router is all about taking incoming requests and 
// sending them to the right location.
// The Controller handles the request logic

const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {
    // Watch incoming requests of method GET
    // to the route http://localhost:3050/api
    app.get('/api', DriversController.greeting);

    app.post('/api/drivers', DriversController.create);
    app.put('/api/drivers/:id', DriversController.edit);
    app.delete('/api/drivers/:id', DriversController.delete);
    app.get('/api/drivers', DriversController.index);
};