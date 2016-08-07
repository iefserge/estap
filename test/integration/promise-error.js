import estap from '../../lib';

const test = estap();

test('check some numbers', t => (new Promise(() => {
  t.is(10, 10);
  throw new Error('not expecting it');
})));
