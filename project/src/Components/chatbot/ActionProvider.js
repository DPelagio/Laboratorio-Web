class ActionProvider {
  // The action provider receives createChatBotMessage which you can use to define the bots response, and
  // the setState function that allows for manipulating the bots internal state.
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleMessageParser = (res) => {
    const messages = this.createChatBotMessage(
      res, { withAvatar: true }
    );

    this.addMessageToBotState(messages);
  };

  addMessageToBotState = (messages) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages],
      }));
    } else {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, messages],
      }));
    }
  };
}

export default ActionProvider;
