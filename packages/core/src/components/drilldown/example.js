function createItem(label, _id) {
	const id = _id ? _id : label.toLowerCase().replaceAll(" ", "-");
	const url = `?${id}`;
	return { id, label, url };
}

export const example = [
	{
		...createItem("IU Bloomington", "home"),
		depth: 0,
		items: [
			{ ...createItem("Academics"), current: true },
			{ ...createItem("Admissions"), hasChildren: true },
			createItem("Cost & Aid", "cost-aid"),
		],
	},
	{
		...createItem("Admissions"),
		depth: 1,
		items: [
			{ ...createItem("Apply"), hasChildren: true },
			createItem("Events"),
			createItem("Visit"),
			createItem("Meet Your Counselors"),
		],
		parent: createItem("IU Bloomington", "home"),
	},
	{
		...createItem("Apply"),
		depth: 2,
		items: [
			createItem("Freshman"),
			createItem("Graduate"),
			createItem("Returning"),
			createItem("Visiting"),
			createItem("Transfer"),
		],
		parent: createItem("Admissions"),
	},
];
