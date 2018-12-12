import { getQuery } from './url';

describe("Url", () => {
    describe('getQuery', () => {
        it("returns the query string", () => {
            const url = 'https://raygun.com/?firstname=Ronald&lastname=Raygun';
            expect(getQuery(url)).toMatchObject({
                'firstname': "Ronald",
                'lastname': 'Raygun'
            });
        });

        it("returns query string when a hash is used", () => {
            const url = 'https://raygun.com/?firstname=Ronald&lastname=Raygun#test';
            expect(getQuery(url)).toMatchObject({
                'firstname': "Ronald",
                'lastname': 'Raygun'
            });
        });

        it("returns empty object with no query string params", () => {
            const url = 'https://raygun.com/';
            expect(getQuery(url)).toMatchObject({});
        });
    });
});