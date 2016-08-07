import Promise from 'bluebird';
import Map from 'es6-map';
import Set from 'es6-set';
import assert from 'assert';
import objectAssign from 'object-assign';
import runTest from './run-test';
import createAssert from './assert';

export default function () {
  const tests = new Map();
  let onlyTestCount = 0;

  function add(test) {
    if (!tests.has(test.test)) {
      tests.set(test.test, {
        test: [],
        beforeEach: [],
        afterEach: [],
        before: [],
        after: [],
      });
    }

    const testData = tests.get(test.test);
    testData[test.role].push(test);
  }

  function createTest(unitName = '') {
    const test = {
      name: String(unitName),
    };

    function setupTest(a, b, defaultName, opts) {
      let name = defaultName;
      let fn = null;

      if (typeof a === 'string') {
        name = a;
        fn = b;
      } else {
        fn = a;
      }

      if (opts.only) {
        ++onlyTestCount;
      }

      add({
        test,
        name,
        fn,
        type: opts.type,
        role: opts.role || 'test',
        skip: opts.skip || false,
        only: opts.only || false,
      });
    }

    const defaultName = '(unnamed)';
    const defaultNameBefore = 'before';
    const defaultNameAfter = 'after';
    const defaultNameBeforeEach = 'beforeEach';
    const defaultNameAfterEach = 'afterEach';

    // test()
    // test.only()
    // test.skip()
    // test.cb()
    // test.cb.only()
    // test.cb.skip()
    // test.beforeEach()
    // test.afterEach()
    // test.beforeEach.cb()
    // test.afterEach.cb()
    // test.before()
    // test.after()
    // test.before.cb()
    // test.after.cb()
    // test.beforeEach.skip()
    // test.afterEach.skip()
    // test.beforeEach.cb.skip()
    // test.afterEach.cb.skip()
    // test.before.skip()
    // test.after.skip()
    // test.before.cb.skip()
    // test.after.cb.skip()
    const defineTest = (a, b) => setupTest(a, b, defaultName, { type: 'default' });
    defineTest.only = (a, b) => setupTest(a, b, defaultName, { type: 'default', only: true });
    defineTest.skip = (a, b) => setupTest(a, b, defaultName, { type: 'default', skip: true });
    defineTest.cb = (a, b) => setupTest(a, b, defaultName, { type: 'cb' });
    defineTest.cb.only = (a, b) => setupTest(a, b, defaultName, { type: 'cb', only: true });
    defineTest.cb.skip = (a, b) => setupTest(a, b, defaultName, { type: 'cb', skip: true });
    defineTest.beforeEach = (a, b) => setupTest(a, b, defaultNameBeforeEach, { type: 'default', role: 'beforeEach' });
    defineTest.afterEach = (a, b) => setupTest(a, b, defaultNameAfterEach, { type: 'default', role: 'afterEach' });
    defineTest.beforeEach.cb = (a, b) => setupTest(a, b, defaultNameBeforeEach, { type: 'cb', role: 'beforeEach' });
    defineTest.afterEach.cb = (a, b) => setupTest(a, b, defaultNameAfterEach, { type: 'cb', role: 'afterEach' });
    defineTest.before = (a, b) => setupTest(a, b, defaultNameBefore, { type: 'default', role: 'before' });
    defineTest.after = (a, b) => setupTest(a, b, defaultNameAfter, { type: 'default', role: 'after' });
    defineTest.before.cb = (a, b) => setupTest(a, b, defaultNameBefore, { type: 'cb', role: 'before' });
    defineTest.after.cb = (a, b) => setupTest(a, b, defaultNameAfter, { type: 'cb', role: 'after' });
    defineTest.beforeEach.skip = (a, b) => setupTest(a, b, defaultNameBeforeEach, { type: 'default', role: 'beforeEach', skip: true });
    defineTest.afterEach.skip = (a, b) => setupTest(a, b, defaultNameAfterEach, { type: 'default', role: 'afterEach', skip: true });
    defineTest.beforeEach.cb.skip = (a, b) => setupTest(a, b, defaultNameBeforeEach, { type: 'cb', role: 'beforeEach', skip: true });
    defineTest.afterEach.cb.skip = (a, b) => setupTest(a, b, defaultNameAfterEach, { type: 'cb', role: 'afterEach', skip: true });
    defineTest.before.skip = (a, b) => setupTest(a, b, defaultNameBefore, { type: 'default', role: 'before', skip: true });
    defineTest.after.skip = (a, b) => setupTest(a, b, defaultNameAfter, { type: 'default', role: 'after', skip: true });
    defineTest.before.cb.skip = (a, b) => setupTest(a, b, defaultNameBefore, { type: 'cb', role: 'before', skip: true });
    defineTest.after.cb.skip = (a, b) => setupTest(a, b, defaultNameAfter, { type: 'cb', role: 'after', skip: true });

    return defineTest;
  }

  createTest.run = (opts = {}) => {
    assert(typeof opts.log === 'function', '.log function required');
    const testOpts = {
      log: opts.log,
      assertionCount: 0,
      assertionFailed: 0,
      testsSkipped: 0,
      pendingTests: new Set(),
    };

    return Promise.map(tests.keys(), testObj => {
      const testData = tests.get(testObj);

      return Promise.resolve()
        .then(() => Promise.mapSeries(testData.before, test => runTest(createAssert(test, testOpts), test, testOpts)))
        .then(() => Promise.map(testData.test, test => {
          const context = {};
          function setupHookTest(hookTest) {
            return objectAssign({}, hookTest, {
              name: `${test.name} > ${hookTest.name}`,
              skip: test.skip || hookTest.skip,
            });
          }

          if (onlyTestCount > 0 && !test.only) {
            return Promise.resolve();
          }

          return Promise.resolve()
            .then(() => (Promise.mapSeries(testData.beforeEach, hookTest => {
              const updatedTest = setupHookTest(hookTest);
              return runTest(createAssert(updatedTest, testOpts, context), updatedTest, testOpts);
            })))
            .then(() => runTest(createAssert(test, testOpts, context), test, testOpts))
            .then(() => (Promise.mapSeries(testData.afterEach, hookTest => {
              const updatedTest = setupHookTest(hookTest);
              return runTest(createAssert(updatedTest, testOpts, context), updatedTest, testOpts);
            })));
        }))
        .then(() => Promise.mapSeries(testData.after, test => runTest(createAssert(test, testOpts), test, testOpts)));
    }).then(() => {
      const total = testOpts.assertionCount + testOpts.testsSkipped;
      testOpts.log({
        type: 'done',
        count: total,
        ok: testOpts.assertionCount - testOpts.assertionFailed,
        error: testOpts.assertionFailed,
        skip: testOpts.testsSkipped,
        only: onlyTestCount,
      });
      if (testOpts.assertionFailed > 0 || onlyTestCount > 0) {
        return Promise.resolve(false);
      }

      return Promise.resolve(true);
    }).catch(err => {
      setTimeout(() => {
        throw err;
      }, 0);
      return Promise.reject();
    });
  };

  createTest.hasTests = () => tests.size > 0;

  return createTest;
}
