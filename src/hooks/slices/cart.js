import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    videos: [],
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],

    savingCart: false,
    test: 1,
    videoImages: [],
    shippingAddress: [],
  },
  reducers: {
    addVideo: (state, action) => {
      state.videos.push(action.payload);
    },
    setSavingCart: (state, action) => {
      state.savingCart = action.payload;
    },
    setTest: (state, action) => {
      state.savingCart = action.payload;
    },
    addVideoImage: (state, action) => {
      state.videoImages.push(action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    savingShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem(
        'shippingAddress',
        JSON.stringify(state.shippingAddress)
      );
    },
    addCartItem: (state, action) => {
      let itemExist = false;

      state.cartItems.forEach((cartItem) => {
        if (cartItem.videos.video_id === action.payload.videos.video_id)
          itemExist = true;
      });
      if (!itemExist) state.cartItems.push(action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeCartItem: (state, action) => {
      const newCartItems = state.cartItems.filter(
        (cartItem) => cartItem.videos.video_id !== action.payload
      );
      state.cartItems = newCartItems;
      const items = JSON.parse(localStorage.getItem('cartItems'));
      const filtered = items.filter(item => item.videos.video_id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(filtered));

    },
    increaseQuantity: (state, action) => {
      state.cartItems.forEach((cartItem) => {
        if (cartItem.videos.video_id === action.payload) {
          cartItem.quantity += 1;
        }
      });
    },
    changeQuantity: (state, action) => {
      state.cartItems.forEach((cartItem) => {
        if (cartItem.videos.video_id === action.payload.id) {
          cartItem.quantity = action.payload.amount;
        }
      });
    },
    decreaseQuantity: (state, action) => {
      state.cartItems.forEach((cartItem) => {
        if (cartItem.videos.video_id === action.payload) {
          if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
          }
        }
      });
    },
  },
});
