"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFormatter = void 0;
exports.defaultFormatter = (namespaces, args) => {
    const namespace = namespaces?.length ? `[${namespaces.join('.')}]` : null;
    if (namespace) {
        return [namespace, ...args];
    }
    return args;
};
//# sourceMappingURL=formatters.js.map