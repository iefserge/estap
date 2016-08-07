// bluebird doesn't work without setImmediate in node
import 'bluebird';

global.setImmediate = void 0;
