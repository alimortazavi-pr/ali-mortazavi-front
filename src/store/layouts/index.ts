import { createSlice } from "@reduxjs/toolkit";

//Interfaces
import { ILayoutState } from "@/common/interfaces/layouts.interface";

//Reducers
import reducers from "@/store/layouts/reducers";

const initialState: ILayoutState = {};

export const layoutReducer = createSlice({
  name: "layouts",
  initialState,
  reducers,
});

export default layoutReducer.reducer;
