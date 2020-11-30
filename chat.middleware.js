const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

async function runSample(projectId = 'subtle-signal-282410', userInput) {
  const sessionId = uuid.v4();

  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: userInput,
        languageCode: 'en-US',
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const resObj = {};

  const result = responses[0].queryResult;

  resObj.query = result.queryText;
  resObj.reponse = result.fulfillmentText;

  if (result.intent) {
    resObj.intentFound = true;
    resObj.intent = result.intent.displayName;
  } else {
    resObj.intentFound = true;
  }

//   console.log(resObj);
  return resObj;
}

// runSample('subtle-signal-282410', 'hi');

module.exports = async (query) => {
    let obj = await runSample('subtle-signal-282410', query);
    return obj;
}
