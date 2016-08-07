import estap from '../../lib';

const test = estap();
global.process.exit = void 0;

test('should pass', t => {
  t.fail();
});
