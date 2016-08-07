export default function collectLogs(done) {
  const logs = [];
  let finished = false;

  return obj => {
    if (finished) {
      throw new Error('unexpected log output');
    }

    if (obj.type === 'error') {
      let skip = false;
      obj.stack = obj.stack.map(v => {
        if (skip) {
          return null;
        }

        if (v.indexOf('timers.js') >= 0) {
          return null;
        }

        if (v.indexOf('bluebird') >= 0) {
          return null;
        }

        if (v.indexOf('http://localhost') >= 0) {
          return 'at <test>';
        }

        if (v.indexOf('From previous event:') >= 0) {
          skip = true;
          return null;
        }

        return v.replace(/at\s(.+)\/test\/unit\/[a-z-]+\.js:\d+:\d+\)?/, 'at <test>');
      }).filter(Boolean);
    }

    logs.push(obj);
    if (obj.type === 'done') {
      finished = true;
      done(logs);
      return;
    }
  };
}
