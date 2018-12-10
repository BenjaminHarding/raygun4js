import { Config } from '../../core/config';

export interface Storage {
    updateConfig(config: Config): void;
    set: (name: string, value: any, hours?: number) => void;
    read: (name: string) => any;
    clear: (name: string) => void;
};