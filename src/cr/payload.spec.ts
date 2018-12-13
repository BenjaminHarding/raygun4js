import { createMessage, createError, createEnvironment, createCustomData, createRequest, createStackTrace } from './payload'; 
import { TraceKitException, TraceKitStack } from './tracekit';
import { StackTrace } from './models';

describe("Payload", () => {
    describe("createStackTrace", () => {        
        it("returns empty array when no stack is passed", () => {
            expect(createStackTrace(null)).toMatchObject([]);
        });
        it("returns empty array when stack length is empty", () => {
            expect(createStackTrace([])).toMatchObject([]);
        });
        it('returns stack trace', () => {
            const stack = [
                {
                    line: 1,
                    column: 2,
                    url: 'https://cdn.raygun.com/raygun.js',
                    func: 'name'
                }
            ];

            expect(createStackTrace(stack)).toMatchObject([
                {
                    LineNumber: 1,
                    ColumnNumber: 2,
                    ClassName: 'line 1, column 2',
                    FileName: 'https://cdn.raygun.com/raygun.js',
                    MethodName: 'name'
                }
            ] as StackTrace[]);
        });
    });
    describe("createMessage", () => {
        it("uses the message when defined", () => {
            const exception: TraceKitException = {
                message: "Undefined error",
            } as any;
            expect(createMessage(exception)).toBe("Undefined error");
        });
        it("defaults to script error", () => {
            expect(createMessage({} as any)).toBe('Script error');
        });
    });
    describe("createCustomData", () => {
        // it("returns error when custom data can't be stringified", () => {
        //     const customDataWithError = null;
        //     const data = createCustomData(customDataWithError);
            
        //     expect(data.error).toBeDefined();
        // });
        it("returns custom data when it can be stringified", () => {
            const customData = { "name": "Ronald" };
            expect(createCustomData(customData)).toBe(customData);
        });
    });
    describe("createRequest", () => {
        let locationBefore: Location;

        const mockLocation = (location: Location) => { window.location = location; };

        beforeEach(() => {
            locationBefore = window.location;
        });

        afterEach(() => {
            window.location = locationBefore;
        });

        it("Url is composed correctly", () => {
            mockLocation({
                protocol: 'https:',
                host: 'raygun.com',
                pathname: '/pricing',
                hash: '#platform'
            } as Location);
            expect(createRequest().Url).toBe('https://raygun.com/pricing#platform');
        });
    });
});