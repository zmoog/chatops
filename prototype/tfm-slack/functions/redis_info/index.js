var AWS = require('aws-sdk');
var elastiCache = new AWS.ElastiCache();

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
    ReplicationGroupId: `tfm-${environment}-rg`
  };

  console.log(`params: ${params}`);

  elastiCache.describeReplicationGroups(params, function(err, data) { 

    if (err) {
      console.log(err); 
      cb(null, { hello: 'world', error: true });
      return;
    }

    console.log(JSON.stringify(data)); 

    cb(null, {
      response_type: "in_channel",
      attachments: [{
        title: 'Redis Replication Group',
        text: `Replication Group *${data.ReplicationGroups[0].ReplicationGroupId}*.`,
        fields: [
          {
            title: 'Description',
            value: data.ReplicationGroups[0].Description,
            short: false
          },
          {
            title: 'Status',
            value: data.ReplicationGroups[0].Status,
            short: false
          },
          {
            title: 'Configuration Endpoint',
            value: `${data.ReplicationGroups[0].ConfigurationEndpoint.Address}:${data.ReplicationGroups[0].ConfigurationEndpoint.Port}`,
            short: false
          },
          
        ],        
      }]
    });

  });

}
