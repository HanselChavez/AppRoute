
import { API } from "./apiService"; 

export type LoginResponse = {
  token: string;
  user: { id: number; nombre: string; email: string; [k: string]: any };
};

export const loginService = async (email: string, password: string): Promise<LoginResponse> => {
  const res = await API.post("/auth/login", { email, password });
  return res.data;
};

export const registerService = async (payload: any) => {
  const res = await API.post("/auth/register", payload);
  return res.data;
};
