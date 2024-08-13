import { createSlice } from '@reduxjs/toolkit';

type UserType = {
  _id: string;
  description: string;
  email: string;
  username: string;
  password: string;
  name: string;
  displayName: string;
  role: string;
  avatar: string;
  balance: number;
  status: boolean;
  bet: number;
  profit: number;
  deposited: number;
  won: number;
  lost: number;
};

type initialStateType = {
  token: string;
  user: UserType;
  isLoggedIn: boolean;
  loading: boolean;
  avatar: string;
};

const initialUser: UserType = {
  _id: '',
  description: '',
  email: '',
  username: '',
  password: '',
  name: '',
  displayName: '',
  role: '',
  avatar: '',
  balance: 0,
  status: false,
  bet: 0,
  profit: 0,
  deposited: 0,
  won: 0,
  lost: 0
};

const initialState: initialStateType = {
  token: '',
  user: initialUser,
  isLoggedIn: false,
  loading: false,
  avatar: 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg'
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setbalance(state, action) {
      state.user.balance = action.payload;
    },

    signin(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.loading = false;
      state.avatar = action.payload.avatar;
    },

    edit(state, action) {
      state.user = action.payload;
    },

    signout(state) {
      state.avatar = 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg';
      state.token = '';
      state.user = initialUser;
      state.isLoggedIn = false;
    }
  }
});

export default auth.reducer;

export const { signin, signout, edit, setbalance } = auth.actions;
