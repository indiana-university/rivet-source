/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */
// Polyfills
import './polyfills/closest';
import './polyfills/CustomEvent';
import './polyfills/remove';

// Components
import Accordion from './components/accordion';
import Alert from './components/alert';
import Dropdown from './components/dropdown';
import FileInput from './components/fileInput';
import Modal from './components/modal';
import Sidenav from './components/sidenav';
import Tabs from './components/tabs';

export { Accordion, Alert, Dropdown, FileInput, Modal, Sidenav, Tabs };
