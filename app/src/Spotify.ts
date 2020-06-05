import { useEffect, useState } from "react";
import { Birthday, ChartData, findBirthdayNumberOnes } from "./ChartData";

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

export type BirthdayWithSpotifyData = {
  birthday: Birthday;
  spotifyTrack: SpotifyTrack | null;
};

const searchTrack = async (
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
  const response = await fetch(
    `${SpotifySearchUrl}?${queryParameters.toString()}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  const json = await response.json();
  return json.tracks.items.length > 0 ? json.tracks.items[0] : null;
};

export const useSpotifyData = (
  chartData: ChartData | null,
  selectedDate: Date,
  token: string
) => {
  const [spotifyData, setSpotifyData] = useState<Array<
    BirthdayWithSpotifyData
  > | null>(null);

  useEffect(() => {
    if (chartData == null) {
      return;
    }
    const birthdayNumberOnes = findBirthdayNumberOnes(selectedDate, chartData);
    const fetchData = async () => {
      const entries: Array<Promise<
        BirthdayWithSpotifyData
      >> = birthdayNumberOnes.map(async (birthdayEntry) => {
        if (birthdayEntry.numberOne == null) {
          return Promise.resolve({
            birthday: birthdayEntry,
            spotifyTrack: null,
          });
        }
        const track = await searchTrack(
          birthdayEntry.numberOne.title,
          birthdayEntry.numberOne.artist,
          token
        );
        return { birthday: birthdayEntry, spotifyTrack: track };
      });
      const data = await Promise.all(entries);
      setSpotifyData(data);
    };
    fetchData();
  }, [chartData, selectedDate, token]);
  return spotifyData;
};
