import { getUrl, isCurrentPage } from "./util.js";

export const site = "Indiana University Bloomington";

const menus = [
	[
		["IU Bloomington", "home", null],
		["Academics"],
		["Admissions", "admissions", true],
		["Cost & Aid", "cost-aid"],
		["Campus Life"],
		["Support & Services"],
		["Research"],
		["About IU"],
		["Alumni & Giving"],
	],
	[
		["Admissions", "admissions", "home"],
		["Apply", "apply", true],
		["Admissions Paths", "admissions-paths"],
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
	],
	[
		["Apply", "apply", "admissions"],
		["Freshman Applicants", "freshman-applicants"],
		["Graduate Applicants", "graduate-applicants"],
		["Returning Applicants"],
		["Visiting & Non-degree Applicants"],
		["Transfer Applicants"],
		["Application Materials"],
		["Credits & Transfer"],
		["Manage Your Application"],
		["How to Apply"],
	],
	[
		["Cost & Aid", "cost-aid", "home"],
		["Cost of Attendance"],
		["Financial Aid"],
		["Scholarships"],
		["Grants & Fellowships"],
		["Loans"],
		["Pay Your Bill"],
	]
];

export function getMenus(Astro) {
	const menuDepth = new Map();
	return menus.map((menu) => {
		const [meta, ...menuItems] = menu;
		const [label, id, parent] = meta;
		const items = menuItems.map((item) => {
			const [label, id, child] = item;
			const current = isCurrentPage(id, Astro);
			const url = getUrl(id);
			return { child, current, id, label, url };
		});
		const main = !parent;
		const current = items.some((item) => item.current);
		const parentDepth = menuDepth.get(parent) || 0;
		const depth = parentDepth + 1;
		menuDepth.set(id, depth);
		const url = getUrl(id);
		return {
			current,
			depth,
			id,
			items,
			label,
			main,
			parent,
			url,
		};
	});
}
