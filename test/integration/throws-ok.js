import estap from '../../lib';

const test = estap();

test('throws/notThrows', t => {
  t.throws(() => {
    throw new Error();
  });

  t.throws(() => {
    throw new Error();
  }, Error);

  t.throws(() => {
    throw new Error();
  }, Error, 'throws check type');

  t.throws(() => {
    throw new Error('hello-world');
  }, [Error, /hello-world/], 'throws check type regex');

  t.throws(() => {
    throw new Error('hello-world');
  }, [Error, 'hello-world'], 'throws check type str');

  t.throws(() => {
    throw new Error('hello-world');
  }, /hello-world/, 'throws check regex');

  t.notThrows(() => {});
  t.notThrows(() => {}, 'nothing to throw');
});
