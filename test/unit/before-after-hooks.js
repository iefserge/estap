import runnerTest from '../helpers/runner-test';

runnerTest('before/after hooks', runner => {
  const defineTest = runner();

  defineTest.before(t => {
    t.pass('before2');
  });

  defineTest.after(t => {
    t.pass('after2');
  });

  defineTest.beforeEach(t => {
    t.pass('beforeEach');
  });

  defineTest.afterEach(t => {
    t.pass('afterEach');
  });

  defineTest.beforeEach(t => {
    t.pass('other beforeEach');
  });

  defineTest.afterEach(t => {
    t.pass('other afterEach');
  });

  defineTest.before(t => {
    t.pass('before');
  });

  defineTest.after(t => {
    t.pass('after');
  });

  defineTest('first', t => {
    t.is(1, 1);
  });

  defineTest('second', t => {
    t.is(2, 2);
  });

  defineTest('third', t => {
    t.is(3, 3);
  });
}, [
  { type: 'ok', test: 'before', message: 'before2' },
  { type: 'ok', test: 'before', message: 'before' },
  { type: 'ok', test: 'first > beforeEach', message: 'beforeEach' },
  { type: 'ok', test: 'second > beforeEach', message: 'beforeEach' },
  { type: 'ok', test: 'third > beforeEach', message: 'beforeEach' },
  { type: 'ok', test: 'first > beforeEach', message: 'other beforeEach' },
  { type: 'ok', test: 'second > beforeEach', message: 'other beforeEach' },
  { type: 'ok', test: 'third > beforeEach', message: 'other beforeEach' },
  { type: 'ok', test: 'first', message: 'is' },
  { type: 'ok', test: 'second', message: 'is' },
  { type: 'ok', test: 'third', message: 'is' },
  { type: 'ok', test: 'first > afterEach', message: 'afterEach' },
  { type: 'ok', test: 'second > afterEach', message: 'afterEach' },
  { type: 'ok', test: 'third > afterEach', message: 'afterEach' },
  { type: 'ok', test: 'first > afterEach', message: 'other afterEach' },
  { type: 'ok', test: 'second > afterEach', message: 'other afterEach' },
  { type: 'ok', test: 'third > afterEach', message: 'other afterEach' },
  { type: 'ok', test: 'after', message: 'after2' },
  { type: 'ok', test: 'after', message: 'after' },
  { type: 'done', count: 19, ok: 19, error: 0, skip: 0, only: 0 },
], true);

