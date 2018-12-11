import { Storage, CookieStorage } from '../utils/storage/index';
import { Config } from './config';

export type UserInfo = {
    identifier: string;
    isAnonymous: boolean;
    email?: string;
    fullName?: string;
    firstName?: string;
    uuid?: string;
};

export type UserPayload = {
    Identifier: string;
    IsAnonymous: boolean;
    Email?: string;
    FullName?: string;
    FirstName?: string;
    UUID?: string;
};

export function convertToPayload(user: UserInfo): UserPayload {
    let payload: UserPayload = {
        Identifier: user.identifier,
        IsAnonymous: user.isAnonymous,
    };

    if(!!user.email) {
       payload.Email = user.email;
    }

    if(!!user.email) {
       payload.FullName = user.fullName;
    }

    if(!!user.email) {
       payload.FirstName = user.firstName;
    }

    if(!!user.email) {
       payload.UUID = user.uuid;
    }

    return payload;
}

const USER_KEY = "raygun4js-userid";

const USER_COOKIE_TIMEOUT = 24 * 31; // One month cookie timeout

export class User {
    private storage: Storage;

    private config: Config;

    private user: UserPayload;

    constructor(config: Config, storage: Storage=new CookieStorage()) {
        this.config = config;
        this.storage = storage;
        this.storage.updateConfig(this.config);

        this.user = this.storage.read(USER_KEY);
    }

    setUser(user: UserInfo) {
        this.user = convertToPayload(user);
        this.storage.set(USER_KEY, this.user.Identifier, USER_COOKIE_TIMEOUT);
    }

    getUser(): UserPayload {
        return { ...this.user };
    }
}

