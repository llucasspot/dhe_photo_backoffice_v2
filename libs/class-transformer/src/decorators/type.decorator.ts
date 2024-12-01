import { TypeHelpOptions, TypeOptions } from '../interfaces';
import { defaultMetadataStorage } from '../storage';

/**
 * Specifies a type of the property.
 * The given TypeFunction can return a constructor. A discriminator can be given in the options.
 *
 * Can be applied to properties only.
 */
export function Type(
  typeFunction?: (type?: TypeHelpOptions) => Function,
  options: TypeOptions = {},
): PropertyDecorator {
  return function (target: any, propertyName: string | symbol): void {
    const reflectedType = (Reflect as any).getMetadata(
      'design:type',
      target,
      propertyName,
    );
    defaultMetadataStorage.addTypeMetadata({
      target: target.constructor,
      propertyName: propertyName as string,
      reflectedType,
      typeFunction,
      options,
    });
  };
}
