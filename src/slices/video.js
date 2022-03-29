import { createSlice } from '@reduxjs/toolkit';

export const videoSlice = createSlice({
  name: 'video',
  initialState: {
    isOpen: false,
    video: {},
    images: [],
    pageClicked: false,
  },
  reducers: {
    showModal: (state) => {
      state.isOpen = true;
    },
    hideModal: (state) => {
      state.isOpen = false;
    },
    setVideo: (state, action) => {
      state.video = action.payload;
    },
    setActiveImageUrl: (state, action) => {
      state.activeImageUrl = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    togglePageClicked: (state) => {
      state.pageClicked = !state.pageClicked;
    },
  },
});
