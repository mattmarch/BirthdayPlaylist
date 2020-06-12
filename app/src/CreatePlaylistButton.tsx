import React, { useState, useEffect } from "react";
import { BirthdayWithSpotifyData, createPlaylist } from "./Spotify";
import { CenteredContainer } from "./shared/MainLayout";

export const CreatePlaylistButton = (props: {
  numberOnes: Array<BirthdayWithSpotifyData>;
  birthdayDate: Date;
  token: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [playlistUrl, setPlaylistUrl] = useState<string | null>(null);
  useEffect(() => setPlaylistUrl(null), [props.birthdayDate]);
  const onCreatePlaylist = async () => {
    setLoading(true);
    setPlaylistUrl(null);
    try {
      const url = await createPlaylist(
        `Birthday Playlist (${props.birthdayDate.toLocaleDateString()})`,
        props.numberOnes,
        props.token
      );
      setPlaylistUrl(url);
    } catch (error) {
      setErrorMessage(`Error was: ${error.message}`);
    }
    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        <p>Creating playlist on Spotify...</p>
      ) : !playlistUrl ? (
        <CenteredContainer>
          {errorMessage != null && (
            <>
              <h4>An error occurred creating the playlist :(</h4>
              <p>{errorMessage}</p>
              <p>Try again?</p>
            </>
          )}
          <button onClick={onCreatePlaylist}>Create playlist on Spotify</button>
        </CenteredContainer>
      ) : (
        <a href={playlistUrl}>Checkout your Birthday Playlist on Spotify</a>
      )}
    </div>
  );
};
