import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import {
  BirthdayNumberOnes,
  findBirthdayNumberOnes,
  NoDataReason,
  useChartData,
} from "./ChartData";
import BirthdayPicker from "./shared/BirthdayPicker";
import MainLayout, { CenteredContainer } from "./shared/MainLayout";
import { SpotifyAuthUrl } from "./Spotify";
import { useLocation } from "react-router-dom";
import ShareLink from "./shared/ShareLink";
import { useAuth } from 'react-oidc-context'

const Home = () => {
  const auth = useAuth()
  // const dateFromUrl = getDateFromUrl(useLocation().pathname)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { chartData, errorMessage } = useChartData();
  const birthdayNumberOnes =
    chartData != null && selectedDate != null
      ? findBirthdayNumberOnes(selectedDate, chartData)
      : null;

  return (
    <MainLayout>
      {errorMessage != null ? (
        <CenteredContainer>
          <h3>Sorry! Something went wrong! :(</h3>
          <p>{errorMessage}</p>
        </CenteredContainer>
      ) : (
        <>
          <BirthdayPicker
            disabled={chartData == null}
            onDateSelect={setSelectedDate}
            selectedDate={selectedDate}
          />
          {birthdayNumberOnes && selectedDate && (
            <CenteredContainer>
              {console.log(auth)}
              <button onClick={() => auth.signinRedirect()}>
                Connect with Spotify for more track information and the option
                to automatically create a playlist.
              </button>
              <ShareLink date={selectedDate} />
              <NumberOnesList birthdayNumberOnes={birthdayNumberOnes} />
            </CenteredContainer>
          )}
        </>
      )}
    </MainLayout>
  );
};

const NumberOnesList = (props: { birthdayNumberOnes: BirthdayNumberOnes }) => (
  <>
    <h2>Your Playlist</h2>
    {props.birthdayNumberOnes.map((birthdayEntry) => (
      <Result key={birthdayEntry.date.toLocaleString()}>
        <h4>{birthdayEntry.date.toLocaleString()}</h4>
        {birthdayEntry.numberOne ? (
          <p>
            {birthdayEntry.numberOne.title} by {birthdayEntry.numberOne.artist}
          </p>
        ) : birthdayEntry.reason === NoDataReason.DATE_TOO_OLD ? (
          <p>UK Charts only started on 08/11/1952</p>
        ) : (
          <p>The latest chart data hasn't been updated yet, try again soon!</p>
        )}
      </Result>
    ))}
  </>
);

const Result = styled.div`
  text-align: center;
`;

const getDateFromUrl = (pathname: string): Date | null => {
  const urlParams = new URLSearchParams(pathname.slice(1));
  const stateParam = urlParams.get("state");
  return stateParam != null ? new Date(stateParam) : null
}

export default Home;
