import serialize from 'serialize-access';
import createRunner from './runner';
import tapReporter from './reporter/tap';
import { filterError } from './stack-filter';

const runner = createRunner();
const actuallyRun = runner.run;
let shouldAutorun = true;

runner.run = opts => {
  shouldAutorun = false;
  return actuallyRun(opts);
};

runner.disableAutorun = () => void (shouldAutorun = false);
runner.createRunner = createRunner;
runner.createLock = serialize;
runner.createSuite = runner;

function autorun() {
  const fn = global.setImmediate || (cb => global.setTimeout(cb, 0));
  let done = false;
  let result = false;
  fn(() => {
    if (!shouldAutorun) {
      return;
    }

    if (!runner.hasTests()) {
      return;
    }

    if (global.process && typeof global.process.exit === 'function') {
      process.on('exit', code => {
        if (code !== 0) {
          return;
        }

        if (!done) {
          process.exit(1);
        }

        process.exit(result ? 0 : 1);
      });

      process.on('uncaughtException', err => {
        console.error(filterError(err));
        process.exit(1);
      });
    }

    /*
    if (global.window === global) {
      global.onerror = (msg, file, line, col, err) => {
        if (err && (err instanceof Error)) {
          console.error(filterError(err));
          return true;
        }

        return false;
      };
    }
    */

    runner.run({
      log: tapReporter({ log: console.log.bind(console) }),
    }).then(ok => {
      result = ok;
      done = true;
    }).catch(() => {
      // Error being thrown earlier
    });
  });
}

autorun();

module.exports = runner;
