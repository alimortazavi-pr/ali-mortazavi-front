import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/common/api";
import adminApi from "@/common/api/adminApi";
import { IAdmin, ILoginForm } from "@/common/interfaces/auth.interface";

export const requestActivationCode = createAsyncThunk(
  "auth/requestCode",
  async (mobile: string) => {
    await api.post("/auth/request-code", { mobile });
    return mobile;
  }
);

export const loginAdmin = createAsyncThunk(
  "auth/login",
  async (form: ILoginForm) => {
    const { data } = await api.post("/auth/login", form);
    return data as { admin: IAdmin; token: string };
  }
);

export const checkAuth = createAsyncThunk("auth/check", async () => {
  const { data } = await adminApi.get("/auth/check");
  return data.admin as IAdmin;
});

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (payload: { firstName: string; lastName: string }) => {
    const { data } = await adminApi.put("/admins/", payload);
    return data.admin as IAdmin;
  }
);

export const logoutAdmin = createAsyncThunk("auth/logout", async () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin_token");
  }
});
