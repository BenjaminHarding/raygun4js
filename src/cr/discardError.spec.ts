import { discardError, discardAsTheInsightsCrawler } from './discardError';
import { Config, defaultOptionalConfig } from '../core';
import { TraceKitException } from './tracekit';

const config: Config = {
    apiKey: '123',
    ...defaultOptionalConfig
};

const exception: TraceKitException = {
    mode: '',
    name: '',
    message: '',
    url: '',
    stack: [],
    useragent: '',
    stackString: '',
};

describe("Discard error", () => {
    describe("discardAsTheInsightsCrawler", () => {
        let agentBefore;
        const setAgent = (newAgent: string) => (navigator as any).userAgent = newAgent; 

        beforeAll(() => {
            agentBefore = navigator.userAgent;
        });

        afterAll(() => {
            setAgent(agentBefore);
        })

        it('returns true when the agent is the Insights crawler', () => {
            setAgent('RaygunPulseInsightsCrawler');
            expect(discardAsTheInsightsCrawler(config, exception)).toBe(true);
        });

        it('returns false when the agent is not the insights crawler', () => {
            (navigator as any).userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'; 
            expect(discardAsTheInsightsCrawler(config, exception)).toBe(false);
        });
    });
});