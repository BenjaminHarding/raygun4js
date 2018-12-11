import { Config, User, Tags } from '../core/index';
import { CustomData } from './payload';
import { ProcessedException, ErrorQueue } from './errorQueue';

export class CR {

    private config: Config;

    private user: User;

    private tags: Tags;

    private errorQueue: ErrorQueue;

    private sending: boolean = false;

    constructor(config: Config, user: User, tags: Tags) {
        this.config = config;
        this.user = user;
        this.tags = tags;

        this.errorQueue = new ErrorQueue(this.config);
    }

    public send(ex: Error, customData: CustomData, tags: string[]) {
        if(!this.config.crashReporting) {
            return;
        }

        // Process stack
        // Process 'onBeforeSend'
        // Add onto queue
    }

    private postNextError() {
        if(this.sending) {
            return;
        }

        this.sending = true;
        const error = this.errorQueue.removeAndGetFirstItem();
        
        if(!error) {
            this.sending = false;
            return;
        }

        const success = false;
        if(success) {
            this.sending = false;
            this.postNextError();
        } else {
            this.errorQueue.add(error, true);
            this.sending = false;
        }
    }

}