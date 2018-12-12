import { Core } from '../core/index';
import { UserConfig } from '../core/config';
import { UserInfo } from '../core/user';

import { CR, CustomData } from '../cr/index';
import { Public } from './public';

export class Raygun implements Public<Raygun> {
    private core: Core;

    private cr: CR;

    constructor() {
        this.core = new Core();
    }

    boot(userConfig: UserConfig) {
        this.core.init(userConfig);

        this.cr = new CR(this.core);
        
        // BOOT RUM

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
        return this;
    }

    static noConflict() {
        return new Raygun();
    }
}

(window as any).Raygun = new Raygun();