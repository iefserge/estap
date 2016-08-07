/* eslint-disable no-underscore-dangle, new-cap */
import Promise from 'bluebird';
import { extractErrorStack } from './stack-filter';

function ESTAP_TEST__(fn, t) {
  return fn(t);
}

export default function ([t, end, setOnEndHandler], test, testOpts) {
  if (test.skip) {
    ++testOpts.testsSkipped;
    testOpts.log({
      type: 'skip',
      test: test.name,
    });
    return Promise.resolve();
  }

  if (test.type === 'default') {
    const res = ESTAP_TEST__(test.fn, t);

    if (Object(res) === res && typeof res.then === 'function') {
      return res.then(() => void end())
        .catch(e => {
          ++testOpts.assertionCount;
          ++testOpts.assertionFailed;
          testOpts.log({
            type: 'error',
            op: 'reject',
            message: 'promise rejection',
            actual: e,
            test: test.name,
            stack: extractErrorStack(e),
          });
          return Promise.resolve();
        });
    }

    // end sync tests
    end();
    return Promise.resolve();
  }

  if (test.type === 'cb') {
    return new Promise(resolve => {
      setOnEndHandler(() => {
        resolve();
      });

      ESTAP_TEST__(test.fn, t);
    });
  }

  throw new Error('unknown test type');
}
