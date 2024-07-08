import { Context } from '@david.uhlir/key-value-context'
import { defaultFormatter } from './formatters'

export interface LoggerConfig {
  overrideConsole: boolean
  writeFunction: (namespace: string[], args: any[]) => any[]
}

export const DEFAULT_CONFIG = {
  overrideConsole: true,
  writeFunction: defaultFormatter,
}

export interface LoggerRef {
  log(...msgs: any[])
  error(...msgs: any[])
  info(...msgs: any[])
  warn(...msgs: any[])
}

export const SYSTEM_CONSOLE = {
  log: console.log,
  error: console.error,
  info: console.info,
  warn: console.warn,
}

export class Logger {
  static readonly console = {
    log: console.log,
    error: console.error,
    info: console.info,
    warn: console.warn,
  }
  static attach(logger: LoggerRef = SYSTEM_CONSOLE, config: Partial<LoggerConfig> = {}) {
    const finalConfig = {
      ...DEFAULT_CONFIG,
      ...config,
    } as LoggerConfig

    new Logger(logger, finalConfig)
    if (finalConfig.overrideConsole) {
      console.log = Logger.log
      console.error = Logger.error
      console.info = Logger.info
      console.warn = Logger.warn
    }
  }

  protected static namespaces = new Context<{
    namespaces: string[]
  }>(
    {
      namespaces: [],
    },
    {
      flushIfSuccess: false,
    },
  )

  protected static instance: Logger
  protected constructor(readonly logger: LoggerRef, readonly config: LoggerConfig) {
    Logger.instance = this
  }

  static getNamespace(): string[] {
    try {
      return [...(Logger.namespaces?.getValue?.('namespaces') || [])]
    } catch (e) {
      return []
    }
  }

  static async runInNamespace<T>(namespace: string, handler: () => Promise<T>): Promise<T> {
    return Logger.namespaces.runInContext(() => {
      Logger.namespaces.setValue('namespaces', [...(Logger.namespaces?.getValue?.('namespaces') || []), namespace])
      return handler()
    })
  }

  static async log(...msgs: any[]) {
    return Logger.instance.write('log', ...msgs)
  }

  static async error(...msgs: any[]) {
    return Logger.instance.write('error', ...msgs)
  }

  static async info(...msgs: any[]) {
    return Logger.instance.write('info', ...msgs)
  }

  static async warn(...msgs: any[]) {
    return Logger.instance.write('warn', ...msgs)
  }

  protected async write(level: string, ...msgs: any[]) {
    const namespacesStorage = Logger.namespaces?.getValue?.('namespaces') || []
    const args = this.config.writeFunction(namespacesStorage, msgs)
    if (!Logger.console[level]) {
      level = 'log'
    }
    return this.logger[level](...args)
  }
}

Logger.attach(console)
