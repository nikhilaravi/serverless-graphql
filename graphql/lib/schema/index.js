'use strict';
var graphql = require('graphql');
var userMutation = require('./mutation/user').viewerMutation;
var userQuery = require('./query/user').viewerQuery;

var schema = exports;

// The main schema
schema.root = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      viewer: userQuery
    }
  }),
  mutation: new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
      viewer: userMutation
    }
  })
});
