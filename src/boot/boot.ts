import { UserConfig } from '../core/config';
import { UserInfo } from '../core/user';

export interface Boot<T> {
    boot(userConfig: UserConfig): T;
    setUser(user: UserInfo): T;
    withTags(tags: string[]): T;
}