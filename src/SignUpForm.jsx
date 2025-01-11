import React, { useState } from 'react';

// SignUp Component
function SignUpForm({ onSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  function onChangeUsername(e) {
    setUsername(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  function onChangeConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    let isValid = true;

    if (!username) {
      setErrorMessage('Please enter your email');
      isValid = false;
    } else {
      setErrorMessage('');
    }

    if (!password) {
      setPasswordErrorMessage('Please enter a password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setPasswordErrorMessage('Passwords do not match');
      isValid = false;
    } else {
      setPasswordErrorMessage('');
    }

    if (isValid) {
      onSignUp(username)
        .then(() => {
          setErrorMessage('');
          setPasswordErrorMessage('');
        })
        .catch((error) => {
          setErrorMessage(error?.error || 'ERROR');
        });
    }
  }

  return (
    <div className="custom-signup-component">
      <div className="custom-background">
        <div className="custom-shape"></div>
        <div className="custom-shape"></div>
      </div>
      <form onSubmit={onSubmit} className="custom-form">
        <h3 className="custom-title">Sign Up</h3>

        <label htmlFor="username" className="custom-label">Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          value={username}
          onChange={onChangeUsername}
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
        {passwordErrorMessage && <p className="custom-error-message">{passwordErrorMessage}</p>}

        <label htmlFor="confirmPassword" className="custom-label">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={onChangeConfirmPassword}
          id="confirmPassword"
          className="custom-input"
        />

        <button type="submit" className="custom-button">Sign Up</button>
      </form>
    </div>
  );
}


export default SignUpForm;
