import Mixpanel from "mixpanel";

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

async function main() {
  const MIXPANEL_PROJECT_TOKEN = process.env.MIXPANEL_PROJECT_TOKEN || "";
  const CODEQL_SCAN_RESULT = process.env.CODEQL_SCAN_RESULT || "";
  const RUN_ID = process.env.RUN_ID || "";
  const RUN_REPO = process.env.RUN_REPO || "";

  // todo: move to diff script
  // const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK || "";

  if (!MIXPANEL_PROJECT_TOKEN) {
    // slack notify us
    process.exit(1);
  }
  const mixpanel = Mixpanel.init(MIXPANEL_PROJECT_TOKEN);

  const event = {
    event: CODEQL_SCAN_RESULT,
    properties: {
      distinct_id: RUN_REPO,
      url: `https://github.com/${RUN_REPO}/actions/runs/${RUN_ID}`,
      result: CODEQL_SCAN_RESULT,
      run_id: RUN_ID,
    },
  };

  await mixpanel.track(event.event, event.properties);
}
