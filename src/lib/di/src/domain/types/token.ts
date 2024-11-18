import { Abstract } from './abstract';
import { Type } from './type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Token<T = any> = Abstract<T> | string | Type<T>;
