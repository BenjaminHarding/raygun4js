import { Core } from '../core';
import { UserConfig } from '../core/config';
import { UserInfo } from '../core/user';

import { CR, CustomData } from '../cr';
import { Public } from './public';

export class RaygunCrashReporting implements Public<RaygunCrashReporting> {
    private core: Core;

    private cr: CR;

    constructor() {
        this.core = new Core();
    }

    boot(userConfig: UserConfig) {
        this.core.init(userConfig);
        this.cr = new CR(this.core);

        if(this.core.config.attachHandlers) {
            this.attachHandlers();
        }

        return this;
    }

    setUser(user: UserInfo) {
        this.core.user.setUser(user);
        return this;
    }

    withTags(tags: string[]) {
        this.core.tags.setTags(tags);
        return this;
    }

    send(error: Error, customData: CustomData={}, tags: string[]=[]) {
        this.cr.send(error, customData, tags);
    }

    attachHandlers() {
        this.cr.attach();
        return this;
    }

    detachHandlers() {
        this.cr.detach();
        return this;
    }

    static noConflict() {
        return new RaygunCrashReporting();
    }
}

(window as any).Raygun = new RaygunCrashReporting();