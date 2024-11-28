/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { PickType } from './pick-type';

import { Type } from '#di/domain';

export function OmitType<T extends object, Keys extends keyof T>(
  BaseClass: Type<T>,
  keys: Keys[],
): Type<Omit<T, Keys>> {
  const allKeys = Object.keys(new BaseClass()) as Array<keyof T>;
  const keysToPick = allKeys.filter((key) => !keys.includes(key));

  return PickType(BaseClass, keysToPick);
}

// export function OmitType<T, K extends keyof T>(
//   classRef: Type<T>,
//   keys: readonly K[],
// ): Type<Omit<T, K>> {
//   // Get all keys of the class
//   const allKeys = Reflect.ownKeys(classRef.prototype) as (keyof T)[];
//
//   // Determine the keys to keep by excluding the omitted ones
//   const keysToKeep = allKeys.filter((key) => !keys.includes(key as K));
//
//   // Create a new class extending the original class
//   class OmitTypeClass {
//     constructor() {
//       // Copy properties from the classRef for the selected keys
//       const instance = new classRef();
//       keysToKeep.forEach((key) => {
//         (this as any)[key] = (instance as any)[key];
//       });
//     }
//   }
//
//   // Transfer metadata for selected keys
//   keysToKeep.forEach((key) => {
//     const metadataKeys = Reflect.getMetadataKeys(classRef.prototype, key) || [];
//     metadataKeys.forEach((metadataKey) => {
//       const metadataValue = Reflect.getMetadata(
//         metadataKey,
//         classRef.prototype,
//         key,
//       );
//       Reflect.defineMetadata(
//         metadataKey,
//         metadataValue,
//         OmitTypeClass.prototype,
//         key,
//       );
//     });
//   });
//
//   return OmitTypeClass as Type<Omit<T, K>>;
// }
