import estap from '../../lib';

const test = estap();

test('should pass', t => {
  t.plan(2);
  t.pass('1');
  t.pass('2');
});
