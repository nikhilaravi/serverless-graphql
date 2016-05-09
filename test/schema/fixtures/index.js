exports.playlistQuery = `
query {
	playlist {
    name,
    artist,
    url,
    imageUrl
  }
}
`;

exports.suggestionsQuery = `
query($query: String) {
	suggestions(query: $query) {
    name,
    artist,
    url,
    imageUrl
  }
}
`;

exports.addTrackMutation = `
  mutation addTrackMutation($name: String, $artist: String, $url: String, $imageUrl: String) {
    addTrack(name: $name, artist: $artist, url: $url, imageUrl: $imageUrl) {
      id
    }
  }
`;
