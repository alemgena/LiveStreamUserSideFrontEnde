import { useSelector,useDispatch } from "react-redux";
import CartItem from "./cart-item";
import CartListHeader from "./cart_list_header";
import { useMediaQuery } from "react-responsive";
import { Col, Row } from "react-bootstrap";

import { url } from "../../utils/url";
import axios from "axios";
import { cartSlice } from "../../slices/cart";
import { toast } from "react-toastify";
//contain the whole list of cart items
const CartList = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isUserLogged = useSelector((state) => state.login.isUserLogged);
  const cartActions = cartSlice.actions;
  
  const showHeader = useMediaQuery({ query: "(min-width: 992px)" });

 
  const dispatch = useDispatch();
  /*const getTotalPrice = () => {
    let total = 0;
    cartItems.forEach((cartItem) => {
      total += cartItem.product.Price * cartItem.quantity;
    });

    return total;
  }
  const getTotalTax = () => {
    let total = 0;
    cartItems.forEach((cartItem) => {
      total += cartItem.product.Price * 0.15 * cartItem.quantity;
    });

    return total;
  };*/

  const openSlip=() => {
/*
    
    if(!isUserLogged) {
      toast.info("Log in or register to purchase ! ", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  
    const userId = localStorage.getItem("user_id");

    const cartItemsForDb = [];

    cartItems.forEach((cartItem) => {
      cartItemsForDb.push({
        user_id: parseInt(userId),
        product_id: cartItem.product.id,
        quantity: cartItem.quantity,
      });
    });

    dispatch(cartActions.setSavingCart(true));

    axios.post(`${url}user/createCart`, cartItemsForDb).then(
      (response) => {
        if (response.data.success) {

          axios.post(`${url}user/saveToCart`, {user_id:userId}).then(
            (response) => {
              console.log(response)
              if (response.data.success) {
      
              }
              dispatch(cartActions.setSavingCart(false));
              // console.log(response);
            },
            (error) => {
              console.log(error);
            }
          );


          toast("Order successfully submitted!", {
           
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        dispatch(cartActions.setSavingCart(false));
        // console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    

    dispatch(slipActions.setIsOpen(true))
    document.body.style.overflow = 'hidden';*/

  }
  
  return (
    <>
    
      <div className="cart-list">
        {cartItems.length === 0 ? "" : showHeader ? <CartListHeader /> : ""}

     <CartItem />;
        <div className="pricing">
          <div className="items">
            {" "}
            <div className="item">
              <div className="text">sub total:</div>
             
            </div>
            <div className="item">
              <div className="text">vat:</div>
            </div>
            <div className="item">
              <div className="text">Grand Total:</div>
            
            </div>
            <div className="item">
            <div className="text"></div>
              <div className="price">
              <div className=" adimera-btn " >Submit order</div>{" "}
              </div>
             
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default CartList;
