import { UserConfig, assignDefaultConfig } from './core/config';

export function boot(userConfig: UserConfig) {
    const config = assignDefaultConfig(userConfig);

    if(config.crashReporting) {
        // Boot CR
    }
    if(config.realUserMonitoring) {
        // BOOT RUM
    }
}