// redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    uuid: "",
    resendOTPTimer: "",
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserID: (state, action) => {
      state.uuid = action.payload;
    },
    setResendOTPTimer: (state, action) => {
      state.resendOTPTimer = action.payload;
    },
  },
});

export const { setEmail, setUserID, setResendOTPTimer } = userSlice.actions;

export default userSlice.reducer;
