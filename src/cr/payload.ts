import { Core, Config } from '../core';
import { TraceKitException, TraceKitStack } from './tracekit';
import { Payload, Environment, Request, CustomData, Error, StackTrace } from './models';
import { getQuery } from '../utils/url';

const CLIENT_NAME = 'raygun-js';

const CLIENT_VERSION = 'test';

export function createPayload(core: Core, exception: TraceKitException, customData: CustomData, tags: string[]): Payload {
    const payload: Payload = {
        OccurredOn: new Date(),
        Details: {
            Error: createError(exception),
            Environment: createEnvironment(),
            User: core.user.getUser(),
            Client: {
                Name: CLIENT_NAME,
                Version: CLIENT_VERSION,
            },
            UserCustomData: createCustomData(customData),
            Tags: [ ...core.tags.getTags(), ...tags ],
            Request: createRequest(),
            Version: 'Not supplied',
        }
    };

    // Breadcrumbs
    // GroupingKey

    return payload;
}

export function createStackTrace(stack: TraceKitStack[]): StackTrace[] {
    if(!stack || !stack.length) {
        return [];
    }

    return stack.map<StackTrace>((frame) => ({
        LineNumber: frame.line,
        ColumnNumber: frame.column,
        ClassName: `line ${frame.line}, column ${frame.column}`,
        FileName: frame.url,
        MethodName: frame.func || '[anonymous]'
    }));
}

export function createMessage(exception: TraceKitException): string {
    if(exception.message) {
        return exception.message;
    }
    // status? 
    // raw error?
    // custom message?
    
    return "Script error";
}

export function createError(exception: TraceKitException):Error {
    return {
        ClassName: exception.name,
        Message: createMessage(exception).substring(0, 512),
        StackTrace: createStackTrace(exception.stack),
        StackString: exception.stackString
    };
}

export function createCustomData(customData: CustomData): CustomData {
    try {
        JSON.stringify(customData);
    } catch(e) {
        return {
            error: 'Cannot add custom data; may contain circular reference',
        };
    }
    return customData;
}

export function createRequest(): Request {
    return {
        Url: `${window.location.protocol}//${window.location.host}${window.location.pathname}${window.location.hash}`,
        QueryString: getQuery(),
        Headers: {
            'User-Agent': navigator.userAgent,
            Referer: document.referrer,
            Host: document.domain
        },
    };
}

export function createEnvironment(): Environment {
    return {
        UtcOffset: new Date().getTimezoneOffset() / -60.0,
        'User-Language': (window.navigator as any).userLanguage, 
        'Document-Mode': (document as any).documentMode, 
        'Browser-Width': window.innerWidth || document.documentElement.clientWidth,
        'Browser-Height': window.innerHeight || document.documentElement.clientHeight,
        'Screen-Width': screen ? window.screen.width : document.documentElement.clientWidth,
        'Screen-Height': screen ? window.screen.height : document.documentElement.clientHeight,
        'Color-Depth': screen ? window.screen.colorDepth : 8,
        Browser: navigator.appCodeName,
        'Browser-Name': navigator.appName,
        'Browser-Version': navigator.appVersion,
        Platform: navigator.platform,
    };
}