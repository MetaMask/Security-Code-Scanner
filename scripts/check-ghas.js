import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

async function main(){
  const octokit = await getOctokit(process.env.GITHUB_TOKEN);
  const owner = context.repo.owner;
  const repo = context.repo.repo;

  try {
    const res = await octokit.rest.codeScanning.listRecentAnalyses({
      owner,
      repo,
    });
  } catch (error) {
    if (error.message.includes("Advanced Security must be enabled")) {
      const message =
        "GitHub Advanced Security is NOT enabled. Code Scanner will not run.";
      core.notice(
        `Go to https://github.com/${owner}/${repo}/settings/security_analysis to enable GitHub Advanced Security.`
      );
      core.setFailed(message);
      return;
    }
    core.error(error);
  }

}


