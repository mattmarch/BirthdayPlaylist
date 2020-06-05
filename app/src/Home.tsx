import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import {
  BirthdayNumberOnes,
  ChartData,
  findBirthdayNumberOnes,
  getChartData,
  NoDataReason,
} from "./ChartData";
import BirthdayPicker from "./shared/BirthdayPicker";
import { SpotifyAuthUrl } from "./Spotify";

const Home = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [
    birthdayNumberOnes,
    setBirthdayNumberOnes,
  ] = useState<BirthdayNumberOnes | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getChartData();
      setChartData(data);
    };
    fetchData();
  }, []);

  return (
    <AppContainer>
      <h1>Birthday Playlist Generator</h1>
      <p>
        Generate a Spotify playlist of UK number ones on your Birthday since you
        were born. This site is a work in progress.
      </p>
      <BirthdayPicker
        disabled={chartData == null}
        onDateSelect={(date) =>
          chartData != null &&
          setBirthdayNumberOnes(findBirthdayNumberOnes(date, chartData))
        }
      />
      {birthdayNumberOnes && (
        <ResultsContainer>
          <a href={SpotifyAuthUrl("123")} >
            Connect with Spotify for more track information and the option to
            automatically create a playlist.
          </a>
          <NumberOnesList birthdayNumberOnes={birthdayNumberOnes} />
        </ResultsContainer>
      )}
    </AppContainer>
  );
};

const NumberOnesList = (props: { birthdayNumberOnes: BirthdayNumberOnes }) => (
  <div>
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
  </div>
);

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Result = styled.div`
  text-align: center;
`;

export default Home;
