export abstract class ActionI<TData = void, Body = void> {
  abstract i18nKeys: {
    success: string;
    error: string;
    pending: string;
  };

  abstract execute(body: Body): Promise<TData>;

  abstract onSuccess(data: TData, body: Body): void;

  abstract onError(error: Error): void;
}

export abstract class Action<TData = void, Body = void>
  implements ActionI<TData, Body>
{
  public readonly i18nKeys: {
    success: string;
    pending: string;
    error: string;
  };

  constructor() {
    this.i18nKeys = {
      success: `action.${this.constructor.name}.success.label`,
      pending: `action.${this.constructor.name}.pending.label`,
      error: `action.${this.constructor.name}.error.label`,
    };
  }

  abstract execute(body: Body): Promise<TData>;

  abstract onSuccess(data: TData, body: Body): void;

  abstract onError(error: Error): void;
}
