import runnerTest from '../helpers/runner-test';
import setupUnhandled from '../helpers/setup-unhandled';

runnerTest('empty runner', () => {
}, [
  { type: 'done', count: 0, ok: 0, error: 0, skip: 0, only: 0 },
], true);

runnerTest('one empty test', runner => {
  const defineTest = runner();

  defineTest('first', () => {
  });
}, [
  { type: 'done', count: 0, ok: 0, error: 0, skip: 0, only: 0 },
], true);

runnerTest('one test and assert', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.is(1, 1);
  });
}, [
  { type: 'ok', test: 'first', message: 'is' },
  { type: 'done', count: 1, ok: 1, error: 0, skip: 0, only: 0 },
], true);

runnerTest('one unnamed test and assert', runner => {
  const defineTest = runner();

  defineTest(t => {
    t.is(1, 1);
  });
}, [
  { type: 'ok', test: '(unnamed)', message: 'is' },
  { type: 'done', count: 1, ok: 1, error: 0, skip: 0, only: 0 },
], true);

runnerTest('one test and few asserts', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.is(1, 1);
    t.is(10, 10);
    t.is('abc', 'abc');
    t.same([1, 2, 3], [1, 2, 1 + 2]);
  });
}, [
  { type: 'ok', test: 'first', message: 'is' },
  { type: 'ok', test: 'first', message: 'is' },
  { type: 'ok', test: 'first', message: 'is' },
  { type: 'ok', test: 'first', message: 'same' },
  { type: 'done', count: 4, ok: 4, error: 0, skip: 0, only: 0 },
], true);

runnerTest('all kinds of passing assertions', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.is(1, 1);
    t.not(1, 2);
    t.same([1, 2, 3], [1, 2, 1 + 2]);
    t.notSame([1, 2, 4], [1, 2, 1 + 2]);
    t.truthy(1);
    t.truthy('ok');
    t.truthy(true);
    t.truthy({});
    t.truthy([]);
    t.falsy('');
    t.falsy(false);
    t.falsy(0);
    t.pass();
    t.true(true);
    t.false(false);
  });
}, [
  { type: 'ok', test: 'first', message: 'is' },
  { type: 'ok', test: 'first', message: 'not' },
  { type: 'ok', test: 'first', message: 'same' },
  { type: 'ok', test: 'first', message: 'notSame' },
  { type: 'ok', test: 'first', message: 'truthy' },
  { type: 'ok', test: 'first', message: 'truthy' },
  { type: 'ok', test: 'first', message: 'truthy' },
  { type: 'ok', test: 'first', message: 'truthy' },
  { type: 'ok', test: 'first', message: 'truthy' },
  { type: 'ok', test: 'first', message: 'falsy' },
  { type: 'ok', test: 'first', message: 'falsy' },
  { type: 'ok', test: 'first', message: 'falsy' },
  { type: 'ok', test: 'first', message: 'pass' },
  { type: 'ok', test: 'first', message: 'true' },
  { type: 'ok', test: 'first', message: 'false' },
  { type: 'done', count: 15, ok: 15, error: 0, skip: 0, only: 0 },
], true);

runnerTest('all kinds of passing assertions with messages', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.is(1, 1, 'a1');
    t.not(1, 2, 'a2');
    t.same([1, 2, 3], [1, 2, 1 + 2], 'a3');
    t.notSame([1, 2, 4], [1, 2, 1 + 2], 'a4');
    t.truthy(1, 'a5');
    t.truthy('ok', 'a6');
    t.truthy(true, 'a7');
    t.truthy({}, 'a8');
    t.truthy([], 'a9');
    t.falsy('', 'a10');
    t.falsy(false, 'a11');
    t.falsy(0, 'a12');
    t.pass('a13');
    t.true(true, 'a14');
    t.false(false, 'a15');
  });
}, [
  { type: 'ok', test: 'first', message: 'a1' },
  { type: 'ok', test: 'first', message: 'a2' },
  { type: 'ok', test: 'first', message: 'a3' },
  { type: 'ok', test: 'first', message: 'a4' },
  { type: 'ok', test: 'first', message: 'a5' },
  { type: 'ok', test: 'first', message: 'a6' },
  { type: 'ok', test: 'first', message: 'a7' },
  { type: 'ok', test: 'first', message: 'a8' },
  { type: 'ok', test: 'first', message: 'a9' },
  { type: 'ok', test: 'first', message: 'a10' },
  { type: 'ok', test: 'first', message: 'a11' },
  { type: 'ok', test: 'first', message: 'a12' },
  { type: 'ok', test: 'first', message: 'a13' },
  { type: 'ok', test: 'first', message: 'a14' },
  { type: 'ok', test: 'first', message: 'a15' },
  { type: 'done', count: 15, ok: 15, error: 0, skip: 0, only: 0 },
], true);

runnerTest('few passing tests', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.is(1, 1);
  });

  defineTest('second', t => {
    t.not({ a: 10, b: 20 }, { a: 10, b: 20 });
    t.same({ a: 10, b: 20 }, { a: 10, b: 20 });
  });

  defineTest('third', t => {
    t.pass();
  });
}, [
  { type: 'ok', test: 'first', message: 'is' },
  { type: 'ok', test: 'second', message: 'not' },
  { type: 'ok', test: 'second', message: 'same' },
  { type: 'ok', test: 'third', message: 'pass' },
  { type: 'done', count: 4, ok: 4, error: 0, skip: 0, only: 0 },
], true);

