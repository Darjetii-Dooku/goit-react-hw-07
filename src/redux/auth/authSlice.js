import {
  createAsyncThunk,
  createSelector,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://connections-api.herokuapp.com",
});
export const setToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const clearToken = () => {
  instance.defaults.headers.common.Authorization = null;
};
export const apiRegister = createAsyncThunk(
  "auth/register",
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post("/users/signup", formData);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const apiLogin = createAsyncThunk(
  "auth/login",
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post("/users/login", formData);
      // setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const apiRefreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;
      if (!token) {
        return thunkApi.rejectWithValue();
      }
      setToken(token);
      const { data } = await instance.get("/users/current");
      //   setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      await instance.post("/users/logout");
      clearToken();
      return;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const INITIAL_STATE = {
  isSignedIn: false,
  userData: null,
  token: null,
  isLoading: true,
  isError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  extraReducers: (builder) =>
    builder
      .addCase(apiRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSignedIn = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(apiLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSignedIn = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(apiRefreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSignedIn = true;
        state.userData = action.payload;
      })
      .addCase(apiLogout.fulfilled, (state, action) => {
        return INITIAL_STATE;
      })
      .addMatcher(
        isAnyOf(
          apiRegister.pending,
          apiLogin.pending,
          apiRefreshUser.pending,
          apiLogout.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          apiRegister.rejected,
          apiLogin.rejected,
          apiRefreshUser.rejected,
          apiLogout.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
        }
      ),
});
// export const selectContacts = (state) => state.contacts.items;
// export const selectContactsIsLoading = (state) => state.loading;
// export const selectContactsIsError = (state) => state.error;
export const authReducer = authSlice.reducer;

// export const selectFilteredContacts = createSelector(
//   [selectContacts, selectFilter],
//   (users, filter) => {
//     return users.filter((user) => {
//       return user.name.toLowerCase().includes(filter.toLowerCase());
//     });
//   }
// );
