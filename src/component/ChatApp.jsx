import { useEffect, useState } from 'react'
import { onReceiveMessage, queryHistoryMessage, sendTextMessage } from '../services/zimServices';
import Sidebar from './Sidebar';
import ChatContainer from './ChatContainer';
import UserProfile from './UserProfile';

const ChatApp = ({ user }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const handleSelectChat = async (chat) => {
    setActiveChat(chat);
    console.log(typeof chat.conversationID);
    try {
      const result = await queryHistoryMessage({
        conversationID: String(chat.conversationID),
        conversationType: Number(chat.type),
        count: 50,
        reverse: 0,
      });
      const formatted = result.messageList.map((msg, index) => ({
        id: msg.messageID || index,
        text: msg.message,
        sender: msg.direction === 0 ? 'me' : 'other',
        time: new Date(msg.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
      }));
      console.log(result.messageList)
      setMessages(formatted);
    } catch (err) {
      console.error('Failed to load messages:', err);
      setMessages([])
    }
  };

  const handleSendMessage = async (newMessage) => {
    if (!activeChat) return;

    try {
      const sent = await sendTextMessage(
        String(activeChat.conversationID),
        Number(activeChat.type),
        newMessage
      );

      const msgObj = {
        id: sent.messageID || messages.length + 1,
        text: sent.message,
        sender: 'me',
        time: new Data(sent.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
      };
      setMessages((prev) => [...prev, msgObj]);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  useEffect(() => {
    if (!activeChat) return;

    const cleanup = onReceiveMessage((incomeingMessages) => {
      const cleanup = incomeingMessages.filter(
        (msg) => String(msg.conversationID) === String(activeChat.conversationID)
      );
      if (filtered.length) {
        const newMsgs = filtered.map((msg) => ({
          id: sent.messageID,
          text: sent.message,
          sender: msg.direction === 0 ? 'me' : 'other',
          time: new Data(sent.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          }),
        }));
        setMessages((prev) => [...prev, ...newMsgs]);
      }
    });
    return () => {
      cleanup();
    };
  }, [activeChat]);
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
      <Sidebar onSelectChat={handleSelectChat}/>
      {activeChat ? (
        <>
          <ChatContainer
            activeChat={activeChat}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
          <UserProfile user={activeChat}/>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            Select a chat to start messsaging
          </p>
        </div>
      )}
    </div>
  )
}

export default ChatApp
