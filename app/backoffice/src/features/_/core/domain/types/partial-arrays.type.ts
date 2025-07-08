/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type PartialArrays<T> = {
  [K in keyof T]: T[K] extends Array<any> ? T[K] | undefined : T[K];
};
