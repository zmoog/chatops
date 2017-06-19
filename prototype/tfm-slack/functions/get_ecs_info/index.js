var AWS = require('aws-sdk');
var ec2 = new AWS.EC2();
var _ = require('lodash');

console.log('starting function')

const supportedEnvironments = ['dev', 'ci', 'alpha']


exports.handle = function(e, ctx, cb) {

  console.log('processing event: %j', e)

  const environment = e.text;
  const verificationToken = e.token;

  if (process.env.VERIFICATION_TOKEN !== verificationToken) {
    cb(null, { 
      text: `The specified token ${verificationToken} is not recognized.  Check your configuration.`,
      response_type: "in_channel",
    });
    return;
  }
  
  if (!supportedEnvironments.includes(environment)) {
    cb(null, { 
      text: `You need to specify one of the supported environments: ${supportedEnvironments}.`,
      response_type: "in_channel",
    });
    return;
  }

  var params = {
    Filters: [
      {
        Name: 'tag-value', 
        Values: [`tfm-${environment}-ecs-cluster-node-1`]
      }
    ]
  };

  console.log(`params: ${params}`);

  ec2.describeInstances(params, function(err, data) { 

    if (err) {

      console.log(err); 
      cb(null, { hello: 'world', error: true });
      return;
    }

    console.log(JSON.stringify(data)); 

    const attachments = _.map(data.Reservations, (reservation) => {
      return {
          title: `ECS Cluster Instance`,
          // text: `The private IP address is *${reservation.Instances[0].PrivateIpAddress}*.`,
          fields: [
            {
              title: 'State',
              value: `${reservation.Instances[0].State.Name}`,
              short: false
            },
            {
              title: 'Instance Id',
              value: `${reservation.Instances[0].InstanceId}`,
              short: false
            },
            {
              title: 'Private Ip Address',
              value: reservation.Instances[0].PrivateIpAddress,
              short: false
            },
            {
              title: 'Launch Time',
              value: reservation.Instances[0].LaunchTime,
              short: false
            },
            {
              title: 'Instance Type',
              value: reservation.Instances[0].InstanceType,
              short: false
            }
          ],        
        }
    });

    const message = {
      response_type: "in_channel",
      attachments: attachments
    };

    console.log(`message: ${JSON.stringify(message)}`);

    cb(null, message);

  });

}
