import React, { useState, useEffect } from 'react';
import SockJsClient from 'react-stomp';
import MainHeader from "../components/mainheader/MainHeader";
import Sidepannel from "../components/sidebar/sidepannel";

const SOCKET_URL = 'http://localhost:8080/ws';

const WebSocketMsg = () => {
  const [message, setMessage] = useState('Enter Msg..');
  const [connected, setConnected] = useState(false);
  
  const onConnected = () => {
    console.log("Connected!!");
    setConnected(true); 
  }
  
  const onMessageReceived = (msg) => {
    setMessage(msg.message);
  }

  const onDisconnected = () => {
    console.log("Disconnected!");
    setConnected(false); 
  }

  useEffect(() => {
    if (!connected) {
      console.log("Attempting to connect...");
      onDisconnected();
      const client = new SockJsClient({ url: SOCKET_URL, debug: false });
      client.onConnect = onConnected;
      client.onDisconnect = onDisconnected;
      client.onMessage = (msg) => onMessageReceived(msg);

    }
  }, [connected]);

  return (
    <div>
       <MainHeader/>
        <Sidepannel/>
             <div className="page-wrapper">
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/message']}
        onConnect={onConnected}
        onDisconnect={onDisconnected}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />
      <div>{message}</div>
    </div>
    </div>
  );
}
export default WebSocketMsg;
