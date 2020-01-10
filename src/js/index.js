/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */
// Polyfills
import './polyfills/closest';
import './polyfills/CustomEvent';
import './polyfills/remove';

// Components
import Alert from './components/alert';
import Dropdown from './components/dropdown';
import FileInput from './components/fileInput';
import Sidenav from './components/sidenav';
import Tabs from './components/tabs';

export default { Alert, Dropdown, FileInput, Sidenav, Tabs };
