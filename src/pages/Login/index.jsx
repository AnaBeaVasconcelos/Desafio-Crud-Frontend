import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import jpIMG from '../../assets/jp.svg';
import { LayoutComponents } from '../../components/LayoutComponents';
import api from '../../services/api';
import { isAuthenticaded } from '../../routes/auth';


export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  function loadStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }

  useEffect (() => {
    loadStorage();
  }, []);
  

  async function handleLogin(e) {
    e.preventDefault();
    isAuthenticaded();
   

    try {
      const response = await api.post('api/login', { email, password });
      localStorage.setItem('token', response.data.response.token);
      api.defaults.headers.Authorization = `Bearer ${response.data.response.token}`;

     if (isAuthenticaded() === true) {

      window.location.href = "/home";
     }

    } catch (err) {
      alert('Falha no login, tente novamente.');
    }
  }

  return (
    <LayoutComponents>
      <form className="login-form" onSubmit={handleLogin}>

        <span className="login-form-title">Bem Vindo!</span>

        <span className="login-form-title">
          <img src={jpIMG} alt="Jovem Programador" />
        </span>

        <div className="wrap-input">
          <input
            className={email !== "" ? "has-val input" : "input"}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Email"></span>
        </div>

        <div className="wrap-input">
          <input
            className={password !== "" ? "has-val input" : "input"}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Password"></span>
        </div>

        <div className="container-login-form-btn">
          <button className="login-form-btn" type="submit">Entrar</button>
        </div>

        <div className="text-center">

          <span className="txt1">Não possui conta?</span>

          <Link className="txt2" to="/register">Criar conta.</Link>
        </div>

      </form>
    </LayoutComponents>
  );
}