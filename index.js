'use strict';
var graphql = require('graphql');
var _ = require('lodash');
var schema = require('./lib/schema');

exports.handler = function (event, context, callback) {
  console.log('Incoming Event', event);
  // In the introspection query from GraphiQL the variables key is not present in the event body
  var variables = event.variables && !_.isEmpty(event.variables) ? JSON.parse(event.variables) : {};
  graphql.graphql(schema.root, event.query, null, variables)
    .then((data) => {
      console.log('RESOLVED DATA', data);
      callback(null, data)
    })
    .catch(context.fail);
};
