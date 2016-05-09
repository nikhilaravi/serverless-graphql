'use strict';

var graphql = require('graphql').graphql;
var assert = require('assert');
const simple = require('simple-mock');

var suggestions = require('../../lib/schema/query/suggestionsQuery.js');
var root = require('../../lib/schema').root;
var suggestionsService = require('../../lib/services/suggestionsService.js');

var introspect = require('../test-helpers/introspectGraphQL');
var schemaHelper = require('../test-helpers/schemaHelper');

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
    simple.mock(suggestionsService, 'retrieveSongSuggestions').resolveWith(songSuggestions);
    var expectedResult = {
      'data': {
        'suggestions': songSuggestions
      }
    };
    var variables = { query: 'str' };
    graphql(root, suggestionsQuery, null, variables).then(function (result) {
      assert.deepEqual(result, expectedResult);
      simple.restore();
      done();
    }).catch(done);
  });
});
