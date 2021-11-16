// eslint-disable-next-line import/prefer-default-export
export const debounce = (fn, ms) => {
  let timeout;
  return function () {
    // eslint-disable-next-line prefer-rest-params
    const fnCall = () => fn.apply(this, arguments);
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};
