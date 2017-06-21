var AWS = require('aws-sdk');

AWS.config.update({region: 'eu-west-1'});

var ecs = new AWS.ECS();

const project = 'project';
const task = 'task';
const environment = 'dev';
const cluster = `${project}-${environment}-main-cluster`;


var params = {
    cluster: cluster,
    serviceName: `${project}-${task}-${environment}`
};

ecs.listTasks(params, (err, result) => {

    console.log(err, result);

    if (!err) {

        result.taskArns.forEach((taskArn) => {

            ecs.stopTask({cluster: cluster, task: taskArn}, () => {

                console.log(`taskArn ${taskArn}: ${err}`);
            });
        });
    }
});