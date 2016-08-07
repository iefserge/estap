import test from 'tape';
import Promise from 'bluebird';
import runTest from '../../lib/run-test';

test('run test sync', t => {
  t.plan(2);
  const assertObj = {};
  function end() {}
  function setOnEndHandler() {}

  runTest([assertObj, end, setOnEndHandler], {
    type: 'default',
    fn(a) {
      t.equal(a, assertObj);
    },
  }, {
  }).then(() => {
    t.pass();
  }).catch(err => {
    t.error(err);
  });
});

test('run test promise', t => {
  t.plan(3);
  const assertObj = {};
  function end() {}
  function setOnEndHandler() {}

  runTest([assertObj, end, setOnEndHandler], {
    type: 'default',
    fn(a) {
      t.equal(a, assertObj);
      return new Promise(resolve => {
        t.pass();
        setTimeout(resolve, 100);
      });
    },
  }, {
  }).then(() => {
    t.pass();
  }).catch(err => {
    t.error(err);
  });
});

test('run test promise reject', t => {
  t.plan(4);
  const assertObj = {};
  function end() {}
  function setOnEndHandler() {}

  runTest([assertObj, end, setOnEndHandler], {
    type: 'default',
    fn(a) {
      t.equal(a, assertObj);
      return new Promise((resolve, reject) => {
        t.pass();
        setTimeout(reject, 100, 'abc');
      });
    },
  }, {
    log(v) {
      t.same(v, { type: 'error',
        op: 'reject',
        message: 'promise rejection',
        actual: 'abc',
        test: undefined,
        stack: [],
      });
    },
  }).then(() => {
    t.pass();
  }).catch(err => {
    t.error(err);
  });
});

test('run test cb', t => {
  t.plan(3);
  const assertObj = {};
  let onEnd = null;

  function end() {}
  function setOnEndHandler(handler) {
    onEnd = handler;
    t.pass();
  }

  runTest([assertObj, end, setOnEndHandler], {
    type: 'cb',
    fn(a) {
      t.equal(a, assertObj);
      onEnd();
    },
  }, {
  }).then(() => {
    t.pass();
  }).catch(err => {
    t.error(err);
  });
});

test('run test unknown type', t => {
  const assertObj = {};
  function end() {}
  function setOnEndHandler() {}

  t.throws(() => {
    runTest([assertObj, end, setOnEndHandler], {
      type: 'other',
    }, {});
  });
  t.end();
});
