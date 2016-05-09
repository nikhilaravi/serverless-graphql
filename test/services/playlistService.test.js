'use strict';

const simple = require('simple-mock');
const assert = require('assert');
const lambdaInvoke = require('../../lib/utils/lambda-invoke.js');
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

  it('retrievePlaylist: returns an array of songs', done => {
    simple.mock(lambdaInvoke, 'invoke').resolveWith(suggestions);

    playlistService.retrievePlaylist('Fire', 10).then(data => {
      assert.deepEqual(data, suggestions);
      done();
    }).catch(done);
  });

  it('retrievePlaylist: will return an error due to request error', done => {
    const error = 'Big bad error';
    simple.mock(lambdaInvoke, 'invoke').rejectWith(error);

    playlistService.retrievePlaylist('some song', 10).then(data => {
      assert.deepEqual(data, error);
      done();
    }).catch(done);
  });

  it('addTrack: calls the s3 save micro service and returns a track id', done => {
    simple.mock(lambdaInvoke, 'invoke').resolveWith({id: '1234456'});

    playlistService.addTrack(track).then(data => {
      assert.deepEqual(data, {id: '1234456'});
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
