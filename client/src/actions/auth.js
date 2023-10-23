import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";
import toast from "react-hot-toast";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    toast.error(error?.response?.data?.message)
    console.log(error.response?.data?.message);
  }
};
