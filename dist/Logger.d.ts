import { Context } from '@david.uhlir/key-value-context';
export interface LoggerConfig {
    overrideConsole: boolean;
    writeFunction: (namespace: string[], args: any[]) => any[];
}
export declare const DEFAULT_CONFIG: {
    overrideConsole: boolean;
    writeFunction: (namespaces: string[], args: any[]) => any[];
};
export interface LoggerRef {
    log(...msgs: any[]): any;
    error(...msgs: any[]): any;
    info(...msgs: any[]): any;
    warn(...msgs: any[]): any;
}
export declare const SYSTEM_CONSOLE: {
    log: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    error: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    info: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    warn: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
};
export declare class Logger {
    readonly logger: LoggerRef;
    readonly config: LoggerConfig;
    static readonly console: {
        log: {
            (...data: any[]): void;
            (message?: any, ...optionalParams: any[]): void;
        };
        error: {
            (...data: any[]): void;
            (message?: any, ...optionalParams: any[]): void;
        };
        info: {
            (...data: any[]): void;
            (message?: any, ...optionalParams: any[]): void;
        };
        warn: {
            (...data: any[]): void;
            (message?: any, ...optionalParams: any[]): void;
        };
    };
    static attach(logger?: LoggerRef, config?: Partial<LoggerConfig>): void;
    protected static namespaces: Context<{
        namespaces: string[];
    }>;
    protected static instance: Logger;
    protected constructor(logger: LoggerRef, config: LoggerConfig);
    static getNamespace(): string[];
    static runInNamespace<T>(namespace: string, handler: () => Promise<T>): Promise<T>;
    static log(...msgs: any[]): Promise<any>;
    static error(...msgs: any[]): Promise<any>;
    static info(...msgs: any[]): Promise<any>;
    static warn(...msgs: any[]): Promise<any>;
    protected write(level: string, ...msgs: any[]): Promise<any>;
}
