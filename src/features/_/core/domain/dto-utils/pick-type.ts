/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Type } from '#di/domain';

export function PickType<T, K extends keyof T>(
  classRef: Type<T>,
  keys: readonly K[],
): Type<Pick<T, K>> {
  // Create a new class extending the original class
  class PickTypeClass {
    constructor() {
      // Copy properties from the classRef for the selected keys
      const instance = new classRef();
      keys.forEach((key) => {
        (this as any)[key] = (instance as any)[key];
      });
    }
  }

  // Transfer metadata for selected keys
  keys.forEach((key) => {
    const metadataKeys = Reflect.getMetadataKeys(classRef.prototype, key) || [];
    metadataKeys.forEach((metadataKey) => {
      const metadataValue = Reflect.getMetadata(
        metadataKey,
        classRef.prototype,
        key,
      );
      Reflect.defineMetadata(
        metadataKey,
        metadataValue,
        PickTypeClass.prototype,
        key,
      );
    });
  });

  return PickTypeClass as Type<Pick<T, K>>;
}

// export function PickType<T extends object, K extends keyof T>(
//   BaseClass: Type<T>,
//   keys: K[],
// ): new () => Pick<T, K> {
//   class PickedClass {}
//
//   keys.forEach((key) => {
//     const metadataKeys = Reflect.getMetadataKeys(
//       BaseClass.prototype,
//       key as string,
//     );
//     metadataKeys.forEach((metadataKey) => {
//       const metadataValue = Reflect.getMetadata(
//         metadataKey,
//         BaseClass.prototype,
//         key as string,
//       );
//       Reflect.defineMetadata(
//         metadataKey,
//         metadataValue,
//         PickedClass.prototype,
//         key as string,
//       );
//     });
//
//     Object.defineProperty(PickedClass.prototype, key, {
//       get() {
//         return this[`__${String(key)}`];
//       },
//       set(value: any) {
//         this[`__${String(key)}`] = value;
//       },
//     });
//   });
//
//   return PickedClass as any;
// }
