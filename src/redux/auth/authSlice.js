import {
  createAsyncThunk,
  createSelector,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import { apiLogin, apiLogout, apiRefreshUser, apiRegister } from "./authOps";


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
