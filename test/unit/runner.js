import test from 'tape';
import createRunner from '../../lib/runner';

test('runner no opts', t => {
  const runner = createRunner();
  t.throws(() => {
    runner.run();
  });
  t.end();
});
