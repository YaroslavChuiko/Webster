import { createSlice } from '@reduxjs/toolkit';

type IAuthState = {
  isLoggedIn: boolean;
  token: string | null;
};

const initialState: IAuthState = {
  isLoggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, { payload }) {
      const { accessToken } = payload;
      state.token = accessToken;
      state.isLoggedIn = true;
    },
    // setToken(state, { payload }) {
    //   const { token } = payload;
    //   state.token = token;
    // },
    logout(state) {
      state.isLoggedIn = initialState.isLoggedIn;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
