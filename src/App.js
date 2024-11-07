import { useState, useEffect } from 'react';
import Tabs from "./Tabs";
import Calendar from "./Calendar";
import { tabsConfig } from "./tabsConfig";
import LoginForm from './LoginForm';
import Controls from './Controls';
import './App.css';
import { LOGIN_STATUS, CLIENT, SERVER } from './constants';
import { fetchSession, fetchLogin, fetchLogout } from './services';

function App() {
  const [username, setUsername] = useState('');  // Correct destructuring
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);

  // Function to handle login
  function onLogin(username) {
    fetchLogin(username)
      .then(() => {
        setUsername(username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      });
  }

  // Function to handle logout
  function onLogout() {
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    fetchLogout();
  }

  // Function to check for an existing session
  function checkForSession() {
    fetchSession()
      .then(session => {
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      })
      .catch(err => {
        if (err?.error === CLIENT.NO_SESSION) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        }
      });
  }

  // useEffect to check session on component mount
  useEffect(() => {
    checkForSession();  // Call the function
  }, []);  // Empty dependency array to run only on mount

  return (
    <div className='content'>
      <main className='page-style'>
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin} />}
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div>
            <Tabs tabsConfig={tabsConfig} />
            <p className='para-style'>Hello, {username} </p> {/* Now using username */}
            <Calendar />
            <Controls onLogout={onLogout} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
