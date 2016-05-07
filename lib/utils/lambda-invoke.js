var AWS = require('aws-sdk');
var Lambda = new AWS.Lambda();
AWS.config.region = 'eu-west-1';

exports.invoke = function (params) {
  var p = {
    FunctionName: params.FunctionName,
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(params.Payload),
    LogType: 'None'
  };
  return new Promise(function (resolve, reject) {
    Lambda.invoke(p, function (err, data) {
      if (err) return reject(err);
      var payload = JSON.parse(data.Payload);
      if (payload.errorMessage) return reject(payload);
      console.info('incoming data:', payload);
      return resolve(payload);
    });
  });
};
