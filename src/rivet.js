/******************************************************************************
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

import "./rivet.scss";

import Accordion from "./components/accordion/accordion.js";
import Alert from "./components/alert/alert.js";
import Dialog from "./components/dialog/dialog.js";
import Disclosure from "./components/disclosure/disclosure.js";
import Dropdown from "./components/dropdown/dropdown.js";
import FileInput from "./components/file/file-input.js";
import PriorityNav from "./components/priority-nav/priority-nav.js";
import Sidenav from "./components/sidenav/sidenav.js";
import Switch from "./components/switch/switch.js";
import Tabs from "./components/tabs/tabs.js";

function init() {
	Accordion.initAll();
	Alert.initAll();
	Disclosure.initAll();
	Dropdown.initAll();
	FileInput.initAll();
	Dialog.initAll();
	PriorityNav.initAll();
	Sidenav.initAll();
	Switch.initAll();
	Tabs.initAll();
}

export {
	Accordion,
	Alert,
	Dialog,
	Disclosure,
	Dropdown,
	FileInput,
	Sidenav,
	Switch,
	Tabs,
	init,
};

export default {
	Accordion,
	Alert,
	Dialog,
	Disclosure,
	Dropdown,
	FileInput,
	Sidenav,
	Switch,
	Tabs,
	init,
};
