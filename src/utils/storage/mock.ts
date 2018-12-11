import { Storage } from './storage';
import { Config } from '../../core/config';

export class MockStorage implements Storage {
    private config: Config;

    public values: { [key:string]: any } = {};

    public setMock: jest.Mock;
    public readMock: jest.Mock;
    public clearMock: jest.Mock;    

    constructor() {
        this.setMock = jest.fn((name: string, value: any, hours?:number) => {
            this.values[name] = value;
        });
        this.readMock = jest.fn((name: string, value: any, hours?:number) => {
            return this.values[name];
        });
        this.clearMock = jest.fn((name: string, value: any, hours?:number) => {
            this.values[name] = null;
        });
    }

    updateConfig(config: Config) {
        this.config = config;
    }

    set(name: string, value: any, hours?: number) {
        return this.setMock(name, value, hours);
    }

    read(name: string) {
        return this.readMock(name);
    }

    clear(name: string) {
        return this.clearMock(name);
    }
}