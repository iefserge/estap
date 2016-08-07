import runnerTest from '../helpers/runner-test';
import { createLock } from '../../lib';

runnerTest('tests serial', runner => {
  const lock = createLock();
  const defineTest = runner();

  defineTest.before('start database', t => {
    t.pass('db running');
  });

  defineTest.after('stop database', t => {
    t.pass('db stopped');
  });

  defineTest.beforeEach('create database', t => lock.acquire()
    .then(() => t.pass('db created')));

  defineTest.beforeEach('apply migrations', t => {
    t.pass('migrations ok');
  });

  defineTest.afterEach('rollback migrations', t => {
    t.pass('undo migrations ok');
  });

  defineTest.afterEach('drop database', t => Promise.resolve()
    .then(() => t.pass('db dropped'))
    .then(lock.release));

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
  { type: 'ok', test: 'first > apply migrations', message: 'migrations ok' },
  { type: 'ok', test: 'first', message: 'is' },
  { type: 'ok', test: 'first > rollback migrations', message: 'undo migrations ok' },
  { type: 'ok', test: 'first > drop database', message: 'db dropped' },
  { type: 'ok', test: 'second > create database', message: 'db created' },
  { type: 'ok', test: 'second > apply migrations', message: 'migrations ok' },
  { type: 'ok', test: 'second', message: 'is' },
  { type: 'ok', test: 'second > rollback migrations', message: 'undo migrations ok' },
  { type: 'ok', test: 'second > drop database', message: 'db dropped' },
  { type: 'ok', test: 'third > create database', message: 'db created' },
  { type: 'ok', test: 'third > apply migrations', message: 'migrations ok' },
  { type: 'ok', test: 'third', message: 'is' },
  { type: 'ok', test: 'third > rollback migrations', message: 'undo migrations ok' },
  { type: 'ok', test: 'third > drop database', message: 'db dropped' },
  { type: 'ok', test: 'stop database', message: 'db stopped' },
  { type: 'done', count: 17, ok: 17, error: 0, skip: 0, only: 0 },
], true);
