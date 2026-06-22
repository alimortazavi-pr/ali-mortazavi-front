export interface IAdmin {
  _id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAuthState {
  admin: IAdmin | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ILoginForm {
  mobile: string;
  code: string;
}
