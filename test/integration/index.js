import { execFile } from 'child_process';
import path from 'path';
import test from 'tape';

const babelNode = path.resolve(__dirname, '../../node_modules/babel-cli/bin/babel-node.js');

function execTest(fileName, fn) {
  function fixOutput(s) {
    if (s === '') {
      return s;
    }

    return '\n' + s.split('\n').map(l => {
      if (l.indexOf('      - \'at ') === 0) {
        if (l.indexOf(fileName) >= 0) {
          return '      - \'at <testcallsite>\'';
        }

        return '      - \'at <callsite>\'';
      }

      if (l.indexOf('    at ') === 0) {
        if (l.indexOf(fileName) >= 0) {
          return '    at <testcallsite>';
        }

        return '    at <callsite>';
      }

      return l;
    }).join('\n');
  }
  test(fileName, t => {
    execFile(babelNode, [path.resolve(__dirname, `${fileName}`)], (err, stdout, stderr) => {
      const out = fixOutput(stdout);
      const outErr = fixOutput(stderr);
      fn(t, err, out, outErr);
    });
  });
}

execTest('cb-ok.js', (t, err, stdout, stderr) => {
  t.error(err, 'ok');
  t.is(stdout, `
TAP version 13
ok 1 check some numbers > is
ok 2 check some numbers > is

1..2
# passing 2/2
# ok
`, 'stdout');
  t.is(stderr, '', 'stderr');
  t.end();
});

execTest('cb-fail.js', (t, err, stdout, stderr) => {
  t.ok(err, 'errored');
  t.is(stdout, `
TAP version 13
ok 1 check some numbers > is
not ok 2 check some numbers > is
  ---
    op:       is
    actual:   '(number) 21'
    expected: '(number) 20'
    stack:
      - 'at <testcallsite>'
      - 'at <callsite>'
  ...

1..2
# passing 1/2 (1 failing)
# fail
`, 'stdout');
  t.is(stderr, '', 'stderr');
  t.end();
});

execTest('cb-error.js', (t, err, stdout, stderr) => {
  t.ok(err, 'errored');
  t.is(stdout, `
TAP version 13
ok 1 check some numbers > is
`, 'stdout');
  t.is(stderr, `
Error: this is an error
    at <testcallsite>
`, 'stderr');
  t.end();
});

execTest('cb-throw-nonerror.js', (t, err, stdout, stderr) => {
  t.ok(err, 'errored');
  t.is(stdout, `
TAP version 13
ok 1 check some numbers > is
`, 'stdout');
  t.is(stderr, `
Uncaught exception: 1
`, 'stderr');
  t.end();
});

execTest('sync-ok.js', (t, err, stdout, stderr) => {
  t.error(err, 'ok');
  t.is(stdout, `
TAP version 13
ok 1 check some numbers > is
ok 2 check some numbers > is

1..2
# passing 2/2
# ok
`, 'stdout');
  t.is(stderr, '', 'stderr');
  t.end();
});

execTest('sync-fail.js', (t, err, stdout, stderr) => {
  t.ok(err, 'errored');
  t.is(stdout, `
TAP version 13
ok 1 check some numbers > is
not ok 2 check some numbers > is
  ---
    op:       is
    actual:   '(number) 20'
    expected: '(number) 42'
    stack:
      - 'at <testcallsite>'
  ...

1..2
# passing 1/2 (1 failing)
# fail
`, 'stdout');
  t.is(stderr, '', 'stderr');
  t.end();
});

execTest('sync-error.js', (t, err, stdout, stderr) => {
  t.ok(err, 'errored');
  t.is(stdout, `
TAP version 13
ok 1 check some numbers > is
`, 'stdout');
  t.is(stderr, `
ReferenceError: thisIsAnError is not defined
    at <testcallsite>
`, 'stderr');
  t.end();
});

execTest('promise-ok.js', (t, err, stdout, stderr) => {
  t.error(err, 'ok');
  t.is(stdout, `
TAP version 13
ok 1 check some numbers > is

1..1
# passing 1/1
# ok
`, 'stdout');
  t.is(stderr, '', 'stderr');
  t.end();
});

execTest('promise-fail.js', (t, err, stdout, stderr) => {
  t.ok(err, 'errored');
  t.is(stdout, `
TAP version 13
ok 1 check some numbers > is
not ok 2 check some numbers > promise rejection
  ---
    op:       reject
    actual:   '(undefined) undefined'
  ...

1..2
# passing 1/2 (1 failing)
# fail
`, 'stdout');
  t.is(stderr, '', 'stderr');
  t.end();
});

execTest('promise-error.js', (t, err, stdout, stderr) => {
  t.ok(err, 'errored');
  t.is(stdout, `
TAP version 13
ok 1 check some numbers > is
not ok 2 check some numbers > promise rejection
  ---
    op:       reject
    actual:   '(object) [Error: not expecting it]'
    stack:
      - 'at <testcallsite>'
      - 'at <callsite>'
      - 'at <testcallsite>'
  ...

1..2
# passing 1/2 (1 failing)
# fail
`, 'stdout');
  t.is(stderr, '', 'stderr');
  t.end();
});

execTest('no-set-immediate.js', (t, err, stdout, stderr) => {
  t.error(err, 'ok');
  t.is(stdout, `
TAP version 13
ok 1 check some numbers > is
ok 2 check some numbers > is

1..2
# passing 2/2
# ok
`, 'stdout');
  t.is(stderr, '', 'stderr');
  t.end();
});

