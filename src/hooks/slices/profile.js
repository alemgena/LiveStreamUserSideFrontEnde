import { createSlice } from '@reduxjs/toolkit';
export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    showEdietProfile: false,
    showChangePassword: false,
    inputValues: {
      FirstName: '',
      MiddleName: '',
      LastName: '',
      phone: '',
    },
    inputErrs: {
      FirstNameErr: '',
      MiddleNameErr: '',
      LastNameErr: '',
      phone: '',
    },
    profileUpdated: false,
  },
  reducers: {
    setShowEditProfile: (state, action) => {
      state.showEdietProfile = action.payload;
    },
    setShowChangePassword: (state, action) => {
      state.showChangePassword = action.payload;
    },
    setFirstName: (state, action) => {
      state.inputValues.FirstName = action.payload;
    },
    setMiddleName: (state, action) => {
      state.inputValues.MiddleName = action.payload;
    },
    setLastName: (state, action) => {
      state.inputValues.LastName = action.payload;
    },
    setPhone: (state, action) => {
      state.inputValues.phone = action.payload;
    },
    setFirstNameErr: (state, action) => {
      state.inputErrs.FirstNameErr = action.payload;
    },
    setMiddleNameErr: (state, action) => {
      state.inputErrs.MiddleNameErr = action.payelod;
    },
    setLastNameErr: (state, action) => {
      state.inputErrs.LastNameErr = action.payload;
    },
    setPhoneErr: (state, action) => {
      state.inputErrs.phoneErr = action.payload;
    },

    setProfileUpdated: (state, action) => {
      state.profileUpdated = action.payload;
    },
  },
});
