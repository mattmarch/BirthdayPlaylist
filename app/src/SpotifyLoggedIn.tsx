import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ChartEntry, NoDataReason, useChartData } from "./ChartData";
import BirthdayPicker from "./shared/BirthdayPicker";
import MainLayout, { CenteredContainer } from "./shared/MainLayout";
import {
  BirthdayWithSpotifyData,
  SpotifyAuthUrl,
  SpotifyTrack,
  useSpotifyData,
} from "./Spotify";

const SpotifyLoggedIn = () => {
  const hashParams = useSpotifyHashParams();
  return (
    <MainLayout>
      {hashParams instanceof Error ? (
        <ErrorDisplay error={hashParams} />
      ) : (
        <NumberOnesDisplay callbackParams={hashParams} />
      )}
    </MainLayout>
  );
};

const ErrorDisplay = (props: { error: Error }) => (
  <CenteredContainer>
    <h3>Error</h3>
    <p>An error occurred during authorization with spotify.</p>
    <a href={SpotifyAuthUrl(new Date().toISOString())}>Click to try again.</a>
    <p>
      If this problem persists{" "}
      <a href="mailto:playlist@mattmarch.co.uk">let me know</a>.
    </p>
    <p>Error reason: {props.error.message}</p>
  </CenteredContainer>
);

const NumberOnesDisplay = (props: {
  callbackParams: SuccessCallbackParams;
}) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date(props.callbackParams.state)
  );
  const chartData = useChartData();
  const spotifyData = useSpotifyData(
    chartData,
    selectedDate,
    props.callbackParams.accessToken
  );
  return (
    <CenteredContainer>
      <BirthdayPicker
        selectedDate={selectedDate}
        disabled={chartData == null}
        onDateSelect={setSelectedDate}
      />
      {spotifyData == null ? (
        <p>Loading data from Spotify...</p>
      ) : (
        <NumberOnesList numberOnes={spotifyData} />
      )}
    </CenteredContainer>
  );
};

const NumberOnesList = (props: {
  numberOnes: Array<BirthdayWithSpotifyData>;
}) => (
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

const Result = styled.div`
  text-align: center;
`;

const TrackSpotifyDetails = (props: { track: SpotifyTrack }) => (
  <SpotifyTrackInfo>
    {/* <h5>Found on Spotify</h5> */}
    <img
      src={props.track.album.images.find((img) => img.height === 64)?.url}
      alt={`${props.track.album.name} cover`}
    />
    <p>
      {props.track.name} by{" "}
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

type SuccessCallbackParams = {
  accessToken: string;
  state: string;
};

const useSpotifyHashParams = (): SuccessCallbackParams | Error => {
  const urlParams = new URLSearchParams(useLocation().hash.slice(1));
  const errorParam = urlParams.get("error");
  if (errorParam != null) {
    return new Error(`Spotify authorization failed, error was: ${errorParam}`);
  }
  const accessToken = urlParams.get("access_token");
  const expiresIn = Number(urlParams.get("expires_in"));
  const state = urlParams.get("state");
  return accessToken != null && expiresIn > 0 && state != null
    ? {
        accessToken,
        state,
      }
    : new Error("Response from Spotify was missing key return parameters");
};

export default SpotifyLoggedIn;
