export abstract class ToastServicePort {
  abstract success(...arg: unknown[]): void;

  abstract error(...arg: unknown[]): void;

  abstract info(...arg: unknown[]): void;

  abstract warn(...arg: unknown[]): void;

  abstract dark(...arg: unknown[]): void;

  abstract promise<TPromiseResult>(
    promise: () => Promise<TPromiseResult>,
    messages: {
      success: string;
      pending: string;
      error: string;
    },
  ): Promise<TPromiseResult>;
}
