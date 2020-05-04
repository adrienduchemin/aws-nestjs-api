export interface IApiLambda {
    stackName: string;
    zipPath: string;
    handler?: string;
    withHistory?: boolean;
}