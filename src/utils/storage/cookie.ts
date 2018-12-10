import { Config } from '../../core/config';
import { Storage } from './storage';

export class CookieStorage implements Storage {
    config: Config;

    updateConfig(config: Config) {
        this.config = config;
    }

    set(name: string, value: any, hours?: number) {
        let expires: string;

        if (!!hours) {
            const date = new Date();
            date.setTime(date.getTime() + hours * 60 * 60 * 1000);
            expires = `; expires=${date.toUTCString()}`;
        } else {
            expires = '';
        }

        const secure = this.config.secureCookie ? '; secure' : '';
        document.cookie = `${name}=${value}${expires}; path=/${secure}`;
    }

    read(name: string) {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }

        return null;
    }

    clear(name: string) {
        this.set(name, '', -1);
    }
}
