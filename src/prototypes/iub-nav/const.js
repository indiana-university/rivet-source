import { createId } from "@src/utilities/createId.js";
import { getUrl, isCurrentPage } from "./util.js";

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
		slug: "home",
		items: [
			["Academics"],
			["Admissions", "admissions", ids.admissions],
			["Cost & Aid", "cost-aid"],
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
		slug: "admissions",
		items: [
			["Apply", "apply", ids.apply],
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
	},
	{
		id: ids.apply,
		label: "Apply",
		parent: ids.admissions,
		slug: "apply",
		items: [
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
	},
	{
		id: ids.costAid,
		label: "Cost & Aid",
		parent: ids.main,
		slug: "cost-aid",
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
	const menuDepth = new Map();
	return menus.map((menu) => {
		const items = menu.items.map((item) => {
			const [label, slug, child] = item;
			const current = isCurrentPage(slug, Astro);
			const url = getUrl(slug);
			return { current, label, url, child };
		});
		const main = !menu.parent;
		const current = items.some((item) => item.current);
		const parentDepth = menuDepth.get(menu.parent) || 0;
		const depth = parentDepth + 1;
		menuDepth.set(menu.id, depth);
		const url = getUrl(menu.slug);
		return {
			...menu,
			current,
			depth,
			items,
			main,
			url,
		};
	});
}
