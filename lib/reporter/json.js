export default function ({ log }) {
  return obj => {
    if (obj.type === 'error') {
      log(JSON.stringify(obj, null, 2)
        .replace(/"(actual)":/gm, '"$1"  :')
        .replace(/"(op)":/gm, '"$1"      :')
        .replace(/"(type)":/gm, '"$1"    :')
        .replace(/"(message)":/gm, '"$1" :')
      );
      return;
    }

    log(JSON.stringify(obj));
  };
}
