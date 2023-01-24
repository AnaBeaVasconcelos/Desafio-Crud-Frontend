import { FaBars, FaShoppingBag, FaTh } from 'react-icons/fa';
import { BiCategory, BiLogOut } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './styles.css';
import api from '../../services/api';

export const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: '/home',
      name: 'Home',
      icon: <FaTh />,
      onclick: () => {
        window.location('/home');
      }
    },
    {
      path: '/products',
      name: 'Produtos',
      icon: <FaShoppingBag />,
      onclick: () => {
        window.location('/products');
      }
    },
    {
      path: '/categories',
      name: 'Categorias',
      icon: <BiCategory />,
      onclick: () => {
        window.location('/categories');
      }
    },
    {
      path: '/logout',
      name: 'Sair',
      icon: <BiLogOut />,
      onclick: async () => {
        await api.post('api/logout');
        window.history.pushState({}, '', '/');
        window.location.reload();

        localStorage.removeItem('token');
      }
    },

  ]
  return (
    <div className="container">
      <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Logo</h1>
          <div  style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {
          menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="menu_item" activeclassname="active">
              <div className="icon" onClick={item.onclick}>{item.icon}</div>
              <div style={{ display: isOpen ? "block" : "none" }} className="link_text" onClick={item.onclick}>{item.name}</div>
            </NavLink>
          ))
        }
      </div>
      <main>{children}</main>
    </div>
  );
}