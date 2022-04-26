import { findLast } from "lodash";
import { DateTime, Interval } from "luxon";
import { useState, useEffect } from "react";

const JsonBinUrl = "https://api.jsonbin.io/b/5ecfe1657741ef56a5638007/latest";

type IncomingChartEntry = {
  first_week_ending_date: string;
  title: string;
  artist: string;
  weeks_at_number_one: string;
};

export interface ChartEntry {
  firstWeekEndDate: DateTime;
  title: string;
  artist: string;
  weeksAtNumberOne: number;
}

export type ChartData = Array<ChartEntry>;

export const getChartData: () => Promise<ChartData> = async () => {
  const response = await fetch(JsonBinUrl);
  const incomingEntries = await response.json();
  return incomingEntries.map((entry: IncomingChartEntry) => ({
    firstWeekEndDate: DateTime.fromISO(entry.first_week_ending_date),
    title: entry.title,
    artist: entry.artist,
    weeksAtNumberOne: Number(entry.weeks_at_number_one),
  }));
};

export const useChartData = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChartData();
        setChartData(data);
      } catch (error) {
        setErrorMessage(`Failed to load chart data from API`)
      }
    };
    fetchData();
  }, []);
  return { chartData, errorMessage };
};

export type BirthdayNumberOnes = Array<Birthday>;

export type Birthday = {
  date: DateTime;
  numberOne: ChartEntry | null;
  reason: NoDataReason | null;
};

export enum NoDataReason {
  NO_DATA_YET,
  DATE_TOO_OLD,
}

export const findBirthdayNumberOnes = (
  birthdayDate: Date,
  chartData: ChartData
): BirthdayNumberOnes =>
  Interval.fromDateTimes(DateTime.fromJSDate(birthdayDate), DateTime.local())
    .splitBy({ years: 1 })
    .map((interval) => findBirthdayNumberOne(interval.start, chartData));

export const findBirthdayNumberOne = (
  birthday: DateTime,
  chartData: ChartData
): Birthday => {
  const chartEntryBeforeBirthday = findLast(
    chartData,
    (entry) => entry.firstWeekEndDate.minus({ days: 6 }) <= birthday // Date is last day of first week, so subtract 6 days to get beginning
  );
  if (chartEntryBeforeBirthday === undefined) {
    return {
      date: birthday,
      numberOne: null,
      reason: NoDataReason.DATE_TOO_OLD,
    };
  } else if (
    // if entry is final entry
    chartEntryBeforeBirthday === chartData[chartData.length - 1] &&
    // and birthday is past chart start plus weeks at number one
    birthday >=
    chartEntryBeforeBirthday.firstWeekEndDate.plus({
      weeks: chartEntryBeforeBirthday.weeksAtNumberOne,
      days: -6,
    })
  ) {
    return {
      date: birthday,
      numberOne: null,
      reason: NoDataReason.NO_DATA_YET,
    };
  } else {
    return {
      date: birthday,
      numberOne: chartEntryBeforeBirthday,
      reason: null,
    };
  }
};
