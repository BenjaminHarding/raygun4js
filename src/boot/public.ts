import { UserConfig, UserInfo } from '../core';

export interface Public<T> {
    boot(userConfig: UserConfig): T;
    setUser(user: UserInfo): T;
    withTags(tags: string[]): T;
}