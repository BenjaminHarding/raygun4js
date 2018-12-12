import { Core } from '../core/index';
import { Transport, sendXHRRequest } from '../utils/transport/index';

import { CustomData } from './models';
import { ProcessedException, ErrorQueue } from './errorQueue';
import { discardError } from './discardError';
import { createPayload } from './payload';
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
        this.sendWindowException = this.sendWindowException.bind(this);
        this.sendPromiseException = this.sendPromiseException.bind(this);
    }

    public attach() {        
        TraceKit.report.subscribe(this.sendWindowException); // Attach global onerror handler

        if(this.core.config.asyncErrorHandler) {
            TraceKit.extendToAsynchronousCallbacks();
        }
        if(this.core.config.captureUnhandledRejections) {
            window.addEventListener('unhandledrejection', this.sendPromiseException);
        }
    }

    public detach() {
        TraceKit.report.unsubscribe(this.sendWindowException);
        window.removeEventListener('unhandledrejection', this.sendPromiseException);
    }

    public send(ex: Error, customData: CustomData, tags: string[]) {
        if(!this.core.config.crashReporting) {
            return;
        }
        this.sendInternal(ex,customData,tags);
    }

    private sendWindowException(ex: TraceKitException) {
        this.processException(ex, {}, ['UnhandledException']);
    }

    private sendPromiseException(event: PromiseRejectionEvent) {
        let error = event.reason;

        if(!error && (event as any).detail && (event as any).detail.reason) {
            error = (event as any).detail.reason;
        }

        if(!(error instanceof Error) && event.reason && event.reason.error) {
            error = event.reason.error;
        }

        if(!error) {
            error = event;
        }

        this.sendInternal(error, {}, ['UnhandledPromiseRejection']);
    }

    private sendInternal(ex: Error, customData: CustomData, tags: string[]) {
        const exception = TraceKit.computeStackTrace(ex);
        this.processException(exception, customData, tags);
    }

    private processException(ex: TraceKitException, customData: CustomData={}, tags: string[]=[]) {
        if(discardError(this.core, ex)) {
            return;
        }

        const payload = createPayload(this.core, ex, customData, tags);
        this.errorQueue.add({
            url: this.url,
            apiKey: this.core.config.apiKey,
            payload,
        } as ProcessedException);
        this.postNextError();
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
            url: error.url,
            data: error.payload,
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