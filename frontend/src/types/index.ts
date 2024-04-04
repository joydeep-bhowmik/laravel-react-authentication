export interface User {
  id: number;
  email: string;
  [key: string]: any;
}

export interface State {
  user: null | User;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

export type loginRequest = {
  email: string;
  password: string;
};

export type registerRequest = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type forgotPasswordRequest = {
  email: string;
};

export type passwordResetRequest = {
  email: string | null;
  password: string | null;
  password_confirmation: string | null;
  token: string | null;
};

export type verifyEmailResetRequest = {
  token: string | number;
  email: string;
};
