import estap from '../../lib';

const test = estap();

test.cb('should pass', t => {
  t.plan(2);

  setTimeout(() => {
    t.pass('timeout 1');
  }, 10);

  setTimeout(() => {
    t.pass('timeout 2');
  }, 100);

  setTimeout(() => {
    t.pass('timeout 3');
  }, 110);
});
