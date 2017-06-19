export type SlackCommand = {
    token: string,
    team_id: string
    team_domain: string
    channel_id: string
    channel_name: string
    user_id: string
    user_name: string
    command: string
    text: string
    response_url: string
}

//
// For example:
//

// {
//     "token": "xxxx",
//     "team_id": "XXX",
//     "team_domain": "your-slack-name",
//     "channel_id": "C5417KHQ8",
//     "channel_name": "deployments",
//     "user_id": "yout-user-id",
//     "user_name": "santa",
//     "command": "/ecs",
//     "text": "ci",
//     "response_url": "https://hooks.slack.com/commands/T4ZFBAUCX/199112504165/kHXtZlXXFWPW297QLOQPrCfE"
// }