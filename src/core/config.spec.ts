import { Config, UserConfig, assignDefaultConfig } from './config';

const apiKey = 'ABC123';

describe("Config", () => {
    describe("assignDefaultConfig", () => {
        const configWithOnlyRequiredParams: UserConfig = {
            apiKey
        };

        it("sets optional parameters when not set", () => {
            expect(assignDefaultConfig(configWithOnlyRequiredParams)).toMatchObject({
                apiKey,
                realUserMonitoring: false,
                crashReporting: false,
                secureCookie: true,
            });
        });

        it("optional parameters can be overriden", () => {
            const config: Config = {
                realUserMonitoring: true,
                crashReporting: true,
                attachHandlers: false,
                secureCookie: true,
                saveOfflineErrors: true,
                asyncErrorHandler: true,
                ignore3rdPartyErrors: true,
                captureUnhandledRejections: false,
                excludedHostnames: ['123'],
                excludedUserAgents: ['abc'],
                apiUrl: "https://api.raygun.com",
                apiKey
            };

            expect(assignDefaultConfig(config)).toMatchObject(config);
        });
    });
});