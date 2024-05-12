import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { instance } from "../auth/authSlice";

export const apiGetContacts = createAsyncThunk(
  "contacts/getAll",
  async (_, thunkApi) => {
    try {
      const { data }= await instance.get("/contacts");
      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newProduct, thunkApi) => {
    try {
      const data = await instance.post("/contacts", newProduct);
      toast.success("Contact added");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (productId, thunkApi) => {
    try {
      const data = await instance.delete(`/contacts/${productId}`);
      toast.success("Contact deleted");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
