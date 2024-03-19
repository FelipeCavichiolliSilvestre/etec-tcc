import { client } from './client';

async function create({ name, email, role }) {
  const res = await client.post('/users', { name, email, role });

  return res.data;
}

async function update(userId, { name, email, role }) {
  await client.patch(`/users/${userId}`, {
    name,
    email,
    role,
  });
}

async function deleteUser(userId) {
  await client.delete(`/users/${userId}`);
}

async function login({ login, password }) {
  const res = await client.post('/users/login', { login, password });

  return res.data;
}

async function getMany({ page, limit, role }) {
  const res = await client.get('/users', { params: { page, limit, role } });

  return res.data;
}

async function getOne(userId) {
  const res = await client.get(`/users/${userId}`);

  return res.data;
}

async function getMe() {
  const res = await client.get('/users/me');

  return res.data;
}

async function search({ term }) {
  const res = await client.get('/users/search', { params: { term } });

  return res.data;
}

async function registerSchedule(userId, schedule) {
  await client.post(`users/${userId}/schedules`, schedule);
}

async function getLatestSchedule(userId) {
  const res = await client.get(`users/${userId}/schedules`);

  return res.data.map(({ createdAt, ...rest }) => ({
    ...rest,
    createdAt: new Date(createdAt),
  }));
}

export default {
  create,
  update,
  delete: deleteUser,
  login,
  getMany,
  getOne,
  getMe,
  search,
  registerSchedule,
  getLatestSchedule,
};
