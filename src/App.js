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
  const [username, setUsername] = useState('');
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
 
  

  function onLogin(username) {
    fetchLogin(username)
      .then(() => {
        setUsername(username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      })
  }

  function onLogout() {
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    fetchLogout()
  }

  function checkForSession() {
    fetchSession()
      .then(session => {
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        return;
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION })
        }
        return Promise.reject(err);
      })
      .catch(err => {
        if (err?.error === CLIENT.NO_SESSION) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
      });

  }

  useEffect(
    () => {
      checkForSession();
    },
    []
  );

  return (
    <div className='content'>
      <main className='page-style'>
        
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin} />}
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div>
            <Tabs tabsConfig={tabsConfig} />
            <Calendar/>
           < Controls onLogout={onLogout} />
          </div>
          
        )}
      </main>
    </div>
  );
}

export default App;
