/* eslint-disable no-unreachable */
import estap from '../../lib';

const test = estap();

test.cb('check some numbers', t => {
  setTimeout(() => {
    t.end();
  }, 1);
  t.is(10, 10);
  throw new Error('this is an error');
  t.is(10 + 11, 20);
});
