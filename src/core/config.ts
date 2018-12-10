type RequiredConfig = {
    apiKey: string,
};

export type OptionalConfig = {
    crashReporting: boolean,
    realUserMonitoring: boolean,
    secureCookie: boolean,
};

export type Config = RequiredConfig & OptionalConfig;

export type UserConfig = RequiredConfig & Partial<OptionalConfig>;

export function assignDefaultConfig(userConfig: UserConfig): Config {
    return {
        realUserMonitoring: false,
        crashReporting: false,
        secureCookie: true,
        ...userConfig
    };
}