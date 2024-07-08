export const defaultFormatter = (namespaces: string[], args: any[]) => {
    const namespace = namespaces?.length ? `[${namespaces.join('.')}]` : null
    if (namespace) {
      return [namespace, ...args]
    }
    return args
}
