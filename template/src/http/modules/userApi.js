import axios from '../index';

export default {
  userTest(params) {
    return axios.get(`user/test/api`);
  }
};
