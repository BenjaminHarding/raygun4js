import { UserPayload } from '../core/user';

export type StackTrace = Partial<{
    LineNumber: number;
    ColumnNumber: number;
    ClassName: string;
    FileName: string;
    MethodName: string;
}>;

export type Error = {
    ClassName: string;
    Message: string;
    StackTrace: StackTrace[];
    StackString: string;
};

export type Environment = {
    UtcOffset: number;
    'User-Language': string;
    'Document-Mode': string;
    'Browser-Width': number;
    'Browser-Height': number;
    'Screen-Width': number;
    'Screen-Height': number;
    'Color-Depth': number;
    Browser: string;
    'Browser-Name': string;
    'Browser-Version': string;
    Platform: string;
};

export type CustomData = {
    [key: string]: any;
};

type QueryString = {
    [key: string]: string;
};

type Headers = {
    'User-Agent': string;
    Referer: string;
    Host: string;
};

export type Request = {
    Url: string;
    QueryString: QueryString;
    Headers: Headers;
};

type Breadcrumb = {
    level: string;
    timestamp: number;
    type: string;
    message: string;
};

export type Payload = {
    OccurredOn: Date;
    Details: {
        Error: Error;
        Environment: Environment;
        User: UserPayload;
        Breadcrumbs?: Breadcrumb[];
        GroupingKey?: string;
        Client: {
            Name: string;
            Version: string;
        },
        UserCustomData: CustomData;
        Tags: string[];
        Request: Request;
        Version: string;
    };
};