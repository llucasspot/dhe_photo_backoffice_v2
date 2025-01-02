export abstract class BrowserStorageServicePort {
  abstract get(key: string): string | null;

  abstract set(key: string, newValue: string): void;

  abstract remove(key: string): void;
}
