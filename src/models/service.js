import { createReport, connectFileReport } from '@/services/api';

export default {
  namespace: 'service',

  state: {},

  effects: {
    *createReport({ payload, callback }, { call }) {
      const response = yield call(createReport, payload);
      if (callback) callback(response);
    },
    *connectFileReport({ payload, callback }, { call }) {
      const response = yield call(connectFileReport, payload);
      if (callback) callback();
    },
  },

  reducers: {},
};
