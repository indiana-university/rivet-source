const licenseTextRaw = `Copyright (C) 2018 The Trustees of Indiana University
SPDX-License-Identifier: BSD-3-Clause`;

// Output license as full multi-line/block comment
function buildFullBlockComment() {
    const rawLines = licenseTextRaw.split("\n");
    const commentLines = rawLines.map(line => ` * ${line}`);
    const fullBlockComment = `/*\n${commentLines.join("\n")}\n */`;
    
    return fullBlockComment;
}

// Output license as block comment content only
function buildBlockCommentBodyOnly() {
    const rawLines = licenseTextRaw.split("\n");
    const commentLines = rawLines.map(line => ` * ${line}`);
    const blockContentOnly = `${commentLines.join("\n")}`;

    return blockContentOnly;
}

export const blockComment = buildFullBlockComment();
export const blockCommentBody = buildBlockCommentBodyOnly();
