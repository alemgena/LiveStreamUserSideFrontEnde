import { Col, Row } from "react-bootstrap";
import React, { Component, useEffect, useState } from 'react';
import { faTrashAlt, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { url } from "../../utils/url";
import { cartSlice } from "../../slices/cart";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from 'react-loading-skeleton';
// a single cart item in a cart list
const CartItem = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const removeIcon = <FontAwesomeIcon icon={faTrashAlt} />;
  const plusIcon = <FontAwesomeIcon icon={faPlus} />;
  const minusIcon = <FontAwesomeIcon icon={faMinus} />;
  const cartActions = cartSlice.actions;
  const dispatch = useDispatch();
  const [showEnterAmount, setShowEnterAmount] = useState(false);
  const removeCartItem = (id) => {
    dispatch(cartActions.removeCartItem(id));
  };
  const increaseQuantity = (id) => {
    dispatch(cartActions.increaseQuantity(id));
  };
  const decreaseQuantity = (id) => {
    dispatch(cartActions.decreaseQuantity(id));
  };

  return (
    <div className="cart-item">
          {cartItems.map((cartItem) => {
        return(
      <Row>
        <Col lg={6}>
          <div className="product">

          {cartItem.videos.thumbnialFileName ? (
                    <img
                      className='img-fluid'
                      src={`${url}images/${cartItem.videos.thumbnialFileName}`}
                      alt='hello'
                    />
                  ) : (
                    <Skeleton height='150px' />
                  )}
            <div className="product-left">
              <div className="product-title">{cartItem.videos.catagory}</div>
              <div
                className="remove icon"
                onClick={() => {
                  removeCartItem(cartItem.videos.video_id);
                }}
              >
                {removeIcon}
              </div>
            </div>
          </div>
        </Col>
        <Col>
          <div className="price">{ " birr"}</div>
        </Col>
        <Col>
          <div className="quantity">
            <div className="inner">
              {" "}
              {}
              <div className='amount'>
                {""}
                {!showEnterAmount?(
                  <div
                    className="amount-div"
                    onClick={() => {
                      setShowEnterAmount(true);
                    }}
                  >
                    {cartItem.quantity}
                  </div>
                ):(

                  <input
                    type="text"
                    className="amount-input"
                    autoFocus
                    
                    onBlur={(e) => {
                      if (e.target.value) {
                        dispatch(
                          cartActions.changeQuantity({
                            id: cartItem.product.id,
                            amount: e.target.value,
                          })
                        );
                      }
                      setShowEnterAmount(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (e.target.value) {
                          dispatch(
                            cartActions.changeQuantity({
                              id: cartItem.videos.video_id,
                              amount: e.target.value,
                            })
                          );
                        }
                        setShowEnterAmount(false);
                      }
                    }}
                  />
                )}
              <div
                className=" icon"
                onClick={() => {
                  decreaseQuantity(cartItem.videos.video_id);
                }}
              >
                {minusIcon}
              </div>
            
              <div
          
                className=" icon"
                onClick={() => {
                  increaseQuantity(cartItem.videos.video_id);
                }}
              >
                {plusIcon}
              </div>
              </div>
            </div>
          </div>
        </Col>
        <Col>
          <div className="total"> birr</div>
        </Col>
      
      </Row>
            ); //
          })}
    </div>
  );
};
export default CartItem;
