import api from '../../services/api';
import React, { useEffect } from 'react';
import { CardHome } from '../../components/Card';
import './style.css';

export const Home = () => {

  async function showProducts() {
    const response = await api.get('api/products');
    localStorage.setItem('products', response.data.response.length);
  };

  async function showCategories() {
    const response = await api.get('api/categories/all');
    localStorage.setItem('categories', response.data.response.length);
  };

  function loadStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }

  useEffect(() => {
    loadStorage();
    showProducts();
    showCategories();
  }, []);

  return (
    <div className="container">
      <div className="container-home">
        <div className="wrap-home">
          <CardHome
            principal="Produtos cadastrados"
            quantidade={localStorage.getItem('products')}
            novo="Cadastrar Produto"
            ver="Ver Produtos"
          />
        </div>
        <div className="wrap-home">
          <CardHome
            principal="Categorias cadastradas"
            quantidade={localStorage.getItem('categories')}
            novo="Cadastrar Categoria"
            ver="Ver Categorias"
          />
        </div>
      </div>
    </div>







  );
}