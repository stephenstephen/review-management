import api from "@/lib/api";

interface LoginPayload {
  email: string;
  password: string;
}

export const loginRequest = async (payload: LoginPayload) => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};

export const registerRequest = async (payload: {
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};
