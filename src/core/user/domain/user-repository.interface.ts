import { UserCreatableInterface, UserInterface } from './interfaces';

declare type DeepPartial<T> =
  | T
  | (T extends Array<infer U>
      ? DeepPartial<U>[]
      : T extends Map<infer K, infer V>
      ? Map<DeepPartial<K>, DeepPartial<V>>
      : T extends Set<infer M>
      ? Set<DeepPartial<M>>
      : T extends object
      ? {
          [K in keyof T]?: DeepPartial<T[K]>;
        }
      : T);

export interface UserRepositoryInterface {
  /**
   * Finds entities that match given find options.
   */
  find(options?: unknown): Promise<UserInterface[]>;
  /**
   * Creates a new entity instance.
   */
  create(): UserInterface;
  /**
   * Creates new entities and copies all entity properties from given objects into their new entities.
   * Note that it copies only properties that are present in entity schema.
   */
  create(
    entityLikeArray: DeepPartial<UserCreatableInterface>[]
  ): UserInterface[];
  /**
   * Creates a new entity instance and copies all entity properties from this object into a new entity.
   * Note that it copies only properties that are present in entity schema.
   */
  create(entityLike: DeepPartial<UserCreatableInterface>): UserInterface;
  /**
   * Saves all given entities in the database.
   * If entities do not exist in the database then inserts, otherwise updates.
   */
  save<T extends DeepPartial<UserCreatableInterface>>(
    entities: T[],
    options: unknown & {
      reload: false;
    }
  ): Promise<T[]>;
  /**
   * Saves all given entities in the database.
   * If entities do not exist in the database then inserts, otherwise updates.
   */
  save<T extends DeepPartial<UserCreatableInterface>>(
    entities: T[],
    options?: unknown
  ): Promise<(T & UserInterface)[]>;
  /**
   * Saves a given entity in the database.
   * If entity does not exist in the database then inserts, otherwise updates.
   */
  save<T extends DeepPartial<UserInterface>>(
    entity: T,
    options: unknown & {
      reload: false;
    }
  ): Promise<T>;
  /**
   * Saves a given entity in the database.
   * If entity does not exist in the database then inserts, otherwise updates.
   */
  save<T extends DeepPartial<UserCreatableInterface>>(
    entity: T,
    options?: unknown
  ): Promise<T & UserInterface>;
}
