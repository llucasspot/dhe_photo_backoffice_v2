export class Dto<T extends Dto<T>> {
  constructor(instance: T) {
    Object.assign(this, instance);
  }
}
