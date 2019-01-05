import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

/**
 * login logout
 */
export async function fakeAccountLogin(params) {
  // return request('/api/login/account', {
  //   method: 'POST',
  //   body: params,
  // });
  return request('/dev/usermgr/user_login/', {
    method: 'POST',
    body: params,
  });
}

export async function fakeAccountLogout() {
  return request('/dev/usermgr/login_out/');
}

/**
 * contact
 */

export async function queryContact(params) {
  return request(`/dev/api/v1/contact/?${stringify(params)}`);
}

export async function removeContact(params) {
  return request('/dev/api/v1/contact', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addContact(params) {
  return request('/dev/api/v1/contact', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateContact(params) {
  return request('/dev/api/v1/contact', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

/**
 * asset
 */

export async function queryAsset(params) {
  return request(`/dev/api/v1/asset/?${stringify(params)}`);
}

export async function queryAssetFile(params) {
  return request(`/dev/api/v1/assetfile/?${stringify(params)}`);
}

export async function queryAssetProduct(params) {
  return request(`/dev/api/v1/product/?${stringify(params)}`);
}

export async function queryAssetOrder(params) {
  return request(`/dev/api/v1/assetorder/?${stringify(params)}`);
}

/**
 * service report
 */

export async function createReport(params) {
  return request('/dev/api/v1/servicereport/', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function connectFileReport(formData) {
  return request('/dev/api/v1/servicereport/upload_file/', {
    method: 'POST',
    body: formData,
  });
}

export async function queryReport(params) {
  return request(`/dev/api/v1/servicereport/?${stringify(params)}`);
}

/**
 * upgrade
 */

export async function queryCase(params) {
  return request(`/dev/api/v1/successcase/?${stringify(params)}`);
}

export async function queryOpportunity(params) {
  return request(`/dev/api/v1/opportunity/?${stringify(params)}`);
}

export async function queryCompleteValues(params) {
  return request(`/dev/api/v1/completevalues/?${stringify(params)}`);
}

export async function plantinput(params) {
  return request('/dev/api/v1/plantinput/', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
