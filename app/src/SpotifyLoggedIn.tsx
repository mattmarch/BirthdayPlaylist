import React from "react";
import { useLocation } from "react-router-dom";
import { DateTime } from "luxon";

const SpotifyLoggedIn = () => {
  const hashParams = useHashParams();
  console.log(hashParams);
  return (
    <div>
      <h1>Birthday Playlist Generator</h1>
      <h3>Now connected with Spotify</h3>
    </div>
  );
};

type CallbackParams = {
  accessToken: string;
  expires: DateTime;
  state: string;
};

const useHashParams = (): CallbackParams | Error => {
  const urlParams = new URLSearchParams(useLocation().hash.slice(1));
  const errorParam = urlParams.get("error");
  if (errorParam != null) {
    return {
      name: "Spotify authorisation failed",
      message: `Error message was: ${errorParam}`,
    };
  }
  const accessToken = urlParams.get("access_token");
  const expiresIn = Number(urlParams.get("expires_in"));
  const state = urlParams.get("state");
  return accessToken != null && expiresIn > 0 && state != null
    ? {
        accessToken,
        expires: DateTime.local().plus({ seconds: expiresIn }),
        state,
      }
    : {
        name: "Missing Parameters from Spotify",
        message: "Response from Spotify was missing key return parameters",
      };
};
export default SpotifyLoggedIn;
