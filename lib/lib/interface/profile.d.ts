export interface ICredentials {
    AccessKeyID: string;
    SecretAccessKey: string;
}
export interface ServerlessProfile {
    project: {
        component?: string;
        access: string;
        projectName: string;
    };
    appName: string;
}
