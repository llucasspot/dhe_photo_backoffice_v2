import { LoggerI } from './logger.interface';

export class ConsoleLogger implements LoggerI {
  constructor(private readonly serviceName: string) {}

  error(...messages: (string | undefined)[]): void {
    console.error([`[${this.serviceName}]`, ...messages].join(' '));
  }

  log(...messages: (string | undefined)[]): void {
    console.log([`[${this.serviceName}]`, ...messages].join(' '));
  }

  warn(...messages: (string | undefined)[]): void {
    console.warn([`[${this.serviceName}]`, ...messages].join(' '));
  }

  debug(...messages: (string | undefined)[]): void {
    console.debug([`[${this.serviceName}]`, ...messages].join(' '));
  }

  verbose(...messages: (string | undefined)[]): void {
    console.log([`[${this.serviceName}]`, ...messages].join(' '));
  }

  fatal(...messages: (string | undefined)[]): void {
    console.log([`[${this.serviceName}]`, ...messages].join(' '));
  }
}
