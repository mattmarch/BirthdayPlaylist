import React from "react";
import { useLocation } from "react-router-dom";
import { SpotifyAuthUrl } from "./Spotify";
import MainLayout, { CenteredContainer } from "./shared/MainLayout";

const SpotifyLoggedIn = () => {
  const hashParams = useSpotifyHashParams();
  return (
    <MainLayout>
      {hashParams instanceof Error ? (
        <ErrorDisplay error={hashParams} />
      ) : (
        <SpotifyNumberOnes callbackParams={hashParams} />
      )}
    </MainLayout>
  );
};

const ErrorDisplay = (props: { error: Error }) => (
  <CenteredContainer>
    <h3>Error</h3>
    <p>An error occurred during authorization with spotify.</p>
    <a href={SpotifyAuthUrl("123")}>Click to try again.</a>
    <p>
      If this problem persists{" "}
      <a href="mailto:playlist@mattmarch.co.uk">let me know</a>.
    </p>
    <p>Error reason: {props.error.message}</p>
  </CenteredContainer>
);

const SpotifyNumberOnes = (props: { callbackParams: SuccessCallbackParams }) => {
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
