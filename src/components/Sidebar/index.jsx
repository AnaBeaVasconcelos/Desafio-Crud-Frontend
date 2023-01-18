import { FaBars, FaRegChartBar, FaShoppingBag, FaTh } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

export const Sidebar = ({children}) => {
  const menuItem = [
    {
      path: '/home',
      name: 'Home',
      icon: <FaTh />,
    },
    {
      path: '/products',
      name: 'Produtos',
      icon: <FaShoppingBag />,
    },
    {
      path: '/categories',
      name: 'Categorias',
      icon: <FaRegChartBar />,
    },
    {
      path: '/logout',
      name: 'Sair',
      onclick: async () => {
        await api.post('api/logout');
        window.location.reload();

        localStorage.removeItem('token');
      }
    },

  ]
  return (
    <div className="container">
      <div className="sidebar">
        <div className="top_section">
          <h1 className="logo">logo</h1>
          <div className="bars">
            <FaBars />
          </div>
        </div>
        {
          menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="menu_item" activeclassname="active">
              <div className="icon">{item.icon}</div>
              <div className="name" onClick={item.onclick}>{item.name}</div>
            </NavLink>
          ))
        }
      </div>
      <main>{children}</main>
    </div>
  );
}