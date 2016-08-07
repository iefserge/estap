import estap from '../../lib';

const test = estap();

test('check some numbers', t => (new Promise(resolve => {
  t.is(10, 10);
  setTimeout(() => resolve(), 1);
})));
