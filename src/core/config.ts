type RequiredConfig = {
    apiKey: string;
};

export type OptionalConfig = {
    crashReporting: boolean;
    realUserMonitoring: boolean;
    secureCookie: boolean;
    saveOfflineErrors: boolean;
    apiUrl: string;
    asyncErrorHandler: boolean;
    ignore3rdPartyErrors: boolean;
    excludedHostnames: string[];
    excludedUserAgents: string[];
};

export type Config = RequiredConfig & OptionalConfig;

export type UserConfig = RequiredConfig & Partial<OptionalConfig>;

export function assignDefaultConfig(userConfig: UserConfig): Config {
    return {
        realUserMonitoring: false,
        crashReporting: false,
        secureCookie: true,
        saveOfflineErrors: false,
        asyncErrorHandler: false,
        ignore3rdPartyErrors: false,
        excludedHostnames: [],
        excludedUserAgents: [],
        apiUrl: "https://api.raygun.io",
        ...userConfig
    };
}