runnerTest('before/after hooks multiple files', runner => {
  const defineTest = runner();

  defineTest.before(t => {
    t.pass('before2');
  });

  defineTest.after(t => {
    t.pass('after2');
  });

  defineTest.beforeEach(t => {
    t.pass('beforeEach');
  });

  defineTest.afterEach(t => {
    t.pass('afterEach');
  });

  defineTest.beforeEach(t => {
    t.pass('other beforeEach');
  });

  defineTest.afterEach(t => {
    t.pass('other afterEach');
  });

  defineTest.before(t => {
    t.pass('before');
  });

  defineTest.after(t => {
    t.pass('after');
  });

  defineTest('first', t => {
    t.is(1, 1);
  });

  defineTest('second', t => {
    t.is(2, 2);
  });

  defineTest('third', t => {
    t.is(3, 3);
  });

  const defineTestOther = runner();

  defineTestOther.before(t => {
    t.pass('file2 before2');
  });

  defineTestOther.after(t => {
    t.pass('file2 after2');
  });

  defineTestOther.beforeEach(t => {
    t.pass('file2 beforeEach');
  });

  defineTestOther.afterEach(t => {
    t.pass('file2 afterEach');
  });

  defineTestOther.beforeEach(t => {
    t.pass('file2 other beforeEach');
  });

  defineTestOther.afterEach(t => {
    t.pass('file2 other afterEach');
  });

  defineTestOther.before(t => {
    t.pass('file2 before');
  });

  defineTestOther.after(t => {
    t.pass('file2 after');
  });

  defineTestOther('file2 first', t => {
    t.is(1, 1);
  });

  defineTestOther('file2 second', t => {
    t.is(2, 2);
  });

  defineTestOther('file2 third', t => {
    t.is(3, 3);
  });
}, [
  { type: 'ok', test: 'before', message: 'before2' },
  { type: 'ok', test: 'before', message: 'file2 before2' },
  { type: 'ok', test: 'before', message: 'before' },
  { type: 'ok', test: 'before', message: 'file2 before' },
  { type: 'ok', test: 'first > beforeEach', message: 'beforeEach' },
  { type: 'ok', test: 'second > beforeEach', message: 'beforeEach' },
  { type: 'ok', test: 'third > beforeEach', message: 'beforeEach' },
  { type: 'ok', test: 'file2 first > beforeEach', message: 'file2 beforeEach' },
  { type: 'ok', test: 'file2 second > beforeEach', message: 'file2 beforeEach' },
  { type: 'ok', test: 'file2 third > beforeEach', message: 'file2 beforeEach' },
  { type: 'ok', test: 'first > beforeEach', message: 'other beforeEach' },
  { type: 'ok', test: 'second > beforeEach', message: 'other beforeEach' },
  { type: 'ok', test: 'third > beforeEach', message: 'other beforeEach' },
  { type: 'ok', test: 'file2 first > beforeEach', message: 'file2 other beforeEach' },
  { type: 'ok', test: 'file2 second > beforeEach', message: 'file2 other beforeEach' },
  { type: 'ok', test: 'file2 third > beforeEach', message: 'file2 other beforeEach' },
  { type: 'ok', test: 'first', message: 'is' },
  { type: 'ok', test: 'second', message: 'is' },
  { type: 'ok', test: 'third', message: 'is' },
  { type: 'ok', test: 'file2 first', message: 'is' },
  { type: 'ok', test: 'file2 second', message: 'is' },
  { type: 'ok', test: 'file2 third', message: 'is' },
  { type: 'ok', test: 'first > afterEach', message: 'afterEach' },
  { type: 'ok', test: 'second > afterEach', message: 'afterEach' },
  { type: 'ok', test: 'third > afterEach', message: 'afterEach' },
  { type: 'ok', test: 'file2 first > afterEach', message: 'file2 afterEach' },
  { type: 'ok', test: 'file2 second > afterEach', message: 'file2 afterEach' },
  { type: 'ok', test: 'file2 third > afterEach', message: 'file2 afterEach' },
  { type: 'ok', test: 'first > afterEach', message: 'other afterEach' },
  { type: 'ok', test: 'second > afterEach', message: 'other afterEach' },
  { type: 'ok', test: 'third > afterEach', message: 'other afterEach' },
  { type: 'ok', test: 'file2 first > afterEach', message: 'file2 other afterEach' },
  { type: 'ok', test: 'file2 second > afterEach', message: 'file2 other afterEach' },
  { type: 'ok', test: 'file2 third > afterEach', message: 'file2 other afterEach' },
  { type: 'ok', test: 'after', message: 'after2' },
  { type: 'ok', test: 'after', message: 'file2 after2' },
  { type: 'ok', test: 'after', message: 'after' },
  { type: 'ok', test: 'after', message: 'file2 after' },
  { type: 'done', count: 38, ok: 38, error: 0, skip: 0, only: 0 },
], true);

runnerTest('before/after cb hooks', runner => {
  const defineTest = runner();

  defineTest.before.cb(t => {
    t.pass('before2');
    setTimeout(t.end, 10);
  });

  defineTest.after.cb(t => {
    t.pass('after2');
    setTimeout(t.end, 10);
  });

  defineTest.beforeEach.cb(t => {
    t.pass('beforeEach');
    setTimeout(t.end, 10);
  });

  defineTest.afterEach.cb(t => {
    t.pass('afterEach');
    setTimeout(t.end, 10);
  });

  defineTest.beforeEach.cb(t => {
    t.pass('other beforeEach');
    setTimeout(t.end, 10);
  });

  defineTest.afterEach.cb(t => {
    t.pass('other afterEach');
    setTimeout(t.end, 10);
  });

  defineTest.before.cb(t => {
    t.pass('before');
    setTimeout(t.end, 10);
  });

  defineTest.after.cb(t => {
    t.pass('after');
    setTimeout(t.end, 10);
  });

  defineTest('first', t => {
    t.is(1, 1);
  });
}, [
  { type: 'ok', test: 'before', message: 'before2' },
  { type: 'ok', test: 'before', message: 'before' },
  { type: 'ok', test: 'first > beforeEach', message: 'beforeEach' },
  { type: 'ok', test: 'first > beforeEach', message: 'other beforeEach' },
  { type: 'ok', test: 'first', message: 'is' },
  { type: 'ok', test: 'first > afterEach', message: 'afterEach' },
  { type: 'ok', test: 'first > afterEach', message: 'other afterEach' },
  { type: 'ok', test: 'after', message: 'after2' },
  { type: 'ok', test: 'after', message: 'after' },
  { type: 'done', count: 9, ok: 9, error: 0, skip: 0, only: 0 },
], true);

