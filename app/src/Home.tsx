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

const Home = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const chartData = useChartData();
  const birthdayNumberOnes =
    chartData != null && selectedDate != null
      ? findBirthdayNumberOnes(selectedDate, chartData)
      : null;

  return (
    <MainLayout>
      <BirthdayPicker
        disabled={chartData == null}
        onDateSelect={setSelectedDate}
      />
      {birthdayNumberOnes && selectedDate && (
        <CenteredContainer>
          <a href={SpotifyAuthUrl(selectedDate.toISOString())}>
            Connect with Spotify for more track information and the option to
            automatically create a playlist.
          </a>
          <NumberOnesList birthdayNumberOnes={birthdayNumberOnes} />
        </CenteredContainer>
      )}
    </MainLayout>
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

const Result = styled.div`
  text-align: center;
`;

export default Home;