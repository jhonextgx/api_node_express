const { IncomingWebhook } = require("@slack/webhook")
const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);

const loggerStream = {
    write: message => {
        webHook.send({
            text: message
        })
      console.log('Capturado el log', message)
    },
  };

  module.exports = loggerStream