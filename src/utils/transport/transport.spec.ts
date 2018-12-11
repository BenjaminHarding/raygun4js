import { TransportOptions, finishTransport, failTransport, shouldRetryBasedOnStatus } from './transport';

describe("Transport", () => {
    describe("shouldRetryBasedOnStatus", () => {
        it("return false when status is 403, 400 or 429", () => {
            expect(shouldRetryBasedOnStatus(403)).toBe(false);
            expect(shouldRetryBasedOnStatus(400)).toBe(false);
            expect(shouldRetryBasedOnStatus(429)).toBe(false);
        });
        it("returns true otherwise", () => {
            expect(shouldRetryBasedOnStatus(500)).toBe(true);
            expect(shouldRetryBasedOnStatus(200)).toBe(true);
            expect(shouldRetryBasedOnStatus(404)).toBe(true);
        });
    });
    describe("finishTransport", () => {
        let options: TransportOptions;
        let onSuccessMock: jest.Mock;
        let onFailMock: jest.Mock;

        beforeEach(() => {
            onSuccessMock = jest.fn();
            onFailMock = jest.fn();

            options = {
                method: 'post',
                url: 'https://api.raygun.com',
                data: {},
                onSuccess: onSuccessMock,
                onFail: onFailMock 
            };
        });

        it("onSuccess is called when status is 202", () => {
            finishTransport(options, 202);
            expect(onSuccessMock.mock.calls.length).toBe(1);
            expect(onFailMock.mock.calls.length).toBe(0);
        });

        it("onFail is called and retry attempt is true when status is 500", () => {
            finishTransport(options, 500);
            expect(onSuccessMock.mock.calls.length).toBe(0);
            expect(onFailMock.mock.calls.length).toBe(1);
            expect(onFailMock.mock.calls[0][0]).toBe(true);
        });

        it("onFail is called and retry attempt is false when status is 429", () => {
            finishTransport(options, 429);
            expect(onSuccessMock.mock.calls.length).toBe(0);
            expect(onFailMock.mock.calls.length).toBe(1);
            expect(onFailMock.mock.calls[0][0]).toBe(false);
        });
    });

    describe("failTransport", () => {
        let options: TransportOptions;
        let onSuccessMock: jest.Mock;
        let onFailMock: jest.Mock;

        beforeEach(() => {
            onSuccessMock = jest.fn();
            onFailMock = jest.fn();

            options = {
                method: 'post',
                url: 'https://api.raygun.com',
                data: {},
                onSuccess: onSuccessMock,
                onFail: onFailMock 
            };
        });
        it("onFail is called", () => {
            failTransport(options);
            expect(onSuccessMock.mock.calls.length).toBe(0);
            expect(onFailMock.mock.calls.length).toBe(1);
            expect(onFailMock.mock.calls[0][0]).toBe(true);
        });
    });
});