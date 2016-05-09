'use strict';

var graphql = require('graphql').graphql;
var assert = require('assert');
const simple = require('simple-mock');

var playlist = require('../../lib/schema/query/playlistQuery.js');
var root = require('../../lib/schema').root;
var playlistService = require('../../lib/services/playlistService.js');

var introspect = require('../test-helpers/introspectGraphQL');
var schemaHelper = require('../test-helpers/schemaHelper');

var playlistQuery = require('./fixtures').playlistQuery;

describe('Playlist schema', function () {
  it('should be possible to introspect the playlistQuery schema', function (done) {
    var schema = schemaHelper.createQuerySchema(playlist.playlistQuery);
    introspect.introspectGraphQL(schema, done);
  });

  it('should be able to execute the playlistQuery', function (done) {
    var playlist = [{
      name: 'Hello',
      artist: 'Adele',
      url: 'url',
      imageUrl: 'imageUrl'
    }];
    simple.mock(playlistService, 'retrievePlaylist').resolveWith(playlist);
    var expectedResult = {
      'data': {
        'playlist': playlist
      }
    };
    graphql(root, playlistQuery, null, {}).then(function (result) {
      assert.deepEqual(result, expectedResult);
      simple.restore();
      done();
    }).catch(done);
  });
});
