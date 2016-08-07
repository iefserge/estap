import { default as createSuite, createLock } from '../lib';

const test = createSuite();
const lock = createLock();

test.beforeEach('setup database', t => lock.acquire()
  .then(() => t.pass('resetting database...')));

test.afterEach('release database', lock.release);

test('use db 1', t => {
  t.pass('use database 1');
});

test('use db 2', t => {
  t.pass('use database 2');
});
