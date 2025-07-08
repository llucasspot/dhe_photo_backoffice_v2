export abstract class LoggerI {
  abstract error(...messages: string[]): void;

  /**
   * Write a 'log' level log.
   */
  abstract log(...messages: (string | undefined)[]): void;

  /**
   * Write a 'warn' level log.
   */
  abstract warn(...messages: (string | undefined)[]): void;

  /**
   * Write a 'debug' level log.
   */
  abstract debug(...messages: (string | undefined)[]): void;

  /**
   * Write a 'verbose' level log.
   */
  abstract verbose(...messages: (string | undefined)[]): void;

  /**
   * Write a 'fatal' level log.
   */
  abstract fatal(...messages: (string | undefined)[]): void;
}
