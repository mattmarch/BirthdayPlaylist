import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { SpotifyAuthUrl, useSpotifyData, BirthdayWithSpotifyData } from "./Spotify";
import MainLayout, { CenteredContainer } from "./shared/MainLayout";
import {
  useChartData,
  NoDataReason,
} from "./ChartData";
import BirthdayPicker from "./shared/BirthdayPicker";
import styled from "styled-components";

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
  const spotifyData = useSpotifyData(chartData, selectedDate, props.callbackParams.accessToken)
  return (
    <CenteredContainer>
      <BirthdayPicker
        selectedDate={selectedDate}
        disabled={chartData == null}
        onDateSelect={setSelectedDate}
      />
      {spotifyData == null ? <p>Loading data from Spotify...</p> : <NumberOnesList numberOnes={spotifyData}/>}
    </CenteredContainer>
  );
};

const NumberOnesList = (props: { numberOnes: Array<BirthdayWithSpotifyData> }) => (
  <div>
    {props.numberOnes.map((birthdayEntry) => (
      <Result key={birthdayEntry.birthday.date.toLocaleString()}>
        <h4>{birthdayEntry.birthday.date.toLocaleString()}</h4>
        {birthdayEntry.birthday.numberOne ? (
          <p>
            {birthdayEntry.birthday.numberOne.title} by {birthdayEntry.birthday.numberOne.artist}
            <br/>
            {birthdayEntry.spotifyTrack?.uri}
          </p>
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
