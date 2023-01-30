import { LayoutComponents } from "../../components/LayoutComponents"
import React, { useEffect, useState } from 'react';
import jpIMG from '../../assets/jp.svg';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Swal from 'sweetalert2'
import { CircularProgress, Button } from '@chakra-ui/react'
import { ErrorInfo } from "react";

export const Register = () => {

  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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


  async function handleRegister(e) {
    e.preventDefault();

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)

    showProgress()

    const data = {
      name,
      email,
      password,
      "password_confirmation": confirmPassword,
      "nameToken": "nameToken"
    };

    try {
      if (data.name, data.email, data.password, data.password_confirmation === "") {
        setLoading(false);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Preencha todos os campos!'
        })
      }

      if (data.password !== data.password_confirmation) {
        setLoading(false);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'As senhas não conferem!'
        })
      }

      api.post('api/register', data)
        .then(async (res) => {

          if (!res.data.status) {
            throw ErrorInfo
          }

          if (res.data.status) {
            console.log(res)
            const response = await api.post('api/login', { email, password });
            localStorage.setItem('token', response.data.response.token);
            api.defaults.headers.Authorization = `Bearer ${response.data.response.token}`;

            window.location.reload();

          }
        })
    } catch (err) {

      setLoading(false)

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erro ao fazer o cadastro, tente novamente!'
      })

    }
  }

  return (
    <LayoutComponents>
      <form className="login-form" onSubmit={handleRegister}>

        <span className="login-form-title">Criar Conta</span>

        <span className='login-form-subtitle'>Desafio 704Apps.</span>

        <div className="wrap-input">
          <input
            // required
            className={name !== "" ? "has-val input" : "input"}
            type="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Nome"></span>
        </div>

        <div className="wrap-input">
          <input
            // required
            className={email !== "" ? "has-val input" : "input"}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Email"></span>
        </div>

        <div className="wrap-input">
          <input
            // required
            className={password !== "" ? "has-val input" : "input"}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Senha"></span>
        </div>

        <div className="wrap-input">
          <input
            // required
            className={confirmPassword !== "" ? "has-val input" : "input"}
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Confirme sua senha"></span>
        </div>

        <div className="container-login-form-btn">
          <Button className="login-form-btn"
            isLoading={loading}
            loadingText="Carregando"
            colorScheme=""
            variant="solid"
            type='submit'
          >
            Finalizar
          </Button>
        </div>

        <div className="text-center">
          <span className="txt1">Já possui conta?</span>

          <Link className="txt2" to="/">Acessar.</Link>
        </div>

      </form>
    </LayoutComponents>
  )
}