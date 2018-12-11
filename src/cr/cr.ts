import { Config, User, Tags } from '../core/index';
import { CustomData } from './payload';
import { ProcessedExeception } from './errorQueue';

export class CR {

    private config: Config;

    private user: User;

    private tags: Tags;

    constructor(config: Config, user: User, tags: Tags) {
        this.config = config;
        this.user = user;
        this.tags = tags;
    }

    public send(ex: Error, customData: CustomData, tags: string[]) {
        if(!this.config.crashReporting) {
            return;
        }

        // Process stack
        // Process 'onBeforeSend'
        // Add onto queue
    }

}