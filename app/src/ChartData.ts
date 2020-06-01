import { findLast } from "lodash";
import { DateTime, Interval } from "luxon";

const JsonBinUrl = "https://api.jsonbin.io/b/5ecfe1657741ef56a5638007/latest";

type IncomingChartEntry = {
  first_week_ending_date: string;
  title: string;
  artist: string;
};

export interface ChartEntry {
  firstWeekEndDate: DateTime;
  title: string;
  artist: string;
}

export type ChartData = Array<ChartEntry>;

export const getChartData: () => Promise<ChartData> = () =>
  fetch(JsonBinUrl)
    .then((response) => response.json())
    .then((incomingEntries) =>
      incomingEntries.map((entry: IncomingChartEntry) => ({
        firstWeekEndDate: DateTime.fromISO(entry.first_week_ending_date),
        title: entry.title,
        artist: entry.artist,
      }))
    );

export type BirthdayNumberOnes = Array<Birthday>;

export type Birthday = {
  date: DateTime;
  numberOne: ChartEntry | null;
};

export const findBirthdayNumberOnes = (
  birthdayDate: Date,
  chartData: ChartData
): BirthdayNumberOnes =>
  Interval.fromDateTimes(DateTime.fromJSDate(birthdayDate), DateTime.local())
    .splitBy({ years: 1 })
    .map((interval) => findBirthdayNumberOne(interval.start, chartData));

const findBirthdayNumberOne = (
  birthday: DateTime,
  chartData: ChartData
): Birthday => {
  const chartEntryBeforeBirthday = findLast(
    chartData,
    (entry) => entry.firstWeekEndDate.minus({ days: 7 }) <= birthday // Date is first week end, so subtract 7 days to get beginning
  );
  if (chartEntryBeforeBirthday === undefined) {
    return { date: birthday, numberOne: null };
  } else {
    return { date: birthday, numberOne: chartEntryBeforeBirthday };
  }
};
