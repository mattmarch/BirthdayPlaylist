export const SpotifyAuthUrl = (state: string) =>
  `https://accounts.spotify.com/authorize?client_id=6c0a042391fa42e8ac96a5eed4306dfe&redirect_uri=http:%2F%2Flocalhost:3000%2Fspotify-callback&scope=playlist-modify-public&response_type=token&state=${state}`;

const SpotifyApiBaseUrl = "https://api.spotify.com/v1";
const SpotifySearchUrl = new URL(`${SpotifyApiBaseUrl}/search`);

type SpotifyTrack = {
  album: SpotifyAlbum;
  artists: Array<SpotifyArtist>;
  id: string;
  uri: string;
};

type SpotifyAlbum = {
  name: string;
  images: Array<SpotifyAlbumImage>;
};

type SpotifyAlbumImage = {
  height: number;
  Width: number;
  url: string;
};

type SpotifyArtist = {
  name: string;
};

const searchTrack = (
  title: string,
  artist: string,
  accessToken: string
): Promise<SpotifyTrack | null> => {
  const firstArtist = artist.split("FT.")[0];
  const queryParameters = new URLSearchParams({
    q: `track:"${title}" artist:"${firstArtist}"`,
    type: "track",
    limit: "1",
  });
  return fetch(`${SpotifySearchUrl}?${queryParameters.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then((response) => response.json())
    .then((json) => (json.tracks.size > 0 ? json.tracks[0] : null));
};
