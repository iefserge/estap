/* eslint-disable no-constant-condition */
import Promise from 'bluebird';
import runnerTest from '../helpers/runner-test';

runnerTest('sync test plan', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.plan(2);
    t.pass('a1');
    t.pass('a2');
  });
}, [
  { type: 'ok', test: 'first', message: 'a1' },
  { type: 'ok', test: 'first', message: 'a2' },
  { type: 'done', count: 2, ok: 2, error: 0, skip: 0, only: 0 },
], true);

runnerTest('cb test plan', runner => {
  const defineTest = runner();

  defineTest.cb('first', t => {
    t.plan(2);
    t.pass('a1');
    t.pass('a2');
  });
}, [
  { type: 'ok', test: 'first', message: 'a1' },
  { type: 'ok', test: 'first', message: 'a2' },
  { type: 'done', count: 2, ok: 2, error: 0, skip: 0, only: 0 },
], true);

runnerTest('promise test plan', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.plan(2);

    return new Promise(resolve => {
      t.pass('a1');
      t.pass('a2');
      resolve();
    });
  });
}, [
  { type: 'ok', test: 'first', message: 'a1' },
  { type: 'ok', test: 'first', message: 'a2' },
  { type: 'done', count: 2, ok: 2, error: 0, skip: 0, only: 0 },
], true);

runnerTest('sync test plan < count', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.plan(2);
    if (false) {
      t.pass('a1');
    }
    t.pass('a2');
  });
}, [
  { type: 'ok', test: 'first', message: 'a2' },
  { type: 'error',
    test: 'first',
    message: 'assertions count does not match plan',
    op: 'plan',
    actual: 1,
    expected: 2,
    stack: [],
  },
  { type: 'done', count: 2, ok: 1, error: 1, skip: 0, only: 0 },
], false);

runnerTest('sync test plan > count', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.plan(3);
    t.pass('a1');
    t.pass('a2');
  });
}, [
  { type: 'ok', test: 'first', message: 'a1' },
  { type: 'ok', test: 'first', message: 'a2' },
  { type: 'error',
    test: 'first',
    message: 'assertions count does not match plan',
    op: 'plan',
    actual: 2,
    expected: 3,
    stack: [],
  },
  { type: 'done', count: 3, ok: 2, error: 1, skip: 0, only: 0 },
], false);

runnerTest('cb test plan < count', runner => {
  const defineTest = runner();

  defineTest.cb('first', t => {
    t.plan(2);
    if (false) {
      t.pass('a1');
    }
    t.pass('a2');
    t.end();
  });
}, [
  { type: 'ok', test: 'first', message: 'a2' },
  { type: 'error',
    test: 'first',
    message: 'assertions count does not match plan',
    op: 'plan',
    actual: 1,
    expected: 2,
    stack: [],
  },
  { type: 'done', count: 2, ok: 1, error: 1, skip: 0, only: 0 },
], false);

runnerTest('cb test plan > count', runner => {
  const defineTest = runner();

  defineTest.cb('first', t => {
    t.plan(3);
    t.pass('a1');
    t.pass('a2');
    t.end();
  });
}, [
  { type: 'ok', test: 'first', message: 'a1' },
  { type: 'ok', test: 'first', message: 'a2' },
  { type: 'error',
    test: 'first',
    message: 'assertions count does not match plan',
    op: 'plan',
    actual: 2,
    expected: 3,
    stack: [],
  },
  { type: 'done', count: 3, ok: 2, error: 1, skip: 0, only: 0 },
], false);

runnerTest('promise test plan < count', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.plan(2);

    return new Promise(resolve => {
      if (false) {
        t.pass('a1');
      }
      t.pass('a2');
      resolve();
    });
  });
}, [
  { type: 'ok', test: 'first', message: 'a2' },
  { type: 'error',
    test: 'first',
    message: 'assertions count does not match plan',
    op: 'plan',
    actual: 1,
    expected: 2,
    stack: [],
  },
  { type: 'done', count: 2, ok: 1, error: 1, skip: 0, only: 0 },
], false);

runnerTest('promise test plan > count', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.plan(3);
    return new Promise(resolve => {
      t.pass('a1');
      t.pass('a2');
      resolve();
    });
  });
}, [
  { type: 'ok', test: 'first', message: 'a1' },
  { type: 'ok', test: 'first', message: 'a2' },
  { type: 'error',
    test: 'first',
    message: 'assertions count does not match plan',
    op: 'plan',
    actual: 2,
    expected: 3,
    stack: [],
  },
  { type: 'done', count: 3, ok: 2, error: 1, skip: 0, only: 0 },
], false);

runnerTest('plan invalid value', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.plan(3.14);
  });
}, [
  { type: 'error',
    test: 'first',
    message: 'plan value is not a positive integer',
    op: 'plan',
    actual: 3.14,
    stack: [
      'at <test>',
    ],
  },
  { type: 'done', count: 1, ok: 0, error: 1, skip: 0, only: 0 },
], false);

runnerTest('plan not a number', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.plan('abc');
  });
}, [
  { type: 'error',
    test: 'first',
    message: 'plan value is not a positive integer',
    op: 'plan',
    actual: 'abc',
    stack: [
      'at <test>',
    ],
  },
  { type: 'done', count: 1, ok: 0, error: 1, skip: 0, only: 0 },
], false);

runnerTest('plan set multiple times', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.plan(3);
    t.plan(4);
  });
}, [
  { type: 'error',
    test: 'first',
    message: 'plan can only be set once',
    op: 'plan',
    stack: [
      'at <test>',
    ],
  },
  { type: 'error',
    test: 'first',
    message: 'assertions count does not match plan',
    op: 'plan',
    actual: 0,
    expected: 3,
    stack: [],
  },
  { type: 'done', count: 2, ok: 0, error: 2, skip: 0, only: 0 },
], false);
