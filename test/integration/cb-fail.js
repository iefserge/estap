import estap from '../../lib';

const test = estap();

test.cb('check some numbers', t => {
  setTimeout(() => {
    t.is(10, 10);
    t.is(10 + 11, 20);
    t.end();
  }, 1);
});
