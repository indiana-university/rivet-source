/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export const site = "Hoosier Highlights";

const startDate = "1970-01-01";
const endDate = getYMD();
const articleFillPercentage = 0.005;
const content = `
2026-01-19
IU wins the national football championship
The Hoosiers defeated the Miami Hurricanes 27-21 at Hard Rock Stadium in Miami, Florida.

2020-10-24
IU Football Beats Penn State (Huge Upset)
Game-winning 2-point conversion completed in overtime.

2020-03-11
COVID Shutdown
IU announces move to online classes due to COVID-19.

2000-09-28
Herman B Wells Statue Dedication

2019-11-07
IU Esports Arena Opening (Bloomington)

2019-03-25
Little 500 70th Anniversary Race

2016-10-22
Assembly Hall Renaming Ceremony (Simon Skjodt Assembly Hall)
Official public dedication ceremony begins.

2012-12-12
IU Men's Soccer Wins 8th National Title
Final whistle vs. Georgetown (1-0).

2011-12-10
IU vs Kentucky "Wat Shot" (Christian Watford)
Watford hits the buzzer-beater to upset #1 Kentucky.

2007-11-19
Bobby Knight's 902nd Win (NCAA Record at the Time)
Texas Tech (Knight's team) wins, breaking Dean Smith's record.

1976-03-29
IU's Last Undefeated Season Final Buzzer (Still modern-recorded)
Indiana defeated Michigan 86-68 in the NCAA championship.
`;

function parseContent(content) {
	const articles = content.trim().split("\n\n");
	const fillerDates = getDatesBetween(startDate, endDate).filter(
		(d) => !content.includes(d),
	);
	const fillerTotal = Math.round(fillerDates.length * articleFillPercentage);
	const fillerArticles = getRandomItems(fillerDates, fillerTotal);
	const data = [...articles, ...fillerArticles]
		.map((entry) => {
			const [
				date,
				label = "(Title of highlight)",
				description = "(Description)",
			] = entry.split("\n");
			return { date, label, description };
		})
		.sort((a, b) => a.date.localeCompare(b.date))
		.reverse();

	const longDateFormat = new Intl.DateTimeFormat("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC",
	});
	const yearMonthDayObj = Object.groupBy(data, ({ date }) => date);
	const yearMonthDays = Object.entries(yearMonthDayObj)
		.map(([date, articles]) => {
			const [year, month, day] = date.split("-");
			const yearMonth = [year, month].join("-");
			const decade = String(getDecade(date));
			const label = longDateFormat.format(new Date(date));
			const id = date;
			return { id, date, decade, yearMonth, year, month, day, label, articles };
		})
		.sort((a, b) => a.id.localeCompare(b.id))
		.reverse();

	const monthDateFormat = new Intl.DateTimeFormat("en-US", {
		month: "long",
		year: "numeric",
		timeZone: "UTC",
	});
	const yearMonthObj = Object.groupBy(
		yearMonthDays,
		({ yearMonth }) => yearMonth,
	);
	const yearMonths = Object.entries(yearMonthObj)
		.map(([yearMonth, items]) => {
			const id = yearMonth;
			const { date, year, decade } = items.at(0);
			const label = monthDateFormat.format(new Date(date));
			return { id, label, items, year, decade };
		})
		.sort((a, b) => a.id.localeCompare(b.id))
		.reverse();

	const yearObj = Object.groupBy(yearMonths, ({ year }) => year);
	const years = Object.entries(yearObj)
		.map(([year, items]) => {
			const { decade } = items.at(0);
			const id = year;
			const label = id;
			return { id, label, items, decade };
		})
		.sort((a, b) => a.id.localeCompare(b.id))
		.reverse();

	const decadesObj = Object.groupBy(years, ({ decade }) => decade);
	const decades = Object.entries(decadesObj)
		.map(([decade, items]) => {
			const id = `${decade}s`;
			const label = id;
			return { id, label, items };
		})
		.sort((a, b) => a.id.localeCompare(b.id))
		.reverse();

	return decades;
}

function getDatesBetween(start, end) {
	const dates = [];
	const startDate = new Date(start);
	const endDate = new Date(end);
	let currentDate = startDate;
	while (currentDate <= endDate) {
		const date = getYMD(currentDate);
		dates.push(date);
		currentDate.setDate(currentDate.getDate() + 1);
	}
	return dates;
}

function getYMD(date) {
	const d = date ? new Date(date) : new Date();
	return d.toISOString().substring(0, 10);
}

function getDecade(date) {
	const year = getYear(date);
	return Math.floor(year / 10) * 10;
}

function getRandomItems(arr, count = 1) {
	const shuffled = [...arr].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
}

function getYear(date) {
	return new Date(date).getFullYear();
}

export const menus = {
	id: "",
	label: site,
	items: parseContent(content),
};
