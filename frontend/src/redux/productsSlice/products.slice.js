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

const normalizeProducts = (data = []) =>
  data.map((product) => {
    const imagesArray = Array.isArray(product.images)
      ? product.images.filter(Boolean)
      : [];

    const fallbackImage = product.img ? [product.img] : [];
    const images = imagesArray.length ? imagesArray : fallbackImage;

    const descriptionText = product.description || product.desc || "";

    return {
      ...product,
      images,
      img: images[0] || "",
      desc: descriptionText,
      description: descriptionText,
    };
  });

const groupByCategory = (products = []) => {
  return products.reduce((acc, product) => {
    const category = product.category || "Others";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});
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
        const normalized = normalizeProducts(action.payload || []);
        state.products = normalized;
        state.totalProducts = normalized.length;
        state.groupedProducts = groupByCategory(normalized);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
