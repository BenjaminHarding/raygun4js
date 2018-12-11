import { Config } from '../core/index';
import { Storage, LocalStorage } from '../utils/storage/index';
import { Payload } from './payload';

export type ProcessedExeception = {
    url: string;
    payload: Payload;
};

export class ErrorQueue {
    private config: Config;
    private storage: Storage;
    
    constructor(config: Config, storage: Storage=new LocalStorage()) {

    }
}