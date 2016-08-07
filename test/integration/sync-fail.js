import estap from '../../lib';

const test = estap();

test('check some numbers', t => {
  t.is(10, 10);
  t.is(10 + 10, 42);
});
