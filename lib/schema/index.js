'use strict';
const graphql = require('graphql');
const suggestionsQuery = require('./query/suggestionsQuery.js').suggestionsQuery;
const addTrackMutation = require('./mutation/addTrackMutation.js').addTrackMutation;
const schema = exports;

// The main schema
schema.root = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      suggestions: suggestionsQuery
    }
  }),
  mutation: new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addTrack: addTrackMutation
    }
  })
});
