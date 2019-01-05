import { queryAsset, queryCase, queryOpportunity } from '@/services/api';

export default {
  namespace: 'upgrade',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    cases: [],
    opportunity: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAsset, payload);
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
        type: 'save',
        payload: res,
      });
    },
    *cases({ payload }, { call, put }) {
      const response = yield call(queryCase, payload);
      yield put({
        type: 'saveCase',
        payload: response.objects,
      });
    },
    *opportunity({ payload }, { call, put }) {
      const response = yield call(queryOpportunity, payload);
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
  },

  reducers: {
    save(state, action) {
      // console.log(action.payload);
      return {
        ...state,
        data: action.payload,
      };
    },
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
  },
};
