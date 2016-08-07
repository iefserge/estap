import test from 'tape';
import estap from '../../lib';
import collectLogs from './collect-logs';

export default function (name, fn, out, result, opts = {}) {
  const def = opts.only ? test.only.bind(test) : test;
  def(name, assert => {
    assert.plan(2);
    const runner = estap.createRunner();

    fn(runner, assert);

    runner.run({
      log: collectLogs(logs => {
        assert.same(logs, out, 'output');
      }),
    })
    .then(res => {
      assert.is(res, result, result ? 'test result true' : 'test result false');
    })
    .catch(() => {
      assert.is(result, null, 'test result error');
    });
  });
}
