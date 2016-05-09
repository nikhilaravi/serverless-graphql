'use strict';

var graphql = require('graphql').graphql;
var assert = require('assert');
const simple = require('simple-mock');

var addTrack = require('../../lib/schema/mutation/addTrackMutation.js');
var root = require('../../lib/schema').root;
var playlistService = require('../../lib/services/playlistService.js');

var introspect = require('../utils/introspectGraphQL');
var schemaHelper = require('../utils/schemaHelper');

var addTrackMutation = require('./fixtures').addTrackMutation;

describe('Suggestions schema', function () {
  it('should be possible to introspect the playlistQuery schema', function (done) {
    var schema = schemaHelper.createQuerySchema(addTrack.addTrackMutation);
    introspect.introspectGraphQL(schema, done);
  });

  it('should be able to execute the suggestionsQuery', function (done) {
    var id = {
      id: '123456'
    };
    var stub = simple.mock(playlistService, 'addTrack').resolvesWith(id);
    var expectedResult = {
      'data': {
        'addTrack': id
      }
    };
    graphql(root, addTrackMutation, null, {}).then(function (result) {
      assert.deepEqual(result, expectedResult);
      stub.restore();
      done();
    }).catch(done);
  });
});