runnerTest('before/after hooks names', runner => {
  const defineTest = runner();

  defineTest.before('start database', t => {
    t.pass('db running');
  });

  defineTest.after('stop database', t => {
    t.pass('db stopped');
  });

  defineTest.beforeEach('create database', t => {
    t.pass('db created');
  });

  defineTest.beforeEach('apply migrations', t => {
    t.pass('migrations ok');
  });

  defineTest.afterEach('rollback migrations', t => {
    t.pass('undo migrations ok');
  });

  defineTest.afterEach('drop database', t => {
    t.pass('db dropped');
  });

  defineTest('first', t => {
    t.is(1, 1);
  });

  defineTest('second', t => {
    t.is(2, 2);
  });

  defineTest('third', t => {
    t.is(3, 3);
  });
}, [
  { type: 'ok', test: 'start database', message: 'db running' },
  { type: 'ok', test: 'first > create database', message: 'db created' },
  { type: 'ok', test: 'second > create database', message: 'db created' },
  { type: 'ok', test: 'third > create database', message: 'db created' },
  { type: 'ok', test: 'first > apply migrations', message: 'migrations ok' },
  { type: 'ok', test: 'second > apply migrations', message: 'migrations ok' },
  { type: 'ok', test: 'third > apply migrations', message: 'migrations ok' },
  { type: 'ok', test: 'first', message: 'is' },
  { type: 'ok', test: 'second', message: 'is' },
  { type: 'ok', test: 'third', message: 'is' },
  { type: 'ok', test: 'first > rollback migrations', message: 'undo migrations ok' },
  { type: 'ok', test: 'second > rollback migrations', message: 'undo migrations ok' },
  { type: 'ok', test: 'third > rollback migrations', message: 'undo migrations ok' },
  { type: 'ok', test: 'first > drop database', message: 'db dropped' },
  { type: 'ok', test: 'second > drop database', message: 'db dropped' },
  { type: 'ok', test: 'third > drop database', message: 'db dropped' },
  { type: 'ok', test: 'stop database', message: 'db stopped' },
  { type: 'done', count: 17, ok: 17, error: 0, skip: 0, only: 0 },
], true);

runnerTest('before/after hooks skip', runner => {
  const defineTest = runner();

  defineTest.before.skip('start database', t => {
    t.pass('db running');
  });

  defineTest.after.skip('stop database', t => {
    t.pass('db stopped');
  });

  defineTest.beforeEach.skip('create database', t => {
    t.pass('db created');
  });

  defineTest.beforeEach.skip('apply migrations', t => {
    t.pass('migrations ok');
  });

  defineTest.afterEach.skip('rollback migrations', t => {
    t.pass('undo migrations ok');
  });

  defineTest.afterEach.skip('drop database', t => {
    t.pass('db dropped');
  });

  defineTest('first', t => {
    t.is(1, 1);
  });

  defineTest('second', t => {
    t.is(2, 2);
  });

  defineTest('third', t => {
    t.is(3, 3);
  });
}, [
  { type: 'skip', test: 'start database' },
  { type: 'skip', test: 'first > create database' },
  { type: 'skip', test: 'second > create database' },
  { type: 'skip', test: 'third > create database' },
  { type: 'skip', test: 'first > apply migrations' },
  { type: 'skip', test: 'second > apply migrations' },
  { type: 'skip', test: 'third > apply migrations' },
  { type: 'ok', test: 'first', message: 'is' },
  { type: 'ok', test: 'second', message: 'is' },
  { type: 'ok', test: 'third', message: 'is' },
  { type: 'skip', test: 'first > rollback migrations' },
  { type: 'skip', test: 'second > rollback migrations' },
  { type: 'skip', test: 'third > rollback migrations' },
  { type: 'skip', test: 'first > drop database' },
  { type: 'skip', test: 'second > drop database' },
  { type: 'skip', test: 'third > drop database' },
  { type: 'skip', test: 'stop database' },
  { type: 'done', count: 17, ok: 3, error: 0, skip: 14, only: 0 },
], true);

