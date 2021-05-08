import { WebClient, LogLevel } from "@slack/web-api";
export const sendApprovalMessage = async () => {};

export const publishMessage = async (name: string) => {
  try {
    const client = new WebClient(process.env.SLACK_BOT_TOKEN, {
      logLevel: LogLevel.DEBUG,
    });
    await client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: "C5SJQ3V55",
      text: "The Inspirational Monk : New image",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Please check these images for posting.",
          },    
        },
        {
          type: "image",
          title: {
            type: "plain_text",
            text: name,
            emoji: true,
          },
          image_url: `https://api.tarunsingh.dev/image-generator/image/${name}`,
          alt_text: "image to be posted",
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                emoji: true,
                text: "Approve",
              },
              style: "primary",
              value: `approve - ${name}`,
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                emoji: true,
                text: "Deny",
              },
              style: "danger",
              value: `deny - ${name}`,
            },
          ],
        },
      ]
    });
  } catch (error) {
    console.error(error);
  }
}