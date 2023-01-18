import { LayoutComponents } from '../../components/LayoutComponents';
import api from '../../services/api';
import React, { useEffect } from 'react';

export const Categories = () => {

  function loadStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }

  useEffect(() => {
    loadStorage();
  }, []);

  return (
    <LayoutComponents>
      <h1>CATEGORIES</h1>
    </LayoutComponents>
  );
}