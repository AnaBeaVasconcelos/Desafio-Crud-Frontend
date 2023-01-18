import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Home } from '../pages/Home';
import { Products } from '../pages/Products';
import { Categories } from '../pages/Categories';
import { isAuthenticaded } from './auth';

export const AppRoutes = () => {
  if (isAuthenticaded()) {
    console.log(isAuthenticaded());
  }

  return (
    console.log(isAuthenticaded()),
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={isAuthenticaded() ? <Home /> : <Navigate to="/" />} />
        <Route path="/products" element={isAuthenticaded() ? <Products /> : <Navigate to="/" />} />
        <Route path="/categories" element={isAuthenticaded() ? <Categories /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}