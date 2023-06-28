/******************************************************************************
 * Copyright (C) 2023 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

const { Octokit } = require('@octokit/rest')

/******************************************************************************
 * Generate markdown for use in GitHub release notes.
 *****************************************************************************/

async function generate() {

  /******************************************************************************
   * Create GitHub REST API object.
   *****************************************************************************/

  const octokit = new Octokit({
    userAgent: 'IU Rivet Design System'
  })

  /******************************************************************************
   * Read version tag from command line input.
   *****************************************************************************/

  const tag = process.argv[2].trim()

  /******************************************************************************
   * Get all pull requests from rivet-source repo with given tag.
   *****************************************************************************/

  const pullRequests = await octokit.search.issuesAndPullRequests({
    q: `repo:indiana-university/rivet-source+type:pr+label:${tag}`
  })

  /******************************************************************************
   * Generate list of markdown links from pull requests.
   *****************************************************************************/

  const markdown = pullRequests.data.items.map(pr => {
    return `- [${pr.title}](${pr.html_url})`
  }).join('\n')

  /******************************************************************************
   * Output generated markdown.
   *****************************************************************************/

  console.log(`\n${markdown}\n`)

}

generate()