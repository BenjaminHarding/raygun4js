import { Config } from '../../core/config';
import { Storage } from './storage';
import { timestamp } from '../time';

type LocalStorageItem = {
    expiryTimestamp: number | null,  
    data: any
};

export class LocalStorage implements Storage {
    config: Config;

    updateConfig(config: Config) {
        this.config = config;
    }

    set(name: string, value: any, hours?: number) {
        const expiryTimestamp = !hours ? null : timestamp(hours);

        try {
            const item: LocalStorageItem = { expiryTimestamp, data: value };
            const itemStringified = JSON.stringify(item);
            localStorage.setItem(name, itemStringified);
        }
        catch(e) {
            // TODO
        }
    }

    read(name: string) {
        let item: LocalStorageItem | null = null;

        try {
            const val = localStorage.getItem(name);
            if(!!val) {
                item = JSON.parse(val);
            }
        } catch(e) {
            // TODO
        }

        // Remove localstorage items which have expired
        if(!item || item && item.expiryTimestamp && timestamp(0) > item.expiryTimestamp) {
            localStorage.removeItem(name);
            return null;
        }

        return item;
    }

    clear(name: string) {
        localStorage.removeItem(name);
    }
}
