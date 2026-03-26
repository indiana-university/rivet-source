import { createId } from "@src/utilities/createId.js";
import { removeEnd } from "@src/utilities/removeEnd.js";
import { url } from "./util.js";

export const site = "Indiana University Bloomington";

const ids = {
	main: createId(),
	admissions: createId(),
	apply: createId(),
	costAid: createId(),
};
const menus = [
	{
		id: ids.main,
		label: "IU Bloomington",
		parent: null,
		url: url("home"),
		items: [
			["Academics"],
			["Admissions", url("admissions"), ids.admissions],
			["Cost & Aid", url("cost-aid")],
			["Campus Life"],
			["Support & Services"],
			["Research"],
			["About IU"],
			["Alumni & Giving"],
		],
	},
	{
		id: ids.admissions,
		label: "Admissions",
		parent: ids.main,
		url: url("admissions"),
		items: [
			["Apply", url("apply"), ids.apply],
			["Admissions Paths", url("admissions-paths")],
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
	},
	{
		id: ids.apply,
		label: "Apply",
		parent: ids.admissions,
		url: url("apply"),
		items: [
			["Freshman Applicants", url("freshman-applicants")],
			["Graduate Applicants", url("graduate-applicants")],
			["Returning Applicants"],
			["Visiting & Non-degree Applicants"],
			["Transfer Applicants"],
			["Application Materials"],
			["Credits & Transfer"],
			["Manage Your Application"],
			["How to Apply"],
		],
	},
	{
		id: ids.costAid,
		label: "Cost & Aid",
		parent: ids.main,
		url: url("cost-aid"),
		items: [
			["Cost of Attendance"],
			["Financial Aid"],
			["Scholarships"],
			["Grants & Fellowships"],
			["Loans"],
			["Pay Your Bill"],
		],
	},
];

export function getMenus(Astro) {
	const currentPage = removeEnd(Astro.url.pathname, "/");
	const menuDepth = new Map();
	return menus.map((menu) => {
		const items = menu.items.map((item) => {
			const [label, url, child] = item;
			const current = url === currentPage;
			return { current, label, url, child };
		});
		const main = !menu.parent;
		const current = items.some((item) => item.current);
		const parentDepth = menuDepth.get(menu.parent) || 0;
		const depth = parentDepth + 1;
		menuDepth.set(menu.id, depth);
		return {
			...menu,
			current,
			depth,
			items,
			main,
		};
	});
}
