import React from 'react'
import Auth from './Auth'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login({ onLogin, isLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }
  function onChange(evt) {
    evt.preventDefault();
    onLogin(email, password);
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Auth
        title={'Вход'}
        buttonText={'Войти'}
        onSubmit={onChange}>

        <input
          className="form__field form__field_auth"
          name="Email" type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />

        <input className="form__field form__field_auth"
          name="Password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
          autoComplete="on"
          required
        />
      </Auth>
    </>
  )
}
