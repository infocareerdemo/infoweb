import React, { useEffect, useState } from 'react';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function WebsocketUserUpdate() {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
     
      const socket = new SockJS('/ws'); 
      const stompClient = Stomp.over(socket);
  
     
      stompClient.connect({}, () => {
        stompClient.subscribe('/topic/user_list', (message) => {
          const receivedUserList = JSON.parse(message.body);
          console.log('Received user list:', receivedUserList);
          
          setUserList(receivedUserList);
        });
      });
  
      
      return () => {
        stompClient.disconnect(() => {
          console.log('WebSocket connection disconnected.');
        });
      };
    }, []);
  
    return (
      <div><h1>WebSocket User List</h1>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

export default WebsocketUserUpdate;
