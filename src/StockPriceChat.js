import React, { useState } from 'react';
import authservice from './service/authservice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'; // Import the send icon from Font Awesome

function StockPriceChat() {
  const [messages, setMessages] = useState([{ text: 'Welcome!!!', sender: 'receiver' }]);
  const [messageInput, setMessageInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState(null);
  const [chatVisible, setChatVisible] = useState(false);

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      const newInputMessage = {
        text: messageInput,
        sender: 'sender',
      };

      const newMessages = [...messages, newInputMessage];

      authservice.getStockPriceSymbolUsingEQ(messageInput)
        .then((response) => {
          console.log(response.data);

          if (response.data && response.data.length > 0) {
            const isinData = response.data[0].spisin;

            const newOutputMessage = {
              text: isinData,
              sender: 'receiver',
            };
            newMessages.push(newOutputMessage);
            setErrorMessage('');
          } else {
            setErrorMessage('Invalid symbol');
          }

          setMessages(newMessages);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage('Error occurred');
        });
    }
  };

  return (
    <div className={`chatbox-container ${chatVisible ? 'chat-visible' : ''}`}>
       <button onClick={() => setChatVisible(!chatVisible)}>Chat</button>
      {chatVisible && (
        <div className="stockchat-box">
          <div className="message-container">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === 'sender' ? 'right' : 'left'}`}
              >
                {message.text}
              </div>
            ))}
            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
            />
            <div onClick={handleSendMessage} className="send-icon">
              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockPriceChat;
