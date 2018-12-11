import { Config, UserConfig, assignDefaultConfig } from '../core/config';
import { UserInfo, User } from '../core/user';
import { Tags } from '../core/tags';

import { CR } from '../cr/cr';
import { Public } from './public';

export class Raygun implements Public<Raygun> {
    private config: Config;

    private user: User;

    private tags: Tags;

    private cr: CR;

    boot(userConfig: UserConfig) {
        this.config = assignDefaultConfig(userConfig);

        this.user = new User(this.config);
        this.tags = new Tags();

        this.cr = new CR(this.config, this.user, this.tags);
        
        // BOOT RUM

        return this;
    }

    setUser(user: UserInfo) {
        this.user.setUser(user);
        return this;
    }

    withTags(tags: string[]) {
        this.tags.setTags(tags);
        return this;
    }

    static noConflict() {
        return new Raygun();
    }
}