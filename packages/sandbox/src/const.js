/*
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { execSync } from "node:child_process";

const currentBranch = execSync("git branch --show-current", {
	encoding: "utf-8",
}).trim();
const branch = process.env.BRANCH_NAME ?? (currentBranch || "unknown");
export const SITE_TITLE = `Rivet ${branch} branch`;
