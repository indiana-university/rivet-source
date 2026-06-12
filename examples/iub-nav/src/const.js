/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

export const site = "Indiana University Bloomington";

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
export const menus = [site, "", homeMenu];
