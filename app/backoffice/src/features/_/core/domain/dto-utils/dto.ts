export class Dto<T extends object> {
  constructor(instance: T & { id: string }) {
    Object.assign(this, instance);
  }
}
