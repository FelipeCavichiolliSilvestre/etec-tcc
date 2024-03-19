import axios from 'axios';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  validateStatus: (status) => {
    return status >= 200 && status < 400;
  },
});

client.interceptors.request.use(async function (res) {
  await new Promise((resolve) => setTimeout(resolve, 700));

  return res;
});

export function changeClientBearerToken(token) {
  client.defaults.headers.Authorization = `Bearer ${token}`;
}
