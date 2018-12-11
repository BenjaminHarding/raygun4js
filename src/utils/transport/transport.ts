export const REQUEST_TIMEOUT = 10000;

export type TransportOptions = {
    method: any;
    url: string;
    data: any;
    onSuccess: () => void;
    onFail: (shouldRetry?: boolean) => void;
};

export type Transport = (options: TransportOptions) => void;

export function shouldRetryBasedOnStatus(status: number) {
    // Shouldn't retry the request due to rate limiting, sending too many requests, or bad payload
    return status !== 403 && status !== 400 && status !== 429;
}

export function finishTransport(options: TransportOptions, status: number) {
    if(status === 202) {
        options.onSuccess();
    } else {
        options.onFail(shouldRetryBasedOnStatus(status));
    }
}

export function failTransport(options: TransportOptions) {
    options.onFail(true);
}