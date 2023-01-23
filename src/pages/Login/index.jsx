import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import jpIMG from '../../assets/jp.svg';
import { LayoutComponents } from '../../components/LayoutComponents';
import api from '../../services/api';
import { isAuthenticaded } from '../../routes/auth';
import Swal from 'sweetalert2'
import { CircularProgress, Button } from '@chakra-ui/react'


export const Login = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function showProgress() {
    <CircularProgress
      color="green.300"
      size="24px"
      mr="10px"
    >
    </CircularProgress>
  }

  function loadStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }

  useEffect(() => {
    loadStorage();
  }, []);


  async function handleLogin(e) {
    e.preventDefault();
    isAuthenticaded();

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)

    showProgress()

    try {
      const response = await api.post('api/login', { email, password });
      localStorage.setItem('token', response.data.response.token);
      api.defaults.headers.Authorization = `Bearer ${response.data.response.token}`;

      if (isAuthenticaded() === true) {

        window.location.reload();
      }

    } catch (err) {
      setLoading(false)

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erro ao fazer login, tente novamente!'
      })
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
          <Button className="login-form-btn"
            isLoading={loading}
            loadingText="Carregando"
            colorScheme=""
            variant="solid"
            type='submit'
          >
            Entrar
          </Button>
        </div>

        <div className="text-center">

          <span className="txt1">Não possui conta?</span>

          <Link className="txt2" to="/register">Criar conta.</Link>
        </div>

      </form>
    </LayoutComponents>
  );
}