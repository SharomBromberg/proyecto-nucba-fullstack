import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const fetchBackendProducts = async () => {
  const response = await axios.get(`${BASE_URL}products`);
  return response.data.data;
};

export const createProductRequest = async (formData, token) => {
  const response = await axios.post(`${BASE_URL}products`, formData, {
    headers: {
      "x-token": token,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
};

export const updateProductRequest = async (id, formData, token) => {
  const response = await axios.put(`${BASE_URL}products/${id}`, formData, {
    headers: {
      "x-token": token,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
};

export const deleteProductRequest = async (id, token) => {
  await axios.delete(`${BASE_URL}products/${id}`, {
    headers: {
      "x-token": token,
    },
  });
};
