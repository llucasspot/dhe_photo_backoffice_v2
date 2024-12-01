/* eslint-disable @typescript-eslint/no-explicit-any */

export type PartialArrays<T> = {
  [K in keyof T]: T[K] extends Array<any> ? T[K] | undefined : T[K];
};
