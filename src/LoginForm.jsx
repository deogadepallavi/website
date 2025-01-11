import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // To toggle between login and signup forms
  const [name, setName] = useState('');

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onChangeName(e) {
    setName(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    let isValid = true;

    if (!username) {
      setErrorMessage('Please enter your email');
      isValid = false;
    } else if (username.toLowerCase() === 'dog') {
      setErrorMessage('The username "dog" is not allowed.');
      isValid = false;
    } else {
      setErrorMessage('');
    }

    if (!password) {
      setPasswordErrorMessage('Please enter a password');
      isValid = false;
    } else {
      setPasswordErrorMessage('');
    }

    if (isValid) {
      onLogin(username)
        .then(() => {
          setErrorMessage('');
          setPasswordErrorMessage('');
        })
        .catch((error) => {
          setErrorMessage(error?.error || 'ERROR');
        });
    }
  }

  function toggleForm() {
    setIsSignUp(!isSignUp);
    setErrorMessage('');
    setPasswordErrorMessage('');
    setUsername('');
    setPassword('');
  }

  return (
    <div className="custom-login-component">
      <div className="custom-background">
        <div className="custom-shape"></div>
        <div className="custom-shape"></div>
      </div>
      <form action="#/login" onSubmit={onSubmit} className="custom-form">
        <h3 className="custom-title">{isSignUp ? 'Sign Up' : 'Login'} Here</h3>

        {isSignUp && (
        <>
          <label htmlFor="name" className="custom-label">Name</label>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={onChangeName} // Ensure onChangeName is defined
            id="name"
            className="custom-input"
          />
           </>
      )}

        <label htmlFor="username" className="custom-label">Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          value={username}
          onChange={onChange}
          id="username"
          className="custom-input"
        />
        {errorMessage && <p className="custom-error-message">{errorMessage}</p>}

        <label htmlFor="password" className="custom-label">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
          id="password"
          className="custom-input"
        />
        {passwordErrorMessage && (
          <p className="custom-error-message">{passwordErrorMessage}</p>
        )}

        <button type="submit" className="custom-button">
          {isSignUp ? 'Sign Up' : 'Log In'}
        </button>
        <p className="toggle-link" onClick={toggleForm}>
        {isSignUp ? 'Already have an account? Log In' : 'Don\'t have an account? Sign Up'}
      </p>

      </form>
    </div>
  );
}

export default LoginForm;



