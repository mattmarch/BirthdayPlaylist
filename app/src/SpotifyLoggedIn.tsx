import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MainLayout, { CenteredContainer } from "./shared/MainLayout";
import { SpotifyAuthUrl } from "./Spotify";
import { NumberOnesDisplay } from "./SpotifyTrackList";

const SpotifyLoggedIn = () => {
  const [error, setError] = useState<ErrorToDisplay | null>(null);
  const urlParams = getUrlHashParams(useLocation().pathname);
  if (isErrorParams(urlParams)) {
    return (
      <MainLayout>
        <ErrorDisplay
          error={{
            message: urlParams.error,
            isSpotifyAuthError: true,
          }}
          state={urlParams.state}
        />{" "}
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      {error ? (
        <ErrorDisplay error={error} state={urlParams.state} />
      ) : (
        <NumberOnesDisplay
          accessToken={urlParams.accessToken}
          state={urlParams.state}
          onError={(message, isSpotifyError) =>
            setError({ message: message, isSpotifyAuthError: isSpotifyError })
          }
        />
      )}
    </MainLayout>
  );
};

type ErrorToDisplay = {
  message: string;
  isSpotifyAuthError: boolean;
};

const ErrorDisplay = (props: {
  error: ErrorToDisplay;
  state: string | null;
}) => (
  <CenteredContainer>
    <h3>Sorry! Something went wrong! :(</h3>
    {props.error.isSpotifyAuthError && (
      <>
        <p>An error occurred during communication with spotify.</p>
        <a
          href={SpotifyAuthUrl(
            props.state ? props.state : new Date().toISOString()
          )}
        >
          Click to try again.
        </a>
      </>
    )}
    <p>{props.error.message}</p>
    <p>
      If this problem persists{" "}
      <a href="mailto:playlist@mattmarch.co.uk">let me know</a>.
    </p>
  </CenteredContainer>
);

const getUrlHashParams = (
  pathname: string
): SuccessCallbackParams | ErrorCallbackParams => {
  const urlParams = new URLSearchParams(pathname.slice(1));
  const stateParam = urlParams.get("state");
  const errorParam = urlParams.get("error");
  const tokenParam = urlParams.get("access_token");

  if (errorParam != null) {
    return {
      error: `Error authorizing with Spotify. Message was "${errorParam}"`,
      state: stateParam,
    };
  }
  if (stateParam == null || tokenParam == null) {
    return {
      error: "Callback from Spotify was missing key return parameters",
      state: null,
    };
  }
  return {
    accessToken: tokenParam,
    state: stateParam,
  };
};

interface SuccessCallbackParams {
  accessToken: string;
  state: string;
}

interface ErrorCallbackParams {
  error: string;
  state: string | null;
}

const isErrorParams = (
  params: SuccessCallbackParams | ErrorCallbackParams
): params is ErrorCallbackParams => "error" in params;

export default SpotifyLoggedIn;
