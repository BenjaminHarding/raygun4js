import { Config } from '../../core/config';

export interface Storage<D> {
    updateConfig(config: Config): void;
    set: (name: string, value: D, hours?: number) => void;
    read: (name: string) => D|null;
    clear: (name: string) => void;
};