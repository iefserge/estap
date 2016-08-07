/* eslint-disable no-useless-concat */
import test from 'tape';
import tap from '../../lib/reporter/tap';

test('done message ok', t => {
  let i = 0;
  const send = tap({
    log(v) {
      i++;
      if (i === 1) t.equal(v, 'TAP version 13');
      if (i === 2) t.equal(v, '');
      if (i === 3) t.equal(v, '1..0');
      if (i === 4) t.equal(v, '# passing 10/10');
      if (i === 5) {
        t.equal(v, '# ok');
        t.end();
      }
    },
  });

  send({ type: 'done', ok: 10, error: 0, count: 10 });
});

test('done message ok + only', t => {
  let i = 0;
  const send = tap({
    log(v) {
      i++;
      if (i === 1) t.equal(v, 'TAP version 13');
      if (i === 2) t.equal(v, '');
      if (i === 3) t.equal(v, '1..0');
      if (i === 4) t.equal(v, '# passing 10/10');
      if (i === 5) {
        t.equal(v, '# ok (but not running all the tests)');
        t.end();
      }
    },
  });

  send({ type: 'done', ok: 10, error: 0, count: 10, only: 1 });
});

test('done message ok + skip', t => {
  let i = 0;
  const send = tap({
    log(v) {
      i++;
      if (i === 1) t.equal(v, 'TAP version 13');
      if (i === 2) t.equal(v, '');
      if (i === 3) t.equal(v, '1..0');
      if (i === 4) t.equal(v, '# passing 10/12 (2 skipping)');
      if (i === 5) {
        t.equal(v, '# ok');
        t.end();
      }
    },
  });

  send({ type: 'done', ok: 10, error: 0, count: 12, skip: 2 });
});

test('done message fail', t => {
  let i = 0;
  const send = tap({
    log(v) {
      i++;
      if (i === 1) t.equal(v, 'TAP version 13');
      if (i === 2) t.equal(v, '');
      if (i === 3) t.equal(v, '1..0');
      if (i === 4) t.equal(v, '# passing 10/14 (4 failing)');
      if (i === 5) {
        t.equal(v, '# fail');
        t.end();
      }
    },
  });

  send({ type: 'done', ok: 10, error: 4, count: 14 });
});

test('done message fail + skip', t => {
  let i = 0;
  const send = tap({
    log(v) {
      i++;
      if (i === 1) t.equal(v, 'TAP version 13');
      if (i === 2) t.equal(v, '');
      if (i === 3) t.equal(v, '1..0');
      if (i === 4) t.equal(v, '# passing 10/18 (4 failing, 4 skipping)');
      if (i === 5) {
        t.equal(v, '# fail');
        t.end();
      }
    },
  });

  send({ type: 'done', ok: 10, error: 4, count: 18, skip: 4 });
});

test('passing test message', t => {
  let i = 0;
  const send = tap({
    log(v) {
      i++;
      if (i === 1) t.equal(v, 'TAP version 13');
      if (i === 2) t.equal(v, 'ok 1 test-name > message');
      if (i === 3) t.equal(v, 'ok 2 test-name > message 2');
      if (i === 4) {
        t.equal(v, 'ok 3 test-name 2 > message 3');
        t.end();
      }
    },
  });

  send({ type: 'ok', test: 'test-name', message: 'message' });
  send({ type: 'ok', test: 'test-name', message: 'message 2' });
  send({ type: 'ok', test: 'test-name 2', message: 'message 3' });
});

test('failing test message', t => {
  let i = 0;
  const send = tap({
    log(v) {
      i++;
      if (i === 1) t.equal(v, 'TAP version 13');
      if (i === 2) t.equal(v, 'not ok 1 test-name > message');
      if (i === 3) t.equal(v, '  ---');
      if (i === 4) t.equal(v, '');
      if (i === 5) {
        t.equal(v, '  ...');
        t.end();
      }
    },
  });

  send({ type: 'error', test: 'test-name', message: 'message' });
});

