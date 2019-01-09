import { queryContact, removeContact, addContact, updateContact } from '@/services/api';

export default {
  namespace: 'contact',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryContact, payload);
      // console.log(response);
      if (response) {
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
      }
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addContact, payload);
      if (!response) {
        return;
      }
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeContact, payload);
      if (!response) {
        return;
      }
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateContact, payload);
      if (!response) {
        return;
      }
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
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
  },
};
