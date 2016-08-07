import Promise from 'bluebird';
import runnerTest from '../helpers/runner-test';

runnerTest('promise test', runner => {
  const defineTest = runner();

  defineTest('first', () => Promise.resolve(true));
}, [
  { type: 'done', count: 0, ok: 0, error: 0, skip: 0, only: 0 },
], true);

runnerTest('promise test with assertions', runner => {
  const defineTest = runner();

  defineTest('first', t => new Promise(resolve => {
    t.is(10, 10, 'a1');
    setTimeout(() => {
      t.is(20, 20, 'a2');
      setTimeout(() => {
        t.is(30, 30, 'a3');
        resolve();
      }, 100);
    }, 100);
  }));
}, [
  { type: 'ok', test: 'first', message: 'a1' },
  { type: 'ok', test: 'first', message: 'a2' },
  { type: 'ok', test: 'first', message: 'a3' },
  { type: 'done', count: 3, ok: 3, error: 0, skip: 0, only: 0 },
], true);

runnerTest('promise rejection with non-error', runner => {
  const defineTest = runner();

  defineTest('first', t => new Promise((resolve, reject) => {
    t.is(10, 10, 'a1');
    setTimeout(() => {
      t.is(20, 20, 'a2');
      setTimeout(() => {
        t.is(30, 30, 'a3');
        reject(false);
      }, 100);
    }, 100);
  }));
}, [
  { type: 'ok', test: 'first', message: 'a1' },
  { type: 'ok', test: 'first', message: 'a2' },
  { type: 'ok', test: 'first', message: 'a3' },
  { type: 'error',
    test: 'first',
    message: 'promise rejection',
    op: 'reject',
    actual: false,
    stack: [],
  },
  { type: 'done', count: 4, ok: 3, error: 1, skip: 0, only: 0 },
], false);

runnerTest('promise rejection with error object', runner => {
  const defineTest = runner();

  defineTest('first', t => new Promise((resolve, reject) => {
    t.is(10, 10, 'a1');
    setTimeout(() => {
      t.is(20, 20, 'a2');
      setTimeout(() => {
        t.is(30, 30, 'a3');
        reject(new Error('oh no'));
      }, 100);
    }, 100);
  }));
}, [
  { type: 'ok', test: 'first', message: 'a1' },
  { type: 'ok', test: 'first', message: 'a2' },
  { type: 'ok', test: 'first', message: 'a3' },
  { type: 'error',
    test: 'first',
    message: 'promise rejection',
    op: 'reject',
    actual: new Error('oh no'),
    stack: [
      'at <test>',
    ],
  },
  { type: 'done', count: 4, ok: 3, error: 1, skip: 0, only: 0 },
], false);

runnerTest('promise catches error', runner => {
  const defineTest = runner();

  defineTest('first', () => new Promise(() => {
    /* eslint-disable no-undef, new-cap */
    ERROR_CALL();
    /* eslint-enable no-undef, new-cap */
  }));
}, [
  { type: 'error',
    test: 'first',
    message: 'promise rejection',
    actual: new ReferenceError('ERROR_CALL is not defined'),
    op: 'reject',
    stack: [
      'at <test>',
      'at <test>',
    ],
  },
  { type: 'done', count: 1, ok: 0, error: 1, skip: 0, only: 0 },
], false);
