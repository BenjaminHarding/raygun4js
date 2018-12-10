import { User, UserPayload, convertToPayload, } from './user';

describe("User", () => {
    describe("convertToPayload", () => {
        it("converts user object to the payload format", () => {
            const identifier = 'abc123';

            const anonUserWithoutOptionalParameters: User = {
                identifier,
                isAnonymous: true
            };

            expect(convertToPayload(anonUserWithoutOptionalParameters)).toMatchObject({
                Identifier: identifier,
                IsAnonymous: true
            } as UserPayload);
        });

        it("sets optional user parameters when passed", () => {
            const identifier = 'abc123';

            const userWithOptionalParameters: User = {
                identifier,
                isAnonymous: false,
                firstName: 'Ronald',
                fullName: 'Ronald Raygun',
                email: 'hello@raygun.com',
                uuid: '12345678',
            };

            expect(convertToPayload(userWithOptionalParameters)).toMatchObject({
                Identifier: identifier,
                IsAnonymous: false,
                FirstName: 'Ronald',
                FullName: 'Ronald Raygun',
                Email: 'hello@raygun.com',
                UUID: '12345678'
            } as UserPayload);          
        });
    });
});