const core = require('@actions/core');
const { GitHub } = require('@actions/github');

async function run() {
  try {
    const myToken = core.getInput('GITHUB_TOKEN');
    const tag = core.getInput('tag_name', { required: true });
    const label = tag.substr(10, tag.length - 1);
    const query = `repo:indiana-university/rivet-source+type:pr+label:${label}`;
    const octokit = new GitHub(myToken);

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
