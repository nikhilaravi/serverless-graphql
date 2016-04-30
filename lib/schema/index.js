'use strict';
var graphql = require('graphql');

var schema = exports;

// The main schema
schema.root = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: graphql.GraphQLString,
        resolve () {
          return 'world';
        }
      }
    }
  })
});
