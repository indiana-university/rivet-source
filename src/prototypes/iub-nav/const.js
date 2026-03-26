export const site = "Indiana University Bloomington";

const applyMenu = [
	["Freshman Applicants", "freshman-applicants"],
	["Graduate Applicants", "graduate-applicants"],
	["Returning Applicants"],
	["Visiting & Non-degree Applicants"],
	["Transfer Applicants"],
	["Application Materials"],
	["Credits & Transfer"],
	["Manage Your Application"],
	["How to Apply"],
];
const admissionsMenu = [
	["Apply", "apply", applyMenu],
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
];
const homeMenu = [
	["Academics"],
	["Admissions", "admissions", admissionsMenu],
	["Cost & Aid", "cost-aid"],
	["Campus Life"],
	["Support & Services"],
	["Research"],
	["About IU"],
	["Alumni & Giving"],
]
export const menus = ["IU Bloomington", "home", homeMenu];
