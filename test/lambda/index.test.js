const invokeQuery = require('../schema/fixtures').suggestionsQuery;

var assert = require('assert');
var index = require('../../index.js');
describe('Invoke Test', () => {
  it('invokes the lambda with a suggestions query', (done) => {
    const event = {
      query: invokeQuery,
      variables: JSON.stringify({
        query: 'Hello'
      })
    };
    index.handler(event, {}, (err, res) => {
      assert.equal(err, null);
      assert.equal(res.data.suggestions.length > 0, true);
      done();
    });
  }).timeout(5000);
});
