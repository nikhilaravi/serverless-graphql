'use strict';
var lambdaInvoke = require('../utils/lambda-invoke');

exports.addTrack = function (track) {
  var params = {
    FunctionName: 's3-save-v1',
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
    FunctionName: 's3-get-v1',
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
