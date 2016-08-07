// import figures from 'figures';
// import chalk from 'chalk';
// import objectInspect from 'object-inspect';
//
// export default function({ log }) {
//   return obj => {
//     if (obj.type === 'ok') {
//       log(chalk.dim('+ ' + obj.test + ' > ' + obj.message));
//       return;
//     }
//
//     if (obj.type === 'error') {
//       log(chalk.red([
//         `--- ${obj.test} > ${obj.message}`,
//         `Op:       ${obj.op}`,
//         `Actual:   ${objectInspect(obj.actual)}`,
//         `Expected: ${objectInspect(obj.expected)}`,
//         `Stack:`,
//         ...obj.stack.map(x => `  ${x}`),
//         '---'
//       ].join('\n')));
//       return;
//     }
//
//     if (obj.type === 'done') {
//       if (obj.error > 0) {
//         log(chalk.red.bold(`= passing ${obj.ok}/${obj.count} (${obj.error} failing)`));
//       } else {
//         log(chalk.green.bold(`= passing ${obj.ok}/${obj.count} (ok)`));
//       }
//     }
//   }
// }
