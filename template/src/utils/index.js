import CONS from '@/constants/constants.js';

const { THEME_CODE } = CONS;
// 防抖
const debounce = (func, wait = 300) => {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments);
      timer = null;
    }, wait);
  };
};

// 节流
const throttle = (func, wait = 1000) => {
  let timer = null;
  return function () {
    if (timer) return;
    func.apply(this, arguments);
    timer = setTimeout(() => {
      timer = null;
    }, wait);
  };
};
const changeThemeValue = (val) => {
  const classes = document.getElementsByTagName('html')[0].className;
  let classArr = [];
  if (classes) {
    classArr = classes.split(' ');
  }
  let keys = Object.values(THEME_CODE).map(i => `root-theme-${i}`);
  classArr = classArr.filter(i => !keys.includes(i));
  classArr.push(`root-theme-${THEME_CODE[val]}`);
  document.getElementsByTagName('html')[0].className = classArr.join(' ');
};

const getAssetsFile = (url) => {
  return new URL(`../assets/${url}`, import.meta.url).href;
};

export {
  debounce,
  throttle,
  changeThemeValue,
  getAssetsFile
};
