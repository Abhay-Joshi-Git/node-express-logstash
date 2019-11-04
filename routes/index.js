const userRoute = require('./user');
const customerRoute = require('./customer');

module.exports = (app) => {
    userRoute(app);
    customerRoute(app);
}
