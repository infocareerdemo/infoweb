import React, { useState, useEffect } from 'react';
import UserDetailsService from '../service/UserDetailsService';
import { useNavigate } from "react-router-dom";
import Sidepannel from '../sidepannel';
import MainHeader from '../MainHeader';
import { Link } from 'react-router-dom'
import authservice from '../service/authservice';
import SockJsClient from 'react-stomp';

const UserDetails = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsersList();

    }, [])

    const getUsersList = () => {
        UserDetailsService.getUsersList()
            .then((response) => {
                setUsers(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <MainHeader />
            <Sidepannel />
            <div className="page-wrapper">
                <h2 className="text-center">Users List</h2>
                <table style={{ width: '100%', border: '1px solid black', margin: '2%' }}>
                    <thead style={{  border: '1px solid black' ,textAlign:"center"}}>
                        <th style={{  border: '1px solid black'}}> ID</th>
                        <th style={{  border: '1px solid black'}}>NAME</th>
                        <th style={{  border: '1px solid black'}}>EMAIL</th>
                        
                        
                    </thead>
                    <tbody>
                        {
                            users.map(
                                user =>
                                    <tr key={user}>
                                        <td style={{  border: '1px solid black'}}>{user.id}</td>
                                        <td style={{  border: '1px solid black'}}>{user.name}</td>
                                        <td style={{  border: '1px solid black'}}>{user.email}</td>
                                        
                                        
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
                {/* </div> */}
            </div>

        </div>

    )
}
export default UserDetails;

