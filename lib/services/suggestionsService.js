'use strict';
var lambdaInvoke = require('../utils/lambda-invoke');

exports.retrieveSongSuggestions = function (query, limit) {
  var params = {
    FunctionName: 'song-suggester-v1',
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
