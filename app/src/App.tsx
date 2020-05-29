import React, { useState, useEffect } from "react";
// import "./App.css";
import {
  getChartData,
  ChartData,
  findBirthdayNumberOnes,
  BirthdayNumberOnes,
} from "./ChartData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const App = () => {
  const [birthdayDate, setBirthdayDate] = useState(new Date());
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

      <h3>Enter your birthday below:</h3>
      <DatePicker
        selected={birthdayDate}
        onChange={(date) =>
          date ? setBirthdayDate(date) : setBirthdayDate(new Date())
        }
        dateFormat="dd/MM/yyyy"
        minDate={new Date(1900, 0, 1)}
        maxDate={new Date()}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
      <SubmitButton
        disabled={chartData == null}
        onClick={() =>
          chartData &&
          setBirthdayNumberOnes(findBirthdayNumberOnes(birthdayDate, chartData))
        }
      >
        Find me a playlist
      </SubmitButton>
      {birthdayNumberOnes && (
        <ResultsContainer>
          <p>Spotify integration coming soon!</p>
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
        ) : (
          <p>UK Charts only started on 14/11/1952</p>
        )}
      </Result>
    ))}
  </div>
);

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubmitButton = styled.button`
  margin: 10px;
`

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Result = styled.div`
  text-align: center;
`

export default App;
