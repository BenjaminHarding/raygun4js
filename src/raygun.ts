import { Config, UserConfig, assignDefaultConfig } from './core/config';
import { UserInfo, User } from './core/user';
import { Tags } from './core/tags';

export class Raygun {
    private config: Config;

    private user: User;

    private tags: Tags;

    boot(userConfig: UserConfig): Raygun {
        this.config = assignDefaultConfig(userConfig);

        this.user = new User(this.config);

        if(this.config.crashReporting) {
            // Boot CR
        }
        if(this.config.realUserMonitoring) {
            // BOOT RUM
        }

        return this;
    }

    setUser(user: UserInfo): Raygun {
        this.user.setUser(user);
        return this;
    }

    static noConflict() {
        return new Raygun();
    }
}