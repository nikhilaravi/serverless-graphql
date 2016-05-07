'use strict';
const request = require('request');
const apiRoot = 'http://ws.audioscrobbler.com/2.0/';
const apiKey = process.env.API_KEY;

exports.handler = function (event, context, callback) {
  const max = event.limit ? event.limit : 10;
  const url = `${apiRoot}?method=track.search&track=${event['query']}&limit=${max}&api_key=${apiKey}&format=json`;

  request({
    method: 'GET',
    url: url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    json: true
  }, function (err, res, json) {
    if (err) return console.error(err);
    if (json && json.errors) {
      console.log(JSON.stringify(json.errors, null, 2));
      return callback(err);
    } else if (json) {
      console.log(JSON.stringify(json, null, 2));
      if (json.results && json.results.trackmatches.track.length > 0) {
        return json.results.trackmatches.track.map(track => {
          return callback(null, {
            name: track.name,
            artist: track.artist,
            url: track.url,
            imageUrl: track.image[1]['#text']
          });
        });
      } else {
        return callback(null, []);
      }
    }
  });
};
