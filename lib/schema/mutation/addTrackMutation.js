'use strict';

const graphql = require('graphql');
const playlistService = require('../../services/playlistService.js');

const newTrackId = new graphql.GraphQLObjectType({
  name: 'SearchResultId',
  description: 'Search result id schema',
  fields: function () {
    return ({
      id: {
        type: graphql.GraphQLString,
        description: 'Id of the track in the db'
      }
    });
  }
});

const addTrackMutation = {
  name: 'AddTrackMutation',
  description: 'Add a track to the playlist and get an id back',
  type: newTrackId,
  args: {
    name: {
      type: graphql.GraphQLString
    },
    artist: {
      type: graphql.GraphQLString
    },
    url: {
      type: graphql.GraphQLString
    },
    imageUrl: {
      type: graphql.GraphQLString
    }
  },
  resolve: function (_, parentArgs, args) {
    return playlistService.addTrack(args);
  }
};

exports.addTrackMutation = addTrackMutation;
