import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import userApi from "../apis/userApi";
export const createUser = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userApi.authRegister(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const authUser = createAsyncThunk(
  "/user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userApi.authLogin(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getUserProflie = createAsyncThunk(
  "/user/profile/read",
  async (data, { rejectWithValue, getState }) => {
    try {
      const authToken = getState().user.token;
      const response = await userApi.getUserProfile(authToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getUserDetail = createAsyncThunk(
  "/user/detail/read",
  async (data, { rejectWithValue, getState }) => {
    try {
      const authToken = getState().user.token;
      const response = await userApi.getUserDetail(authToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateUserDetail = createAsyncThunk(
  "/user/detail/update",
  async (data, { rejectWithValue, getState }) => {
    try {
      const authToken = getState().user.token;
      const response = await userApi.updateUserDetail({ data, authToken });
      return response.data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response.data);
    }
  }
);
export const changePassword = createAsyncThunk(
  "/user/profile/password",
  async (data, { rejectWithValue, getState }) => {
    try {
      const authToken = getState().user.token;
      const response = await userApi.changePassword({ data, authToken });
      return response.data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response.data);
    }
  }
);

export const setUserToken = createAction("user/token");
export const setUserProfile = createAction("/user/profile/set");
export const setUserMessage = createAction("/user/message");
