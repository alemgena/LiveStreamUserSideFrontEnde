//import Search from "./search";

import { useSelector } from 'react-redux';
import Login from './login';
//import Wishlist from "./wishlist";
//import Cart from "./cart";
import Register from './register';
import Search from "./search";
import Profile from './profile';
import { useEffect } from 'react';
import Cart from './cart';
const DrawerContent = () => {
  const type = useSelector((state) => state.rightDrawer.type);

  useEffect(() => {}, [type]);

  return (
    <div className='right-drawer-content'>
      {type === 'login' ? (
        <Login />
      ) : type === 'register' ? (
        <Register />
      ) : type === 'search' ? (
        <Search />
      ) : type === 'profile' ? (
        <Profile />
      ) : type==='search' ? (
         <Search/>
      ):
      (
        ''
      )}
    </div>
  );
};

export default DrawerContent;
