import React, { useState, useEffect } from "react";
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
  createPlaylist,
} from "./Spotify";

const useSpotifyHashParams = (): SuccessCallbackParams | Error => {
  const urlParams = new URLSearchParams(useLocation().pathname.slice(1));
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
          token={props.callbackParams.accessToken}
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

type SuccessCallbackParams = {
  accessToken: string;
  state: string;
};

export default SpotifyLoggedIn;