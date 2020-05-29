import React, { useState, useEffect } from "react";
import "./App.css";
import {
  getChartData,
  ChartData,
  findBirthdayNumberOnes,
  BirthdayNumberOnes,
} from "./ChartData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    <div className="App">
      <h1>Birthday Playlist Generator</h1>
      <p>
        Generate a Spotify playlist of UK number ones on your Birthday since you
        were born.
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
      <button
        disabled={chartData == null}
        onClick={() =>
          chartData &&
          setBirthdayNumberOnes(findBirthdayNumberOnes(birthdayDate, chartData))
        }
      >
        Find me a playlist
      </button>
      {birthdayNumberOnes && (
        <div>
          <p>Spotify integration coming soon!</p>
          <NumberOnesList birthdayNumberOnes={birthdayNumberOnes} />
        </div>
      )}
    </div>
  );
};

const NumberOnesList = (props: { birthdayNumberOnes: BirthdayNumberOnes }) => (
  <div>
    {props.birthdayNumberOnes.map((birthdayEntry) => (
      <div key={birthdayEntry.date.toLocaleString()}>
        <h4>{birthdayEntry.date.toLocaleString()}</h4>
        {birthdayEntry.numberOne ? (
          <p>
            {birthdayEntry.numberOne.title} by {birthdayEntry.numberOne.artist}
          </p>
        ) : (
          <p>UK Charts only started on 14/11/1952</p>
        )}
      </div>
    ))}
  </div>
);

export default App;
