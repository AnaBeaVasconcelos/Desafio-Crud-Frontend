import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Home } from '../pages/Home';
import { Products } from '../pages/Products';
import { Categories } from '../pages/Categories';
import { isAuthenticaded } from './auth';
import { Sidebar } from '../components/Sidebar';
import { OutlinedCard } from '../components/OutlinedCard';

export const AppRoutes = () => {
  if (isAuthenticaded()) {
  }

  return (
    <Router>
      {
        isAuthenticaded() ?
          (<Sidebar>
            <Routes>
              <Route path="*" element={<OutlinedCard />} />
              <Route path="/home" element={<OutlinedCard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </Sidebar>) :
          (<Routes>
            <Route path="*" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sidebar" element={<Sidebar />} />
          </Routes>)

      }
    </Router>
  );
}