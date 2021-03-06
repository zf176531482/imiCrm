import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha, fakeAccountLogout } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { message } from 'antd';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);

      if (response.status === 'OK') {
        if (response.user && response.user.sfdc_account) {
          response.currentAuthority = 'user';
        } else {
          response.currentAuthority = 'admin';
        }
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });

        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      } else {
        response.currentAuthority = 'guest';
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { call, put }) {
      yield call(fakeAccountLogout);

      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
          user: null,
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      if (payload.user) {
        localStorage.setItem('user', JSON.stringify(payload.user));
      } else {
        localStorage.removeItem('user');
      }

      return {
        ...state,
        status: payload.status,
        user: payload.user,
        // type: payload.type,
      };
    },
  },
};
