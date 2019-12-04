/**
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */
// Polyfills
import './polyfills/closest';
import './polyfills/CustomEvent';

// Components
import Alert from './components/alert';
import FileInput from './components/fileInput';
import Sidenav from './components/sidenav';

export default { Alert, FileInput, Sidenav };