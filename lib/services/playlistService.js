'use strict';
var lambdaInvoke = require('../utils/lambda-invoke');

exports.addTrack = function (track) {
  var params = {
    FunctionName: process.env.LAMBDA_S3_SAVE,
    Payload: {
      data: track,
      bucket: process.env.S3_BUCKET
    }
  };
  return lambdaInvoke.invoke(params)
    .then(function (data) {
      return data;
    })
    .catch(function (err) {
      console.error('ERROR:', err);
      return err;
    });
};

exports.retrievePlaylist = function (param) {
  var params = {
    FunctionName: process.env.LAMBDA_S3_GET,
    Payload: {
      bucket: process.env.S3_BUCKET
    }
  };
  return lambdaInvoke.invoke(params)
    .then(function (data) {
      return data;
    })
    .catch(function (err) {
      console.error('ERROR:', err);
      return err;
    });
};
