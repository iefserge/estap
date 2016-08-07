import Promise from 'bluebird';
import estap from '../../lib';

const test = estap();

test('should pass', t => {
  t.plan(1);

  return new Promise(resolve => {
    t.pass();
    t.pass();
    resolve();
  });
});
