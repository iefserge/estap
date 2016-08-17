/* eslint-disable no-throw-literal */
import estap from '../../lib';

const test = estap();

test('throws/notThrows', t => {
  t.throws(() => {});

  t.throws(() => {}, Error);

  t.throws(() => {
    throw 'ABC';
  }, Error, 'throws check type');

  t.throws(() => {
    throw new Error('zzz');
  }, [Error, /hello-world/], 'throws check type regex');

  t.throws(() => {
    throw new TypeError('hello-world');
  }, [RangeError, 'hello-world'], 'throws check type str');

  t.throws(() => {
    throw new Error('hello-w0rld');
  }, /hello-world/, 'throws check regex');

  t.notThrows(() => {
    throw new Error();
  });
  t.notThrows(() => {
    throw new Error();
  }, 'oh no');
});
