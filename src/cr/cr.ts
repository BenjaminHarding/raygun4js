import { Config, User, Tags } from '../core/index';
import { CustomData } from './payload';
import { ProcessedException, ErrorQueue } from './errorQueue';
import { Transport, sendXHRRequest } from '../utils/transport/index';

export class CR {

    private config: Config;

    private user: User;

    private tags: Tags;

    private errorQueue: ErrorQueue;

    private sending: boolean = false;

    private transport: Transport;

    constructor(config: Config, user: User, tags: Tags, transport: Transport = sendXHRRequest) {
        this.config = config;
        this.user = user;
        this.tags = tags;
        this.transport = transport;

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

    private get url():string {
        return `${this.config.apiUrl}/entries?apikey=${encodeURIComponent(this.config.apiKey)}`;
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

        this.transport({
            method: 'post',
            url: this.url,
            data: error,
            onSuccess: () => {
                this.sending = false;
                this.postNextError();
            },
            onFail: (retry?: boolean) => {
                if(retry) {
                    this.errorQueue.add(error, true);
                }
                this.sending = false;
            }
        });
    }

}