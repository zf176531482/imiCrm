import { queryAsset, queryAssetFile, queryAssetProduct, queryAssetOrder } from '@/services/api';

export default {
  namespace: 'asset',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    files: [],
    products: [],
    orders: [],
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
    *files({ payload }, { call, put }) {
      const response = yield call(queryAssetFile, payload);
      yield put({
        type: 'saveFile',
        payload: response.objects,
      });
    },
    *products({ payload }, { call, put }) {
      const response = yield call(queryAssetProduct, payload);
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
        type: 'saveProduct',
        payload: res,
      });
    },
    *orders({ payload }, { call, put }) {
      const response = yield call(queryAssetOrder, payload);
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
        type: 'saveOrder',
        payload: res,
      });
    },
    // *add({ payload, callback }, { call, put }) {
    //   const response = yield call(addContact, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
    // *remove({ payload, callback }, { call, put }) {
    //   const response = yield call(removeContact, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
    // *update({ payload, callback }, { call, put }) {
    //   const response = yield call(updateContact, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
  },

  reducers: {
    save(state, action) {
      // console.log(action.payload);
      return {
        ...state,
        data: action.payload,
      };
    },
    saveFile(state, action) {
      return {
        ...state,
        files: action.payload,
      };
    },
    saveProduct(state, action) {
      return {
        ...state,
        products: action.payload,
      };
    },
    saveOrder(state, action) {
      return {
        ...state,
        orders: action.payload,
      };
    },
  },
};
