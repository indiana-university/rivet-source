export const site = "IU Timeline";

const startDate = "1970-01-01";
const endDate = getYMD();
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
Assembly Hall Renamed Ceremony (Simon Skjodt Assembly Hall)
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

1976-03-29
(Just a test)
`;

function parseContent(content) {
	const extra = getDatesBetween(startDate, endDate)
		.filter((d) => !content.includes(d));
	const data = [
		...content.trim().split("\n\n"),
		...getRandomItems(extra, 100)
	].map((entry) => {
		const [date, heading, description] = entry.split("\n");
		const [year, month, day] = date.split("-");
		const yearMonth = [year, month].join("-");
		const decade = String(getDecade(date));
		return { date, decade, yearMonth, year, month, day, heading, description };
	}).sort((a, b) => a.date.localeCompare(b.date)).reverse();

	const decadesObj = Object.groupBy(data, (({ decade }) => decade));
	const decades = Object.entries(decadesObj).map(([key, value]) => {
		const years = [...new Set(value.map(({ year }) => year))].sort();
		return [key, years];
	});

	const yearObj = Object.groupBy(data, (({ year }) => year));
	const years = Object.entries(yearObj).map(([key, value]) => {
		const months = [...new Set(value.map(({ month }) => month))].sort();
		return [key, months];
	});

	const yearMonthObj = Object.groupBy(data, (({ yearMonth }) => yearMonth));
	const yearMonths = Object.entries(yearMonthObj).map(([key, value]) => {
		const days = [...new Set(value.map(({ day }) => day))].sort();
		return [key, days];
	});

	const yearMonthDayObj = Object.groupBy(data, (({ date }) => date));
	const yearMonthDays = Object.entries(yearMonthDayObj);

	console.log("##", yearMonthDays);

	/*

	const byDate = Object.groupBy(data, ({ date }) => date);
	const dates = Object.keys(byDate).sort();
	const firstDate = dates.at(0);
	const firstYear = getYear(firstDate);
	const lastDate = dates.at(-1);
	const lastYear = getYear(lastDate);
	const decades = getDecades(firstDate, lastDate)
		.map((decade) => {
			const years = getYearsInDecade(decade)
				.filter((year) => year >= firstYear && year <= lastYear);
			return {
				decade,
				years,
			};
		});

	console.log("##", data);
	*/
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
	const d = date ? (new Date(date)) : (new Date());
	return d.toISOString().substring(0, 10);
}

function getDecade(date) {
	const year = getYear(date);
	return Math.floor(year / 10) * 10;
}

function getDecades(minDate, maxDate) {
	const minDecade = getDecade(minDate);
	const maxDecade = getDecade(maxDate);
	const decades = [];
	for (let decade = minDecade; decade <= maxDecade; decade += 10) {
		decades.push(decade);
	}
	return decades;
}

function getRandomItems(arr, count = 1) {
	const shuffled = [...arr].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
}


function getYear(date) {
	return new Date(date).getFullYear();
}

function getYearsInDecade(decade) {
	return Array.from({ length: 10 }, (_, i) => decade + i);
}

parseContent(content);

const applyMenu = [
	["Freshman Applicants"],
	["Graduate Applicants"],
	["Returning Applicants"],
	["Visiting & Non-degree Applicants"],
	["Transfer Applicants"],
	["Application Materials"],
	["Credits & Transfer"],
	["Manage Your Application"],
	["How to Apply"],
];
const admissionsMenu = [
	["Apply", null, applyMenu],
	["Admissions Paths"],
	["Admissions Events"],
	["Visit IU"],
	["Meet Your Counselors"],
	["Precollege Programs"],
	["Planning for IU"],
	["Class Profile"],
	["After Admission"],
	["Admissions Viewbook"],
	["For Counselors"],
	["For Families"],
	["Request Information"],
];
const homeMenu = [
	["Academics"],
	["Admissions", null, admissionsMenu],
	["Cost & Aid"],
	["Campus Life"],
	["Support & Services"],
	["Research"],
	["About IU"],
	["Alumni & Giving"],
];
export const menus = ["IU Bloomington", "home", homeMenu];