runnerTest('before/after test skip', runner => {
  const defineTest = runner();

  defineTest.before('start database', t => {
    t.pass('db running');
  });

  defineTest.after('stop database', t => {
    t.pass('db stopped');
  });

  defineTest.beforeEach('create database', t => {
    t.pass('db created');
  });

  defineTest.beforeEach('apply migrations', t => {
    t.pass('migrations ok');
  });

  defineTest.afterEach('rollback migrations', t => {
    t.pass('undo migrations ok');
  });

  defineTest.afterEach('drop database', t => {
    t.pass('db dropped');
  });

  defineTest.skip('first', t => {
    t.is(1, 1);
  });

  defineTest('second', t => {
    t.is(2, 2);
  });

  defineTest.skip('third', t => {
    t.is(3, 3);
  });
}, [
  { type: 'ok', test: 'start database', message: 'db running' },
  { type: 'skip', test: 'first > create database' },
  { type: 'ok', test: 'second > create database', message: 'db created' },
  { type: 'skip', test: 'third > create database' },
  { type: 'skip', test: 'first > apply migrations' },
  { type: 'ok', test: 'second > apply migrations', message: 'migrations ok' },
  { type: 'skip', test: 'third > apply migrations' },
  { type: 'skip', test: 'first' },
  { type: 'ok', test: 'second', message: 'is' },
  { type: 'skip', test: 'third' },
  { type: 'skip', test: 'first > rollback migrations' },
  { type: 'ok', test: 'second > rollback migrations', message: 'undo migrations ok' },
  { type: 'skip', test: 'third > rollback migrations' },
  { type: 'skip', test: 'first > drop database' },
  { type: 'ok', test: 'second > drop database', message: 'db dropped' },
  { type: 'skip', test: 'third > drop database' },
  { type: 'ok', test: 'stop database', message: 'db stopped' },
  { type: 'done', count: 17, ok: 7, error: 0, skip: 10, only: 0 },
], true);

runnerTest('before/after test cb skip', runner => {
  const defineTest = runner();

  defineTest.before.cb.skip('start database', t => {
    t.pass('db running');
  });

  defineTest.after.cb.skip('stop database', t => {
    t.pass('db stopped');
  });

  defineTest.beforeEach.cb.skip('create database', t => {
    t.pass('db created');
    t.end();
  });

  defineTest.beforeEach.cb.skip('apply migrations', t => {
    t.pass('migrations ok');
    t.end();
  });

  defineTest.afterEach.cb.skip('rollback migrations', t => {
    t.pass('undo migrations ok');
    t.end();
  });

  defineTest.afterEach.cb.skip('drop database', t => {
    t.pass('db dropped');
    t.end();
  });

  defineTest.cb.skip('first', t => {
    t.is(1, 1);
    t.end();
  });

  defineTest('second', t => {
    t.is(2, 2);
  });

  defineTest.cb.skip('third', t => {
    t.is(3, 3);
    t.end();
  });
}, [
  { type: 'skip', test: 'start database' },
  { type: 'skip', test: 'first > create database' },
  { type: 'skip', test: 'second > create database' },
  { type: 'skip', test: 'third > create database' },
  { type: 'skip', test: 'first > apply migrations' },
  { type: 'skip', test: 'second > apply migrations' },
  { type: 'skip', test: 'third > apply migrations' },
  { type: 'skip', test: 'first' },
  { type: 'ok', test: 'second', message: 'is' },
  { type: 'skip', test: 'third' },
  { type: 'skip', test: 'first > rollback migrations' },
  { type: 'skip', test: 'second > rollback migrations' },
  { type: 'skip', test: 'third > rollback migrations' },
  { type: 'skip', test: 'first > drop database' },
  { type: 'skip', test: 'second > drop database' },
  { type: 'skip', test: 'third > drop database' },
  { type: 'skip', test: 'stop database' },
  { type: 'done', count: 17, ok: 1, error: 0, skip: 16, only: 0 },
], true);

runnerTest('before/after hooks & only tests', runner => {
  const defineTest = runner();

  defineTest.before('start database', t => {
    t.pass('db running');
  });

  defineTest.after('stop database', t => {
    t.pass('db stopped');
  });

  defineTest.beforeEach('create database', t => {
    t.pass('db created');
  });

  defineTest.beforeEach('apply migrations', t => {
    t.pass('migrations ok');
  });

  defineTest.afterEach('rollback migrations', t => {
    t.pass('undo migrations ok');
  });

  defineTest.afterEach('drop database', t => {
    t.pass('db dropped');
  });

  defineTest.only('first', t => {
    t.is(1, 1);
  });

  defineTest.only('second', t => {
    t.is(2, 2);
  });

  defineTest('third', t => {
    t.is(3, 3);
  });
}, [
  { type: 'ok', test: 'start database', message: 'db running' },
  { type: 'ok', test: 'first > create database', message: 'db created' },
  { type: 'ok', test: 'second > create database', message: 'db created' },
  { type: 'ok', test: 'first > apply migrations', message: 'migrations ok' },
  { type: 'ok', test: 'second > apply migrations', message: 'migrations ok' },
  { type: 'ok', test: 'first', message: 'is' },
  { type: 'ok', test: 'second', message: 'is' },
  { type: 'ok', test: 'first > rollback migrations', message: 'undo migrations ok' },
  { type: 'ok', test: 'second > rollback migrations', message: 'undo migrations ok' },
  { type: 'ok', test: 'first > drop database', message: 'db dropped' },
  { type: 'ok', test: 'second > drop database', message: 'db dropped' },
  { type: 'ok', test: 'stop database', message: 'db stopped' },
  { type: 'done', count: 12, ok: 12, error: 0, skip: 0, only: 2 },
], false);

