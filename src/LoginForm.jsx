import { useState } from 'react';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault(); 
    if (username) {
      if (username.toLowerCase() === 'dog') {
        setErrorMessage('The username "dog" is not allowed.');
      } else {
        onLogin(username)
          .then(() => {
            setErrorMessage('');
          })
          .catch((error) => {
            setErrorMessage(error?.error || 'ERROR');
          });
      }
    } else {
      setErrorMessage('Please enter a username');
    }
  }

  return (
      <div className="login-component">
        <form action="#/login" onSubmit={onSubmit}>
          <div className="homepage">
          <h1 className="h1-style">Guide for  Seattle tour</h1>

          <label>
            <span>Username : </span>
            <input value={username} onChange={onChange}/>
          </label>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div>
          <button className="button1-style" type="submit">Login</button>
          </div>
          </div>
        </form>
      </div>
  );

}

export default LoginForm;
