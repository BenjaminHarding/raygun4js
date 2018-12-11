import { UserInfo, UserPayload, convertToPayload, User } from './user';
import { assignDefaultConfig } from './config';
import { MockStorage } from '../utils/storage/mock';

describe("User", () => {
    describe("convertToPayload", () => {
        it("converts user object to the payload format", () => {
            const identifier = 'abc123';

            const anonUserWithoutOptionalParameters: UserInfo = {
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

            const userWithOptionalParameters: UserInfo = {
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

    describe("User", () => {
        let user: User;
        let storage: MockStorage;

        const config = assignDefaultConfig({
            apiKey: "123",
        });

        beforeAll(() => {
            storage = new MockStorage();
            user = new User(config, storage);
        });

        it("setUser saves user value to storage", () => {
            user.setUser({
                identifier: 'abc123',
                isAnonymous: true
            });
            expect(storage.setMock.mock.calls.length).toBe(1);
        });

        it("getUser returns a copy of the user payload", () => {
            user.setUser({
                identifier: 'abc123',
                isAnonymous: true
            });            
            const userPayload = user.getUser();
            expect(userPayload).toMatchObject({
                IsAnonymous: true,
                Identifier: 'abc123'
            });
        });
    });
});