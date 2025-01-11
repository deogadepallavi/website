import { useState, useEffect } from 'react';
import Tabs from "./Tabs";
import Calendar from "./Calendar";
import { tabsConfig } from "./tabsConfig";
import LoginForm from './LoginForm';
import Controls from './Controls';
import SignUpForm from './SignUpForm';  
import './App.css';
import { LOGIN_STATUS, CLIENT, SERVER } from './constants';
import { fetchSession, fetchLogin, fetchLogout, fetchSignUp } from './services';

function App() {
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  const [isSignUp, setIsSignUp] = useState(false);  

  // Handle login logic
  function onLogin(username) {
    fetchLogin(username)
      .then(() => {
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      })
      .catch((err) => {
        console.error("Login failed", err);
      });
  }

  // Handle sign up logic
  function onSignUp(username) {
    fetchSignUp(username)
      .then(() => {
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      })
      .catch((err) => {
        console.error("Sign-up failed", err);
      });
  }

  // Handle logout
  function onLogout() {
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    fetchLogout();
  }

  // Check for existing session on page load
  function checkForSession() {
    fetchSession()
      .then(session => {
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

  useEffect(() => {
    console.log('my app ');
    checkForSession();
  }, []);

  // Toggle between Login and SignUp forms
  function toggleForm() {
    setIsSignUp(!isSignUp);
  }

  return (
    <div className='content'>
      <main className='page-style'>
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
          isSignUp ? (
            <SignUpForm onSignUp={onSignUp} toggleForm={toggleForm} />
          ) : (
            <LoginForm onLogin={onLogin} toggleForm={toggleForm} />
          )
        )}

        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div>
            <Tabs tabsConfig={tabsConfig} />
            <Calendar />
            <Controls onLogout={onLogout} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
