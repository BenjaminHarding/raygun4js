import { timestamp } from './time';

describe('Time', () => {
    describe('timestamp', () => {
        const dateNowBefore = Date.now;
        const TIME_NOW = 10;
        
        beforeAll(() => {
            Date.now = jest.fn(() => TIME_NOW);
        });

        afterAll(() => {
            Date.now = dateNowBefore;
        });

        it("returns current timestamp when hours passed are 0", () => {
            expect(timestamp(0)).toBe(TIME_NOW);
        });

        it("returns the 4 hours in the future", () => {
            expect(timestamp(4)).toBe(TIME_NOW + 4 * 60 * 1000);
        });
    });
});