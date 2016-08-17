/* eslint-disable no-throw-literal */
import runnerTest from '../helpers/runner-test';

const errObj = new Error();

runnerTest('throws', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.throws(() => {
      throw new Error();
    }, Error);

    t.throws(() => {
      throw new Error();
    }, Error, 'should throw this error');

    t.throws(() => {
      throw 1;
    });

    t.throws(() => {
      throw new Error();
    }, TypeError);

    t.throws(() => {
    }, TypeError, 'doesn\'t really throw');

    t.throws(() => {
      const x = null;
      x.abc();
    }, TypeError, 'real type error');

    t.throws(() => {
      const x = null;
      x.abc();
    });

    t.throws(() => {
      const x = null;
      x.abc();
    }, [TypeError, 'Cannot read property \'abc\' of null']);

    t.throws(() => {
      const x = null;
      x.abc();
    }, [TypeError, /abc/]);

    t.throws(() => {
      const x = null;
      x.abc();
    }, [TypeError, 'Cannot read property \'abc\' of null'], 'type and message');

    t.throws(() => {
      const x = null;
      x.abc();
    }, [TypeError, /abc/], 'type and message regex');

    t.throws(() => {
      const x = null;
      x.abc();
    }, [RangeError, 'Cannot read property \'abc\' of null'], 'type and message');

    t.throws(() => {
      const x = null;
      x.abc();
    }, [RangeError, /abc/], 'type and message regex');

    t.throws(() => {
      const x = null;
      x.abc();
    }, [TypeError, 'Cannot read property \'def\' of null'], 'type and message');

    t.throws(() => {
      const x = null;
      x.abc();
    }, [TypeError, /def/], 'type and message regex');

    t.throws(() => {
      const x = null;
      x.abc();
    }, /abc/);

    t.throws(() => {
      const x = null;
      x.abc();
    }, /abc/, 'regex only ok');

    t.throws(() => {
      const x = null;
      x.abc();
    }, /def/, 'regex only fail');

    t.throws(() => {
      throw errObj;
    }, 33, 'unknown argument');

    t.throws(() => {
      throw errObj;
    }, 44);

    t.throws(() => {
      throw errObj;
    }, 'message only');
  });
}, [
  { type: 'ok', test: 'first', message: 'throws' },
  { type: 'ok', test: 'first', message: 'should throw this error' },
  { type: 'ok', test: 'first', message: 'throws' },
  { type: 'error',
    test: 'first',
    message: 'throws',
    actual: Error,
    expected: TypeError,
    op: 'throws',
    stack: [
      'at <test>',
    ],
  },
  { type: 'error',
    test: 'first',
    message: 'doesn\'t really throw',
    expected: TypeError,
    op: 'throws',
    stack: [
      'at <test>',
    ],
  },
  { type: 'ok', test: 'first', message: 'real type error' },
  { type: 'ok', test: 'first', message: 'throws' },
  { type: 'ok', test: 'first', message: 'throws' },
  { type: 'ok', test: 'first', message: 'throws' },
  { type: 'ok', test: 'first', message: 'type and message' },
  { type: 'ok', test: 'first', message: 'type and message regex' },
  { type: 'error',
    test: 'first',
    message: 'type and message',
    actual: [TypeError, 'Cannot read property \'abc\' of null'],
    expected: [RangeError, 'Cannot read property \'abc\' of null'],
    op: 'throws',
    stack: [
      'at <test>',
    ],
  },
  { type: 'error',
    test: 'first',
    message: 'type and message regex',
    actual: [TypeError, 'TypeError: Cannot read property \'abc\' of null'],
    expected: [RangeError, /abc/],
    op: 'throws',
    stack: [
      'at <test>',
    ],
  },
  { type: 'error',
    test: 'first',
    message: 'type and message',
    actual: [TypeError, 'Cannot read property \'abc\' of null'],
    expected: [TypeError, 'Cannot read property \'def\' of null'],
    op: 'throws',
    stack: [
      'at <test>',
    ],
  },
  { type: 'error',
    test: 'first',
    message: 'type and message regex',
    actual: [TypeError, 'TypeError: Cannot read property \'abc\' of null'],
    expected: [TypeError, /def/],
    op: 'throws',
    stack: [
      'at <test>',
    ],
  },
  { type: 'ok', test: 'first', message: 'throws' },
  { type: 'ok', test: 'first', message: 'regex only ok' },
  { type: 'error',
    test: 'first',
    message: 'regex only fail',
    actual: 'TypeError: Cannot read property \'abc\' of null',
    expected: /def/,
    op: 'throws',
    stack: [
      'at <test>',
    ],
  },
  { type: 'error',
    test: 'first',
    message: 'unknown argument',
    actual: errObj,
    expected: 33,
    op: 'throws',
    stack: [
      'at <test>',
    ],
  },
  { type: 'error',
    test: 'first',
    message: 'throws',
    actual: errObj,
    expected: 44,
    op: 'throws',
    stack: [
      'at <test>',
    ],
  },
  { type: 'ok', test: 'first', message: 'message only' },
  { type: 'done', count: 21, ok: 12, error: 9, skip: 0, only: 0 },
], false);

runnerTest('notThrows', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.notThrows(() => {});
    t.notThrows(() => {}, 'should be fine');
    t.notThrows(() => {
      throw errObj;
    });
    t.notThrows(() => {
      throw errObj;
    }, 'that is an error');
  });
}, [
  { type: 'ok', test: 'first', message: 'notThrows' },
  { type: 'ok', test: 'first', message: 'should be fine' },
  { type: 'error',
    test: 'first',
    message: 'notThrows',
    actual: errObj,
    op: 'notThrows',
    stack: [
      'at <test>',
    ],
  },
  { type: 'error',
    test: 'first',
    message: 'that is an error',
    actual: errObj,
    op: 'notThrows',
    stack: [
      'at <test>',
    ],
  },
  { type: 'done', count: 4, ok: 2, error: 2, skip: 0, only: 0 },
], false);
