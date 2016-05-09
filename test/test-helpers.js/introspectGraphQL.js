'use strict';

var graphql = require('graphql');
var introspectionQuery = require('graphql/utilities').introspectionQuery;

var q = exports;

q.introspectGraphQL = function (schema, done) {
  graphql.graphql(schema, introspectionQuery).then(function (result) {
    if (result.errors && result.errors.length) {
      return done(new Error(result.errors[0].message));
    }
    done();
  }).catch(function (err) {
    console.log('ERR', err);
    done(err);
  });
};
