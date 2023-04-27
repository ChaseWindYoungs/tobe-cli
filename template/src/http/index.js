import axios from 'axios';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';

let userConfig, userData;

axios.defaults.timeout = 60 * 1000;
axios.defaults.withFailTips = false;
axios.defaults.withErrorTips = false;
axios.defaults.withCredentials = false;

axios.interceptors.request.use(
  async config => {
    if (config.method.toUpperCase() === 'DELETE') {
    }
    if (config.method.toUpperCase() === 'GET') {
    }
    if (config.method.toUpperCase() === 'PUT') {
    }
    if (config.method.toUpperCase() === 'POST') {
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  response => {
    if (![200].includes(code)) {
      ElMessage.error(msg);
      return Promise.reject({ response });
    }
    return data;
  },
  error => {
    ElMessage.error(error);
    return Promise.reject(error);
  }
);

export default axios;
