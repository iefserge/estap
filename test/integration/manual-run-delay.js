import estap from '../../lib';

const test = estap();
estap.disableAutorun();

test('should pass', t => {
  t.pass();
});

setTimeout(() => {
  estap.run({
    log: console.log.bind(console),
  }).catch(err => {
    throw err;
  });
}, 1000);