runnerTest('before/after hooks & cb only test', runner => {
  const defineTest = runner();

  defineTest.before('start database', t => {
    t.pass('db running');
  });

  defineTest.after('stop database', t => {
    t.pass('db stopped');
  });

  defineTest.beforeEach('create database', t => {
    t.pass('db created');
  });

  defineTest.beforeEach('apply migrations', t => {
    t.pass('migrations ok');
  });

  defineTest.afterEach('rollback migrations', t => {
    t.pass('undo migrations ok');
  });

  defineTest.afterEach('drop database', t => {
    t.pass('db dropped');
  });

  defineTest.cb.only('first', t => {
    t.is(1, 1);
    setTimeout(t.end, 100);
  });

  defineTest.only('second', t => {
    t.is(2, 2);
  });

  defineTest('third', t => {
    t.is(3, 3);
  });
}, [
  { type: 'ok', test: 'start database', message: 'db running' },
  { type: 'ok', test: 'first > create database', message: 'db created' },
  { type: 'ok', test: 'second > create database', message: 'db created' },
  { type: 'ok', test: 'first > apply migrations', message: 'migrations ok' },
  { type: 'ok', test: 'second > apply migrations', message: 'migrations ok' },
  { type: 'ok', test: 'first', message: 'is' },
  { type: 'ok', test: 'second', message: 'is' },
  { type: 'ok', test: 'second > rollback migrations', message: 'undo migrations ok' },
  { type: 'ok', test: 'second > drop database', message: 'db dropped' },
  { type: 'ok', test: 'first > rollback migrations', message: 'undo migrations ok' },
  { type: 'ok', test: 'first > drop database', message: 'db dropped' },
  { type: 'ok', test: 'stop database', message: 'db stopped' },
  { type: 'done', count: 12, ok: 12, error: 0, skip: 0, only: 2 },
], false);

runnerTest('before/after hooks serial', runner => {
  const defineTest = runner();

  defineTest.before('start database', t => {
    t.pass('db running');
  });

  defineTest.after('stop database', t => {
    t.pass('db stopped');
  });

  defineTest.beforeEach('create database', t => {
    t.pass('db created');
  });

  defineTest.beforeEach('apply migrations', t => {
    t.pass('migrations ok');
  });

  defineTest.afterEach('rollback migrations', t => {
    t.pass('undo migrations ok');
  });

  defineTest.afterEach('drop database', t => {
    t.pass('db dropped');
  });

  defineTest('first', t => {
    t.is(1, 1);
  });

  defineTest('second', t => {
    t.is(2, 2);
  });

  defineTest('third', t => {
    t.is(3, 3);
  });
}, [
  { type: 'ok', test: 'start database', message: 'db running' },
  { type: 'ok', test: 'first > create database', message: 'db created' },
  { type: 'ok', test: 'second > create database', message: 'db created' },
  { type: 'ok', test: 'third > create database', message: 'db created' },
  { type: 'ok', test: 'first > apply migrations', message: 'migrations ok' },
  { type: 'ok', test: 'second > apply migrations', message: 'migrations ok' },
  { type: 'ok', test: 'third > apply migrations', message: 'migrations ok' },
  { type: 'ok', test: 'first', message: 'is' },
  { type: 'ok', test: 'second', message: 'is' },
  { type: 'ok', test: 'third', message: 'is' },
  { type: 'ok', test: 'first > rollback migrations', message: 'undo migrations ok' },
  { type: 'ok', test: 'second > rollback migrations', message: 'undo migrations ok' },
  { type: 'ok', test: 'third > rollback migrations', message: 'undo migrations ok' },
  { type: 'ok', test: 'first > drop database', message: 'db dropped' },
  { type: 'ok', test: 'second > drop database', message: 'db dropped' },
  { type: 'ok', test: 'third > drop database', message: 'db dropped' },
  { type: 'ok', test: 'stop database', message: 'db stopped' },
  { type: 'done', count: 17, ok: 17, error: 0, skip: 0, only: 0 },
], true);
