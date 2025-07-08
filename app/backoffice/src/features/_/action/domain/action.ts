import { I18nKey } from '#i18n/domain';

export abstract class ActionI<TData = void, Body = void> {
  abstract i18nKeys: {
    success: I18nKey;
    error: I18nKey;
    pending: I18nKey;
  };

  abstract execute(body: Body): Promise<TData>;

  abstract onSuccess(data: TData, body: Body): void;

  abstract onError(error: Error): void;
}

export abstract class Action<TData = void, Body = void>
  implements ActionI<TData, Body>
{
  public readonly i18nKeys: {
    success: I18nKey;
    pending: I18nKey;
    error: I18nKey;
  };

  constructor() {
    this.i18nKeys = {
      success: `action.${this.constructor.name}.success.label` as I18nKey,
      pending: `action.${this.constructor.name}.pending.label` as I18nKey,
      error: `action.${this.constructor.name}.error.label` as I18nKey,
    };
  }

  abstract execute(body: Body): Promise<TData>;

  abstract onSuccess(data: TData, body: Body): void;

  abstract onError(error: Error): void;
}
