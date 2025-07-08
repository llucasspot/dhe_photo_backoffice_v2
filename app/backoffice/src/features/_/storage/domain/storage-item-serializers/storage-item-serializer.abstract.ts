export abstract class StorageItemSerializer<TData, TDefaultValue> {
  abstract deserialize: (storedValue: string) => TData;

  abstract serialize(value: TData): string;

  abstract defaultValue: TDefaultValue;
}
