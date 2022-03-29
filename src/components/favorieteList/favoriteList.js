import { useSelector, useDispatch } from 'react-redux';
import FavorieteIteam from './favoriteIteam';
import FavoriteListHeader from './favorietHeader';
import { useMediaQuery } from 'react-responsive';
import { Col, Row } from 'react-bootstrap';

import { url } from '../../utils/url';
import axios from 'axios';
import { cartSlice } from '../../slices/cart';
import { toast } from 'react-toastify';
//contain the whole list of cart items
const CartList = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isUserLogged = useSelector((state) => state.login.isUserLogged);
  const cartActions = cartSlice.actions;

  const showHeader = useMediaQuery({ query: '(min-width: 992px)' });

  return (
    <>
      <div className='cart-list'>
        {cartItems.length === 0 ? '' : showHeader ? <FavoriteListHeader /> : ''}
        <FavorieteIteam />;
      </div>
    </>
  );
};

export default CartList;
