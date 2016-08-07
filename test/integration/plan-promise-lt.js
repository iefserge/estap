import Promise from 'bluebird';
import estap from '../../lib';

const test = estap();

test('should pass', t => {
  t.plan(2);

  return new Promise(resolve => {
    t.pass();
    resolve();
  });
});
