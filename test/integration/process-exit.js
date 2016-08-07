import estap from '../../lib';

const test = estap();

test('should pass', t => {
  t.pass();
  process.exit(0);
});
