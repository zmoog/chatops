
//
// Events API
//

export class Event {
    token: string
    type: string
    challenge?: string
}

export class CallbackEvent extends Event {
    team_id: string
    api_app_id: string
    event: {
        type: string
        user: string,
        text: string,
        ts: string,
        channel: string
        event_ts: string
    }
    authed_users: string[]
    event_id: string
    event_time: number
}

export type URLVerificationResponse = {
    challenge: string
}

export type EventResponse = {
    challenge?: string
    message?: string
}

//
// Commands
//

export type SlashCommand = {
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


export type SlashCommandResponse = {
    text: string
};


export type SlackConfig = {
    token: string
};


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