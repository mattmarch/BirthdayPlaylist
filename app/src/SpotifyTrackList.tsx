import React, { useState, useEffect } from "react";
import { useChartData, NoDataReason, ChartEntry } from "./ChartData";
import {
  useSpotifyData,
  BirthdayWithSpotifyData,
  createPlaylist,
  SpotifyTrack,
} from "./Spotify";
import { CenteredContainer } from "./shared/MainLayout";
import BirthdayPicker from "./shared/BirthdayPicker";
import styled from "styled-components";

type Props = {
  accessToken: string;
  state: string;
  onError: (message: string, isSpotifyError: boolean) => void;
};

export const NumberOnesDisplay = (props: Props) => {
  const [selectedDate, setSelectedDate] = useState(new Date(props.state));
  const { chartData, errorMessage } = useChartData();
  const spotifyData = useSpotifyData(
    chartData,
    selectedDate,
    props.accessToken
  );
  if (errorMessage != null) {
    props.onError(errorMessage, false)
  }
  return (
    <CenteredContainer>
      <p>You are now logged in with Spotify.</p>
      <BirthdayPicker
        selectedDate={selectedDate}
        disabled={chartData == null}
        onDateSelect={setSelectedDate}
      />
      {spotifyData == null ? (
        <p>Loading data from Spotify...</p>
      ) : (
        <SpotifyTrackData
          numberOnes={spotifyData}
          birthdayDate={selectedDate}
          token={props.accessToken}
        />
      )}
    </CenteredContainer>
  );
};

const SpotifyTrackData = (props: {
  numberOnes: Array<BirthdayWithSpotifyData>;
  birthdayDate: Date;
  token: string;
}) => (
  <CenteredContainer>
    <CreatePlaylistDisplay
      numberOnes={props.numberOnes}
      birthdayDate={props.birthdayDate}
      token={props.token}
    />
    <TrackList numberOnes={props.numberOnes} />
  </CenteredContainer>
);

const CreatePlaylistDisplay = (props: {
  numberOnes: Array<BirthdayWithSpotifyData>;
  birthdayDate: Date;
  token: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [playlistUrl, setPlaylistUrl] = useState<string | null>(null);
  useEffect(() => setPlaylistUrl(null), [props.birthdayDate]);
  const onCreatePlaylist = async () => {
    setLoading(true);
    const url = await createPlaylist(
      `Birthday Playlist (${props.birthdayDate.toLocaleDateString()})`,
      props.numberOnes,
      props.token
    );
    setLoading(false);
    setPlaylistUrl(url);
  };
  return (
    <div>
      {loading ? (
        <p>Creating playlist on Spotify...</p>
      ) : !playlistUrl ? (
        <button onClick={onCreatePlaylist}>Create playlist on Spotify</button>
      ) : (
        <a href={playlistUrl}>Checkout your Birthday Playlist on Spotify</a>
      )}
    </div>
  );
};

const Result = styled.div`
  text-align: center;
`;

const TrackList = (props: { numberOnes: Array<BirthdayWithSpotifyData> }) => (
  <div>
    {props.numberOnes.map((birthdayEntry) => (
      <Result key={birthdayEntry.birthday.date.toLocaleString()}>
        <h4>{birthdayEntry.birthday.date.toLocaleString()}</h4>
        {birthdayEntry.birthday.numberOne ? (
          birthdayEntry.spotifyTrack ? (
            <TrackSpotifyDetails track={birthdayEntry.spotifyTrack} />
          ) : (
            <CouldNotFindTrack track={birthdayEntry.birthday.numberOne} />
          )
        ) : birthdayEntry.birthday.reason === NoDataReason.DATE_TOO_OLD ? (
          <p>UK Charts only started on 08/11/1952</p>
        ) : (
          <p>The latest chart data hasn't been updated yet, try again soon!</p>
        )}
      </Result>
    ))}
  </div>
);

const TrackSpotifyDetails = (props: { track: SpotifyTrack }) => (
  <SpotifyTrackInfo>
    <img
      src={props.track.album.images.find((img) => img.height === 64)?.url}
      alt={`${props.track.album.name} cover`}
    />
    <p>
      {props.track.name}
      <br />
      {props.track.artists.map((artist) => artist.name).join(", ")}
    </p>
  </SpotifyTrackInfo>
);

const SpotifyTrackInfo = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const CouldNotFindTrack = (props: { track: ChartEntry }) => (
  <p>
    Could not find {props.track.title} by {props.track.artist} on Spotify
  </p>
);
