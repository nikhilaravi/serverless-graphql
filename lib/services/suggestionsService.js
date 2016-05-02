'use strict';
const fetch = require('isomorphic-fetch');
const apiRoot = require('../../config.json').apiRoot;

exports.retrieveSongSuggestions = function (query, limit) {
  const max = limit ? limit : 10;
  const apiKey = process.env.API_KEY;
  const url = `${apiRoot}?method=track.search&track=${query}&limit=${max}&api_key=${apiKey}&format=json`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(json => {
    console.log('MATCHED TRACKS', JSON.stringify(json));
    if (json.results && json.results.trackmatches.track.length > 0) {
      return json.results.trackmatches.track.map(track => {
        return {
          name: track.name,
          artist: track.artist,
          url: track.url,
          imageUrl: track.image[1]['#text']
        };
      });
    } else {
      return [];
    }
  });
};
