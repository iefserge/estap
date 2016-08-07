import estap from '../lib';

const test = estap();

function add(a, b) {
  return a + b;
}

test('add', t => {
  t.is(add(1, 2), 3, '1 + 2 === 3');
});

test('delay promise', t => new Promise(resolve => {
  t.pass('setting a timeout');
  setTimeout(resolve, 1000);
}));

test.cb('delay callback', t => {
  t.pass('setting a timeout');
  setTimeout(t.end, 1000);
});
