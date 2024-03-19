import { client } from './client';

async function create({ fromDate, toDate }) {
  const res = await client.post('/deadlines', { fromDate, toDate });

  return convertDeadline(res.data);
}

async function update(deadlineId, { fromDate, toDate }) {
  await client.patch(`/deadlines/${deadlineId}`, { fromDate, toDate });
}

async function deleteDeadline(deadlineId) {
  await client.delete(`/deadlines/${deadlineId}`);
}

async function getMany({ page, limit }) {
  const res = await client.get('/deadlines', { params: { page, limit } });

  return res.data.map(convertDeadline);
}

async function getOne(deadlineId) {
  const res = await client.get(`/deadlines/${deadlineId}`);

  return convertDeadline(res.data);
}

function convertDeadline(deadline) {
  return {
    ...deadline,
    fromDate: new Date(deadline.fromDate),
    toDate: new Date(deadline.toDate),
  };
}

export default {
  create,
  update,
  delete: deleteDeadline,
  getMany,
  getOne,
};
