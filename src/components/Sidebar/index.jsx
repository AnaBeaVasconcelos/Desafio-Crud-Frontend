import { FaBars, FaRegChartBar, FaShoppingBag, FaTh } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './styles.css';

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
      path: '/',
      name: 'Sair'
    },

  ]
  return (
    <div className="container">
      <div className="sidebar">
        <div className="top_section">
          <h1 className="logo">Jovem Programador</h1>
          <div className="bars">
            <FaBars />
          </div>
        </div>
        {
          menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="menu_item" activeClassName="active">
              <div className="icon">{item.icon}</div>
              <div className="name">{item.name}</div>
            </NavLink>
          ))
        }
      </div>
      <main>{children}</main>
    </div>
  );
}