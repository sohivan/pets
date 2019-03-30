import React, { useState, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { withRouter } from 'react-router-dom';
import './Login.css';

function login(email, password) {
  return fetch('http://localhost:3001/login', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
        email,
        password
    })
  });
}

function LoginPage({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [anyErrors, setError] = useState('');

  const emailChanged = useCallback((e) => {
    setEmail(e.target.value);
  }, [])

  const passwordChanged = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  const submit = useCallback(async (e) => {
    try {
      let data = await login(email, password)
      data.json().then(result => {
        if (result.status === "failed"){
          setError(result.message);
        } else if (result.status === "success") {
          localStorage.setItem("email", email);
          console.log("the log in button has been pressed")
          history.push('/');
        }
      })
    } catch(e) {
      setError("Unexpected error");
    }
  }, [email, password])

  return (
    <div className="login">
      <h2 className = "login-title">Login</h2>
      <FormControl>
        <TextField
          id="email"
          variant="outlined"
          onChange={emailChanged}
          label="Enter your email"
          value={email}
        />
        <br/>
        <TextField
          id="password"
          variant="outlined"
          type={'password'}
          onChange={passwordChanged}
          label="Enter your password"
          value={password}
        />
        <br/>
        <Button
          variant="contained"
          onClick={submit}
          class = "login-button">
          Submit
          </Button>
      </FormControl>
      <div>
        {anyErrors}
      </div>
    </div>
  );
}

export default withRouter(LoginPage);
