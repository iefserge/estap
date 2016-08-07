# estap

JavaScript TAP test framework highly inspired by [tape](https://www.npmjs.com/package/tape) and [AVA](https://www.npmjs.com/package/ava).

* **Simple:** Works in Node and browsers, simply import or require it to use. API is very similar to tape and AVA. 100% test coverage.
* **Concurrent:** All asynchronous tests are run concurrently. Forces to write isolated from each other test cases that don't share a global state.
* **Useful Features:** Synchronous and asynchronous tests, support for Promises, before/after/beforeEach/afterEach hooks, clean stacktraces.

## Usage

```js
import createSuite from 'estap';
const test = createSuite();

test('add', t => {
  t.is(add(1, 2), 3, '1 + 2 === 3');
});

test('delay promise', t => new Promise(resolve => {
  t.pass('setting a timeout');
  setTimeout(resolve, 1000);
}));

test.cb('delay callback', t => {
  t.pass('setting a timeout');
  setTimeout(t.end, 1000);
});
```

outputs:

```
TAP version 13
ok 1 add > 1 + 2 === 3
ok 2 delay promise > setting a timeout
ok 3 delay callback > setting a timeout

1..3
# passing 3/3
# ok
```

## API

**estap()** - create a test suite that can contain a number of test cases and hooks (before, after, beforeEach and afterEach). Returns a test suite (called `test` below).

**estap.createLock()** - create lock for shared resource access synchronization (see example below).

#### Test Cases:

**test([name, ]fn)** - define a synchronous test case using name (optional) and implementation function (`fn`).

**test.cb([name, ]fn)** - define an asynchronous test case using name (optional) and implementation function (`fn`).

**test.skip([name, ]fn)** - define a skipped test.

**test.only([name, ]fn)** - define the only test(s) that should run, ignore everything else.

`.skip` and `.only` modifiers can be added to `test.cb` too.

#### Hooks

Hooks are tests that run in the specific order relative to the other tests, they can be synchronous or asynchronous too (i.e use `test.before.cb` or return `Promise`). Multiple hooks of the same type run in the same order they were defined.

**test.before([name, ]fn)** - define a test that runs before all the tests in the suite.

**test.after([name, ]fn)** - define a test that runs after all the tests in the suite.

**test.beforeEach([name, ]fn)** - define a test that runs before every test in the suite.

**test.afterEach([name, ]fn)** - define a test that runs after every test in the suite.

`.skip` modifier can be added to any hook.

#### Implementation function

Implementation function defines a body of each test/hook. It can return nothing (synchronous test) or `Promise` (asynchronous test). Promise rejection results in the test failure. It's called with the assertion object (`t`).

#### Assertion object

**t.plan(number)** - set the number of assertions that should run. When reached, ends test asynchronous automatically.

**t.end(value)** - end asynchronous test. Required only for `*.cb()` tests that don't use `t.plan()`.

**t.pass([message])** - passing assertion.

**t.fail([message])** - failing assertion.

**t.is(actual, expected [,message])** - assert that `actual === expected`.

**t.not(actual, expected [,message])** - assert that `actual !== expected`.

**t.truthy(value [,message])** - assert that `value` is truthy.

**t.falsy(value [,message])** - assert that `value` is falsy.

**t.same(actual, expected [,message])** - assert that `actual` is strictly deeply equal to `expected`.

**t.notSame(actual, expected [,message])** - assert that `actual` is not strictly deeply equal to `expected`.

**t.context** - object that is shared between the test and its beforeEach and afterEach hooks.

Each assertion can have an optional `message` (string).

#### Concurrency

Everything runs concurrently in the same Node process/browser context. However it's possible to synchronize access to any shared resource using locks.

```js
import { default as createSuite, createLock } from 'estap';
const test = createSuite();
const lock = createLock();

test.beforeEach('setup database', t => {
  return lock.acquire()
    .then(() => t.pass('resetting database...'));
});

test.afterEach('release database', lock.release);
```

#### Thanks to

* @substack for [tape](https://www.npmjs.com/package/tape), tap-producing test harness for node and browsers, source for many ideas.

* @sindresorhus and AVA team for [AVA](https://github.com/avajs/ava), Futuristic JavaScript test runner, source for many ideas.

#### License

MIT
