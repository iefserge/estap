import objectInspect from 'object-inspect';

function filterImpl(stack) {
  const lines = String(stack).split('\n');
  const filtered = [];
  for (let i = 0; i < lines.length; ++i) {
    if (lines[i].indexOf('ESTAP_TEST__') >= 0) {
      break;
    }

    if (lines[i].indexOf('ESTAP_ASSERT__') >= 0) {
      i++;
      continue;
    }

    filtered.push(lines[i]);
  }

  return filtered;
}

export function filterError(err) {
  if (err instanceof Error) {
    return filterImpl(err.stack).join('\n');
  }

  return `Uncaught exception: ${objectInspect(err)}`;
}

export function extractErrorStack(err) {
  if (err instanceof Error) {
    return filterImpl(err.stack).map(s => s.trim()).slice(1);
  }

  return [];
}
