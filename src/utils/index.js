const throttle = (func, ms) => {
  let isThrottled = false, lastArgs, lastThis;

  function wrapper(...args) {
    if (isThrottled) {
      lastArgs = args;
      lastThis = this;
      return;
    }

    isThrottled = true;
    func.apply(this, args);

    setTimeout(() => {
      isThrottled = false;
      if (lastArgs) {
        wrapper.apply(lastThis, lastArgs);
        lastArgs = lastThis = null;
      }
    }, ms);
  }

  return wrapper;
};

export { throttle };
