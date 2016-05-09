var graphql = require('graphql');

var createQuerySchema = function (query, field) {
  return new graphql.GraphQLSchema({
    query: new graphql.GraphQLObjectType({
      name: 'RootQuery',
      fields: function () {
        var x = {};
        x[field || 'type'] = query;
        return x;
      }
    })
  });
};

var createMutationSchema = function (mutation, field) {
  return new graphql.GraphQLSchema({
    query: new graphql.GraphQLObjectType({
      name: 'RootQuery',
      fields: {
        helperField: { type: graphql.GraphQLString }
      }
    }),
    mutation: new graphql.GraphQLObjectType({
      name: 'RootMutation',
      fields: function () {
        var x = {};
        x[field || 'type'] = mutation;
        return x;
      }
    })
  });
};

exports.createQuerySchema = createQuerySchema;
exports.createMutationSchema = createMutationSchema;
