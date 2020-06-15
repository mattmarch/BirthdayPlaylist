import React, { useState } from "react";
import styled from "styled-components";
import { ChartEntry, NoDataReason, useChartData } from "./ChartData";
import { CreatePlaylistButton } from "./CreatePlaylistButton";
import BirthdayPicker from "./shared/BirthdayPicker";
import { CenteredContainer } from "./shared/MainLayout";
import {
  BirthdayWithSpotifyData,

  SpotifyTrack, useSpotifyData
} from "./Spotify";
import ShareLink from "./shared/ShareLink";

type Props = {
  accessToken: string;
  state: string;
  onError: (message: string, isSpotifyError: boolean) => void;
};

export const NumberOnesDisplay = (props: Props) => {
  const [selectedDate, setSelectedDate] = useState(new Date(props.state));
  const { chartData, errorMessage } = useChartData();
  const {spotifyData, errorMessage: spotifyErrorMessage} = useSpotifyData(
    chartData,
    selectedDate,
    props.accessToken
  );
  if (errorMessage != null) {
    props.onError(errorMessage, false)
  }
  if (spotifyErrorMessage != null) {
    props.onError(spotifyErrorMessage, true)
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
    <CreatePlaylistButton
      numberOnes={props.numberOnes}
      birthdayDate={props.birthdayDate}
      token={props.token}
    />
    <ShareLink date={props.birthdayDate} />
    <TrackList numberOnes={props.numberOnes} />
  </CenteredContainer>
);

const Result = styled.div`
  text-align: center;
`;

const TrackList = (props: { numberOnes: Array<BirthdayWithSpotifyData> }) => (
  <CenteredContainer>
    <h2>Your playlist:</h2>
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
  </CenteredContainer>
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
