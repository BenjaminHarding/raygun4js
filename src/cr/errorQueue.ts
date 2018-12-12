import { Config } from '../core';
import { Storage, LocalStorage } from '../utils/storage';
import { Payload } from './models';

export type ProcessedException = {
    url: string;
    apiKey: string;
    payload: Payload;
};

const ERROR_STORAGE_KEY = "raygun4js-errors";

export class ErrorQueue {
    private config: Config;
    private storage: Storage<ProcessedException[]>;

    private errorQueue: ProcessedException[] = [];
    
    constructor(config: Config, storage: Storage<ProcessedException[]>=new LocalStorage()) {
        this.storage = storage;
        this.config = config;

        this.setQueueFromStorage();
    }

    private setQueueFromStorage() {
        if(!this.config.saveOfflineErrors) {
            return;
        }

        const errors = this.storage.read(ERROR_STORAGE_KEY);

        if(errors){
            this.errorQueue = errors.filter(e => e.apiKey === this.config.apiKey);
        }
    }

    private saveQueueToStorage() {
        if(!this.config.saveOfflineErrors) {
            return;
        }

        this.storage.set(ERROR_STORAGE_KEY, this.errorQueue);
    }

    public add(error: ProcessedException, addToStart?: boolean) {
        if(addToStart) {
            this.errorQueue.unshift(error);
        } else {
            this.errorQueue.push(error);
        }
        this.saveQueueToStorage();
    }

    public length(): number {
        return this.errorQueue.length;
    }

    public removeAndGetFirstItem(): ProcessedException | null {
        const error = this.errorQueue.shift();
        if(error) {
            this.saveQueueToStorage();
            return error;
        }
        return null;
    }
}