runnerTest('single failing test', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.fail('this should fail');
  });
}, [
  { type: 'error',
    test: 'first',
    message: 'this should fail',
    op: 'fail',
    actual: null,
    expected: null,
    stack: ['at <test>'],
  },
  { type: 'done', count: 1, ok: 0, error: 1, skip: 0, only: 0 },
], false);

runnerTest('other failing tests', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.true(false);
    t.false(true);
  });
}, [
  { type: 'error',
    test: 'first',
    message: 'true',
    op: 'true',
    actual: false,
    expected: true,
    stack: ['at <test>'],
  },
  { type: 'error',
    test: 'first',
    message: 'false',
    op: 'false',
    actual: true,
    expected: false,
    stack: ['at <test>'],
  },
  { type: 'done', count: 2, ok: 0, error: 2, skip: 0, only: 0 },
], false);

runnerTest('single failing test without message', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.fail();
  });
}, [
  { type: 'error',
    test: 'first',
    message: 'fail',
    op: 'fail',
    actual: null,
    expected: null,
    stack: ['at <test>'],
  },
  { type: 'done', count: 1, ok: 0, error: 1, skip: 0, only: 0 },
], false);

runnerTest('single failing test with actual and expected values', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.is('hello', 'hell0', 'should be equal for sure');
  });
}, [
  { type: 'error',
    test: 'first',
    message: 'should be equal for sure',
    op: 'is',
    actual: 'hello',
    expected: 'hell0',
    stack: ['at <test>'],
  },
  { type: 'done', count: 1, ok: 0, error: 1, skip: 0, only: 0 },
], false);

runnerTest('single failing test with multiple failing assertions', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.fail('first fail');
    t.fail('second fail');
    t.fail('third fail');
  });
}, [
  { type: 'error',
    test: 'first',
    message: 'first fail',
    op: 'fail',
    actual: null,
    expected: null,
    stack: ['at <test>'],
  },
  { type: 'error',
    test: 'first',
    message: 'second fail',
    op: 'fail',
    actual: null,
    expected: null,
    stack: ['at <test>'],
  },
  { type: 'error',
    test: 'first',
    message: 'third fail',
    op: 'fail',
    actual: null,
    expected: null,
    stack: ['at <test>'],
  },
  { type: 'done', count: 3, ok: 0, error: 3, skip: 0, only: 0 },
], false);

runnerTest('does not catch unhandled exceptions (non errors)', (runner, assert) => {
  const defineTest = runner();

  function unhandledHandler(err) {
    assert.equal(err, 1, 'caught');
  }

  defineTest.before(() => {
    setupUnhandled(unhandledHandler);
  });

  defineTest('first', () => {
    /* eslint-disable no-throw-literal */
    throw 1;
    /* eslint-enable no-throw-literal */
  });
}, [
  { type: 'done', count: 0, ok: 0, error: 0, skip: 0, only: 0 },
], null);

runnerTest('does not catch unhandled exceptions (error objects)', (runner, assert) => {
  const defineTest = runner();

  function unhandledHandler(err) {
    assert.equal(err.message, 'something is wrong', 'caught');
  }

  defineTest.before(() => {
    setupUnhandled(unhandledHandler);
  });

  defineTest('first', () => {
    (() => {
      (() => {
        throw new Error('something is wrong');
      })();
    })();
  });
}, [
  { type: 'done', count: 0, ok: 0, error: 0, skip: 0, only: 0 },
], null);

runnerTest('does not catch runtime errors', (runner, assert) => {
  const defineTest = runner();

  function unhandledHandler(err) {
    assert.equal(err.message, 'ERROR_CALL is not defined', 'caught');
  }

  defineTest.before(() => {
    setupUnhandled(unhandledHandler);
  });

  defineTest('first', () => {
    (() => {
      (() => {
        /* eslint-disable no-undef, new-cap */
        ERROR_CALL();
        /* eslint-enable no-undef, new-cap */
      })();
    })();
  });
}, [
  { type: 'done', count: 0, ok: 0, error: 0, skip: 0, only: 0 },
], null);

runnerTest('multiple failing tests', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.fail('first fail');
  });

  defineTest('second', t => {
    t.fail('second fail');
  });

  defineTest('third', t => {
    t.fail('third fail');
  });
}, [
  { type: 'error',
    test: 'first',
    message: 'first fail',
    op: 'fail',
    actual: null,
    expected: null,
    stack: ['at <test>'],
  },
  { type: 'error',
    test: 'second',
    message: 'second fail',
    op: 'fail',
    actual: null,
    expected: null,
    stack: ['at <test>'],
  },
  { type: 'error',
    test: 'third',
    message: 'third fail',
    op: 'fail',
    actual: null,
    expected: null,
    stack: ['at <test>'],
  },
  { type: 'done', count: 3, ok: 0, error: 3, skip: 0, only: 0 },
], false);

runnerTest('sync test end() error', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.end();
  });
}, [
  { type: 'error',
    test: 'first',
    message: 'only callback tests require end',
    op: 'end',
    stack: [
      'at <test>',
    ],
  },
  { type: 'done', count: 1, ok: 0, error: 1, skip: 0, only: 0 },
], false);
