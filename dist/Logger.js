"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.SYSTEM_CONSOLE = exports.DEFAULT_CONFIG = void 0;
const key_value_context_1 = require("@david.uhlir/key-value-context");
const formatters_1 = require("./formatters");
exports.DEFAULT_CONFIG = {
    overrideConsole: true,
    writeFunction: formatters_1.defaultFormatter,
};
exports.SYSTEM_CONSOLE = {
    log: console.log,
    error: console.error,
    info: console.info,
    warn: console.warn,
};
class Logger {
    constructor(logger, config) {
        this.logger = logger;
        this.config = config;
        Logger.instance = this;
    }
    static attach(logger = exports.SYSTEM_CONSOLE, config = {}) {
        const finalConfig = {
            ...exports.DEFAULT_CONFIG,
            ...config,
        };
        new Logger(logger, finalConfig);
        if (finalConfig.overrideConsole) {
            console.log = Logger.log;
            console.error = Logger.error;
            console.info = Logger.info;
            console.warn = Logger.warn;
        }
    }
    static getNamespace() {
        try {
            return [...(Logger.namespaces?.getValue?.('namespaces') || [])];
        }
        catch (e) {
            return [];
        }
    }
    static async runInNamespace(namespace, handler) {
        return Logger.namespaces.runInContext(() => {
            Logger.namespaces.setValue('namespaces', [...(Logger.namespaces?.getValue?.('namespaces') || []), namespace]);
            return handler();
        });
    }
    static async log(...msgs) {
        return Logger.instance.write('log', ...msgs);
    }
    static async error(...msgs) {
        return Logger.instance.write('error', ...msgs);
    }
    static async info(...msgs) {
        return Logger.instance.write('info', ...msgs);
    }
    static async warn(...msgs) {
        return Logger.instance.write('warn', ...msgs);
    }
    async write(level, ...msgs) {
        const namespacesStorage = Logger.namespaces?.getValue?.('namespaces') || [];
        const args = this.config.writeFunction(namespacesStorage, msgs);
        if (!Logger.console[level]) {
            level = 'log';
        }
        return this.logger[level](...args);
    }
}
exports.Logger = Logger;
Logger.console = {
    log: console.log,
    error: console.error,
    info: console.info,
    warn: console.warn,
};
Logger.namespaces = new key_value_context_1.Context({
    namespaces: [],
}, {
    flushIfSuccess: false,
});
Logger.attach(console);
//# sourceMappingURL=Logger.js.map