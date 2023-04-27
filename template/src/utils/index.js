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


export {
  debounce,
  throttle,
};
