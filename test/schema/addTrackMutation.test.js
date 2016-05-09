'use strict';

var graphql = require('graphql').graphql;
var assert = require('assert');
const simple = require('simple-mock');

var addTrack = require('../../lib/schema/mutation/addTrackMutation.js');
var root = require('../../lib/schema').root;
var playlistService = require('../../lib/services/playlistService.js');

var introspect = require('../test-helpers/introspectGraphQL');
var schemaHelper = require('../test-helpers/schemaHelper');

var addTrackMutation = require('./fixtures').addTrackMutation;

describe('addTrack schema', function () {
  it('should be possible to introspect the playlistQuery schema', function (done) {
    var schema = schemaHelper.createQuerySchema(addTrack.addTrackMutation);
    introspect.introspectGraphQL(schema, done);
  });

  it('should be able to execute the addTrack mutation', function (done) {
    var id = {
      id: '123456'
    };
    simple.mock(playlistService, 'addTrack').resolveWith(id);
    var expectedResult = {
      'data': {
        'addTrack': id
      }
    };
    graphql(root, addTrackMutation, null, {}).then(function (result) {
      assert.deepEqual(result, expectedResult);
      simple.restore();
      done();
    }).catch(done);
  });
});
