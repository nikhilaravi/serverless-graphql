const suggestionsService = require('../../services/suggestionsService.js');
const graphql = require('graphql');

const suggestionsType = new graphql.GraphQLObjectType({
  name: 'SongSuggestionsType',
  description: 'The format of a song suggestion',
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

const suggestionsListType = new graphql.GraphQLList(suggestionsType);

const suggestionsQuery = {
  name: 'SuggestionQuery',
  description: 'Retrieve song search results by song name',
  type: suggestionsListType,
  args: {
    query: {
      type: graphql.GraphQLString,
      description: 'Name of a song'
    },
    limit: {
      type: graphql.GraphQLInt,
      description: 'Number of song suggestions to retrieve'
    }
  },
  resolve: function (_, args) {
    return suggestionsService.retrieveSongSuggestions(args.query, args.limit);
  }
};

exports.suggestionsQuery = suggestionsQuery;
