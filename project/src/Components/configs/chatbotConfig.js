import { createChatBotMessage } from "react-chatbot-kit";

const botName = "AI -assistant";

const config = {
  botName: botName,
  lang: "no",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  initialMessages: [
    createChatBotMessage(
      `Hi I'm ${botName}. I’m here to help you.`
    ),
    createChatBotMessage(
      "Here's a quick overview over what I need to function. Ask me about the prices or just say hi.",
      {
        withAvatar: false,
        delay: 500,
        widget: "overview",
      }
    ),
  ],
  state: {
    gist: "",
  },
  customComponents: {},
  widgets: [

  ],
};

export default config;
