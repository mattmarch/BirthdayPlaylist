import React from "react";
import { useLocation } from "react-router-dom";
import { SpotifyAuthUrl } from "./Spotify";

const SpotifyLoggedIn = () => {
  const hashParams = useSpotifyHashParams();
  return (
    <div>
      <h1>Birthday Playlist Generator</h1>
      {hashParams instanceof Error ? (
        <ErrorDisplay error={hashParams} />
      ) : (
        <TrackFeed callbackParams={hashParams} />
      )}
    </div>
  );
};

const ErrorDisplay = (props: { error: Error }) => (
  <div>
    <h3>Error</h3>
    <p>An error occurred during authorization with spotify.</p>
    <a href={SpotifyAuthUrl("123")}>Click to try again.</a>
    <p>
      If this problem persists{" "}
      <a href="mailto:playlist@mattmarch.co.uk">let me know</a>.
    </p>
    <h4>{props.error.name}</h4>
    <p>{props.error.message}</p>
  </div>
);

const TrackFeed = (props: { callbackParams: SuccessCallbackParams }) => {
  return (
    <div>
      <h3>Your playlist</h3>
    </div>
  );
};

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
