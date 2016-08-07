import estap from '../../lib';

const test = estap();

test('should pass', t => {
  t.pass();
});

estap.run({
  log: console.log.bind(console),
}).catch(err => {
  throw err;
});
