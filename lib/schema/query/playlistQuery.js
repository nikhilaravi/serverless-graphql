const playlistService = require('../../services/playlistService.js');
const graphql = require('graphql');

const songType = new graphql.GraphQLObjectType({
  name: 'SongType',
  description: 'The format of a song in the playlist',
  fields: function () {
    return {
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
    };
  }
});

const playlistType = new graphql.GraphQLList(songType);

const playlistQuery = {
  name: 'PlaylistQuery',
  description: 'Retrieve songs in the playlist',
  type: playlistType,
  resolve: function (_, parentArgs, args) {
    console.log('args', _, parentArgs, args);
    return playlistService.retrievePlaylist();
  }
};

exports.playlistQuery = playlistQuery;
