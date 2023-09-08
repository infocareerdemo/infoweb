import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authservice from './service/authservice';
import './login.css';
import Header from './Header';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

function Login() {
  const [serverError, setServerError] = useState(null); // Server error state
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    setServerError(null); // Clear previous server errors

    // Simulate a server error for testing purposes
    const simulateServerError = true; // Change to false to test successful login

    if (simulateServerError) {
      // Simulated server error
      setServerError('Server error. Please try again later.');
    } else {
      // Simulated successful login
      authservice
        .Login(username, password)
        .then((response) => {
          if (response.data && response.data.ResponseText === 'Success') {
            console.log('Login success:', response.data);
            localStorage.setItem('token', response.data.UserToken);
            navigate('/main');
          } else {
            console.log('Login failed:', response.data);
            // alert('Incorrect username or password. Please try again.');
          }
        })
        .catch((error) => {
          console.error('An error occurred during the network request:', error);
          setServerError('Server error. Please try again later.');
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="account-content" style={{ marginTop: '10px' }}>
        <div className="login-container">
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <h2>Login</h2>
          </div>
          {serverError && (
            <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
              {serverError}
            </div>
          )}
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    </div>
  );
}

export default Login;
