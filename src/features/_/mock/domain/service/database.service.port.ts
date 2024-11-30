export abstract class DatabaseServicePort<TConnexion> {
  abstract getConnexion(): TConnexion;
}
