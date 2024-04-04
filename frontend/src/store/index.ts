import { getCookie, setCookie } from "@/lib/utils";
import { create } from "zustand";
import { State } from "@/types";
export const useStore = create<State>((set) => ({
  user: null,
  setUser: (user) =>
    set(() => ({
      user: user,
    })),
  token: getCookie("token"),
  setToken: (token) => {
    set(() => ({ token: token }));
    setCookie("token", token, 30);
  },
}));
