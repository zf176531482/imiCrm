import {
  queryCase,
  queryOpportunity,
  queryCompleteValues,
  createOpportunity,
  editOpportunity,
} from '@/services/api';

export default {
  namespace: 'upgrade',

  state: {
    cases: [],
    opportunity: {
      list: [],
      pagination: {},
    },
    completeValues: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *cases({ payload }, { call, put }) {
      const response = yield call(queryCase, payload);
      if (!response) {
        return;
      }
      yield put({
        type: 'saveCase',
        payload: response.objects,
      });
    },
    *opportunity({ payload }, { call, put }) {
      const response = yield call(queryOpportunity, payload);
      if (!response) {
        return;
      }
      let res = {
        list: response.objects,
        pagination: {
          total: response.meta.total_count,
          pageSize: response.meta.limit,
          current:
            parseInt((response.meta.offset + response.meta.limit) / response.meta.limit, 10) || 1,
        },
      };
      yield put({
        type: 'saveOpportunity',
        payload: res,
      });
    },
    *completeValues({ payload }, { call, put }) {
      const response = yield call(queryCompleteValues, payload);
      if (!response) {
        return;
      }
      let res = {
        list: response.objects,
        pagination: {
          total: response.meta.total_count,
          pageSize: response.meta.limit,
          current:
            parseInt((response.meta.offset + response.meta.limit) / response.meta.limit, 10) || 1,
        },
      };
      yield put({
        type: 'saveCompleteValues',
        payload: res,
      });
    },
    *input({ payload, callback }, { call }) {
      const response = yield call(createOpportunity, payload);
      if (callback) callback(response);
    },
    *edit({ payload, callback, id }, { call }) {
      const response = yield call(editOpportunity, payload, id);
      if (callback) callback(response);
    },
  },

  reducers: {
    saveCase(state, action) {
      return {
        ...state,
        cases: action.payload,
      };
    },
    saveOpportunity(state, action) {
      return {
        ...state,
        opportunity: action.payload,
      };
    },
    saveCompleteValues(state, action) {
      return {
        ...state,
        completeValues: action.payload,
      };
    },
  },
};
