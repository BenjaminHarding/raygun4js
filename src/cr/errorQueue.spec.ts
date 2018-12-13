import { ErrorQueue, ProcessedException, ERROR_STORAGE_KEY } from './errorQueue';
import { MockStorage } from '../utils/storage/mock';
import { Config, defaultOptionalConfig } from '../core/config';

const apiKey = '123';

const config: Config = {
    apiKey,
    ...defaultOptionalConfig
};

let storage: MockStorage<ProcessedException[]>;

let errorQueue: ErrorQueue;

const createProcessedError = (error: Partial<ProcessedException>={}):ProcessedException => ({
    url: "http://api.raygun.com/entries",
    apiKey,
    payload: {} as any,
    ...error
});

describe("Error queue", () => {
    function createErrorQueue(additionalConfig:Partial<Config>={}, storedErrors: ProcessedException[]=[]) {
        storage = new MockStorage();
        if(storedErrors.length > 0) {
            storage.set(ERROR_STORAGE_KEY, storedErrors);
        }
        errorQueue = new ErrorQueue({ ...config, ...additionalConfig }, storage);
    };

    describe("when initalising", () => {
        it('retrieves errors from storage when saveOfflineErrors is true', () => {
            createErrorQueue({ saveOfflineErrors: true });
            expect(storage.readMock.mock.calls.length).toBe(1);
        });

        it("does not retrieve errors from storage when saveOfflineErrors is false", () => {
            createErrorQueue({ saveOfflineErrors: false });
            expect(storage.readMock.mock.calls.length).toBe(0);
        });

        it("retrieves errors from storage if the api key matches", () => {
            createErrorQueue({ saveOfflineErrors: true }, [
                createProcessedError()
            ]);
            expect(errorQueue.length()).toBe(1);
        });

        it("doesn't retrieve errors from storage when the api key doesn't match", () => {
            createErrorQueue({ saveOfflineErrors: true }, [
                createProcessedError({ apiKey: '234' })
            ]);
            expect(errorQueue.length()).toBe(0);
        });
    });

    describe("when adding errors", () => {
        it("supports adding to the start of the queue", () => {
            createErrorQueue();
            errorQueue.add(createProcessedError({ url: 'secondItem' }));
            errorQueue.add(createProcessedError({ url: 'firstItem' }), true);

            expect(errorQueue.length()).toBe(2);
            expect(errorQueue.removeAndGetFirstItem().url).toBe('firstItem');
            expect(errorQueue.removeAndGetFirstItem().url).toBe('secondItem');
        });
        it("supports adding errors to the end of the queue", () => {
            createErrorQueue();
            errorQueue.add(createProcessedError({ url: 'firstItem' }));
            errorQueue.add(createProcessedError({ url: 'secondItem' }));

            expect(errorQueue.length()).toBe(2);
            expect(errorQueue.removeAndGetFirstItem().url).toBe('firstItem');
            expect(errorQueue.removeAndGetFirstItem().url).toBe('secondItem');
        });
        it("saved to storage when saveOfflineErrors is true", () => {
            createErrorQueue({ saveOfflineErrors: true });
            const error = createProcessedError({ url: 'firstItem' });
            errorQueue.add(error);

            expect(storage.setMock.mock.calls.length).toBe(1);
            expect(storage.setMock.mock.calls[0][1]).toMatchObject([
                error
            ]);
        });
        it("are not saved to storage when saveOfflineErrors is false", () => {
            createErrorQueue({ saveOfflineErrors: false });
            const error = createProcessedError({ url: 'firstItem' });
            errorQueue.add(error);

            expect(storage.setMock.mock.calls.length).toBe(0);
        });
    });

    describe("when getting errors", () => {
        it("returns null if the queue is empty", () => {
            createErrorQueue();
            const error = errorQueue.removeAndGetFirstItem();
            expect(error).toBe(null);
        });
        it("removed from the queue", () => {
            createErrorQueue();
            errorQueue.add(createProcessedError({ url: 'item' }));
            const error = errorQueue.removeAndGetFirstItem();
            expect(error.url).toBe('item');
            expect(errorQueue.length()).toBe(0);
        });
        it("updates storage when saveOfflineErrors is true", () => {
            createErrorQueue({ saveOfflineErrors: true });
            const error = createProcessedError();

            errorQueue.add(error);
            errorQueue.removeAndGetFirstItem();

            expect(storage.setMock.mock.calls.length).toBe(2);
            expect(storage.setMock.mock.calls[0][1]).toMatchObject([ error ]);
            expect(storage.setMock.mock.calls[1][1]).toMatchObject([]);
        });
        it("doesn't update storage when saveOfflineErrors is false", () => {
            createErrorQueue({ saveOfflineErrors: false });
            const error = createProcessedError();
            errorQueue.add(error);
            errorQueue.removeAndGetFirstItem();

            expect(storage.setMock.mock.calls.length).toBe(0);
        });
    });
});