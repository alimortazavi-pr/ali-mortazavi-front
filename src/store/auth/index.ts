import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAdmin, IAuthState } from "@/common/interfaces/auth.interface";
import {
  checkAuth,
  loginAdmin,
  logoutAdmin,
  updateProfile,
} from "./actions";

const initialState: IAuthState = {
  admin: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuth(state) {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("admin_token");
        if (token) {
          state.token = token;
        }
      }
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_token", action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload.admin;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        if (typeof window !== "undefined") {
          localStorage.setItem("admin_token", action.payload.token);
        }
      })
      .addCase(loginAdmin.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<IAdmin>) => {
        state.isLoading = false;
        state.admin = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.admin = null;
        state.token = null;
        if (typeof window !== "undefined") {
          localStorage.removeItem("admin_token");
        }
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<IAdmin>) => {
        state.admin = action.payload;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.admin = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { hydrateAuth, setToken } = authSlice.actions;
export default authSlice.reducer;
