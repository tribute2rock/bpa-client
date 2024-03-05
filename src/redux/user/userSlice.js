import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';

const server_url = process.env.REACT_APP_SERVER_URL;

export const fetchUser = createAsyncThunk('user/fetchUser', async ({ email, password }, { rejectWithValue }) => {
  const url = '/login';

  try {
    const req = await axios.post(server_url + url, {
      username: email,
      password: password
    });
    const user = jwt_decode(req.data.data.accessToken);
    return { ...req.data.data, user };
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    if(err.response.status === 401) {
      toast.error(err?.response?.data?.message ? err.response.data.message : 'Credentials is invalid.');
    }else {
      toast.error('Failed to authenticate user.');
    }
    return rejectWithValue(err.response.data);
  }
});

export const fetchRefreshToken = createAsyncThunk('user/fetchRefreshToken', async (_, { getState, rejectWithValue }) => {
  const url = '/refresh-token';
  const refreshToken = getState().user.data.refreshToken;
  try {
    const req = await axios.post(server_url + url, {
      refreshToken: refreshToken
    });
    const user = await jwt_decode(req.data.data.accessToken);
    return { ...req.data.data, user };
  } catch (err) {
    if (!err.response) {
      throw err;
    }

    return rejectWithValue(err.response.data);
  }
});

const user = createSlice({
  name: 'user',
  initialState: {
    data: {
      accessToken: undefined,
      refreshToken: undefined
    },
    status: null,
    loginInfo: {},
    userInfo: null,
    redirectUrl: '/'
  },

  reducers: {
    login: (state, action) => {
      return {
        ...state,
        data: action.payload
      };
    },
    addRedirectUrl: (state, action) => {
      return {
        ...state,
        redirectUrl: action.payload
      };
    },
    addToken: (state, action) => {
      return { ...state, token: action.payload };
    },
    adduserInfo: (state, action) => {
      return { ...state, userInfo: action.payload };
    },
    logout: state => {
      return {
        ...state,
        data: {},
        loginInfo: {},
        userInfo: null,
        redirectUrl: '/'
      };
    }
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchUser.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.data = payload;
    },
    [fetchUser.rejected]: (state, { payload }) => {
      state.status = 'failed';
    },

    [fetchRefreshToken.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchRefreshToken.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.data = payload;
    },
    [fetchRefreshToken.rejected]: (state, action) => {
      state.status = 'failed';
    }
  }
});

export const { login, logout, addToken, addRedirectUrl, adduserInfo } = user.actions;
export default user.reducer;
