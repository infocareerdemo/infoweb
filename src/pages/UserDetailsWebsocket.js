import React, { useState, useEffect } from 'react';
import Sidepannel from '../sidepannel';
import MainHeader from '../MainHeader';
import io from 'socket.io-client';

const UserDetailsWebsocket = () => {
  const [users, setUsers] = useState([]);
  const socket = io('ws://localhost:8080/ws'); 

  useEffect(() => {
    getAllUsersList();
    setupWebSocket(); 

    return () => {
      
      if (socket.connected) {
       
        socket.disconnect();
      }
    };
  }, []);

 
  const setupWebSocket = () => {
    socket.on('userUpdated', (updatedUser) => {
      
      console.log('WebSocket message received:', updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
    });
  };

  const getAllUsersList = () => {
    fetch('http://localhost:8080/update-users') 
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  return (
    <div>
      <MainHeader />
      <Sidepannel />
      <div className="page-wrapper">
        <h2 className="text-center">Users List</h2>
        <table style={{ width: '100%', border: '1px solid black', margin: '2%' }}>
          <thead style={{ border: '1px solid black', textAlign: 'center' }}>
            <th style={{ border: '1px solid black' }}>ID</th>
            <th style={{ border: '1px solid black' }}>USERNAME</th>
            <th style={{ border: '1px solid black' }}>EMAIL</th>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ border: '1px solid black' }}>{user.id}</td>
                <td style={{ border: '1px solid black' }}>{user.username}</td>
                <td style={{ border: '1px solid black' }}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetailsWebsocket;
