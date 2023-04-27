import { defineStore } from 'pinia';

export default defineStore('user', {
  state: () => ({ count: 1 }),
  getters: {
    double: state => state.count * 2
  },
  actions: {
    increment() {
      this.count++;
    }
  }
});
