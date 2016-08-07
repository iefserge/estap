export default function (fn) {
  if (process.browser) {
    global.onerror = (a, b, c, d, err) => {
      global.onerror = null;
      fn(err);
    };
  }

  process.once('uncaughtException', fn);
}
