import YAML from 'yamljs';
import objectInspect from 'object-inspect';

function inspect(obj) {
  if (typeof obj === 'string') {
    return `(string) ${obj}`;
  }

  return `(${typeof obj}) ${objectInspect(obj)}`;
}

export default function ({ log }) {
  let assertionCount = 0;
  log('TAP version 13');

  return obj => {
    if (obj.type === 'ok') {
      log(`ok ${++assertionCount} ${obj.test} > ${obj.message}`);
      return;
    }

    if (obj.type === 'error') {
      log(`not ok ${++assertionCount} ${obj.test} > ${obj.message}`);
      log('  ---');

      const yamlData = {};

      if ({}.hasOwnProperty.call(obj, 'op')) {
        yamlData.op = obj.op;
      }

      if ({}.hasOwnProperty.call(obj, 'actual')) {
        yamlData.actual = inspect(obj.actual);
      }

      if ({}.hasOwnProperty.call(obj, 'expected')) {
        yamlData.expected = inspect(obj.expected);
      }

      if ({}.hasOwnProperty.call(obj, 'stack') && obj.stack.length > 0) {
        yamlData.stack = obj.stack;
      }

      const yaml = YAML.stringify(yamlData, 2, 2)
        .replace(/^actual:\s/m, 'actual:   ')
        .replace(/^op:\s/m, 'op:       ')
        .replace(/^at:\s/m, 'at:       ')
        .split('\n')
        .slice(0, -1)
        .map(v => `    ${v}`)
        .join('\n');

      log(yaml);
      log('  ...');
      return;
    }

    if (obj.type === 'done') {
      log('');
      log(`1..${assertionCount}`);

      if (obj.error > 0) {
        if (obj.skip > 0) {
          log(`# passing ${obj.ok}/${obj.count} (${obj.error} failing, ${obj.skip} skipping)`);
        } else {
          log(`# passing ${obj.ok}/${obj.count} (${obj.error} failing)`);
        }
        log('# fail');
      } else {
        if (obj.skip > 0) {
          log(`# passing ${obj.ok}/${obj.count} (${obj.skip} skipping)`);
        } else {
          log(`# passing ${obj.ok}/${obj.count}`);
        }

        if (obj.only) {
          log('# ok (but not running all the tests)');
        } else {
          log('# ok');
        }
      }
      return;
    }
  };
}
