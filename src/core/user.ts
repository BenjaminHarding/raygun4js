export type User = {
    identifier: string;
    isAnonymous: boolean;
    email?: string;
    fullName?: string;
    firstName?: string;
    uuid?: string;
};

export function convertToPayload(user: User): UserPayload {
    let payload: UserPayload = {
        Identifier: user.identifier,
        IsAnonymous: user.isAnonymous,
    };

    if(!!user.email) {
       payload.Email = user.email;
    }

    if(!!user.email) {
       payload.FullName = user.fullName;
    }

    if(!!user.email) {
       payload.FirstName = user.firstName;
    }

    if(!!user.email) {
       payload.UUID = user.uuid;
    }

    return payload;
}

export type UserPayload = {
    Identifier: string;
    IsAnonymous: boolean;
    Email?: string;
    FullName?: string;
    FirstName?: string;
    UUID?: string;
};
