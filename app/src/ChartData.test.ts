import {
  getChartData,
  ChartData,
  findBirthdayNumberOne,
  BirthdayNumberOnes,
  NoDataReason,
} from "./ChartData";
import { DateTime } from "luxon";

const singleEntryOneWeek: ChartData = [
  {
    firstWeekEndDate: DateTime.fromISO("1952-11-14T00:00:00"),
    title: "HERE IN MY HEART",
    artist: "AL MARTINO",
    weeksAtNumberOne: 1,
  },
];

test("findBirthdayNumberOne returns DATE_TOO_OLD if birthday much before earliest chart", () => {
  const muchBeforeChartStart = DateTime.fromISO("1950-01-01T00:00");
  expect(
    findBirthdayNumberOne(muchBeforeChartStart, singleEntryOneWeek)
  ).toStrictEqual({
    date: muchBeforeChartStart,
    numberOne: null,
    reason: NoDataReason.DATE_TOO_OLD,
  });
});

test("findBirthdayNumberOne returns DATE_TOO_OLD if birthday one day before earliest chart", () => {
  const oneDayBeforeChartStart = DateTime.fromISO("1952-11-07T23:59");
  expect(
    findBirthdayNumberOne(oneDayBeforeChartStart, singleEntryOneWeek)
  ).toStrictEqual({
    date: oneDayBeforeChartStart,
    numberOne: null,
    reason: NoDataReason.DATE_TOO_OLD,
  });
});

test("findBirthdayNumberOne returns song on first day of chart", () => {
  const firstDayOfChart = DateTime.fromISO("1952-11-08T00:00");
  expect(
    findBirthdayNumberOne(firstDayOfChart, singleEntryOneWeek)
  ).toStrictEqual({
    date: firstDayOfChart,
    numberOne: singleEntryOneWeek[0],
    reason: null,
  });
});

test("findBirthdayNumberOne returns NO_DATA_YET after last day of chart", () => {
  const afterLastDayOfChart = DateTime.fromISO("1952-11-15T00:00");
  expect(
    findBirthdayNumberOne(afterLastDayOfChart, singleEntryOneWeek)
  ).toStrictEqual({
    date: afterLastDayOfChart,
    numberOne: null,
    reason: NoDataReason.NO_DATA_YET,
  });
});

test("findBirthdayNumberOne returns song on last day of chart", () => {
  const lastDayOfChart = DateTime.fromISO("1952-11-14T09:00");
  expect(
    findBirthdayNumberOne(lastDayOfChart, singleEntryOneWeek)
  ).toStrictEqual({
    date: lastDayOfChart,
    numberOne: singleEntryOneWeek[0],
    reason: null,
  });
});

const singleEntryMultipleWeeks: ChartData = [
  {
    firstWeekEndDate: DateTime.fromISO("1952-11-14T00:00:00"),
    title: "HERE IN MY HEART",
    artist: "AL MARTINO",
    weeksAtNumberOne: 9,
  },
];

test("findBirthdayNumberOne returns song on last day of chart with multiple weeks", () => {
  const lastDayOfChart = DateTime.fromISO("1953-01-09T09:00");
  expect(
    findBirthdayNumberOne(lastDayOfChart, singleEntryMultipleWeeks)
  ).toStrictEqual({
    date: lastDayOfChart,
    numberOne: singleEntryMultipleWeeks[0],
    reason: null,
  });
});

test("findBirthdayNumberOne returns NO_DATA_YET after last day of chart with multiple weeks", () => {
  const lastDayOfChart = DateTime.fromISO("1953-01-10T00:00");
  expect(
    findBirthdayNumberOne(lastDayOfChart, singleEntryMultipleWeeks)
  ).toStrictEqual({
    date: lastDayOfChart,
    numberOne: null,
    reason: NoDataReason.NO_DATA_YET,
  });
});

const chartDataWithDayChangeExtraDay: ChartData = [
  {
    firstWeekEndDate: DateTime.fromISO("1952-11-14T00:00:00"),
    title: "HERE IN MY HEART",
    artist: "AL MARTINO",
    weeksAtNumberOne: 9,
  },
  {
    firstWeekEndDate: DateTime.fromISO("1953-01-17T00:00:00"),
    title: "YOU BELONG TO ME",
    artist: "JO STAFFORD",
    weeksAtNumberOne: 1,
  },
];

test("findBirthdayNumberOne picks previous record if coverage has an extra day", () => {
  const middleDay = DateTime.fromISO("1953-01-10T09:00");
  // Al Martino's 9 week run's final day would be on 1953-01-09
  expect(
    findBirthdayNumberOne(middleDay, chartDataWithDayChangeExtraDay)
  ).toStrictEqual({
    date: middleDay,
    numberOne: chartDataWithDayChangeExtraDay[0],
    reason: null,
  });
});

const chartDataWithDayChangeMissingDay: ChartData = [
  {
    firstWeekEndDate: DateTime.fromISO("1952-11-14T00:00:00"),
    title: "HERE IN MY HEART",
    artist: "AL MARTINO",
    weeksAtNumberOne: 9,
  },
  {
    firstWeekEndDate: DateTime.fromISO("1953-01-15T00:00:00"),
    title: "YOU BELONG TO ME",
    artist: "JO STAFFORD",
    weeksAtNumberOne: 1,
  },
];

test("findBirthdayNumberOne picks latest record if coverage overlaps", () => {
  const middleDay = DateTime.fromISO("1953-01-09T09:00");
  // 1953-01-09 is overlapped by both Al Martino and Jo Stafford
  expect(
    findBirthdayNumberOne(middleDay, chartDataWithDayChangeMissingDay)
  ).toStrictEqual({
    date: middleDay,
    numberOne: chartDataWithDayChangeMissingDay[1],
    reason: null,
  });
});