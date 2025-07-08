import { TransformFnParams, TransformOptions } from '../interfaces';
import { defaultMetadataStorage } from '../storage';

/**
 * Defines a custom logic for value transformation.
 *
 * Can be applied to properties only.
 */
export function Transform(
  transformFn: (params: TransformFnParams) => any,
  options: TransformOptions = {},
): PropertyDecorator {
  return function (target: any, propertyName: string | symbol): void {
    defaultMetadataStorage.addTransformMetadata({
      target: target.constructor,
      propertyName: propertyName as string,
      transformFn,
      options,
    });
  };
}
