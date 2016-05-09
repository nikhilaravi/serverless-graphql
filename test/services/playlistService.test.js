'use strict';

const simple = require('simple-mock');
const assert = require('assert');
const lambdaInvoke = require('../../lib/utils/lambda-invoke-promise');
const playlistService = require('../../lib/services/playlistService');

const track = {
  name: 'Hello',
  artist: 'Adele',
  url: 'url',
  imageUrl: 'url'
};

const suggestions = [{
  name: 'Hello',
  artist: 'Adele',
  url: 'url',
  imageUrl: 'url'
}];

describe('Playlist service', () => {
  afterEach(function (done) {
    simple.restore();
    done();
  });

  it('retrieveSuggestions: returns an array of song suggestions', done => {
    const result = {
      data: {
        suggestions: result
      }
    };
    simple.mock(lambdaInvoke, 'invoke').resolveWith(suggestions);

    playlistService.retrieveSuggestions('Fire', 10).then(data => {
      assert.deepEqual(data, result);
      done();
    }).catch(done);
  });

  it('retrieveSuggestions: will return an error due to request error', done => {
    const error = 'Big bad error';
    simple.mock(lambdaInvoke, 'invoke').rejectWith(error);

    playlistService.retrieveSuggestions('some song', 10).then(data => {
      assert.deepEqual(data, error);
      done();
    }).catch(done);
  });

  it('addTrack: calls the s3 save micro service and returns a track id', done => {
    const result = {
      data: {
        addTrack: {
          id: '1234456'
        }
      }
    };

    simple.mock(lambdaInvoke, 'invoke').resolveWith({id: '1234456'});

    playlistService.addTrack(track).then(data => {
      assert.deepEqual(data, result);
      done();
    }).catch(done);
  });
  it('addTrack: will return an error due to request error', done => {
    const error = 'Big bad error';
    simple.mock(lambdaInvoke, 'invoke').rejectWith(error);

    playlistService.addTrack(track).then(data => {
      assert.deepEqual(data, error);
      done();
    }).catch(done);
  });
});
