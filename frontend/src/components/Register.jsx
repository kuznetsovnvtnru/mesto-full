import React from 'react'
import { useState, useEffect } from 'react';
import Auth from './Auth'
import { useNavigate, Link } from 'react-router-dom';


export default function Register({ onRegister, loggedIn }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function onEmailChange(e) {
    setEmail(e.target.value)
  }
  function onPasswordChange(e) {
    setPassword(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }
  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);
  return (
    <>
      <Auth
        title={'Регистрация'}
        buttonText={'Зарегистрироваться'}
        onSubmit={handleSubmit}>
        <input className="form__field form__field_auth"
          name="Email"
          type="email"
          placeholder="Email"
          onChange={onEmailChange}
          value={email || ""}
          minLength='2'
          maxLength='40'
          required />
        <input className="form__field form__field_auth"
          name="Password"
          type="password"
          placeholder="Пароль"
          onChange={onPasswordChange}
          value={password || ''}
          minLength='6'
          maxLength='40'
          required />
      </Auth>
      <p className='auth__text'>
        Уже зарегистрированы?{' '}
        <Link className='auth__link' to='/sign-in'>
          Войти
        </Link>
      </p>
    </>
  )
}
