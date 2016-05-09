export const playlistQuery = `
query {
	playlist {
    name,
    artist,
    url,
    imageUrl
  }
}
`;

export const suggestionsQuery = `
query($query: String) {
	suggestions {
    name,
    artist,
    url,
    imageUrl
  }
}
`;

export const addTrackMutation = `
  mutation addTrackMutation($name: String, $artist: String, $url: String, $imageUrl: String) {
    addTrack(name: $name, artist: $artist, url: $url, imageUrl: $imageUrl) {
      id
    }
  }
`;
