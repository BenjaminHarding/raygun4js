import { Core, Config } from '../core';
import { TraceKitException } from './tracekit';

export function discardError(core: Core, exception: TraceKitException): boolean {
    return checks.every(discard => discard(core.config, exception));
}

type DiscardErrorCheck = (config: Config, exception: TraceKitException) => boolean;

export const discardAsThirdPartyError: DiscardErrorCheck = (config, exception) => {
    if(!config.ignore3rdPartyErrors) {
        return false;
    }
    // TODO
    return false;
}

export const discardAsAnExcludedHostname: DiscardErrorCheck = (config, exception) => {
    // TODO
    // config.excludedHostnames
    return false;
}

export const discardAsAnExcludedUserAgent: DiscardErrorCheck = (config, exception) => {
    // TODO
    // config.excludedUserAgents
    return false;
}

export const discardAsTheInsightsCrawler: DiscardErrorCheck = () => {
    return navigator.userAgent.indexOf('RaygunPulseInsightsCrawler') > -1;
}

const checks: DiscardErrorCheck[] = [
    discardAsThirdPartyError,
    discardAsAnExcludedHostname,
    discardAsAnExcludedUserAgent,
    discardAsTheInsightsCrawler,
];