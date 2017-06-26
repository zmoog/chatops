import {Context} from "aws-lambda";
// import URLVerificationProcessor from "../../scripts/events/URLVerificationProcessor";


console.log('starting function');


// let urlVerificationProcessor = new URLVerificationProcessor();

export function handle(event: any, context: Context, cb) {

  console.log('processing event: %j', event);

  // let response = urlVerificationProcessor.execute(event);
  let response = {hello: 'world'};

  // console.log('returning response: %j', response);

  cb(null, response);
}
