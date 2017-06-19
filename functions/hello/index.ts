import {Context} from "aws-lambda";


console.log('starting function');

export function handle(event: any, context: Context, cb) {
  console.log('processing event: %j', event);
  cb(null, { hello: 'world' });
}
