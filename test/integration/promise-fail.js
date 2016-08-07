import estap from '../../lib';

const test = estap();

test('check some numbers', t => (new Promise((resolve, reject) => {
  t.is(10, 10);
  setTimeout(() => reject(), 1);
})));
