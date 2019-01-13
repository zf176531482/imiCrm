import { queryFilter } from '@/services/api';

export default {
  namespace: 'filter',

  state: {},

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(queryFilter, payload);
      if (callback) callback(response);
    },
  },

  reducers: {},
};
