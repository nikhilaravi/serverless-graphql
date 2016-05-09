'use strict';

var graphql = require('graphql').graphql;
var assert = require('assert');
const simple = require('simple-mock');

var suggestions = require('../../lib/schema/query/suggestionsQuery.js');
var root = require('../../lib/schema').root;
var suggestionsService = require('../../lib/services/suggestionsService.js');

var introspect = require('../utils/introspectGraphQL');
var schemaHelper = require('../utils/schemaHelper');

var suggestionsQuery = require('./fixtures').suggestionsQuery;

describe('Suggestions schema', function () {
  it('should be possible to introspect the playlistQuery schema', function (done) {
    var schema = schemaHelper.createQuerySchema(suggestions.suggestionsQuery);
    introspect.introspectGraphQL(schema, done);
  });

  it('should be able to execute the suggestionsQuery', function (done) {
    var songSuggestions = [{
      name: 'Hello',
      artist: 'Adele',
      url: 'url',
      imageUrl: 'imageUrl'
    }];
    var stub = simple.mock(suggestionsService, 'retrieveSongSuggestions').resolvesWith(songSuggestions);
    var expectedResult = {
      'data': {
        'suggestions': songSuggestions
      }
    };
    graphql(root, suggestionsQuery, null, {}).then(function (result) {
      assert.deepEqual(result, expectedResult);
      stub.restore();
      done();
    }).catch(done);
  });
});
