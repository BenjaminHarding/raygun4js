import { Config, UserConfig, assignDefaultConfig } from './config';
import { User } from './user';
import { Tags } from './tags';

export class Core {
    public config: Config;

    public user: User;

    public tags: Tags;

    init(userConfig: UserConfig) {
        this.config = assignDefaultConfig(userConfig);
        this.user = new User(this.config);
        this.tags = new Tags();
    }
}