import { LayoutComponents } from "../../components/LayoutComponents"
import React, { useEffect, useState } from 'react';
import jpIMG from '../../assets/jp.svg';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function loadStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }

  useEffect (() => {
    loadStorage();
  }, []);
  

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
      "password_confirmation":confirmPassword,
      "nameToken":"nameToken"
    };

    try {
      api.post('api/register', data)
      .then(async (res) =>{
        if(res.data.status){
          const response = await api.post('api/login', { email, password });
          localStorage.setItem('token', response.data.response.token);
          api.defaults.headers.Authorization = `Bearer ${response.data.response.token}`;

          navigate('/home');
        }
      });
    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <LayoutComponents>
      <form className="login-form" onSubmit={handleRegister}>

        <span className="login-form-title">Criar Conta</span>

        <span className="login-form-title">
          <img src={jpIMG} alt="Jovem Programador" />
        </span>

        <div className="wrap-input">
          <input
            className={name !== "" ? "has-val input" : "input"}
            type="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Nome"></span>
        </div>

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
          <span className="focus-input" data-placeholder="Senha"></span>
        </div>

        <div className="wrap-input">
          <input
            className={confirmPassword !== "" ? "has-val input" : "input"}
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Confirme sua senha"></span>
        </div>

        <div className="container-login-form-btn">
          <button className="login-form-btn" type="submit">Entrar</button>
        </div>

        <div className="text-center">
          <span className="txt1">Já possui conta?</span>

          <Link className="txt2" to="/">Acessar.</Link>
        </div>

      </form>
    </LayoutComponents>
  )
}