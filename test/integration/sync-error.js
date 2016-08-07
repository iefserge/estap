/* eslint-disable no-undef */
import estap from '../../lib';

const test = estap();

test('check some numbers', t => {
  t.is(10, 10);
  thisIsAnError();
  t.is(10 + 10, 20);
});
