/* eslint-disable no-throw-literal */
import setupUnhandled from '../helpers/setup-unhandled';
import runnerTest from '../helpers/runner-test';

runnerTest('empty cb test', runner => {
  const defineTest = runner();

  defineTest.cb('first', t => {
    t.end();
  });
}, [
  { type: 'done', count: 0, ok: 0, error: 0, skip: 0, only: 0 },
], true);

runnerTest('empty cb test with timer', runner => {
  const defineTest = runner();

  defineTest.cb('first', t => {
    setTimeout(t.end, 100);
  });
}, [
  { type: 'done', count: 0, ok: 0, error: 0, skip: 0, only: 0 },
], true);

runnerTest('does not catch cb test error', (runner, assert) => {
  const defineTest = runner();

  function unhandledHandler(err) {
    assert.equal(err, 1, 'caught');
  }

  defineTest.before(() => {
    setupUnhandled(unhandledHandler);
  });

  defineTest.cb('first', () => {
    throw 1;
  });
}, [
  { type: 'done', count: 0, ok: 0, error: 0, skip: 0, only: 0 },
], null);

runnerTest('does not catch cb test error object', (runner, assert) => {
  const defineTest = runner();

  function unhandledHandler(err) {
    assert.equal(err.message, 'other error', 'caught');
  }

  defineTest.before(() => {
    setupUnhandled(unhandledHandler);
  });

  defineTest.cb('first', () => {
    throw new Error('other error');
  });
}, [
  { type: 'done', count: 0, ok: 0, error: 0, skip: 0, only: 0 },
], null);

runnerTest('empty cb test with timer and assertions', runner => {
  const defineTest = runner();

  defineTest.cb('first', t => {
    t.is(10, 10, 'a1');
    setTimeout(() => {
      t.is(-5, -5, 'a2');
      t.end();
    }, 100);
  });
}, [
  { type: 'ok', test: 'first', message: 'a1' },
  { type: 'ok', test: 'first', message: 'a2' },
  { type: 'done', count: 2, ok: 2, error: 0, skip: 0, only: 0 },
], true);

runnerTest('cb test cannot end multiple times', runner => {
  const defineTest = runner();

  defineTest.cb('first', t => {
    t.is(10, 10, 'a1');
    t.end();
    t.end();
  });
}, [
  { type: 'ok', test: 'first', message: 'a1' },
  { type: 'error',
    test: 'first',
    message: 'end called multiple times',
    op: 'end',
    stack: [
      'at <test>',
    ],
  },
  { type: 'done', count: 2, ok: 1, error: 1, skip: 0, only: 0 },
], false);

runnerTest('cb test end with an error', runner => {
  const defineTest = runner();

  defineTest.cb('first', t => {
    t.is(10, 10, 'a1');
    t.end(true);
  });
}, [
  { type: 'ok', test: 'first', message: 'a1' },
  { type: 'error',
    test: 'first',
    message: 'end value should be falsy',
    op: 'end',
    actual: true,
    stack: [
      'at <test>',
    ],
  },
  { type: 'done', count: 2, ok: 1, error: 1, skip: 0, only: 0 },
], false);

runnerTest('cb test assertion after end', (runner, assert) => {
  assert.plan(3);
  const defineTest = runner();

  defineTest.cb('first', t => {
    t.is(10, 10, 'a1');
    t.end();
    assert.throws(() => {
      t.is(10, 10, 'a2');
    });
  });
}, [
  { type: 'ok', test: 'first', message: 'a1' },
  { type: 'done', count: 1, ok: 1, error: 0, skip: 0, only: 0 },
], true);
