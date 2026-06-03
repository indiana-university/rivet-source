const raw = `Copyright (C) 2018 The Trustees of Indiana University
SPDX-License-Identifier: BSD-3-Clause`;

// Output license as block comment body only
const body = raw.split("\n").map(line => ` * ${line}`).join("\n");

// Output license as full multi-line/block comment
const header = `/*\n${body}\n */\n\n`;

export const license = { raw, body, header };