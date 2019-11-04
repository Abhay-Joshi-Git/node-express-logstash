# logging to log-stash from node-express
This is a simple example of logging to log-stash from express server using express middleware to intercept request/response and log it to log-stash. It sends udp messages to log-stash server.

# configuration
Log stash server - in config > logStash.config.js file
```
    host: "127.0.0.1",
    port: 514,
    udpType: "udp4"
```

express server configs
```
    port: 8080, // node server listens at this port
```

# To run server -
```
npm install
node index.js
```

# routes available -
```
user/:id - hard-coded data with id 1 & 2
customer/:id - hard-coded data with any id
```


# logging -

## request - path, method, params get logged
```
Example - for /user/2, request will be logged with following details -
{
    "@version" => "1",
    "@timestamp" => 2019-11-04T17:19:10.048Z,
    "host" => "127.0.0.1",
    "type" => "syslog",
    "message" => "{\"timestamp\":\"2019-11-04T17:19:10.045Z\",\"type\":\"request\",\"message\":\"path: /user/2, method: GET\",\"fields\":{\"level\":\"debug\"}
}
```

## response - response body get logged
```
Example -
response with  body -
{
    "name": "XYZ",
    "role": "basic",
    "activeStatus": "in-active"
}
will be logged as follows -
{
    "@version" => "1",
    "@timestamp" => 2019-11-04T17:19:10.048Z,
    "host" => "127.0.0.1",
    "type" => "syslog",
    "message" => "{\"timestamp\":\"2019-11-04T17:19:10.045Z\",\"type\":\"response\",\"message\":\"{\\\"name\\\":\\\"XYZ\\\",\\\"role\\\":\\\"basic\\\",\\\"activeStatus\\\":\\\"in-active\\\"}\",\"fields\":{\"level\":\"debug\"}}"
}
```

# code structure -
```
config - config files
routes - express route handlers
logger - express middleware for logging to log-stash
```

# next steps -
explore winston-transport or winston3-logstash-transport

