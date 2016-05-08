'use strict';
var lambdaInvoke = require('../utils/lambda-invoke');

exports.retrieveSongSuggestions = function (query, limit) {
  var params = {
    FunctionName: process.env.LAMBDA_SONG_SUGGESTER,
    Payload: {
      query,
      limit
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
