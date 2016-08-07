import estap from '../../lib';

const test = estap();
estap.disableAutorun();

test('should pass', t => {
  t.pass();
});
