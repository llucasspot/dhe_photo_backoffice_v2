/* eslint-disable @typescript-eslint/no-explicit-any */

export type LogLevel = (typeof Logger.DEFAULT_LOG_LEVELS)[number];

export abstract class Logger {
  static DEFAULT_LOG_LEVELS = [
    'log',
    'error',
    'warn',
    'debug',
    'verbose',
    'fatal',
  ] as const;

  static LOG_LEVEL_VALUES = {
    verbose: 0,
    debug: 1,
    log: 2,
    warn: 3,
    error: 4,
    fatal: 5,
  } as const satisfies {
    [K in LogLevel]: number;
  };

  protected isLogLevelEnabled(
    targetLevel: LogLevel,
    logLevels?: ReadonlyArray<LogLevel>,
  ): boolean {
    if (!logLevels) {
      return false;
    }
    if (Array.isArray(logLevels) && logLevels?.length === 0) {
      return false;
    }
    if (logLevels.includes(targetLevel)) {
      return true;
    }
    const highestLogLevelValue = logLevels
      .map((level: LogLevel) => Logger.LOG_LEVEL_VALUES[level])
      .sort((a, b) => b - a)?.[0];

    const targetLevelValue = Logger.LOG_LEVEL_VALUES[targetLevel];
    return targetLevelValue >= highestLogLevelValue;
  }

  abstract log(message: any, ...optionalParams: any[]): any;

  abstract error(message: any, ...optionalParams: any[]): any;

  abstract warn(message: any, ...optionalParams: any[]): any;

  abstract debug?(message: any, ...optionalParams: any[]): any;

  abstract verbose?(message: any, ...optionalParams: any[]): any;

  abstract fatal?(message: any, ...optionalParams: any[]): any;

  abstract setLogLevels?(levels: LogLevel[]): any;
}
