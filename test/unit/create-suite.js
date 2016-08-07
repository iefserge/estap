import test from 'tape';
import { createSuite } from '../../lib';

test('create suite', t => {
  const suite = createSuite();
  suite('t1', () => {});
  t.end();
});

