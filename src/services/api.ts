import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // replace with deployed backend later
});

export const loginUser = async (email: string, password: string) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data.token;
};

export const registerUser = async (email: string, password: string, role: string) => {
  const res = await api.post('/auth/register', { email, password, role });
  return res.data.token;
};

export const getStores = async () => {
  const res = await api.get('/buyer/stores');
  return res.data;
};

export const getProductsByStore = async (storeId: number) => {
  const res = await api.get(`/buyer/stores/${storeId}/products`);
  return res.data;
};
