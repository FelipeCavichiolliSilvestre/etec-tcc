import { client } from './client';

async function getXmlSchedule({ startDate, endDate, userIds }) {
  const res = await client.get('/schedules', {
    params: {
      startDate,
      endDate,
      userIds: userIds.join(','),
    },
  });

  return res.data;
}

export default {
  getXmlSchedule,
};
