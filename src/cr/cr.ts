import { Core } from '../core/index';
import { Transport, sendXHRRequest } from '../utils/transport';

import { CustomData } from './payload';
import { ProcessedException, ErrorQueue } from './errorQueue';
import { discardError } from './discardError';
import { createPayload } from './createPayload';
import { TraceKit, TraceKitException } from './tracekit';

export class CR {

    private core: Core;

    private errorQueue: ErrorQueue;

    private sending: boolean = false;

    private transport: Transport;

    constructor(core: Core, transport: Transport = sendXHRRequest) {
        this.core = core;
        this.transport = transport;

        this.errorQueue = new ErrorQueue(this.core.config);
        this.processException = this.processException.bind(this);
    }

    public attach() {        
        TraceKit.report.subscribe(this.processException); // Attach global onerror handler

        if(this.core.config.asyncErrorHandler) {
            TraceKit.extendToAsynchronousCallbacks();
        }
    }

    public detach() {
        TraceKit.report.unsubscribe(this.processException);
    }

    public send(ex: Error, customData: CustomData, tags: string[]) {
        if(!this.core.config.crashReporting) {
            return;
        }

        // Process stack
        const exception = TraceKit.computeStackTrace(ex);
        this.processException(exception, customData, tags);
    }

    private processException(ex: TraceKitException, customData: CustomData={}, tags: string[]=[]) {
        if(discardError(this.core, ex)) {
            return;
        }

        const payload = createPayload(this.core, ex);
    }   

    private get url():string {
        return `${this.core.config.apiUrl}/entries?apikey=${encodeURIComponent(this.core.config.apiKey)}`;
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