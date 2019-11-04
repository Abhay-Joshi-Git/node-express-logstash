const { logReqRes } = require("./logger");
const express = require('express');
const applyRoute = require('./routes/index');
const { port } = require('./config/express-server.config');

console.log('port' , port);

const app = express();
app.use(logReqRes);
applyRoute(app);

app.listen(port || 8000, () => console.log('server started ...'));
