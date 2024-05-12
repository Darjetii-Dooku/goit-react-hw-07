import { createAsyncThunk } from "@reduxjs/toolkit";
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
        setToken(data.token);
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