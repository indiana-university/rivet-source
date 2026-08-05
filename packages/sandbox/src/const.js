/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import sandboxWorkflow from "rivet-source/.github/workflows/sandbox.yml";

const branch = sandboxWorkflow.on.push.branches.at(0);
export const SITE_TITLE = `Rivet ${branch} branch`;
