import { Config, UserConfig, assignDefaultConfig } from '../core/config';
import { UserInfo, User } from '../core/user';
import { Tags } from '../core/tags';

import { Boot } from './boot';

export class Raygun implements Boot<Raygun> {
    private config: Config;

    private user: User;

    private tags: Tags;

    boot(userConfig: UserConfig) {
        this.config = assignDefaultConfig(userConfig);

        this.user = new User(this.config);
        this.tags = new Tags();

        if(this.config.crashReporting) {
            // Boot CR
        }
        if(this.config.realUserMonitoring) {
            // BOOT RUM
        }

        
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