execTest('no-autorun.js', (t, err, stdout, stderr) => {
  t.error(err, 'ok');
  t.is(stdout, '', 'stdout');
  t.is(stderr, '', 'stderr');
  t.end();
});

execTest('manual-run.js', (t, err, stdout, stderr) => {
  t.error(err, 'ok');
  t.is(stdout, `
{ type: 'ok', test: 'should pass', message: 'pass' }
{ type: 'done', count: 1, ok: 1, error: 0, skip: 0, only: 0 }
`, 'stdout');
  t.is(stderr, '', 'stderr');
  t.end();
});

execTest('manual-run-delay.js', (t, err, stdout, stderr) => {
  t.error(err, 'ok');
  t.is(stdout, `
{ type: 'ok', test: 'should pass', message: 'pass' }
{ type: 'done', count: 1, ok: 1, error: 0, skip: 0, only: 0 }
`, 'stdout');
  t.is(stderr, '', 'stderr');
  t.end();
});

execTest('no-process-exit.js', (t, err, stdout, stderr) => {
  t.error(err, 'no error despite test failure');
  t.is(stdout, `
TAP version 13
not ok 1 should pass > fail
  ---
    op:       fail
    actual:   '(object) null'
    expected: '(object) null'
    stack:
      - 'at <testcallsite>'
  ...

1..1
# passing 0/1 (1 failing)
# fail
`, 'stdout');
  t.is(stderr, '', 'stderr');
  t.end();
});

execTest('plan-ok.js', (t, err, stdout, stderr) => {
  t.error(err, 'ok');
  t.is(stdout, `
TAP version 13
ok 1 should pass > timeout 1
ok 2 should pass > timeout 2

1..2
# passing 2/2
# ok
`, 'stdout');
  t.is(stderr, '', 'stderr');
  t.end();
});

execTest('plan-gt-expected.js', (t, err, stdout, stderr) => {
  t.ok(err, 'errored');
  t.is(stdout, `
TAP version 13
ok 1 should pass > timeout 1
ok 2 should pass > timeout 2

1..2
# passing 2/2
# ok
`, 'stdout');
  t.is(stderr, `
Error: assertion after end
    at <testcallsite>
    at <callsite>
`, 'stderr');
  t.end();
});

execTest('plan-sync-ok.js', (t, err, stdout, stderr) => {
  t.error(err, 'ok');
  t.is(stdout, `
TAP version 13
ok 1 should pass > 1
ok 2 should pass > 2

1..2
# passing 2/2
# ok
`, 'stdout');
  t.is(stderr, '', 'stderr');
  t.end();
});

execTest('plan-sync-lt.js', (t, err, stdout, stderr) => {
  t.ok(err, 'errored');
  t.is(stdout, `
TAP version 13
ok 1 should pass > 1
not ok 2 should pass > assertions count does not match plan
  ---
    op:       plan
    actual:   '(number) 1'
    expected: '(number) 2'
  ...

1..2
# passing 1/2 (1 failing)
# fail
`, 'stdout');
  t.is(stderr, '', 'stderr');
  t.end();
});

execTest('plan-sync-gt.js', (t, err, stdout, stderr) => {
  t.ok(err, 'errored');
  t.is(stdout, `
TAP version 13
ok 1 should pass > 1
ok 2 should pass > 2
ok 3 should pass > 3
not ok 4 should pass > assertions count does not match plan
  ---
    op:       plan
    actual:   '(number) 3'
    expected: '(number) 2'
  ...

1..4
# passing 3/4 (1 failing)
# fail
`, 'stdout');
  t.is(stderr, '', 'stderr');
  t.end();
});

execTest('plan-promise-ok.js', (t, err, stdout, stderr) => {
  t.error(err, 'ok');
  t.is(stdout, `
TAP version 13
ok 1 should pass > pass
ok 2 should pass > pass

1..2
# passing 2/2
# ok
`, 'stdout');
  t.is(stderr, '', 'stderr');
  t.end();
});

execTest('plan-promise-lt.js', (t, err, stdout, stderr) => {
  t.ok(err, 'errored');
  t.is(stdout, `
TAP version 13
ok 1 should pass > pass
not ok 2 should pass > assertions count does not match plan
  ---
    op:       plan
    actual:   '(number) 1'
    expected: '(number) 2'
  ...

1..2
# passing 1/2 (1 failing)
# fail
`, 'stdout');
  t.is(stderr, '', 'stderr');
  t.end();
});

execTest('plan-promise-gt.js', (t, err, stdout, stderr) => {
  t.ok(err, 'errored');
  t.is(stdout, `
TAP version 13
ok 1 should pass > pass
ok 2 should pass > pass
not ok 3 should pass > assertions count does not match plan
  ---
    op:       plan
    actual:   '(number) 2'
    expected: '(number) 1'
  ...

1..3
# passing 2/3 (1 failing)
# fail
`, 'stdout');
  t.is(stderr, '', 'stderr');
  t.end();
});

execTest('process-exit.js', (t, err, stdout, stderr) => {
  t.ok(err, 'errored');
  t.is(stdout, `
TAP version 13
ok 1 should pass > pass
`, 'stdout');
  t.is(stderr, '', 'stderr');
  t.end();
});
