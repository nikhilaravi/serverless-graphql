'use strict';
var lambdaInvoke = require('../utils/lambda-invoke-promise');

exports.retrieveSongSuggestions = function (query, limit) {
  var params = {
    FunctionName: 'song-suggester',
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
