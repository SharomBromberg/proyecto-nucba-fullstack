import axios from "axios";
import { BASE_URL } from "../utils/constants";

const getErrorMessage = (error) => {
  return (
    error?.response?.data?.msg ||
    error?.response?.data?.errors?.[0]?.msg ||
    "Ocurrió un error, intenta de nuevo"
  );
};

export const createUser = async (nombre, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}auth/register`, {
      nombre,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    alert(getErrorMessage(error));
    return null;
  }
};

export const loginuser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}auth/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    alert(getErrorMessage(error));
    return null;
  }
};

export const verifyAccountRequest = async (email, code) => {
  try {
    const response = await axios.post(`${BASE_URL}auth/verify`, {
      email,
      code,
    });

    return response.data;
  } catch (error) {
    alert(getErrorMessage(error));
    return null;
  }
};
