type RequiredConfig = {
    apiKey: string;
};

export type CrashReportingConfig = {
    crashReporting: boolean;
    saveOfflineErrors: boolean;
    asyncErrorHandler: boolean;
    captureUnhandledRejections: boolean;
    // TODO
    excludedHostnames: string[];
    excludedUserAgents: string[];
    ignore3rdPartyErrors: boolean;
};

export type OptionalConfig = CrashReportingConfig & {
    realUserMonitoring: boolean;
    secureCookie: boolean;
    apiUrl: string;
    attachHandlers: boolean;
};

export type Config = RequiredConfig & OptionalConfig;

export type UserConfig = RequiredConfig & Partial<OptionalConfig>;

export function assignDefaultConfig(userConfig: UserConfig): Config {
    return {
        // GENERAL
        secureCookie: true,
        apiUrl: "https://api.raygun.io",
        attachHandlers: true,
        // CR
        crashReporting: false,
        saveOfflineErrors: false,
        asyncErrorHandler: true,
        ignore3rdPartyErrors: false,
        excludedHostnames: [],
        excludedUserAgents: [],
        captureUnhandledRejections: true,
        // RUM
        realUserMonitoring: false,
        ...userConfig
    };
}