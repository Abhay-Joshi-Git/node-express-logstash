const util = require("util");
const dgram = require("dgram");
const { host, port, udpType } = require("./config/log-stash.config");


function log(type, message, fields) {
	var client = dgram.createSocket(udpType);
	var logObject = {
		timestamp: new Date().toISOString(),
		type: type,
		message: message,
		fields: fields
	};
	var m = Buffer.from(JSON.stringify(logObject));
	client.send(m, 0, m.length, port, host, function(err, bytes) {
		client.close();
    if (err) {
			console.log("Error logging: %s", util.inspect(err));
		}
	});
}

function getReqParams(req) {
  let params = [];
  for (const key in req.params) {
    if (object.hasOwnProperty(key)) {
      const val = req.params[key];
      params.push(`${key} - ${val}`);
    }
  }
  return params.join(', ');
}

function getReqMessage(req) {
  let messageParts = [];
  messageParts.push(`path: ${req.path}`);
  messageParts.push(`method: ${req.method}`);
  const params = getReqParams(req);
  if (params) {
    messageParts.push(`params: ${params}`);
  }
  return messageParts.join(', ');
}

function logReq(req) {
  const message = getReqMessage(req);
	log("request", message, { level: "debug" });
}

function logResponseBody(res) {
  var oldWrite = res.write,
      oldEnd = res.end;
  var chunks = [];

  res.write = function (chunk) {
    chunks.push(Buffer.from(chunk));
    oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk)
      chunks.push(Buffer.from(chunk));
    var body = Buffer.concat(chunks).toString('utf8');
    log("response", body, { level: "debug" });
    oldEnd.apply(res, arguments);
  };
}

function logReqRes(req, res, next) {
  logReq(req);
  logResponseBody(res);
	next();
}

module.exports = {
  log: log,
  logReqRes: logReqRes
};
