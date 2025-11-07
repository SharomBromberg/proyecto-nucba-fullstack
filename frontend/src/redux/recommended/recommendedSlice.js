import { createSlice } from "@reduxjs/toolkit";
import { pickRandoms } from "../../utils/pickRandom";

const INITIAL_STATE = {
  recommended: [],
};

export const recommendedSlice = createSlice({
  name: "recommended",
  initialState: INITIAL_STATE,
  reducers: {
    setRecommended: (state, action) => {
      state.recommended = action.payload;
    },
  },
});

export const { setRecommended } = recommendedSlice.actions;

export default recommendedSlice.reducer;
