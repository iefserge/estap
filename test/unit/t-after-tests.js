import test from 'tape';
import runnerTest from '../helpers/runner-test';
import estap from '../../lib';

runnerTest('t.after() sync', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.after(() => {
      t.is(2, 2, 'after ok');
    });

    t.after(() => {
      t.is(3, 3, 'after ok 2');
    });

    t.is(1, 1, 'check ok');
  });
}, [
  { type: 'ok', test: 'first', message: 'check ok' },
  { type: 'ok', test: 'first', message: 'after ok' },
  { type: 'ok', test: 'first', message: 'after ok 2' },
  { type: 'done', count: 3, ok: 3, error: 0, skip: 0, only: 0 },
], true);

test('t.after() callback', t => {
  const runner = estap.createRunner();
  const suite = runner();
  let count = 0;

  suite.cb('first', assert => {
    assert.after(() => {
      ++count;
    });

    assert.after(() => {
      ++count;
    });

    count = 0;

    setTimeout(() => {
      assert.true(true);
      count = 0;
      assert.end();
    }, 10);
  });

  runner.run({
    log: () => {},
  })
  .then(res => {
    t.ok(res);
    t.is(count, 2);
    t.end();
  })
  .catch(err => {
    t.fail(err);
  });
});

test('t.after() promise', t => {
  const runner = estap.createRunner();
  const suite = runner();
  let count = 0;

  suite('first', assert => {
    assert.after(() => {
      ++count;
    });

    assert.after(() => {
      ++count;
    });

    count = 0;

    return new Promise(resolve => {
      setTimeout(() => {
        assert.true(true);
        count = 0;
        resolve();
      }, 10);
    });
  });

  runner.run({
    log: () => {},
  })
  .then(res => {
    t.ok(res);
    t.is(count, 2);
    t.end();
  })
  .catch(err => {
    t.fail(err);
  });
});

runnerTest('t.after() not a function', runner => {
  const defineTest = runner();

  defineTest('first', t => {
    t.after(10);

    t.is(1, 1, 'check ok');
  });
}, [
  {
    type: 'error',
    test: 'first',
    message: 'after() argument 0 is not a function',
    op: 'after',
    stack: ['at <test>'],
  },
  { type: 'ok', test: 'first', message: 'check ok' },
  { type: 'done', count: 2, ok: 1, error: 1, skip: 0, only: 0 },
], false);
