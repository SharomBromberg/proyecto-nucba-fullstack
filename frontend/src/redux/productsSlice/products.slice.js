import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}products`);
      return response.data.data; 
    } catch (error) {
      const message =
        error.response?.data?.msg || "No se pudieron cargar los productos";
      return rejectWithValue(message);
    }
  }
);

const INITIAL_STATE = {
  products: [],
  groupedProducts: {},
  totalProducts: 0,
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.totalProducts = action.payload.length;
        state.groupedProducts = action.payload.reduce((acc, product) => {
          const category = product.category || "Otros";
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        }, {});
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
