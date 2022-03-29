import React from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
// import { ToastContainer, toast } from 'react-toastify';
import { faTrashAlt, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { url } from '../../utils/url';
import { Link } from 'react-router-dom';
import { rightDrawerSlice } from '../../slices/rightDrawer';
import { cartSlice } from '../../slices/cart';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
const Cart = () => {
  const cartIcon = <FontAwesomeIcon icon={faShoppingCart} size='5x' />;
  const cartItems = useSelector((state) => state.cart.cartItems);
  const removeIcon = <FontAwesomeIcon icon={faTrashAlt} />;
  const plusIcon = <FontAwesomeIcon icon={faPlus} />;
  const minusIcon = <FontAwesomeIcon icon={faMinus} />;
  const rightDrawerActions = rightDrawerSlice.actions;
  const cartActions = cartSlice.actions;
  const isUserLogged = useSelector((state) => state.login.isUserLogged);
  const dispatch = useDispatch();
  console.log(cartItems);
  const hideDrawer = () => {
    dispatch(rightDrawerActions.hideDrawer());
    document.body.style.overflow = 'visible';
  };
  const removeCartItem = (id) => {
    dispatch(cartActions.removeCartItem(id));
  };
  const increaseQuantity = (id) => {
    dispatch(cartActions.increaseQuantity(id));
  };
  const decreaseQuantity = (id) => {
    dispatch(cartActions.decreaseQuantity(id));
  };
  const saveCart = () => {
    if (!isUserLogged) {
      toast.info('Log in or register to save your cart! ', {
        position: 'top-left',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const userId = localStorage.getItem('user_id');
    const cartItemsForDb = [];
    cartItems.forEach((cartItem) => {
      cartItemsForDb.push({
        user_id: parseInt(userId),
        video_id: cartItem.videos.video_id,
        quantity: cartItem.quantity,
      });
    });
    dispatch(cartActions.setSavingCart(true));
    console.log(cartItemsForDb);
    axios.post(`${url}user/creatCart`, cartItemsForDb).then(
      (response) => {
        console.log(response);
        if (response.data === 'the cart is already') {
          toast.success('Cart is already exist but it is remove  ', {
            position: 'top-left',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.success('Cart is add   ', {
            position: 'top-left',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        dispatch(cartActions.setSavingCart(false));
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <div className='mini-cart'>
      {cartItems.length === 0 ? (
        <>
          {' '}
          <div className='icon'>{cartIcon}</div>
          <div className='text'>Your cart is empty</div>
        </>
      ) : (
        <div className='cart-list'>
          {' '}
          {cartItems.map((cartItem) => {
            return (
              <div className='cart-item'>
                <div className='left'>
                  {cartItem.videos.thumbnialFileName ? (
                    <img
                      className='img-fluid'
                      src={`${url}images/${cartItem.videos.thumbnialFileName}`}
                      alt='hello'
                    />
                  ) : (
                    <Skeleton height='150px' />
                  )}
                </div>
                <div className='right'>
                  <div className='product-title'>
                    {cartItem.videos.catagory}
                  </div>
                  <div className='quantity'>
                    <div
                      className='minus icon'
                      onClick={() => {
                        decreaseQuantity(cartItem.videos.video_id);
                      }}
                    >
                      {minusIcon}
                    </div>
                    <div className='amount'>{cartItem.quantity}</div>
                    <div
                      className='plus icon'
                      onClick={() => {
                        increaseQuantity(cartItem.videos.video_id);
                      }}
                    >
                      {plusIcon}
                    </div>
                  </div>

                  <div
                    className='remove icon'
                    onClick={() => {
                      removeCartItem(cartItem.videos.video_id);
                    }}
                  >
                    {removeIcon}
                  </div>
                </div>
              </div>
            ); //
          })}
          <Link
            to={'/cart'}
            style={{ textDecoration: 'none' }}
            onClick={() => {
              hideDrawer();
            }}
          >
            {' '}
            <div className='go'>View Cart</div>
          </Link>
          <div>
            <input
              type='submit'
              value='Save Cart'
              className='btCart'
              onClick={saveCart}
            ></input>
          </div>{' '}
        </div>
      )}
    </div>
  );
};

export default Cart;
