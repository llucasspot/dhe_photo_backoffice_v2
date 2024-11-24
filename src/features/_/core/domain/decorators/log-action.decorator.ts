/* eslint-disable @typescript-eslint/no-explicit-any */

export function LogAction(): MethodDecorator {
  return (
    _target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const action = propertyKey.toString();
      const params = JSON.stringify(args);
      const log = (...data: any[]) => {
        // @ts-expect-error this.logger
        if (this.logger) {
          // @ts-expect-error this.logger
          this.logger.log(`[${action}]`, ...data);
        } else {
          console.log(`[no logger found on class] [${action}]`, ...data);
        }
      };

      log('called with params : ', params);
      try {
        const response = await originalMethod.apply(this, args);
        log('ended with response : ', response);
        return response;
      } catch (err: any) {
        log('failed with error', err);
        throw err;
      }
    };
    return descriptor;
  };
}
