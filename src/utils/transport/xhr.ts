import { TransportOptions, Transport, REQUEST_TIMEOUT, finishTransport, failTransport } from './transport';


export const sendXHRRequest: Transport = (options: TransportOptions) => {
    const xhr = new XMLHttpRequest();

    xhr.open(options.method, options.url, true);
    xhr.timeout = REQUEST_TIMEOUT;
    xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');

    xhr.onreadystatechange = function() {
        if(xhr.readyState !== 4) {
            return;
        }

        finishTransport(options, xhr.status);
    };

    xhr.onerror = function() {
        failTransport(options);
    };

    xhr.ontimeout = function() {
        failTransport(options);
    };

    xhr.send(options.data);
};