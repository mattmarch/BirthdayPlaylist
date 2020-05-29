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

function App() {
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
    </div>
  );
}

export default App;
