const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const myToken = core.getInput('GITHUB_TOKEN');
    const version = core.getInput('version', { required: true });
    const query = `repo:indiana-university/rivet-source+type:pr+label:${version}`;
    const octokit = new github.getOctokit(myToken);

    const { data: pullRequest } = await octokit.search.issuesAndPullRequests({
      q: query
    });

    let changelog = '';

    pullRequest.items.forEach(function(item) {
      changelog += `- [${item.title}](${item.html_url})\n`;
    });

    core.setOutput('changelog', changelog);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();