test('failing test message + actual', t => {
  let i = 0;
  const send = tap({
    log(v) {
      i++;
      if (i === 1) t.equal(v, 'TAP version 13');
      if (i === 2) t.equal(v, 'not ok 1 test-name > message');
      if (i === 3) t.equal(v, '  ---');
      if (i === 4) t.equal(v, '    actual:   \'(number) 10\'');
      if (i === 5) {
        t.equal(v, '  ...');
        t.end();
      }
    },
  });

  send({ type: 'error', test: 'test-name', message: 'message', actual: 10 });
});

test('failing test message + actual expected (numbers)', t => {
  let i = 0;
  const send = tap({
    log(v) {
      i++;
      if (i === 1) t.equal(v, 'TAP version 13');
      if (i === 2) t.equal(v, 'not ok 1 test-name > message');
      if (i === 3) t.equal(v, '  ---');
      if (i === 4) {
        t.equal(v, '    actual:   \'(number) 10\'' + '\n' +
                   '    expected: \'(number) 20\'');
      }
      if (i === 5) {
        t.equal(v, '  ...');
        t.end();
      }
    },
  });

  send({ type: 'error', test: 'test-name', message: 'message', actual: 10, expected: 20 });
});

test('failing test message + actual expected (strings)', t => {
  let i = 0;
  const send = tap({
    log(v) {
      i++;
      if (i === 1) t.equal(v, 'TAP version 13');
      if (i === 2) t.equal(v, 'not ok 1 test-name > message');
      if (i === 3) t.equal(v, '  ---');
      if (i === 4) {
        t.equal(v, '    actual:   \'(string) rollercoaster\'' + '\n' +
                   '    expected: \'(string) r0llercoaster\'');
      }
      if (i === 5) {
        t.equal(v, '  ...');
        t.end();
      }
    },
  });

  send({
    type: 'error',
    test: 'test-name',
    message: 'message',
    actual: 'rollercoaster',
    expected: 'r0llercoaster',
  });
});

test('failing test message + actual expected (undefined null)', t => {
  let i = 0;
  const send = tap({
    log(v) {
      i++;
      if (i === 1) t.equal(v, 'TAP version 13');
      if (i === 2) t.equal(v, 'not ok 1 test-name > message');
      if (i === 3) t.equal(v, '  ---');
      if (i === 4) {
        t.equal(v, '    actual:   \'(object) null\'' + '\n' +
                   '    expected: \'(undefined) undefined\'');
      }
      if (i === 5) {
        t.equal(v, '  ...');
        t.end();
      }
    },
  });

  send({
    type: 'error',
    test: 'test-name',
    message: 'message',
    actual: null,
    expected: void 0,
  });
});

test('failing test message + actual expected (errors)', t => {
  let i = 0;
  const send = tap({
    log(v) {
      i++;
      if (i === 1) t.equal(v, 'TAP version 13');
      if (i === 2) t.equal(v, 'not ok 1 test-name > message');
      if (i === 3) t.equal(v, '  ---');
      if (i === 4) {
        t.equal(v, '    actual:   \'(object) [Error: this is an error]\'' + '\n' +
                   '    expected: \'(object) [TypeError: this is another error]\'');
      }
      if (i === 5) {
        t.equal(v, '  ...');
        t.end();
      }
    },
  });

  send({
    type: 'error',
    test: 'test-name',
    message: 'message',
    actual: new Error('this is an error'),
    expected: new TypeError('this is another error'),
  });
});

test('failing test message + actual expected (objects)', t => {
  let i = 0;
  const send = tap({
    log(v) {
      i++;
      if (i === 1) t.equal(v, 'TAP version 13');
      if (i === 2) t.equal(v, 'not ok 1 test-name > message');
      if (i === 3) t.equal(v, '  ---');
      if (i === 4) {
        t.equal(v, '    actual:   \'(object) { key: \'\'value\'\' }\'' + '\n' +
                   '    expected: \'(object) { otherKey: 10 }\'');
      }
      if (i === 5) {
        t.equal(v, '  ...');
        t.end();
      }
    },
  });

  send({
    type: 'error',
    test: 'test-name',
    message: 'message',
    actual: { key: 'value' },
    expected: { otherKey: 10 },
  });
});

test('unknown message', t => {
  const send = tap({
    log() {},
  });

  send({ type: 'other' });
  t.end();
});
