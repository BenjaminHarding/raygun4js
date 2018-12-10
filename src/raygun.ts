import { Config, UserConfig, assignDefaultConfig } from './core/config';
import { User, UserPayload, convertToPayload } from './core/user';

export class Raygun {
    private config: Config;

    private user: UserPayload;

    boot(userConfig: UserConfig): Raygun {
        this.config = assignDefaultConfig(userConfig);
    
        if(this.config.crashReporting) {
            // Boot CR
        }
        if(this.config.realUserMonitoring) {
            // BOOT RUM
        }

        return this;
    }

    setUser(user: User) {
        this.user = convertToPayload(user);
        return this;
    }

    static noConflict() {
        return new Raygun();
    }
}