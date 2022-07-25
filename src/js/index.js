/******************************************************************************
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

/******************************************************************************
 * Polyfills
 *****************************************************************************/

import './polyfills/closest'
import './polyfills/CustomEvent'
import './polyfills/from'
import './polyfills/remove'

/******************************************************************************
 * Components
 *****************************************************************************/

import Accordion from './components/accordion'
import Alert from './components/alert'
import Dialog from './components/dialog'
import Disclosure from './components/disclosure'
import Dropdown from './components/dropdown'
import FileInput from './components/fileInput'
import Sidenav from './components/sidenav'
import Tabs from './components/tabs'

/******************************************************************************
 * Initializes all Rivet components.
 *****************************************************************************/

function init () {
  Accordion.initAll()
  Alert.initAll()
  Disclosure.initAll()
  Dropdown.initAll()
  FileInput.initAll()
  Dialog.initAll()
  Sidenav.initAll()
  Tabs.initAll()
}

/******************************************************************************
 * Exports
 *****************************************************************************/

export {
  Accordion,
  Alert,
  Dialog,
  Disclosure,
  Dropdown,
  FileInput,
  Sidenav,
  Tabs,
  init
}
