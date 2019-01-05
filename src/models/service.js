import { createReport, connectFileReport, queryReport } from '@/services/api';

export default {
  namespace: 'service',

  state: {
    report: {},
  },

  effects: {
    *createReport({ payload, callback }, { call }) {
      const response = yield call(createReport, payload);
      if (callback) callback(response);
    },
    *connectFileReport({ payload, callback }, { call }) {
      const response = yield call(connectFileReport, payload);
      if (callback) callback();
    },
    *fetchReport({ payload }, { call, put }) {
      const response = yield call(queryReport, payload);
      let res = [];
      if (response.objects.length) {
        res = response.objects.shift();
      }
      yield put({
        type: 'save',
        payload: res,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        report: action.payload,
      };
    },
  },
};
