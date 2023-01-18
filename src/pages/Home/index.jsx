import { LayoutComponents } from '../../components/LayoutComponents';
import api from '../../services/api';
import React, { useEffect, useState } from 'react';

export const Home = () => {

  function loadStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }

  useEffect (() => {
    loadStorage();
  }, []);

  return (
  
      <h1>HOME</h1>

  );
}