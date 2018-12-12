import { Core, Config } from '../core';
import { TracekitException } from './tracekit';
import { Payload } from './payload';

export function createPayload(core: Core, exception: TracekitException): Payload | null {
    const shouldIgnore = errorChecks.every(check => check(core.config, exception))

    if(shouldIgnore) {
        return null;
    }


}

// true = error is allowed through
// false =  error shouldn't be reported
type ErrorCheck = (config: Config, exception: TracekitException) => boolean;

export const isNotThirdPartyError: ErrorCheck = (config, exception) => {
    if(!config.ignore3rdPartyErrors) {
        return true;
    }
    // TODO
    return false;
}

export const isNotAnExcludedHostname: ErrorCheck = (config, exception) => {
    // TODO
    // config.excludedHostnames
    return true;
}

export const isNotAnExcludedUserAgent: ErrorCheck = (config, exception) => {
    // TODO
    // config.excludedUserAgents
    return true;
}

export const isNotTheInsightsCrawler: ErrorCheck = () => {
    return !navigator.userAgent.match('RaygunPulseInsightsCrawler');
}

const errorChecks: ErrorCheck[] = [
    isNotThirdPartyError,
    isNotAnExcludedHostname,
    isNotAnExcludedUserAgent,
    isNotTheInsightsCrawler,
];