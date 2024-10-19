// Chat.js
import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import logo from '../assets/img/rahul.png';

const steps = [
  {
    id: '0',
    message: "Hello guys,",
    trigger: '1',
  },
  {
    id: '1',
    user: true,
    trigger: '2',
  },
  {
    id: '2',
    user: true,
    trigger: '3',
  },
  {
    id: '3',
    message: "only for testing sorry !",
    trigger: '4',
  },
  {
    id: '4',
    user: true,
    end: true,
  },
];

const theme = {
  background: '#C9FF8F',
  headerBgColor: '#197B22',
  headerFontSize: '20px',
  botBubbleColor: '#0F3789',
  headerFontColor: 'white',
  botFontColor: 'white',
  userBubbleColor: '#FF5733',
  userFontColor: 'white',
};

const config = {
  botAvatar: logo,
  floating: true,
};

function Chat() {
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        headerTitle="Rahul Root"
        steps={steps}
        {...config}
      />
    </ThemeProvider>
  );
}

export default Chat;
