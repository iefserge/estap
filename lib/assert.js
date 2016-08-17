import deepEqual from 'deep-equal';
import objectAssign from 'object-assign';
import { extractErrorStack } from './stack-filter';

function isValidPlan(value) {
  return typeof value === 'number' && Math.floor(value) === value && value > 0;
}

export default function (test, testOpts, context = null) {
  let count = 0;
  let plan = 0;
  let onEndHandler = null;
  let ended = false;

  const assert = function ESTAP_ASSERT__(value, opts) {
    if (ended && opts.op !== 'end') {
      // throw here because it can happen later after the test completion
      throw new Error('assertion after end');
    }

    if (!value) {
      ++testOpts.assertionCount;
      ++testOpts.assertionFailed;
      testOpts.log(objectAssign({
        type: 'error',
        test: test.name,
        stack: extractErrorStack(new Error()),
      }, opts));
    } else {
      ++count;
      ++testOpts.assertionCount;
      testOpts.log({ type: 'ok', test: test.name, message: opts.message });

      if (test.type === 'cb' && count === plan) {
        assertEnd();
      }
    }
  };

  function testEnd() {
    if (plan > 0 && count !== plan) {
      ++testOpts.assertionCount;
      ++testOpts.assertionFailed;
      testOpts.log({
        type: 'error',
        op: 'plan',
        message: 'assertions count does not match plan',
        actual: count,
        expected: plan,
        test: test.name,
        stack: [],
      });
    }
  }

  function setOnEndHandler(handler) {
    onEndHandler = handler;
  }

  function assertEnd(val) {
    if (test.type !== 'cb') {
      assert(false, {
        message: 'only callback tests require end',
        op: 'end',
      });
      return;
    }

    if (ended) {
      assert(false, {
        message: 'end called multiple times',
        op: 'end',
      });
      return;
    }

    ended = true;

    if (val) {
      assert(false, {
        message: 'end value should be falsy',
        actual: val,
        op: 'end',
      });
    }

    testEnd();
    onEndHandler();
  }

  return [{
    plan(num) {
      if (!isValidPlan(num)) {
        assert(false, {
          message: 'plan value is not a positive integer',
          actual: num,
          op: 'plan',
        });
        return;
      }

      if (plan > 0) {
        assert(false, {
          message: 'plan can only be set once',
          op: 'plan',
        });
        return;
      }

      plan = num;
    },
    end: assertEnd,
    pass(message) {
      assert(true, {
        message: message || 'pass',
        actual: null,
        expected: null,
        op: 'fail',
      });
    },
    fail(message) {
      assert(false, {
        message: message || 'fail',
        actual: null,
        expected: null,
        op: 'fail',
      });
    },
    is(actual, expected, message) {
      assert(actual === expected, {
        message: message || 'is',
        actual,
        expected,
        op: 'is',
      });
    },
    not(actual, expected, message) {
      assert(actual !== expected, {
        message: message || 'not',
        actual,
        expected,
        op: 'not',
      });
    },
    truthy(actual, message) {
      assert(actual, {
        message: message || 'truthy',
        actual,
        expected: null,
        op: 'truthy',
      });
    },
    falsy(actual, message) {
      assert(!actual, {
        message: message || 'falsy',
        actual,
        expected: null,
        op: 'falsy',
      });
    },
    true(actual, message) {
      assert(actual === true, {
        message: message || 'true',
        actual,
        expected: true,
        op: 'true',
      });
    },
    false(actual, message) {
      assert(actual === false, {
        message: message || 'false',
        actual,
        expected: false,
        op: 'false',
      });
    },
    throws(fn, expectedArg, messageArg) {
      let expected = expectedArg;
      let message = messageArg;
      if (typeof expectedArg === 'string') {
        expected = void 0;
        message = expectedArg;
      }

      try {
        fn();
      } catch (err) {
        if (typeof expected === 'undefined') {
          assert(true, {
            message: message || 'throws',
            actual: err.constructor,
            expected,
            op: 'throws',
          });
          return;
        }

        if (typeof expected === 'function') {
          assert(err instanceof expected, {
            message: message || 'throws',
            actual: err.constructor,
            expected,
            op: 'throws',
          });
          return;
        }

        if (expected instanceof RegExp) {
          assert(expected.test(String(err)), {
            message: message || 'throws',
            actual: String(err),
            expected,
            op: 'throws',
          });
          return;
        }

        if (Array.isArray(expected) && expected.length === 2 && (expected[1] instanceof RegExp)) {
          assert((err instanceof expected[0]) && expected[1].test(String(err)), {
            message: message || 'throws',
            actual: [err.constructor, String(err)],
            expected,
            op: 'throws',
          });
          return;
        }

        if (Array.isArray(expected) && expected.length === 2 && (typeof expected[1] === 'string')) {
          assert((err instanceof expected[0]) && expected[1] === String(err.message), {
            message: message || 'throws',
            actual: [err.constructor, String(err.message)],
            expected,
            op: 'throws',
          });
          return;
        }

        assert(false, {
          message: message || 'throws',
          op: 'throws',
          actual: err,
          expected,
        });
        return;
      }

      if (typeof expected === 'undefined') {
        assert(false, {
          message: message || 'throws',
          op: 'throws',
        });
      } else {
        assert(false, {
          message: message || 'throws',
          expected,
          op: 'throws',
        });
      }
    },
    notThrows(fn, message) {
      try {
        fn();
        assert(true, {
          message: message || 'notThrows',
          op: 'notThrows',
        });
      } catch (err) {
        assert(false, {
          message: message || 'notThrows',
          actual: err,
          op: 'notThrows',
        });
      }
    },
    same(actual, expected, message) {
      assert(deepEqual(actual, expected, { strict: true }), {
        message: message || 'same',
        actual,
        expected,
        op: 'same',
      });
    },
    notSame(actual, expected, message) {
      assert(!deepEqual(actual, expected, { strict: true }), {
        message: message || 'notSame',
        actual,
        expected,
        op: 'notSame',
      });
    },
    context,
  }, testEnd, setOnEndHandler];
}
