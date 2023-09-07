import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';

const WebSocketUserList = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create a WebSocket connection
    const socket = new SockJS('http://localhost:8085/ws'); // Replace with your WebSocket endpoint
    const stompClient = Stomp.over(socket);

    // Subscribe to user list updates
    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/user_list', (message) => {
        const receivedUserList = JSON.parse(message.body);
        console.log('Received user list from WebSocket:', receivedUserList);
        // Update state with the received user list
        setUserList(receivedUserList);
      });
    });

    // Fetch data from /update-users URL
    const fetchData = async () => {
      try {
        // Call the WebSocket-related actions only after the WebSocket connection is established
        await stompClient.connect({}, () => {
          console.log('WebSocket connection established');
        });

        // Fetch data from /update-users URL
        const response = await axios.get('http://localhost:8085/update-users');
        const updatedUserList = response.data;
        console.log('Fetched user list from /update-users:', updatedUserList);
        setUserList(updatedUserList);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();

    return () => {
      // Clean up WebSocket connection on component unmount
      stompClient.disconnect(() => {
        console.log('WebSocket disconnected');
      });
    };
  }, []);

  return (
    <div>
      <h1>WebSocket User List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
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
      )}
    </div>
  );
};

export default WebSocketUserList;
