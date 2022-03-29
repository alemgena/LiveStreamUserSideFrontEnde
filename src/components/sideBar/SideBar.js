import React from 'react';
import './SideBar.css';
import logo from '../../assets/images/logo.png';
import sidebar_iteam from '../../assets/JsonData/sidebar_routes.json';
import { Link } from 'react-router-dom';
import CategoryIcon from '@material-ui/icons/Category';
const SidebarItem = (props) => {
  const active = props.active ? 'active' : '';

  return (
    <div className='sidebar__item'>
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};
console.log('');
const SideBar = (props) => {
  const activeItem = sidebar_iteam.findIndex(
    (item) => item.route === props.location.pathname
  );
  return (
    <div className='sidebar'>
      {sidebar_iteam.map((item, index) => (
        <Link
          style={{ fontFamily: 'Times New Roman', textDecoration: 'none' }}
          to={item.route}
          key={index}
        >
          <SidebarItem
            title={item.display_name}
            icon={item.icon}
            active={index === activeItem}
          />
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
