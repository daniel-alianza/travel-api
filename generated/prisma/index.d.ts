
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model Branch
 * 
 */
export type Branch = $Result.DefaultSelection<Prisma.$BranchPayload>
/**
 * Model Area
 * 
 */
export type Area = $Result.DefaultSelection<Prisma.$AreaPayload>
/**
 * Model Role
 * 
 */
export type Role = $Result.DefaultSelection<Prisma.$RolePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Card
 * 
 */
export type Card = $Result.DefaultSelection<Prisma.$CardPayload>
/**
 * Model CardAssignment
 * 
 */
export type CardAssignment = $Result.DefaultSelection<Prisma.$CardAssignmentPayload>
/**
 * Model StatusTravelRequest
 * 
 */
export type StatusTravelRequest = $Result.DefaultSelection<Prisma.$StatusTravelRequestPayload>
/**
 * Model TravelRequest
 * 
 */
export type TravelRequest = $Result.DefaultSelection<Prisma.$TravelRequestPayload>
/**
 * Model TravelDetail
 * 
 */
export type TravelDetail = $Result.DefaultSelection<Prisma.$TravelDetailPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Companies
 * const companies = await prisma.company.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Companies
   * const companies = await prisma.company.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.branch`: Exposes CRUD operations for the **Branch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Branches
    * const branches = await prisma.branch.findMany()
    * ```
    */
  get branch(): Prisma.BranchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.area`: Exposes CRUD operations for the **Area** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Areas
    * const areas = await prisma.area.findMany()
    * ```
    */
  get area(): Prisma.AreaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): Prisma.RoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.card`: Exposes CRUD operations for the **Card** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cards
    * const cards = await prisma.card.findMany()
    * ```
    */
  get card(): Prisma.CardDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cardAssignment`: Exposes CRUD operations for the **CardAssignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CardAssignments
    * const cardAssignments = await prisma.cardAssignment.findMany()
    * ```
    */
  get cardAssignment(): Prisma.CardAssignmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.statusTravelRequest`: Exposes CRUD operations for the **StatusTravelRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StatusTravelRequests
    * const statusTravelRequests = await prisma.statusTravelRequest.findMany()
    * ```
    */
  get statusTravelRequest(): Prisma.StatusTravelRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.travelRequest`: Exposes CRUD operations for the **TravelRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TravelRequests
    * const travelRequests = await prisma.travelRequest.findMany()
    * ```
    */
  get travelRequest(): Prisma.TravelRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.travelDetail`: Exposes CRUD operations for the **TravelDetail** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TravelDetails
    * const travelDetails = await prisma.travelDetail.findMany()
    * ```
    */
  get travelDetail(): Prisma.TravelDetailDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Company: 'Company',
    Branch: 'Branch',
    Area: 'Area',
    Role: 'Role',
    User: 'User',
    Card: 'Card',
    CardAssignment: 'CardAssignment',
    StatusTravelRequest: 'StatusTravelRequest',
    TravelRequest: 'TravelRequest',
    TravelDetail: 'TravelDetail'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "company" | "branch" | "area" | "role" | "user" | "card" | "cardAssignment" | "statusTravelRequest" | "travelRequest" | "travelDetail"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      Branch: {
        payload: Prisma.$BranchPayload<ExtArgs>
        fields: Prisma.BranchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BranchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BranchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          findFirst: {
            args: Prisma.BranchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BranchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          findMany: {
            args: Prisma.BranchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>[]
          }
          create: {
            args: Prisma.BranchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          createMany: {
            args: Prisma.BranchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BranchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          update: {
            args: Prisma.BranchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          deleteMany: {
            args: Prisma.BranchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BranchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BranchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          aggregate: {
            args: Prisma.BranchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBranch>
          }
          groupBy: {
            args: Prisma.BranchGroupByArgs<ExtArgs>
            result: $Utils.Optional<BranchGroupByOutputType>[]
          }
          count: {
            args: Prisma.BranchCountArgs<ExtArgs>
            result: $Utils.Optional<BranchCountAggregateOutputType> | number
          }
        }
      }
      Area: {
        payload: Prisma.$AreaPayload<ExtArgs>
        fields: Prisma.AreaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AreaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AreaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AreaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AreaPayload>
          }
          findFirst: {
            args: Prisma.AreaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AreaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AreaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AreaPayload>
          }
          findMany: {
            args: Prisma.AreaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AreaPayload>[]
          }
          create: {
            args: Prisma.AreaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AreaPayload>
          }
          createMany: {
            args: Prisma.AreaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AreaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AreaPayload>
          }
          update: {
            args: Prisma.AreaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AreaPayload>
          }
          deleteMany: {
            args: Prisma.AreaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AreaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AreaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AreaPayload>
          }
          aggregate: {
            args: Prisma.AreaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArea>
          }
          groupBy: {
            args: Prisma.AreaGroupByArgs<ExtArgs>
            result: $Utils.Optional<AreaGroupByOutputType>[]
          }
          count: {
            args: Prisma.AreaCountArgs<ExtArgs>
            result: $Utils.Optional<AreaCountAggregateOutputType> | number
          }
        }
      }
      Role: {
        payload: Prisma.$RolePayload<ExtArgs>
        fields: Prisma.RoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findFirst: {
            args: Prisma.RoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findMany: {
            args: Prisma.RoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          create: {
            args: Prisma.RoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          createMany: {
            args: Prisma.RoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          update: {
            args: Prisma.RoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          deleteMany: {
            args: Prisma.RoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          aggregate: {
            args: Prisma.RoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRole>
          }
          groupBy: {
            args: Prisma.RoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleCountArgs<ExtArgs>
            result: $Utils.Optional<RoleCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Card: {
        payload: Prisma.$CardPayload<ExtArgs>
        fields: Prisma.CardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          findFirst: {
            args: Prisma.CardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          findMany: {
            args: Prisma.CardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>[]
          }
          create: {
            args: Prisma.CardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          createMany: {
            args: Prisma.CardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          update: {
            args: Prisma.CardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          deleteMany: {
            args: Prisma.CardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          aggregate: {
            args: Prisma.CardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCard>
          }
          groupBy: {
            args: Prisma.CardGroupByArgs<ExtArgs>
            result: $Utils.Optional<CardGroupByOutputType>[]
          }
          count: {
            args: Prisma.CardCountArgs<ExtArgs>
            result: $Utils.Optional<CardCountAggregateOutputType> | number
          }
        }
      }
      CardAssignment: {
        payload: Prisma.$CardAssignmentPayload<ExtArgs>
        fields: Prisma.CardAssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CardAssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardAssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CardAssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardAssignmentPayload>
          }
          findFirst: {
            args: Prisma.CardAssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardAssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CardAssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardAssignmentPayload>
          }
          findMany: {
            args: Prisma.CardAssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardAssignmentPayload>[]
          }
          create: {
            args: Prisma.CardAssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardAssignmentPayload>
          }
          createMany: {
            args: Prisma.CardAssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CardAssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardAssignmentPayload>
          }
          update: {
            args: Prisma.CardAssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardAssignmentPayload>
          }
          deleteMany: {
            args: Prisma.CardAssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CardAssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CardAssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardAssignmentPayload>
          }
          aggregate: {
            args: Prisma.CardAssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCardAssignment>
          }
          groupBy: {
            args: Prisma.CardAssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CardAssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CardAssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<CardAssignmentCountAggregateOutputType> | number
          }
        }
      }
      StatusTravelRequest: {
        payload: Prisma.$StatusTravelRequestPayload<ExtArgs>
        fields: Prisma.StatusTravelRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StatusTravelRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusTravelRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StatusTravelRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusTravelRequestPayload>
          }
          findFirst: {
            args: Prisma.StatusTravelRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusTravelRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StatusTravelRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusTravelRequestPayload>
          }
          findMany: {
            args: Prisma.StatusTravelRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusTravelRequestPayload>[]
          }
          create: {
            args: Prisma.StatusTravelRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusTravelRequestPayload>
          }
          createMany: {
            args: Prisma.StatusTravelRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.StatusTravelRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusTravelRequestPayload>
          }
          update: {
            args: Prisma.StatusTravelRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusTravelRequestPayload>
          }
          deleteMany: {
            args: Prisma.StatusTravelRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StatusTravelRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StatusTravelRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusTravelRequestPayload>
          }
          aggregate: {
            args: Prisma.StatusTravelRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStatusTravelRequest>
          }
          groupBy: {
            args: Prisma.StatusTravelRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<StatusTravelRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.StatusTravelRequestCountArgs<ExtArgs>
            result: $Utils.Optional<StatusTravelRequestCountAggregateOutputType> | number
          }
        }
      }
      TravelRequest: {
        payload: Prisma.$TravelRequestPayload<ExtArgs>
        fields: Prisma.TravelRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TravelRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TravelRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelRequestPayload>
          }
          findFirst: {
            args: Prisma.TravelRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TravelRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelRequestPayload>
          }
          findMany: {
            args: Prisma.TravelRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelRequestPayload>[]
          }
          create: {
            args: Prisma.TravelRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelRequestPayload>
          }
          createMany: {
            args: Prisma.TravelRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TravelRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelRequestPayload>
          }
          update: {
            args: Prisma.TravelRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelRequestPayload>
          }
          deleteMany: {
            args: Prisma.TravelRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TravelRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TravelRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelRequestPayload>
          }
          aggregate: {
            args: Prisma.TravelRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTravelRequest>
          }
          groupBy: {
            args: Prisma.TravelRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<TravelRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.TravelRequestCountArgs<ExtArgs>
            result: $Utils.Optional<TravelRequestCountAggregateOutputType> | number
          }
        }
      }
      TravelDetail: {
        payload: Prisma.$TravelDetailPayload<ExtArgs>
        fields: Prisma.TravelDetailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TravelDetailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelDetailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TravelDetailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelDetailPayload>
          }
          findFirst: {
            args: Prisma.TravelDetailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelDetailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TravelDetailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelDetailPayload>
          }
          findMany: {
            args: Prisma.TravelDetailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelDetailPayload>[]
          }
          create: {
            args: Prisma.TravelDetailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelDetailPayload>
          }
          createMany: {
            args: Prisma.TravelDetailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TravelDetailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelDetailPayload>
          }
          update: {
            args: Prisma.TravelDetailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelDetailPayload>
          }
          deleteMany: {
            args: Prisma.TravelDetailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TravelDetailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TravelDetailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelDetailPayload>
          }
          aggregate: {
            args: Prisma.TravelDetailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTravelDetail>
          }
          groupBy: {
            args: Prisma.TravelDetailGroupByArgs<ExtArgs>
            result: $Utils.Optional<TravelDetailGroupByOutputType>[]
          }
          count: {
            args: Prisma.TravelDetailCountArgs<ExtArgs>
            result: $Utils.Optional<TravelDetailCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    company?: CompanyOmit
    branch?: BranchOmit
    area?: AreaOmit
    role?: RoleOmit
    user?: UserOmit
    card?: CardOmit
    cardAssignment?: CardAssignmentOmit
    statusTravelRequest?: StatusTravelRequestOmit
    travelRequest?: TravelRequestOmit
    travelDetail?: TravelDetailOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    users: number
    branches: number
    cards: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | CompanyCountOutputTypeCountUsersArgs
    branches?: boolean | CompanyCountOutputTypeCountBranchesArgs
    cards?: boolean | CompanyCountOutputTypeCountCardsArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountBranchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BranchWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountCardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CardWhereInput
  }


  /**
   * Count Type BranchCountOutputType
   */

  export type BranchCountOutputType = {
    users: number
  }

  export type BranchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | BranchCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * BranchCountOutputType without action
   */
  export type BranchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchCountOutputType
     */
    select?: BranchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BranchCountOutputType without action
   */
  export type BranchCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type AreaCountOutputType
   */

  export type AreaCountOutputType = {
    users: number
  }

  export type AreaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | AreaCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * AreaCountOutputType without action
   */
  export type AreaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AreaCountOutputType
     */
    select?: AreaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AreaCountOutputType without action
   */
  export type AreaCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type RoleCountOutputType
   */

  export type RoleCountOutputType = {
    users: number
  }

  export type RoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | RoleCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleCountOutputType
     */
    select?: RoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    subordinates: number
    cards: number
    travelRequests: number
    approvedTravelRequests: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subordinates?: boolean | UserCountOutputTypeCountSubordinatesArgs
    cards?: boolean | UserCountOutputTypeCountCardsArgs
    travelRequests?: boolean | UserCountOutputTypeCountTravelRequestsArgs
    approvedTravelRequests?: boolean | UserCountOutputTypeCountApprovedTravelRequestsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSubordinatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CardAssignmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTravelRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountApprovedTravelRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelRequestWhereInput
  }


  /**
   * Count Type CardCountOutputType
   */

  export type CardCountOutputType = {
    assignments: number
    travelRequests: number
  }

  export type CardCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | CardCountOutputTypeCountAssignmentsArgs
    travelRequests?: boolean | CardCountOutputTypeCountTravelRequestsArgs
  }

  // Custom InputTypes
  /**
   * CardCountOutputType without action
   */
  export type CardCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardCountOutputType
     */
    select?: CardCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CardCountOutputType without action
   */
  export type CardCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CardAssignmentWhereInput
  }

  /**
   * CardCountOutputType without action
   */
  export type CardCountOutputTypeCountTravelRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelRequestWhereInput
  }


  /**
   * Count Type StatusTravelRequestCountOutputType
   */

  export type StatusTravelRequestCountOutputType = {
    travelRequests: number
  }

  export type StatusTravelRequestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelRequests?: boolean | StatusTravelRequestCountOutputTypeCountTravelRequestsArgs
  }

  // Custom InputTypes
  /**
   * StatusTravelRequestCountOutputType without action
   */
  export type StatusTravelRequestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusTravelRequestCountOutputType
     */
    select?: StatusTravelRequestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StatusTravelRequestCountOutputType without action
   */
  export type StatusTravelRequestCountOutputTypeCountTravelRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelRequestWhereInput
  }


  /**
   * Count Type TravelRequestCountOutputType
   */

  export type TravelRequestCountOutputType = {
    details: number
  }

  export type TravelRequestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    details?: boolean | TravelRequestCountOutputTypeCountDetailsArgs
  }

  // Custom InputTypes
  /**
   * TravelRequestCountOutputType without action
   */
  export type TravelRequestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelRequestCountOutputType
     */
    select?: TravelRequestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TravelRequestCountOutputType without action
   */
  export type TravelRequestCountOutputTypeCountDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelDetailWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _avg: CompanyAvgAggregateOutputType | null
    _sum: CompanySumAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyAvgAggregateOutputType = {
    id: number | null
  }

  export type CompanySumAggregateOutputType = {
    id: number | null
  }

  export type CompanyMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CompanyAvgAggregateInputType = {
    id?: true
  }

  export type CompanySumAggregateInputType = {
    id?: true
  }

  export type CompanyMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _avg?: CompanyAvgAggregateInputType
    _sum?: CompanySumAggregateInputType
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    _count: CompanyCountAggregateOutputType | null
    _avg: CompanyAvgAggregateOutputType | null
    _sum: CompanySumAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Company$usersArgs<ExtArgs>
    branches?: boolean | Company$branchesArgs<ExtArgs>
    cards?: boolean | Company$cardsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>



  export type CompanySelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Company$usersArgs<ExtArgs>
    branches?: boolean | Company$branchesArgs<ExtArgs>
    cards?: boolean | Company$cardsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      branches: Prisma.$BranchPayload<ExtArgs>[]
      cards: Prisma.$CardPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Company$usersArgs<ExtArgs> = {}>(args?: Subset<T, Company$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    branches<T extends Company$branchesArgs<ExtArgs> = {}>(args?: Subset<T, Company$branchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cards<T extends Company$cardsArgs<ExtArgs> = {}>(args?: Subset<T, Company$cardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Company model
   */
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'Int'>
    readonly name: FieldRef<"Company", 'String'>
    readonly createdAt: FieldRef<"Company", 'DateTime'>
    readonly updatedAt: FieldRef<"Company", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to delete.
     */
    limit?: number
  }

  /**
   * Company.users
   */
  export type Company$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Company.branches
   */
  export type Company$branchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    where?: BranchWhereInput
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    cursor?: BranchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Company.cards
   */
  export type Company$cardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    where?: CardWhereInput
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    cursor?: CardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model Branch
   */

  export type AggregateBranch = {
    _count: BranchCountAggregateOutputType | null
    _avg: BranchAvgAggregateOutputType | null
    _sum: BranchSumAggregateOutputType | null
    _min: BranchMinAggregateOutputType | null
    _max: BranchMaxAggregateOutputType | null
  }

  export type BranchAvgAggregateOutputType = {
    id: number | null
    companyId: number | null
  }

  export type BranchSumAggregateOutputType = {
    id: number | null
    companyId: number | null
  }

  export type BranchMinAggregateOutputType = {
    id: number | null
    name: string | null
    companyId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BranchMaxAggregateOutputType = {
    id: number | null
    name: string | null
    companyId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BranchCountAggregateOutputType = {
    id: number
    name: number
    companyId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BranchAvgAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type BranchSumAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type BranchMinAggregateInputType = {
    id?: true
    name?: true
    companyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BranchMaxAggregateInputType = {
    id?: true
    name?: true
    companyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BranchCountAggregateInputType = {
    id?: true
    name?: true
    companyId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BranchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Branch to aggregate.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Branches
    **/
    _count?: true | BranchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BranchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BranchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BranchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BranchMaxAggregateInputType
  }

  export type GetBranchAggregateType<T extends BranchAggregateArgs> = {
        [P in keyof T & keyof AggregateBranch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBranch[P]>
      : GetScalarType<T[P], AggregateBranch[P]>
  }




  export type BranchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BranchWhereInput
    orderBy?: BranchOrderByWithAggregationInput | BranchOrderByWithAggregationInput[]
    by: BranchScalarFieldEnum[] | BranchScalarFieldEnum
    having?: BranchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BranchCountAggregateInputType | true
    _avg?: BranchAvgAggregateInputType
    _sum?: BranchSumAggregateInputType
    _min?: BranchMinAggregateInputType
    _max?: BranchMaxAggregateInputType
  }

  export type BranchGroupByOutputType = {
    id: number
    name: string
    companyId: number
    createdAt: Date
    updatedAt: Date
    _count: BranchCountAggregateOutputType | null
    _avg: BranchAvgAggregateOutputType | null
    _sum: BranchSumAggregateOutputType | null
    _min: BranchMinAggregateOutputType | null
    _max: BranchMaxAggregateOutputType | null
  }

  type GetBranchGroupByPayload<T extends BranchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BranchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BranchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BranchGroupByOutputType[P]>
            : GetScalarType<T[P], BranchGroupByOutputType[P]>
        }
      >
    >


  export type BranchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    companyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    users?: boolean | Branch$usersArgs<ExtArgs>
    _count?: boolean | BranchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["branch"]>



  export type BranchSelectScalar = {
    id?: boolean
    name?: boolean
    companyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BranchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "companyId" | "createdAt" | "updatedAt", ExtArgs["result"]["branch"]>
  export type BranchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    users?: boolean | Branch$usersArgs<ExtArgs>
    _count?: boolean | BranchCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $BranchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Branch"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      companyId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["branch"]>
    composites: {}
  }

  type BranchGetPayload<S extends boolean | null | undefined | BranchDefaultArgs> = $Result.GetResult<Prisma.$BranchPayload, S>

  type BranchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BranchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BranchCountAggregateInputType | true
    }

  export interface BranchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Branch'], meta: { name: 'Branch' } }
    /**
     * Find zero or one Branch that matches the filter.
     * @param {BranchFindUniqueArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BranchFindUniqueArgs>(args: SelectSubset<T, BranchFindUniqueArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Branch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BranchFindUniqueOrThrowArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BranchFindUniqueOrThrowArgs>(args: SelectSubset<T, BranchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Branch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindFirstArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BranchFindFirstArgs>(args?: SelectSubset<T, BranchFindFirstArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Branch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindFirstOrThrowArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BranchFindFirstOrThrowArgs>(args?: SelectSubset<T, BranchFindFirstOrThrowArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Branches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Branches
     * const branches = await prisma.branch.findMany()
     * 
     * // Get first 10 Branches
     * const branches = await prisma.branch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const branchWithIdOnly = await prisma.branch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BranchFindManyArgs>(args?: SelectSubset<T, BranchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Branch.
     * @param {BranchCreateArgs} args - Arguments to create a Branch.
     * @example
     * // Create one Branch
     * const Branch = await prisma.branch.create({
     *   data: {
     *     // ... data to create a Branch
     *   }
     * })
     * 
     */
    create<T extends BranchCreateArgs>(args: SelectSubset<T, BranchCreateArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Branches.
     * @param {BranchCreateManyArgs} args - Arguments to create many Branches.
     * @example
     * // Create many Branches
     * const branch = await prisma.branch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BranchCreateManyArgs>(args?: SelectSubset<T, BranchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Branch.
     * @param {BranchDeleteArgs} args - Arguments to delete one Branch.
     * @example
     * // Delete one Branch
     * const Branch = await prisma.branch.delete({
     *   where: {
     *     // ... filter to delete one Branch
     *   }
     * })
     * 
     */
    delete<T extends BranchDeleteArgs>(args: SelectSubset<T, BranchDeleteArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Branch.
     * @param {BranchUpdateArgs} args - Arguments to update one Branch.
     * @example
     * // Update one Branch
     * const branch = await prisma.branch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BranchUpdateArgs>(args: SelectSubset<T, BranchUpdateArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Branches.
     * @param {BranchDeleteManyArgs} args - Arguments to filter Branches to delete.
     * @example
     * // Delete a few Branches
     * const { count } = await prisma.branch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BranchDeleteManyArgs>(args?: SelectSubset<T, BranchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Branches
     * const branch = await prisma.branch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BranchUpdateManyArgs>(args: SelectSubset<T, BranchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Branch.
     * @param {BranchUpsertArgs} args - Arguments to update or create a Branch.
     * @example
     * // Update or create a Branch
     * const branch = await prisma.branch.upsert({
     *   create: {
     *     // ... data to create a Branch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Branch we want to update
     *   }
     * })
     */
    upsert<T extends BranchUpsertArgs>(args: SelectSubset<T, BranchUpsertArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchCountArgs} args - Arguments to filter Branches to count.
     * @example
     * // Count the number of Branches
     * const count = await prisma.branch.count({
     *   where: {
     *     // ... the filter for the Branches we want to count
     *   }
     * })
    **/
    count<T extends BranchCountArgs>(
      args?: Subset<T, BranchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BranchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Branch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BranchAggregateArgs>(args: Subset<T, BranchAggregateArgs>): Prisma.PrismaPromise<GetBranchAggregateType<T>>

    /**
     * Group by Branch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BranchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BranchGroupByArgs['orderBy'] }
        : { orderBy?: BranchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BranchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBranchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Branch model
   */
  readonly fields: BranchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Branch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BranchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends Branch$usersArgs<ExtArgs> = {}>(args?: Subset<T, Branch$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Branch model
   */
  interface BranchFieldRefs {
    readonly id: FieldRef<"Branch", 'Int'>
    readonly name: FieldRef<"Branch", 'String'>
    readonly companyId: FieldRef<"Branch", 'Int'>
    readonly createdAt: FieldRef<"Branch", 'DateTime'>
    readonly updatedAt: FieldRef<"Branch", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Branch findUnique
   */
  export type BranchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch findUniqueOrThrow
   */
  export type BranchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch findFirst
   */
  export type BranchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Branches.
     */
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch findFirstOrThrow
   */
  export type BranchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Branches.
     */
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch findMany
   */
  export type BranchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branches to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch create
   */
  export type BranchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * The data needed to create a Branch.
     */
    data: XOR<BranchCreateInput, BranchUncheckedCreateInput>
  }

  /**
   * Branch createMany
   */
  export type BranchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Branches.
     */
    data: BranchCreateManyInput | BranchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Branch update
   */
  export type BranchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * The data needed to update a Branch.
     */
    data: XOR<BranchUpdateInput, BranchUncheckedUpdateInput>
    /**
     * Choose, which Branch to update.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch updateMany
   */
  export type BranchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Branches.
     */
    data: XOR<BranchUpdateManyMutationInput, BranchUncheckedUpdateManyInput>
    /**
     * Filter which Branches to update
     */
    where?: BranchWhereInput
    /**
     * Limit how many Branches to update.
     */
    limit?: number
  }

  /**
   * Branch upsert
   */
  export type BranchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * The filter to search for the Branch to update in case it exists.
     */
    where: BranchWhereUniqueInput
    /**
     * In case the Branch found by the `where` argument doesn't exist, create a new Branch with this data.
     */
    create: XOR<BranchCreateInput, BranchUncheckedCreateInput>
    /**
     * In case the Branch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BranchUpdateInput, BranchUncheckedUpdateInput>
  }

  /**
   * Branch delete
   */
  export type BranchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter which Branch to delete.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch deleteMany
   */
  export type BranchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Branches to delete
     */
    where?: BranchWhereInput
    /**
     * Limit how many Branches to delete.
     */
    limit?: number
  }

  /**
   * Branch.users
   */
  export type Branch$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Branch without action
   */
  export type BranchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
  }


  /**
   * Model Area
   */

  export type AggregateArea = {
    _count: AreaCountAggregateOutputType | null
    _avg: AreaAvgAggregateOutputType | null
    _sum: AreaSumAggregateOutputType | null
    _min: AreaMinAggregateOutputType | null
    _max: AreaMaxAggregateOutputType | null
  }

  export type AreaAvgAggregateOutputType = {
    id: number | null
  }

  export type AreaSumAggregateOutputType = {
    id: number | null
  }

  export type AreaMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AreaMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AreaCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AreaAvgAggregateInputType = {
    id?: true
  }

  export type AreaSumAggregateInputType = {
    id?: true
  }

  export type AreaMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AreaMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AreaCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AreaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Area to aggregate.
     */
    where?: AreaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Areas to fetch.
     */
    orderBy?: AreaOrderByWithRelationInput | AreaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AreaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Areas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Areas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Areas
    **/
    _count?: true | AreaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AreaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AreaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AreaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AreaMaxAggregateInputType
  }

  export type GetAreaAggregateType<T extends AreaAggregateArgs> = {
        [P in keyof T & keyof AggregateArea]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArea[P]>
      : GetScalarType<T[P], AggregateArea[P]>
  }




  export type AreaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AreaWhereInput
    orderBy?: AreaOrderByWithAggregationInput | AreaOrderByWithAggregationInput[]
    by: AreaScalarFieldEnum[] | AreaScalarFieldEnum
    having?: AreaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AreaCountAggregateInputType | true
    _avg?: AreaAvgAggregateInputType
    _sum?: AreaSumAggregateInputType
    _min?: AreaMinAggregateInputType
    _max?: AreaMaxAggregateInputType
  }

  export type AreaGroupByOutputType = {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    _count: AreaCountAggregateOutputType | null
    _avg: AreaAvgAggregateOutputType | null
    _sum: AreaSumAggregateOutputType | null
    _min: AreaMinAggregateOutputType | null
    _max: AreaMaxAggregateOutputType | null
  }

  type GetAreaGroupByPayload<T extends AreaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AreaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AreaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AreaGroupByOutputType[P]>
            : GetScalarType<T[P], AreaGroupByOutputType[P]>
        }
      >
    >


  export type AreaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Area$usersArgs<ExtArgs>
    _count?: boolean | AreaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["area"]>



  export type AreaSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AreaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["area"]>
  export type AreaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Area$usersArgs<ExtArgs>
    _count?: boolean | AreaCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AreaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Area"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["area"]>
    composites: {}
  }

  type AreaGetPayload<S extends boolean | null | undefined | AreaDefaultArgs> = $Result.GetResult<Prisma.$AreaPayload, S>

  type AreaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AreaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AreaCountAggregateInputType | true
    }

  export interface AreaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Area'], meta: { name: 'Area' } }
    /**
     * Find zero or one Area that matches the filter.
     * @param {AreaFindUniqueArgs} args - Arguments to find a Area
     * @example
     * // Get one Area
     * const area = await prisma.area.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AreaFindUniqueArgs>(args: SelectSubset<T, AreaFindUniqueArgs<ExtArgs>>): Prisma__AreaClient<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Area that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AreaFindUniqueOrThrowArgs} args - Arguments to find a Area
     * @example
     * // Get one Area
     * const area = await prisma.area.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AreaFindUniqueOrThrowArgs>(args: SelectSubset<T, AreaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AreaClient<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Area that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaFindFirstArgs} args - Arguments to find a Area
     * @example
     * // Get one Area
     * const area = await prisma.area.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AreaFindFirstArgs>(args?: SelectSubset<T, AreaFindFirstArgs<ExtArgs>>): Prisma__AreaClient<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Area that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaFindFirstOrThrowArgs} args - Arguments to find a Area
     * @example
     * // Get one Area
     * const area = await prisma.area.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AreaFindFirstOrThrowArgs>(args?: SelectSubset<T, AreaFindFirstOrThrowArgs<ExtArgs>>): Prisma__AreaClient<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Areas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Areas
     * const areas = await prisma.area.findMany()
     * 
     * // Get first 10 Areas
     * const areas = await prisma.area.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const areaWithIdOnly = await prisma.area.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AreaFindManyArgs>(args?: SelectSubset<T, AreaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Area.
     * @param {AreaCreateArgs} args - Arguments to create a Area.
     * @example
     * // Create one Area
     * const Area = await prisma.area.create({
     *   data: {
     *     // ... data to create a Area
     *   }
     * })
     * 
     */
    create<T extends AreaCreateArgs>(args: SelectSubset<T, AreaCreateArgs<ExtArgs>>): Prisma__AreaClient<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Areas.
     * @param {AreaCreateManyArgs} args - Arguments to create many Areas.
     * @example
     * // Create many Areas
     * const area = await prisma.area.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AreaCreateManyArgs>(args?: SelectSubset<T, AreaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Area.
     * @param {AreaDeleteArgs} args - Arguments to delete one Area.
     * @example
     * // Delete one Area
     * const Area = await prisma.area.delete({
     *   where: {
     *     // ... filter to delete one Area
     *   }
     * })
     * 
     */
    delete<T extends AreaDeleteArgs>(args: SelectSubset<T, AreaDeleteArgs<ExtArgs>>): Prisma__AreaClient<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Area.
     * @param {AreaUpdateArgs} args - Arguments to update one Area.
     * @example
     * // Update one Area
     * const area = await prisma.area.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AreaUpdateArgs>(args: SelectSubset<T, AreaUpdateArgs<ExtArgs>>): Prisma__AreaClient<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Areas.
     * @param {AreaDeleteManyArgs} args - Arguments to filter Areas to delete.
     * @example
     * // Delete a few Areas
     * const { count } = await prisma.area.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AreaDeleteManyArgs>(args?: SelectSubset<T, AreaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Areas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Areas
     * const area = await prisma.area.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AreaUpdateManyArgs>(args: SelectSubset<T, AreaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Area.
     * @param {AreaUpsertArgs} args - Arguments to update or create a Area.
     * @example
     * // Update or create a Area
     * const area = await prisma.area.upsert({
     *   create: {
     *     // ... data to create a Area
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Area we want to update
     *   }
     * })
     */
    upsert<T extends AreaUpsertArgs>(args: SelectSubset<T, AreaUpsertArgs<ExtArgs>>): Prisma__AreaClient<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Areas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaCountArgs} args - Arguments to filter Areas to count.
     * @example
     * // Count the number of Areas
     * const count = await prisma.area.count({
     *   where: {
     *     // ... the filter for the Areas we want to count
     *   }
     * })
    **/
    count<T extends AreaCountArgs>(
      args?: Subset<T, AreaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AreaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Area.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AreaAggregateArgs>(args: Subset<T, AreaAggregateArgs>): Prisma.PrismaPromise<GetAreaAggregateType<T>>

    /**
     * Group by Area.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AreaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AreaGroupByArgs['orderBy'] }
        : { orderBy?: AreaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AreaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAreaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Area model
   */
  readonly fields: AreaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Area.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AreaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Area$usersArgs<ExtArgs> = {}>(args?: Subset<T, Area$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Area model
   */
  interface AreaFieldRefs {
    readonly id: FieldRef<"Area", 'Int'>
    readonly name: FieldRef<"Area", 'String'>
    readonly createdAt: FieldRef<"Area", 'DateTime'>
    readonly updatedAt: FieldRef<"Area", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Area findUnique
   */
  export type AreaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Area
     */
    omit?: AreaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * Filter, which Area to fetch.
     */
    where: AreaWhereUniqueInput
  }

  /**
   * Area findUniqueOrThrow
   */
  export type AreaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Area
     */
    omit?: AreaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * Filter, which Area to fetch.
     */
    where: AreaWhereUniqueInput
  }

  /**
   * Area findFirst
   */
  export type AreaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Area
     */
    omit?: AreaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * Filter, which Area to fetch.
     */
    where?: AreaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Areas to fetch.
     */
    orderBy?: AreaOrderByWithRelationInput | AreaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Areas.
     */
    cursor?: AreaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Areas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Areas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Areas.
     */
    distinct?: AreaScalarFieldEnum | AreaScalarFieldEnum[]
  }

  /**
   * Area findFirstOrThrow
   */
  export type AreaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Area
     */
    omit?: AreaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * Filter, which Area to fetch.
     */
    where?: AreaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Areas to fetch.
     */
    orderBy?: AreaOrderByWithRelationInput | AreaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Areas.
     */
    cursor?: AreaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Areas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Areas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Areas.
     */
    distinct?: AreaScalarFieldEnum | AreaScalarFieldEnum[]
  }

  /**
   * Area findMany
   */
  export type AreaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Area
     */
    omit?: AreaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * Filter, which Areas to fetch.
     */
    where?: AreaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Areas to fetch.
     */
    orderBy?: AreaOrderByWithRelationInput | AreaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Areas.
     */
    cursor?: AreaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Areas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Areas.
     */
    skip?: number
    distinct?: AreaScalarFieldEnum | AreaScalarFieldEnum[]
  }

  /**
   * Area create
   */
  export type AreaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Area
     */
    omit?: AreaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * The data needed to create a Area.
     */
    data: XOR<AreaCreateInput, AreaUncheckedCreateInput>
  }

  /**
   * Area createMany
   */
  export type AreaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Areas.
     */
    data: AreaCreateManyInput | AreaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Area update
   */
  export type AreaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Area
     */
    omit?: AreaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * The data needed to update a Area.
     */
    data: XOR<AreaUpdateInput, AreaUncheckedUpdateInput>
    /**
     * Choose, which Area to update.
     */
    where: AreaWhereUniqueInput
  }

  /**
   * Area updateMany
   */
  export type AreaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Areas.
     */
    data: XOR<AreaUpdateManyMutationInput, AreaUncheckedUpdateManyInput>
    /**
     * Filter which Areas to update
     */
    where?: AreaWhereInput
    /**
     * Limit how many Areas to update.
     */
    limit?: number
  }

  /**
   * Area upsert
   */
  export type AreaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Area
     */
    omit?: AreaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * The filter to search for the Area to update in case it exists.
     */
    where: AreaWhereUniqueInput
    /**
     * In case the Area found by the `where` argument doesn't exist, create a new Area with this data.
     */
    create: XOR<AreaCreateInput, AreaUncheckedCreateInput>
    /**
     * In case the Area was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AreaUpdateInput, AreaUncheckedUpdateInput>
  }

  /**
   * Area delete
   */
  export type AreaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Area
     */
    omit?: AreaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * Filter which Area to delete.
     */
    where: AreaWhereUniqueInput
  }

  /**
   * Area deleteMany
   */
  export type AreaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Areas to delete
     */
    where?: AreaWhereInput
    /**
     * Limit how many Areas to delete.
     */
    limit?: number
  }

  /**
   * Area.users
   */
  export type Area$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Area without action
   */
  export type AreaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Area
     */
    omit?: AreaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
  }


  /**
   * Model Role
   */

  export type AggregateRole = {
    _count: RoleCountAggregateOutputType | null
    _avg: RoleAvgAggregateOutputType | null
    _sum: RoleSumAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  export type RoleAvgAggregateOutputType = {
    id: number | null
  }

  export type RoleSumAggregateOutputType = {
    id: number | null
  }

  export type RoleMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoleMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoleCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoleAvgAggregateInputType = {
    id?: true
  }

  export type RoleSumAggregateInputType = {
    id?: true
  }

  export type RoleMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoleMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoleCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Role to aggregate.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleMaxAggregateInputType
  }

  export type GetRoleAggregateType<T extends RoleAggregateArgs> = {
        [P in keyof T & keyof AggregateRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRole[P]>
      : GetScalarType<T[P], AggregateRole[P]>
  }




  export type RoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithAggregationInput | RoleOrderByWithAggregationInput[]
    by: RoleScalarFieldEnum[] | RoleScalarFieldEnum
    having?: RoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleCountAggregateInputType | true
    _avg?: RoleAvgAggregateInputType
    _sum?: RoleSumAggregateInputType
    _min?: RoleMinAggregateInputType
    _max?: RoleMaxAggregateInputType
  }

  export type RoleGroupByOutputType = {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    _count: RoleCountAggregateOutputType | null
    _avg: RoleAvgAggregateOutputType | null
    _sum: RoleSumAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  type GetRoleGroupByPayload<T extends RoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleGroupByOutputType[P]>
            : GetScalarType<T[P], RoleGroupByOutputType[P]>
        }
      >
    >


  export type RoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Role$usersArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>



  export type RoleSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["role"]>
  export type RoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Role$usersArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $RolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Role"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["role"]>
    composites: {}
  }

  type RoleGetPayload<S extends boolean | null | undefined | RoleDefaultArgs> = $Result.GetResult<Prisma.$RolePayload, S>

  type RoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleCountAggregateInputType | true
    }

  export interface RoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Role'], meta: { name: 'Role' } }
    /**
     * Find zero or one Role that matches the filter.
     * @param {RoleFindUniqueArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleFindUniqueArgs>(args: SelectSubset<T, RoleFindUniqueArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Role that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleFindUniqueOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleFindFirstArgs>(args?: SelectSubset<T, RoleFindFirstArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.role.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleFindManyArgs>(args?: SelectSubset<T, RoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Role.
     * @param {RoleCreateArgs} args - Arguments to create a Role.
     * @example
     * // Create one Role
     * const Role = await prisma.role.create({
     *   data: {
     *     // ... data to create a Role
     *   }
     * })
     * 
     */
    create<T extends RoleCreateArgs>(args: SelectSubset<T, RoleCreateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RoleCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleCreateManyArgs>(args?: SelectSubset<T, RoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Role.
     * @param {RoleDeleteArgs} args - Arguments to delete one Role.
     * @example
     * // Delete one Role
     * const Role = await prisma.role.delete({
     *   where: {
     *     // ... filter to delete one Role
     *   }
     * })
     * 
     */
    delete<T extends RoleDeleteArgs>(args: SelectSubset<T, RoleDeleteArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Role.
     * @param {RoleUpdateArgs} args - Arguments to update one Role.
     * @example
     * // Update one Role
     * const role = await prisma.role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleUpdateArgs>(args: SelectSubset<T, RoleUpdateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleDeleteManyArgs>(args?: SelectSubset<T, RoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleUpdateManyArgs>(args: SelectSubset<T, RoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Role.
     * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
     * @example
     * // Update or create a Role
     * const role = await prisma.role.upsert({
     *   create: {
     *     // ... data to create a Role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Role we want to update
     *   }
     * })
     */
    upsert<T extends RoleUpsertArgs>(args: SelectSubset<T, RoleUpsertArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.role.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RoleCountArgs>(
      args?: Subset<T, RoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoleAggregateArgs>(args: Subset<T, RoleAggregateArgs>): Prisma.PrismaPromise<GetRoleAggregateType<T>>

    /**
     * Group by Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleGroupByArgs['orderBy'] }
        : { orderBy?: RoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Role model
   */
  readonly fields: RoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Role$usersArgs<ExtArgs> = {}>(args?: Subset<T, Role$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Role model
   */
  interface RoleFieldRefs {
    readonly id: FieldRef<"Role", 'Int'>
    readonly name: FieldRef<"Role", 'String'>
    readonly createdAt: FieldRef<"Role", 'DateTime'>
    readonly updatedAt: FieldRef<"Role", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Role findUnique
   */
  export type RoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findUniqueOrThrow
   */
  export type RoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findFirst
   */
  export type RoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findFirstOrThrow
   */
  export type RoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findMany
   */
  export type RoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role create
   */
  export type RoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to create a Role.
     */
    data: XOR<RoleCreateInput, RoleUncheckedCreateInput>
  }

  /**
   * Role createMany
   */
  export type RoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role update
   */
  export type RoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to update a Role.
     */
    data: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    /**
     * Choose, which Role to update.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role updateMany
   */
  export type RoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role upsert
   */
  export type RoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The filter to search for the Role to update in case it exists.
     */
    where: RoleWhereUniqueInput
    /**
     * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
     */
    create: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    /**
     * In case the Role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
  }

  /**
   * Role delete
   */
  export type RoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter which Role to delete.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role deleteMany
   */
  export type RoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to delete.
     */
    limit?: number
  }

  /**
   * Role.users
   */
  export type Role$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Role without action
   */
  export type RoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    companyId: number | null
    branchId: number | null
    areaId: number | null
    roleId: number | null
    supervisorId: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    companyId: number | null
    branchId: number | null
    areaId: number | null
    roleId: number | null
    supervisorId: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    paternalSurname: string | null
    maternalSurname: string | null
    email: string | null
    password: string | null
    isActive: boolean | null
    companyId: number | null
    branchId: number | null
    areaId: number | null
    roleId: number | null
    supervisorId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    paternalSurname: string | null
    maternalSurname: string | null
    email: string | null
    password: string | null
    isActive: boolean | null
    companyId: number | null
    branchId: number | null
    areaId: number | null
    roleId: number | null
    supervisorId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    paternalSurname: number
    maternalSurname: number
    email: number
    password: number
    isActive: number
    companyId: number
    branchId: number
    areaId: number
    roleId: number
    supervisorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    companyId?: true
    branchId?: true
    areaId?: true
    roleId?: true
    supervisorId?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    companyId?: true
    branchId?: true
    areaId?: true
    roleId?: true
    supervisorId?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    paternalSurname?: true
    maternalSurname?: true
    email?: true
    password?: true
    isActive?: true
    companyId?: true
    branchId?: true
    areaId?: true
    roleId?: true
    supervisorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    paternalSurname?: true
    maternalSurname?: true
    email?: true
    password?: true
    isActive?: true
    companyId?: true
    branchId?: true
    areaId?: true
    roleId?: true
    supervisorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    paternalSurname?: true
    maternalSurname?: true
    email?: true
    password?: true
    isActive?: true
    companyId?: true
    branchId?: true
    areaId?: true
    roleId?: true
    supervisorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive: boolean
    companyId: number
    branchId: number
    areaId: number
    roleId: number
    supervisorId: number | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    paternalSurname?: boolean
    maternalSurname?: boolean
    email?: boolean
    password?: boolean
    isActive?: boolean
    companyId?: boolean
    branchId?: boolean
    areaId?: boolean
    roleId?: boolean
    supervisorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    branch?: boolean | BranchDefaultArgs<ExtArgs>
    area?: boolean | AreaDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
    supervisor?: boolean | User$supervisorArgs<ExtArgs>
    subordinates?: boolean | User$subordinatesArgs<ExtArgs>
    cards?: boolean | User$cardsArgs<ExtArgs>
    travelRequests?: boolean | User$travelRequestsArgs<ExtArgs>
    approvedTravelRequests?: boolean | User$approvedTravelRequestsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    paternalSurname?: boolean
    maternalSurname?: boolean
    email?: boolean
    password?: boolean
    isActive?: boolean
    companyId?: boolean
    branchId?: boolean
    areaId?: boolean
    roleId?: boolean
    supervisorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "paternalSurname" | "maternalSurname" | "email" | "password" | "isActive" | "companyId" | "branchId" | "areaId" | "roleId" | "supervisorId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    branch?: boolean | BranchDefaultArgs<ExtArgs>
    area?: boolean | AreaDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
    supervisor?: boolean | User$supervisorArgs<ExtArgs>
    subordinates?: boolean | User$subordinatesArgs<ExtArgs>
    cards?: boolean | User$cardsArgs<ExtArgs>
    travelRequests?: boolean | User$travelRequestsArgs<ExtArgs>
    approvedTravelRequests?: boolean | User$approvedTravelRequestsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      branch: Prisma.$BranchPayload<ExtArgs>
      area: Prisma.$AreaPayload<ExtArgs>
      role: Prisma.$RolePayload<ExtArgs>
      supervisor: Prisma.$UserPayload<ExtArgs> | null
      subordinates: Prisma.$UserPayload<ExtArgs>[]
      cards: Prisma.$CardAssignmentPayload<ExtArgs>[]
      travelRequests: Prisma.$TravelRequestPayload<ExtArgs>[]
      approvedTravelRequests: Prisma.$TravelRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      paternalSurname: string
      maternalSurname: string
      email: string
      password: string
      isActive: boolean
      companyId: number
      branchId: number
      areaId: number
      roleId: number
      supervisorId: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    branch<T extends BranchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BranchDefaultArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    area<T extends AreaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AreaDefaultArgs<ExtArgs>>): Prisma__AreaClient<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    supervisor<T extends User$supervisorArgs<ExtArgs> = {}>(args?: Subset<T, User$supervisorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    subordinates<T extends User$subordinatesArgs<ExtArgs> = {}>(args?: Subset<T, User$subordinatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cards<T extends User$cardsArgs<ExtArgs> = {}>(args?: Subset<T, User$cardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    travelRequests<T extends User$travelRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$travelRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    approvedTravelRequests<T extends User$approvedTravelRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$approvedTravelRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly paternalSurname: FieldRef<"User", 'String'>
    readonly maternalSurname: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly companyId: FieldRef<"User", 'Int'>
    readonly branchId: FieldRef<"User", 'Int'>
    readonly areaId: FieldRef<"User", 'Int'>
    readonly roleId: FieldRef<"User", 'Int'>
    readonly supervisorId: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.supervisor
   */
  export type User$supervisorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * User.subordinates
   */
  export type User$subordinatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User.cards
   */
  export type User$cardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardAssignment
     */
    select?: CardAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardAssignment
     */
    omit?: CardAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardAssignmentInclude<ExtArgs> | null
    where?: CardAssignmentWhereInput
    orderBy?: CardAssignmentOrderByWithRelationInput | CardAssignmentOrderByWithRelationInput[]
    cursor?: CardAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CardAssignmentScalarFieldEnum | CardAssignmentScalarFieldEnum[]
  }

  /**
   * User.travelRequests
   */
  export type User$travelRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelRequest
     */
    select?: TravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelRequest
     */
    omit?: TravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelRequestInclude<ExtArgs> | null
    where?: TravelRequestWhereInput
    orderBy?: TravelRequestOrderByWithRelationInput | TravelRequestOrderByWithRelationInput[]
    cursor?: TravelRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TravelRequestScalarFieldEnum | TravelRequestScalarFieldEnum[]
  }

  /**
   * User.approvedTravelRequests
   */
  export type User$approvedTravelRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelRequest
     */
    select?: TravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelRequest
     */
    omit?: TravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelRequestInclude<ExtArgs> | null
    where?: TravelRequestWhereInput
    orderBy?: TravelRequestOrderByWithRelationInput | TravelRequestOrderByWithRelationInput[]
    cursor?: TravelRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TravelRequestScalarFieldEnum | TravelRequestScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Card
   */

  export type AggregateCard = {
    _count: CardCountAggregateOutputType | null
    _avg: CardAvgAggregateOutputType | null
    _sum: CardSumAggregateOutputType | null
    _min: CardMinAggregateOutputType | null
    _max: CardMaxAggregateOutputType | null
  }

  export type CardAvgAggregateOutputType = {
    id: number | null
    companyId: number | null
  }

  export type CardSumAggregateOutputType = {
    id: number | null
    companyId: number | null
  }

  export type CardMinAggregateOutputType = {
    id: number | null
    cardNumber: string | null
    companyId: number | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type CardMaxAggregateOutputType = {
    id: number | null
    cardNumber: string | null
    companyId: number | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type CardCountAggregateOutputType = {
    id: number
    cardNumber: number
    companyId: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type CardAvgAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type CardSumAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type CardMinAggregateInputType = {
    id?: true
    cardNumber?: true
    companyId?: true
    isActive?: true
    createdAt?: true
  }

  export type CardMaxAggregateInputType = {
    id?: true
    cardNumber?: true
    companyId?: true
    isActive?: true
    createdAt?: true
  }

  export type CardCountAggregateInputType = {
    id?: true
    cardNumber?: true
    companyId?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type CardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Card to aggregate.
     */
    where?: CardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cards to fetch.
     */
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cards
    **/
    _count?: true | CardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CardMaxAggregateInputType
  }

  export type GetCardAggregateType<T extends CardAggregateArgs> = {
        [P in keyof T & keyof AggregateCard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCard[P]>
      : GetScalarType<T[P], AggregateCard[P]>
  }




  export type CardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CardWhereInput
    orderBy?: CardOrderByWithAggregationInput | CardOrderByWithAggregationInput[]
    by: CardScalarFieldEnum[] | CardScalarFieldEnum
    having?: CardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CardCountAggregateInputType | true
    _avg?: CardAvgAggregateInputType
    _sum?: CardSumAggregateInputType
    _min?: CardMinAggregateInputType
    _max?: CardMaxAggregateInputType
  }

  export type CardGroupByOutputType = {
    id: number
    cardNumber: string
    companyId: number
    isActive: boolean
    createdAt: Date
    _count: CardCountAggregateOutputType | null
    _avg: CardAvgAggregateOutputType | null
    _sum: CardSumAggregateOutputType | null
    _min: CardMinAggregateOutputType | null
    _max: CardMaxAggregateOutputType | null
  }

  type GetCardGroupByPayload<T extends CardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CardGroupByOutputType[P]>
            : GetScalarType<T[P], CardGroupByOutputType[P]>
        }
      >
    >


  export type CardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cardNumber?: boolean
    companyId?: boolean
    isActive?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    assignments?: boolean | Card$assignmentsArgs<ExtArgs>
    travelRequests?: boolean | Card$travelRequestsArgs<ExtArgs>
    _count?: boolean | CardCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["card"]>



  export type CardSelectScalar = {
    id?: boolean
    cardNumber?: boolean
    companyId?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type CardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cardNumber" | "companyId" | "isActive" | "createdAt", ExtArgs["result"]["card"]>
  export type CardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    assignments?: boolean | Card$assignmentsArgs<ExtArgs>
    travelRequests?: boolean | Card$travelRequestsArgs<ExtArgs>
    _count?: boolean | CardCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Card"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      assignments: Prisma.$CardAssignmentPayload<ExtArgs>[]
      travelRequests: Prisma.$TravelRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      cardNumber: string
      companyId: number
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["card"]>
    composites: {}
  }

  type CardGetPayload<S extends boolean | null | undefined | CardDefaultArgs> = $Result.GetResult<Prisma.$CardPayload, S>

  type CardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CardCountAggregateInputType | true
    }

  export interface CardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Card'], meta: { name: 'Card' } }
    /**
     * Find zero or one Card that matches the filter.
     * @param {CardFindUniqueArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CardFindUniqueArgs>(args: SelectSubset<T, CardFindUniqueArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Card that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CardFindUniqueOrThrowArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CardFindUniqueOrThrowArgs>(args: SelectSubset<T, CardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Card that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardFindFirstArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CardFindFirstArgs>(args?: SelectSubset<T, CardFindFirstArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Card that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardFindFirstOrThrowArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CardFindFirstOrThrowArgs>(args?: SelectSubset<T, CardFindFirstOrThrowArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cards
     * const cards = await prisma.card.findMany()
     * 
     * // Get first 10 Cards
     * const cards = await prisma.card.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cardWithIdOnly = await prisma.card.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CardFindManyArgs>(args?: SelectSubset<T, CardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Card.
     * @param {CardCreateArgs} args - Arguments to create a Card.
     * @example
     * // Create one Card
     * const Card = await prisma.card.create({
     *   data: {
     *     // ... data to create a Card
     *   }
     * })
     * 
     */
    create<T extends CardCreateArgs>(args: SelectSubset<T, CardCreateArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cards.
     * @param {CardCreateManyArgs} args - Arguments to create many Cards.
     * @example
     * // Create many Cards
     * const card = await prisma.card.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CardCreateManyArgs>(args?: SelectSubset<T, CardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Card.
     * @param {CardDeleteArgs} args - Arguments to delete one Card.
     * @example
     * // Delete one Card
     * const Card = await prisma.card.delete({
     *   where: {
     *     // ... filter to delete one Card
     *   }
     * })
     * 
     */
    delete<T extends CardDeleteArgs>(args: SelectSubset<T, CardDeleteArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Card.
     * @param {CardUpdateArgs} args - Arguments to update one Card.
     * @example
     * // Update one Card
     * const card = await prisma.card.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CardUpdateArgs>(args: SelectSubset<T, CardUpdateArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cards.
     * @param {CardDeleteManyArgs} args - Arguments to filter Cards to delete.
     * @example
     * // Delete a few Cards
     * const { count } = await prisma.card.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CardDeleteManyArgs>(args?: SelectSubset<T, CardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cards
     * const card = await prisma.card.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CardUpdateManyArgs>(args: SelectSubset<T, CardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Card.
     * @param {CardUpsertArgs} args - Arguments to update or create a Card.
     * @example
     * // Update or create a Card
     * const card = await prisma.card.upsert({
     *   create: {
     *     // ... data to create a Card
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Card we want to update
     *   }
     * })
     */
    upsert<T extends CardUpsertArgs>(args: SelectSubset<T, CardUpsertArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardCountArgs} args - Arguments to filter Cards to count.
     * @example
     * // Count the number of Cards
     * const count = await prisma.card.count({
     *   where: {
     *     // ... the filter for the Cards we want to count
     *   }
     * })
    **/
    count<T extends CardCountArgs>(
      args?: Subset<T, CardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Card.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CardAggregateArgs>(args: Subset<T, CardAggregateArgs>): Prisma.PrismaPromise<GetCardAggregateType<T>>

    /**
     * Group by Card.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CardGroupByArgs['orderBy'] }
        : { orderBy?: CardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Card model
   */
  readonly fields: CardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Card.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assignments<T extends Card$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Card$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    travelRequests<T extends Card$travelRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Card$travelRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Card model
   */
  interface CardFieldRefs {
    readonly id: FieldRef<"Card", 'Int'>
    readonly cardNumber: FieldRef<"Card", 'String'>
    readonly companyId: FieldRef<"Card", 'Int'>
    readonly isActive: FieldRef<"Card", 'Boolean'>
    readonly createdAt: FieldRef<"Card", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Card findUnique
   */
  export type CardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Card to fetch.
     */
    where: CardWhereUniqueInput
  }

  /**
   * Card findUniqueOrThrow
   */
  export type CardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Card to fetch.
     */
    where: CardWhereUniqueInput
  }

  /**
   * Card findFirst
   */
  export type CardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Card to fetch.
     */
    where?: CardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cards to fetch.
     */
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cards.
     */
    cursor?: CardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cards.
     */
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * Card findFirstOrThrow
   */
  export type CardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Card to fetch.
     */
    where?: CardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cards to fetch.
     */
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cards.
     */
    cursor?: CardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cards.
     */
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * Card findMany
   */
  export type CardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Cards to fetch.
     */
    where?: CardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cards to fetch.
     */
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cards.
     */
    cursor?: CardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cards.
     */
    skip?: number
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * Card create
   */
  export type CardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * The data needed to create a Card.
     */
    data: XOR<CardCreateInput, CardUncheckedCreateInput>
  }

  /**
   * Card createMany
   */
  export type CardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cards.
     */
    data: CardCreateManyInput | CardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Card update
   */
  export type CardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * The data needed to update a Card.
     */
    data: XOR<CardUpdateInput, CardUncheckedUpdateInput>
    /**
     * Choose, which Card to update.
     */
    where: CardWhereUniqueInput
  }

  /**
   * Card updateMany
   */
  export type CardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cards.
     */
    data: XOR<CardUpdateManyMutationInput, CardUncheckedUpdateManyInput>
    /**
     * Filter which Cards to update
     */
    where?: CardWhereInput
    /**
     * Limit how many Cards to update.
     */
    limit?: number
  }

  /**
   * Card upsert
   */
  export type CardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * The filter to search for the Card to update in case it exists.
     */
    where: CardWhereUniqueInput
    /**
     * In case the Card found by the `where` argument doesn't exist, create a new Card with this data.
     */
    create: XOR<CardCreateInput, CardUncheckedCreateInput>
    /**
     * In case the Card was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CardUpdateInput, CardUncheckedUpdateInput>
  }

  /**
   * Card delete
   */
  export type CardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter which Card to delete.
     */
    where: CardWhereUniqueInput
  }

  /**
   * Card deleteMany
   */
  export type CardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cards to delete
     */
    where?: CardWhereInput
    /**
     * Limit how many Cards to delete.
     */
    limit?: number
  }

  /**
   * Card.assignments
   */
  export type Card$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardAssignment
     */
    select?: CardAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardAssignment
     */
    omit?: CardAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardAssignmentInclude<ExtArgs> | null
    where?: CardAssignmentWhereInput
    orderBy?: CardAssignmentOrderByWithRelationInput | CardAssignmentOrderByWithRelationInput[]
    cursor?: CardAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CardAssignmentScalarFieldEnum | CardAssignmentScalarFieldEnum[]
  }

  /**
   * Card.travelRequests
   */
  export type Card$travelRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelRequest
     */
    select?: TravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelRequest
     */
    omit?: TravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelRequestInclude<ExtArgs> | null
    where?: TravelRequestWhereInput
    orderBy?: TravelRequestOrderByWithRelationInput | TravelRequestOrderByWithRelationInput[]
    cursor?: TravelRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TravelRequestScalarFieldEnum | TravelRequestScalarFieldEnum[]
  }

  /**
   * Card without action
   */
  export type CardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
  }


  /**
   * Model CardAssignment
   */

  export type AggregateCardAssignment = {
    _count: CardAssignmentCountAggregateOutputType | null
    _avg: CardAssignmentAvgAggregateOutputType | null
    _sum: CardAssignmentSumAggregateOutputType | null
    _min: CardAssignmentMinAggregateOutputType | null
    _max: CardAssignmentMaxAggregateOutputType | null
  }

  export type CardAssignmentAvgAggregateOutputType = {
    id: number | null
    cardId: number | null
    userId: number | null
  }

  export type CardAssignmentSumAggregateOutputType = {
    id: number | null
    cardId: number | null
    userId: number | null
  }

  export type CardAssignmentMinAggregateOutputType = {
    id: number | null
    cardId: number | null
    userId: number | null
    assignedAt: Date | null
    unassignedAt: Date | null
  }

  export type CardAssignmentMaxAggregateOutputType = {
    id: number | null
    cardId: number | null
    userId: number | null
    assignedAt: Date | null
    unassignedAt: Date | null
  }

  export type CardAssignmentCountAggregateOutputType = {
    id: number
    cardId: number
    userId: number
    assignedAt: number
    unassignedAt: number
    _all: number
  }


  export type CardAssignmentAvgAggregateInputType = {
    id?: true
    cardId?: true
    userId?: true
  }

  export type CardAssignmentSumAggregateInputType = {
    id?: true
    cardId?: true
    userId?: true
  }

  export type CardAssignmentMinAggregateInputType = {
    id?: true
    cardId?: true
    userId?: true
    assignedAt?: true
    unassignedAt?: true
  }

  export type CardAssignmentMaxAggregateInputType = {
    id?: true
    cardId?: true
    userId?: true
    assignedAt?: true
    unassignedAt?: true
  }

  export type CardAssignmentCountAggregateInputType = {
    id?: true
    cardId?: true
    userId?: true
    assignedAt?: true
    unassignedAt?: true
    _all?: true
  }

  export type CardAssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CardAssignment to aggregate.
     */
    where?: CardAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CardAssignments to fetch.
     */
    orderBy?: CardAssignmentOrderByWithRelationInput | CardAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CardAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CardAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CardAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CardAssignments
    **/
    _count?: true | CardAssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CardAssignmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CardAssignmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CardAssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CardAssignmentMaxAggregateInputType
  }

  export type GetCardAssignmentAggregateType<T extends CardAssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregateCardAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCardAssignment[P]>
      : GetScalarType<T[P], AggregateCardAssignment[P]>
  }




  export type CardAssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CardAssignmentWhereInput
    orderBy?: CardAssignmentOrderByWithAggregationInput | CardAssignmentOrderByWithAggregationInput[]
    by: CardAssignmentScalarFieldEnum[] | CardAssignmentScalarFieldEnum
    having?: CardAssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CardAssignmentCountAggregateInputType | true
    _avg?: CardAssignmentAvgAggregateInputType
    _sum?: CardAssignmentSumAggregateInputType
    _min?: CardAssignmentMinAggregateInputType
    _max?: CardAssignmentMaxAggregateInputType
  }

  export type CardAssignmentGroupByOutputType = {
    id: number
    cardId: number
    userId: number
    assignedAt: Date
    unassignedAt: Date | null
    _count: CardAssignmentCountAggregateOutputType | null
    _avg: CardAssignmentAvgAggregateOutputType | null
    _sum: CardAssignmentSumAggregateOutputType | null
    _min: CardAssignmentMinAggregateOutputType | null
    _max: CardAssignmentMaxAggregateOutputType | null
  }

  type GetCardAssignmentGroupByPayload<T extends CardAssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CardAssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CardAssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CardAssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], CardAssignmentGroupByOutputType[P]>
        }
      >
    >


  export type CardAssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cardId?: boolean
    userId?: boolean
    assignedAt?: boolean
    unassignedAt?: boolean
    card?: boolean | CardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cardAssignment"]>



  export type CardAssignmentSelectScalar = {
    id?: boolean
    cardId?: boolean
    userId?: boolean
    assignedAt?: boolean
    unassignedAt?: boolean
  }

  export type CardAssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cardId" | "userId" | "assignedAt" | "unassignedAt", ExtArgs["result"]["cardAssignment"]>
  export type CardAssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    card?: boolean | CardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CardAssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CardAssignment"
    objects: {
      card: Prisma.$CardPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      cardId: number
      userId: number
      assignedAt: Date
      unassignedAt: Date | null
    }, ExtArgs["result"]["cardAssignment"]>
    composites: {}
  }

  type CardAssignmentGetPayload<S extends boolean | null | undefined | CardAssignmentDefaultArgs> = $Result.GetResult<Prisma.$CardAssignmentPayload, S>

  type CardAssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CardAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CardAssignmentCountAggregateInputType | true
    }

  export interface CardAssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CardAssignment'], meta: { name: 'CardAssignment' } }
    /**
     * Find zero or one CardAssignment that matches the filter.
     * @param {CardAssignmentFindUniqueArgs} args - Arguments to find a CardAssignment
     * @example
     * // Get one CardAssignment
     * const cardAssignment = await prisma.cardAssignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CardAssignmentFindUniqueArgs>(args: SelectSubset<T, CardAssignmentFindUniqueArgs<ExtArgs>>): Prisma__CardAssignmentClient<$Result.GetResult<Prisma.$CardAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CardAssignment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CardAssignmentFindUniqueOrThrowArgs} args - Arguments to find a CardAssignment
     * @example
     * // Get one CardAssignment
     * const cardAssignment = await prisma.cardAssignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CardAssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, CardAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CardAssignmentClient<$Result.GetResult<Prisma.$CardAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CardAssignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardAssignmentFindFirstArgs} args - Arguments to find a CardAssignment
     * @example
     * // Get one CardAssignment
     * const cardAssignment = await prisma.cardAssignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CardAssignmentFindFirstArgs>(args?: SelectSubset<T, CardAssignmentFindFirstArgs<ExtArgs>>): Prisma__CardAssignmentClient<$Result.GetResult<Prisma.$CardAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CardAssignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardAssignmentFindFirstOrThrowArgs} args - Arguments to find a CardAssignment
     * @example
     * // Get one CardAssignment
     * const cardAssignment = await prisma.cardAssignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CardAssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, CardAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CardAssignmentClient<$Result.GetResult<Prisma.$CardAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CardAssignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardAssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CardAssignments
     * const cardAssignments = await prisma.cardAssignment.findMany()
     * 
     * // Get first 10 CardAssignments
     * const cardAssignments = await prisma.cardAssignment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cardAssignmentWithIdOnly = await prisma.cardAssignment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CardAssignmentFindManyArgs>(args?: SelectSubset<T, CardAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CardAssignment.
     * @param {CardAssignmentCreateArgs} args - Arguments to create a CardAssignment.
     * @example
     * // Create one CardAssignment
     * const CardAssignment = await prisma.cardAssignment.create({
     *   data: {
     *     // ... data to create a CardAssignment
     *   }
     * })
     * 
     */
    create<T extends CardAssignmentCreateArgs>(args: SelectSubset<T, CardAssignmentCreateArgs<ExtArgs>>): Prisma__CardAssignmentClient<$Result.GetResult<Prisma.$CardAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CardAssignments.
     * @param {CardAssignmentCreateManyArgs} args - Arguments to create many CardAssignments.
     * @example
     * // Create many CardAssignments
     * const cardAssignment = await prisma.cardAssignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CardAssignmentCreateManyArgs>(args?: SelectSubset<T, CardAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CardAssignment.
     * @param {CardAssignmentDeleteArgs} args - Arguments to delete one CardAssignment.
     * @example
     * // Delete one CardAssignment
     * const CardAssignment = await prisma.cardAssignment.delete({
     *   where: {
     *     // ... filter to delete one CardAssignment
     *   }
     * })
     * 
     */
    delete<T extends CardAssignmentDeleteArgs>(args: SelectSubset<T, CardAssignmentDeleteArgs<ExtArgs>>): Prisma__CardAssignmentClient<$Result.GetResult<Prisma.$CardAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CardAssignment.
     * @param {CardAssignmentUpdateArgs} args - Arguments to update one CardAssignment.
     * @example
     * // Update one CardAssignment
     * const cardAssignment = await prisma.cardAssignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CardAssignmentUpdateArgs>(args: SelectSubset<T, CardAssignmentUpdateArgs<ExtArgs>>): Prisma__CardAssignmentClient<$Result.GetResult<Prisma.$CardAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CardAssignments.
     * @param {CardAssignmentDeleteManyArgs} args - Arguments to filter CardAssignments to delete.
     * @example
     * // Delete a few CardAssignments
     * const { count } = await prisma.cardAssignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CardAssignmentDeleteManyArgs>(args?: SelectSubset<T, CardAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CardAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardAssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CardAssignments
     * const cardAssignment = await prisma.cardAssignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CardAssignmentUpdateManyArgs>(args: SelectSubset<T, CardAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CardAssignment.
     * @param {CardAssignmentUpsertArgs} args - Arguments to update or create a CardAssignment.
     * @example
     * // Update or create a CardAssignment
     * const cardAssignment = await prisma.cardAssignment.upsert({
     *   create: {
     *     // ... data to create a CardAssignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CardAssignment we want to update
     *   }
     * })
     */
    upsert<T extends CardAssignmentUpsertArgs>(args: SelectSubset<T, CardAssignmentUpsertArgs<ExtArgs>>): Prisma__CardAssignmentClient<$Result.GetResult<Prisma.$CardAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CardAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardAssignmentCountArgs} args - Arguments to filter CardAssignments to count.
     * @example
     * // Count the number of CardAssignments
     * const count = await prisma.cardAssignment.count({
     *   where: {
     *     // ... the filter for the CardAssignments we want to count
     *   }
     * })
    **/
    count<T extends CardAssignmentCountArgs>(
      args?: Subset<T, CardAssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CardAssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CardAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardAssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CardAssignmentAggregateArgs>(args: Subset<T, CardAssignmentAggregateArgs>): Prisma.PrismaPromise<GetCardAssignmentAggregateType<T>>

    /**
     * Group by CardAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardAssignmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CardAssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CardAssignmentGroupByArgs['orderBy'] }
        : { orderBy?: CardAssignmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CardAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCardAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CardAssignment model
   */
  readonly fields: CardAssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CardAssignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CardAssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    card<T extends CardDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CardDefaultArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CardAssignment model
   */
  interface CardAssignmentFieldRefs {
    readonly id: FieldRef<"CardAssignment", 'Int'>
    readonly cardId: FieldRef<"CardAssignment", 'Int'>
    readonly userId: FieldRef<"CardAssignment", 'Int'>
    readonly assignedAt: FieldRef<"CardAssignment", 'DateTime'>
    readonly unassignedAt: FieldRef<"CardAssignment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CardAssignment findUnique
   */
  export type CardAssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardAssignment
     */
    select?: CardAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardAssignment
     */
    omit?: CardAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which CardAssignment to fetch.
     */
    where: CardAssignmentWhereUniqueInput
  }

  /**
   * CardAssignment findUniqueOrThrow
   */
  export type CardAssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardAssignment
     */
    select?: CardAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardAssignment
     */
    omit?: CardAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which CardAssignment to fetch.
     */
    where: CardAssignmentWhereUniqueInput
  }

  /**
   * CardAssignment findFirst
   */
  export type CardAssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardAssignment
     */
    select?: CardAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardAssignment
     */
    omit?: CardAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which CardAssignment to fetch.
     */
    where?: CardAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CardAssignments to fetch.
     */
    orderBy?: CardAssignmentOrderByWithRelationInput | CardAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CardAssignments.
     */
    cursor?: CardAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CardAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CardAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CardAssignments.
     */
    distinct?: CardAssignmentScalarFieldEnum | CardAssignmentScalarFieldEnum[]
  }

  /**
   * CardAssignment findFirstOrThrow
   */
  export type CardAssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardAssignment
     */
    select?: CardAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardAssignment
     */
    omit?: CardAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which CardAssignment to fetch.
     */
    where?: CardAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CardAssignments to fetch.
     */
    orderBy?: CardAssignmentOrderByWithRelationInput | CardAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CardAssignments.
     */
    cursor?: CardAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CardAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CardAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CardAssignments.
     */
    distinct?: CardAssignmentScalarFieldEnum | CardAssignmentScalarFieldEnum[]
  }

  /**
   * CardAssignment findMany
   */
  export type CardAssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardAssignment
     */
    select?: CardAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardAssignment
     */
    omit?: CardAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which CardAssignments to fetch.
     */
    where?: CardAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CardAssignments to fetch.
     */
    orderBy?: CardAssignmentOrderByWithRelationInput | CardAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CardAssignments.
     */
    cursor?: CardAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CardAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CardAssignments.
     */
    skip?: number
    distinct?: CardAssignmentScalarFieldEnum | CardAssignmentScalarFieldEnum[]
  }

  /**
   * CardAssignment create
   */
  export type CardAssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardAssignment
     */
    select?: CardAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardAssignment
     */
    omit?: CardAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to create a CardAssignment.
     */
    data: XOR<CardAssignmentCreateInput, CardAssignmentUncheckedCreateInput>
  }

  /**
   * CardAssignment createMany
   */
  export type CardAssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CardAssignments.
     */
    data: CardAssignmentCreateManyInput | CardAssignmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CardAssignment update
   */
  export type CardAssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardAssignment
     */
    select?: CardAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardAssignment
     */
    omit?: CardAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to update a CardAssignment.
     */
    data: XOR<CardAssignmentUpdateInput, CardAssignmentUncheckedUpdateInput>
    /**
     * Choose, which CardAssignment to update.
     */
    where: CardAssignmentWhereUniqueInput
  }

  /**
   * CardAssignment updateMany
   */
  export type CardAssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CardAssignments.
     */
    data: XOR<CardAssignmentUpdateManyMutationInput, CardAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which CardAssignments to update
     */
    where?: CardAssignmentWhereInput
    /**
     * Limit how many CardAssignments to update.
     */
    limit?: number
  }

  /**
   * CardAssignment upsert
   */
  export type CardAssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardAssignment
     */
    select?: CardAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardAssignment
     */
    omit?: CardAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardAssignmentInclude<ExtArgs> | null
    /**
     * The filter to search for the CardAssignment to update in case it exists.
     */
    where: CardAssignmentWhereUniqueInput
    /**
     * In case the CardAssignment found by the `where` argument doesn't exist, create a new CardAssignment with this data.
     */
    create: XOR<CardAssignmentCreateInput, CardAssignmentUncheckedCreateInput>
    /**
     * In case the CardAssignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CardAssignmentUpdateInput, CardAssignmentUncheckedUpdateInput>
  }

  /**
   * CardAssignment delete
   */
  export type CardAssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardAssignment
     */
    select?: CardAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardAssignment
     */
    omit?: CardAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardAssignmentInclude<ExtArgs> | null
    /**
     * Filter which CardAssignment to delete.
     */
    where: CardAssignmentWhereUniqueInput
  }

  /**
   * CardAssignment deleteMany
   */
  export type CardAssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CardAssignments to delete
     */
    where?: CardAssignmentWhereInput
    /**
     * Limit how many CardAssignments to delete.
     */
    limit?: number
  }

  /**
   * CardAssignment without action
   */
  export type CardAssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardAssignment
     */
    select?: CardAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardAssignment
     */
    omit?: CardAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardAssignmentInclude<ExtArgs> | null
  }


  /**
   * Model StatusTravelRequest
   */

  export type AggregateStatusTravelRequest = {
    _count: StatusTravelRequestCountAggregateOutputType | null
    _avg: StatusTravelRequestAvgAggregateOutputType | null
    _sum: StatusTravelRequestSumAggregateOutputType | null
    _min: StatusTravelRequestMinAggregateOutputType | null
    _max: StatusTravelRequestMaxAggregateOutputType | null
  }

  export type StatusTravelRequestAvgAggregateOutputType = {
    id: number | null
  }

  export type StatusTravelRequestSumAggregateOutputType = {
    id: number | null
  }

  export type StatusTravelRequestMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type StatusTravelRequestMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type StatusTravelRequestCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type StatusTravelRequestAvgAggregateInputType = {
    id?: true
  }

  export type StatusTravelRequestSumAggregateInputType = {
    id?: true
  }

  export type StatusTravelRequestMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type StatusTravelRequestMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type StatusTravelRequestCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type StatusTravelRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StatusTravelRequest to aggregate.
     */
    where?: StatusTravelRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatusTravelRequests to fetch.
     */
    orderBy?: StatusTravelRequestOrderByWithRelationInput | StatusTravelRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StatusTravelRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatusTravelRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatusTravelRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StatusTravelRequests
    **/
    _count?: true | StatusTravelRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StatusTravelRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StatusTravelRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StatusTravelRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StatusTravelRequestMaxAggregateInputType
  }

  export type GetStatusTravelRequestAggregateType<T extends StatusTravelRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateStatusTravelRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStatusTravelRequest[P]>
      : GetScalarType<T[P], AggregateStatusTravelRequest[P]>
  }




  export type StatusTravelRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StatusTravelRequestWhereInput
    orderBy?: StatusTravelRequestOrderByWithAggregationInput | StatusTravelRequestOrderByWithAggregationInput[]
    by: StatusTravelRequestScalarFieldEnum[] | StatusTravelRequestScalarFieldEnum
    having?: StatusTravelRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StatusTravelRequestCountAggregateInputType | true
    _avg?: StatusTravelRequestAvgAggregateInputType
    _sum?: StatusTravelRequestSumAggregateInputType
    _min?: StatusTravelRequestMinAggregateInputType
    _max?: StatusTravelRequestMaxAggregateInputType
  }

  export type StatusTravelRequestGroupByOutputType = {
    id: number
    name: string
    _count: StatusTravelRequestCountAggregateOutputType | null
    _avg: StatusTravelRequestAvgAggregateOutputType | null
    _sum: StatusTravelRequestSumAggregateOutputType | null
    _min: StatusTravelRequestMinAggregateOutputType | null
    _max: StatusTravelRequestMaxAggregateOutputType | null
  }

  type GetStatusTravelRequestGroupByPayload<T extends StatusTravelRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StatusTravelRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StatusTravelRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StatusTravelRequestGroupByOutputType[P]>
            : GetScalarType<T[P], StatusTravelRequestGroupByOutputType[P]>
        }
      >
    >


  export type StatusTravelRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    travelRequests?: boolean | StatusTravelRequest$travelRequestsArgs<ExtArgs>
    _count?: boolean | StatusTravelRequestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["statusTravelRequest"]>



  export type StatusTravelRequestSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type StatusTravelRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["statusTravelRequest"]>
  export type StatusTravelRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelRequests?: boolean | StatusTravelRequest$travelRequestsArgs<ExtArgs>
    _count?: boolean | StatusTravelRequestCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $StatusTravelRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StatusTravelRequest"
    objects: {
      travelRequests: Prisma.$TravelRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["statusTravelRequest"]>
    composites: {}
  }

  type StatusTravelRequestGetPayload<S extends boolean | null | undefined | StatusTravelRequestDefaultArgs> = $Result.GetResult<Prisma.$StatusTravelRequestPayload, S>

  type StatusTravelRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StatusTravelRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StatusTravelRequestCountAggregateInputType | true
    }

  export interface StatusTravelRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StatusTravelRequest'], meta: { name: 'StatusTravelRequest' } }
    /**
     * Find zero or one StatusTravelRequest that matches the filter.
     * @param {StatusTravelRequestFindUniqueArgs} args - Arguments to find a StatusTravelRequest
     * @example
     * // Get one StatusTravelRequest
     * const statusTravelRequest = await prisma.statusTravelRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StatusTravelRequestFindUniqueArgs>(args: SelectSubset<T, StatusTravelRequestFindUniqueArgs<ExtArgs>>): Prisma__StatusTravelRequestClient<$Result.GetResult<Prisma.$StatusTravelRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StatusTravelRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StatusTravelRequestFindUniqueOrThrowArgs} args - Arguments to find a StatusTravelRequest
     * @example
     * // Get one StatusTravelRequest
     * const statusTravelRequest = await prisma.statusTravelRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StatusTravelRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, StatusTravelRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StatusTravelRequestClient<$Result.GetResult<Prisma.$StatusTravelRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StatusTravelRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusTravelRequestFindFirstArgs} args - Arguments to find a StatusTravelRequest
     * @example
     * // Get one StatusTravelRequest
     * const statusTravelRequest = await prisma.statusTravelRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StatusTravelRequestFindFirstArgs>(args?: SelectSubset<T, StatusTravelRequestFindFirstArgs<ExtArgs>>): Prisma__StatusTravelRequestClient<$Result.GetResult<Prisma.$StatusTravelRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StatusTravelRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusTravelRequestFindFirstOrThrowArgs} args - Arguments to find a StatusTravelRequest
     * @example
     * // Get one StatusTravelRequest
     * const statusTravelRequest = await prisma.statusTravelRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StatusTravelRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, StatusTravelRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__StatusTravelRequestClient<$Result.GetResult<Prisma.$StatusTravelRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StatusTravelRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusTravelRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StatusTravelRequests
     * const statusTravelRequests = await prisma.statusTravelRequest.findMany()
     * 
     * // Get first 10 StatusTravelRequests
     * const statusTravelRequests = await prisma.statusTravelRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const statusTravelRequestWithIdOnly = await prisma.statusTravelRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StatusTravelRequestFindManyArgs>(args?: SelectSubset<T, StatusTravelRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatusTravelRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StatusTravelRequest.
     * @param {StatusTravelRequestCreateArgs} args - Arguments to create a StatusTravelRequest.
     * @example
     * // Create one StatusTravelRequest
     * const StatusTravelRequest = await prisma.statusTravelRequest.create({
     *   data: {
     *     // ... data to create a StatusTravelRequest
     *   }
     * })
     * 
     */
    create<T extends StatusTravelRequestCreateArgs>(args: SelectSubset<T, StatusTravelRequestCreateArgs<ExtArgs>>): Prisma__StatusTravelRequestClient<$Result.GetResult<Prisma.$StatusTravelRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StatusTravelRequests.
     * @param {StatusTravelRequestCreateManyArgs} args - Arguments to create many StatusTravelRequests.
     * @example
     * // Create many StatusTravelRequests
     * const statusTravelRequest = await prisma.statusTravelRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StatusTravelRequestCreateManyArgs>(args?: SelectSubset<T, StatusTravelRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a StatusTravelRequest.
     * @param {StatusTravelRequestDeleteArgs} args - Arguments to delete one StatusTravelRequest.
     * @example
     * // Delete one StatusTravelRequest
     * const StatusTravelRequest = await prisma.statusTravelRequest.delete({
     *   where: {
     *     // ... filter to delete one StatusTravelRequest
     *   }
     * })
     * 
     */
    delete<T extends StatusTravelRequestDeleteArgs>(args: SelectSubset<T, StatusTravelRequestDeleteArgs<ExtArgs>>): Prisma__StatusTravelRequestClient<$Result.GetResult<Prisma.$StatusTravelRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StatusTravelRequest.
     * @param {StatusTravelRequestUpdateArgs} args - Arguments to update one StatusTravelRequest.
     * @example
     * // Update one StatusTravelRequest
     * const statusTravelRequest = await prisma.statusTravelRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StatusTravelRequestUpdateArgs>(args: SelectSubset<T, StatusTravelRequestUpdateArgs<ExtArgs>>): Prisma__StatusTravelRequestClient<$Result.GetResult<Prisma.$StatusTravelRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StatusTravelRequests.
     * @param {StatusTravelRequestDeleteManyArgs} args - Arguments to filter StatusTravelRequests to delete.
     * @example
     * // Delete a few StatusTravelRequests
     * const { count } = await prisma.statusTravelRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StatusTravelRequestDeleteManyArgs>(args?: SelectSubset<T, StatusTravelRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StatusTravelRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusTravelRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StatusTravelRequests
     * const statusTravelRequest = await prisma.statusTravelRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StatusTravelRequestUpdateManyArgs>(args: SelectSubset<T, StatusTravelRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one StatusTravelRequest.
     * @param {StatusTravelRequestUpsertArgs} args - Arguments to update or create a StatusTravelRequest.
     * @example
     * // Update or create a StatusTravelRequest
     * const statusTravelRequest = await prisma.statusTravelRequest.upsert({
     *   create: {
     *     // ... data to create a StatusTravelRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StatusTravelRequest we want to update
     *   }
     * })
     */
    upsert<T extends StatusTravelRequestUpsertArgs>(args: SelectSubset<T, StatusTravelRequestUpsertArgs<ExtArgs>>): Prisma__StatusTravelRequestClient<$Result.GetResult<Prisma.$StatusTravelRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StatusTravelRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusTravelRequestCountArgs} args - Arguments to filter StatusTravelRequests to count.
     * @example
     * // Count the number of StatusTravelRequests
     * const count = await prisma.statusTravelRequest.count({
     *   where: {
     *     // ... the filter for the StatusTravelRequests we want to count
     *   }
     * })
    **/
    count<T extends StatusTravelRequestCountArgs>(
      args?: Subset<T, StatusTravelRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StatusTravelRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StatusTravelRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusTravelRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StatusTravelRequestAggregateArgs>(args: Subset<T, StatusTravelRequestAggregateArgs>): Prisma.PrismaPromise<GetStatusTravelRequestAggregateType<T>>

    /**
     * Group by StatusTravelRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusTravelRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StatusTravelRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StatusTravelRequestGroupByArgs['orderBy'] }
        : { orderBy?: StatusTravelRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StatusTravelRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStatusTravelRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StatusTravelRequest model
   */
  readonly fields: StatusTravelRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StatusTravelRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StatusTravelRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    travelRequests<T extends StatusTravelRequest$travelRequestsArgs<ExtArgs> = {}>(args?: Subset<T, StatusTravelRequest$travelRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StatusTravelRequest model
   */
  interface StatusTravelRequestFieldRefs {
    readonly id: FieldRef<"StatusTravelRequest", 'Int'>
    readonly name: FieldRef<"StatusTravelRequest", 'String'>
  }
    

  // Custom InputTypes
  /**
   * StatusTravelRequest findUnique
   */
  export type StatusTravelRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusTravelRequest
     */
    select?: StatusTravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusTravelRequest
     */
    omit?: StatusTravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusTravelRequestInclude<ExtArgs> | null
    /**
     * Filter, which StatusTravelRequest to fetch.
     */
    where: StatusTravelRequestWhereUniqueInput
  }

  /**
   * StatusTravelRequest findUniqueOrThrow
   */
  export type StatusTravelRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusTravelRequest
     */
    select?: StatusTravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusTravelRequest
     */
    omit?: StatusTravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusTravelRequestInclude<ExtArgs> | null
    /**
     * Filter, which StatusTravelRequest to fetch.
     */
    where: StatusTravelRequestWhereUniqueInput
  }

  /**
   * StatusTravelRequest findFirst
   */
  export type StatusTravelRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusTravelRequest
     */
    select?: StatusTravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusTravelRequest
     */
    omit?: StatusTravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusTravelRequestInclude<ExtArgs> | null
    /**
     * Filter, which StatusTravelRequest to fetch.
     */
    where?: StatusTravelRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatusTravelRequests to fetch.
     */
    orderBy?: StatusTravelRequestOrderByWithRelationInput | StatusTravelRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StatusTravelRequests.
     */
    cursor?: StatusTravelRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatusTravelRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatusTravelRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StatusTravelRequests.
     */
    distinct?: StatusTravelRequestScalarFieldEnum | StatusTravelRequestScalarFieldEnum[]
  }

  /**
   * StatusTravelRequest findFirstOrThrow
   */
  export type StatusTravelRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusTravelRequest
     */
    select?: StatusTravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusTravelRequest
     */
    omit?: StatusTravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusTravelRequestInclude<ExtArgs> | null
    /**
     * Filter, which StatusTravelRequest to fetch.
     */
    where?: StatusTravelRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatusTravelRequests to fetch.
     */
    orderBy?: StatusTravelRequestOrderByWithRelationInput | StatusTravelRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StatusTravelRequests.
     */
    cursor?: StatusTravelRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatusTravelRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatusTravelRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StatusTravelRequests.
     */
    distinct?: StatusTravelRequestScalarFieldEnum | StatusTravelRequestScalarFieldEnum[]
  }

  /**
   * StatusTravelRequest findMany
   */
  export type StatusTravelRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusTravelRequest
     */
    select?: StatusTravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusTravelRequest
     */
    omit?: StatusTravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusTravelRequestInclude<ExtArgs> | null
    /**
     * Filter, which StatusTravelRequests to fetch.
     */
    where?: StatusTravelRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatusTravelRequests to fetch.
     */
    orderBy?: StatusTravelRequestOrderByWithRelationInput | StatusTravelRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StatusTravelRequests.
     */
    cursor?: StatusTravelRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatusTravelRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatusTravelRequests.
     */
    skip?: number
    distinct?: StatusTravelRequestScalarFieldEnum | StatusTravelRequestScalarFieldEnum[]
  }

  /**
   * StatusTravelRequest create
   */
  export type StatusTravelRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusTravelRequest
     */
    select?: StatusTravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusTravelRequest
     */
    omit?: StatusTravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusTravelRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a StatusTravelRequest.
     */
    data: XOR<StatusTravelRequestCreateInput, StatusTravelRequestUncheckedCreateInput>
  }

  /**
   * StatusTravelRequest createMany
   */
  export type StatusTravelRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StatusTravelRequests.
     */
    data: StatusTravelRequestCreateManyInput | StatusTravelRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StatusTravelRequest update
   */
  export type StatusTravelRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusTravelRequest
     */
    select?: StatusTravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusTravelRequest
     */
    omit?: StatusTravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusTravelRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a StatusTravelRequest.
     */
    data: XOR<StatusTravelRequestUpdateInput, StatusTravelRequestUncheckedUpdateInput>
    /**
     * Choose, which StatusTravelRequest to update.
     */
    where: StatusTravelRequestWhereUniqueInput
  }

  /**
   * StatusTravelRequest updateMany
   */
  export type StatusTravelRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StatusTravelRequests.
     */
    data: XOR<StatusTravelRequestUpdateManyMutationInput, StatusTravelRequestUncheckedUpdateManyInput>
    /**
     * Filter which StatusTravelRequests to update
     */
    where?: StatusTravelRequestWhereInput
    /**
     * Limit how many StatusTravelRequests to update.
     */
    limit?: number
  }

  /**
   * StatusTravelRequest upsert
   */
  export type StatusTravelRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusTravelRequest
     */
    select?: StatusTravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusTravelRequest
     */
    omit?: StatusTravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusTravelRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the StatusTravelRequest to update in case it exists.
     */
    where: StatusTravelRequestWhereUniqueInput
    /**
     * In case the StatusTravelRequest found by the `where` argument doesn't exist, create a new StatusTravelRequest with this data.
     */
    create: XOR<StatusTravelRequestCreateInput, StatusTravelRequestUncheckedCreateInput>
    /**
     * In case the StatusTravelRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StatusTravelRequestUpdateInput, StatusTravelRequestUncheckedUpdateInput>
  }

  /**
   * StatusTravelRequest delete
   */
  export type StatusTravelRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusTravelRequest
     */
    select?: StatusTravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusTravelRequest
     */
    omit?: StatusTravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusTravelRequestInclude<ExtArgs> | null
    /**
     * Filter which StatusTravelRequest to delete.
     */
    where: StatusTravelRequestWhereUniqueInput
  }

  /**
   * StatusTravelRequest deleteMany
   */
  export type StatusTravelRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StatusTravelRequests to delete
     */
    where?: StatusTravelRequestWhereInput
    /**
     * Limit how many StatusTravelRequests to delete.
     */
    limit?: number
  }

  /**
   * StatusTravelRequest.travelRequests
   */
  export type StatusTravelRequest$travelRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelRequest
     */
    select?: TravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelRequest
     */
    omit?: TravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelRequestInclude<ExtArgs> | null
    where?: TravelRequestWhereInput
    orderBy?: TravelRequestOrderByWithRelationInput | TravelRequestOrderByWithRelationInput[]
    cursor?: TravelRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TravelRequestScalarFieldEnum | TravelRequestScalarFieldEnum[]
  }

  /**
   * StatusTravelRequest without action
   */
  export type StatusTravelRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusTravelRequest
     */
    select?: StatusTravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StatusTravelRequest
     */
    omit?: StatusTravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusTravelRequestInclude<ExtArgs> | null
  }


  /**
   * Model TravelRequest
   */

  export type AggregateTravelRequest = {
    _count: TravelRequestCountAggregateOutputType | null
    _avg: TravelRequestAvgAggregateOutputType | null
    _sum: TravelRequestSumAggregateOutputType | null
    _min: TravelRequestMinAggregateOutputType | null
    _max: TravelRequestMaxAggregateOutputType | null
  }

  export type TravelRequestAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    statusId: number | null
    cardId: number | null
    totalAmount: Decimal | null
    approverId: number | null
  }

  export type TravelRequestSumAggregateOutputType = {
    id: number | null
    userId: number | null
    statusId: number | null
    cardId: number | null
    totalAmount: Decimal | null
    approverId: number | null
  }

  export type TravelRequestMinAggregateOutputType = {
    id: number | null
    userId: number | null
    statusId: number | null
    cardId: number | null
    totalAmount: Decimal | null
    travelReason: string | null
    travelObjectives: string | null
    departureDate: Date | null
    returnDate: Date | null
    disbursementDate: Date | null
    approvalDate: Date | null
    approverId: number | null
    comment: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TravelRequestMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    statusId: number | null
    cardId: number | null
    totalAmount: Decimal | null
    travelReason: string | null
    travelObjectives: string | null
    departureDate: Date | null
    returnDate: Date | null
    disbursementDate: Date | null
    approvalDate: Date | null
    approverId: number | null
    comment: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TravelRequestCountAggregateOutputType = {
    id: number
    userId: number
    statusId: number
    cardId: number
    totalAmount: number
    travelReason: number
    travelObjectives: number
    departureDate: number
    returnDate: number
    disbursementDate: number
    approvalDate: number
    approverId: number
    comment: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TravelRequestAvgAggregateInputType = {
    id?: true
    userId?: true
    statusId?: true
    cardId?: true
    totalAmount?: true
    approverId?: true
  }

  export type TravelRequestSumAggregateInputType = {
    id?: true
    userId?: true
    statusId?: true
    cardId?: true
    totalAmount?: true
    approverId?: true
  }

  export type TravelRequestMinAggregateInputType = {
    id?: true
    userId?: true
    statusId?: true
    cardId?: true
    totalAmount?: true
    travelReason?: true
    travelObjectives?: true
    departureDate?: true
    returnDate?: true
    disbursementDate?: true
    approvalDate?: true
    approverId?: true
    comment?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TravelRequestMaxAggregateInputType = {
    id?: true
    userId?: true
    statusId?: true
    cardId?: true
    totalAmount?: true
    travelReason?: true
    travelObjectives?: true
    departureDate?: true
    returnDate?: true
    disbursementDate?: true
    approvalDate?: true
    approverId?: true
    comment?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TravelRequestCountAggregateInputType = {
    id?: true
    userId?: true
    statusId?: true
    cardId?: true
    totalAmount?: true
    travelReason?: true
    travelObjectives?: true
    departureDate?: true
    returnDate?: true
    disbursementDate?: true
    approvalDate?: true
    approverId?: true
    comment?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TravelRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TravelRequest to aggregate.
     */
    where?: TravelRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelRequests to fetch.
     */
    orderBy?: TravelRequestOrderByWithRelationInput | TravelRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TravelRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TravelRequests
    **/
    _count?: true | TravelRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TravelRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TravelRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TravelRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TravelRequestMaxAggregateInputType
  }

  export type GetTravelRequestAggregateType<T extends TravelRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateTravelRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTravelRequest[P]>
      : GetScalarType<T[P], AggregateTravelRequest[P]>
  }




  export type TravelRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelRequestWhereInput
    orderBy?: TravelRequestOrderByWithAggregationInput | TravelRequestOrderByWithAggregationInput[]
    by: TravelRequestScalarFieldEnum[] | TravelRequestScalarFieldEnum
    having?: TravelRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TravelRequestCountAggregateInputType | true
    _avg?: TravelRequestAvgAggregateInputType
    _sum?: TravelRequestSumAggregateInputType
    _min?: TravelRequestMinAggregateInputType
    _max?: TravelRequestMaxAggregateInputType
  }

  export type TravelRequestGroupByOutputType = {
    id: number
    userId: number
    statusId: number
    cardId: number | null
    totalAmount: Decimal
    travelReason: string
    travelObjectives: string
    departureDate: Date
    returnDate: Date
    disbursementDate: Date | null
    approvalDate: Date | null
    approverId: number | null
    comment: string | null
    createdAt: Date
    updatedAt: Date
    _count: TravelRequestCountAggregateOutputType | null
    _avg: TravelRequestAvgAggregateOutputType | null
    _sum: TravelRequestSumAggregateOutputType | null
    _min: TravelRequestMinAggregateOutputType | null
    _max: TravelRequestMaxAggregateOutputType | null
  }

  type GetTravelRequestGroupByPayload<T extends TravelRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TravelRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TravelRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TravelRequestGroupByOutputType[P]>
            : GetScalarType<T[P], TravelRequestGroupByOutputType[P]>
        }
      >
    >


  export type TravelRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    statusId?: boolean
    cardId?: boolean
    totalAmount?: boolean
    travelReason?: boolean
    travelObjectives?: boolean
    departureDate?: boolean
    returnDate?: boolean
    disbursementDate?: boolean
    approvalDate?: boolean
    approverId?: boolean
    comment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    status?: boolean | StatusTravelRequestDefaultArgs<ExtArgs>
    approver?: boolean | TravelRequest$approverArgs<ExtArgs>
    card?: boolean | TravelRequest$cardArgs<ExtArgs>
    details?: boolean | TravelRequest$detailsArgs<ExtArgs>
    _count?: boolean | TravelRequestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelRequest"]>



  export type TravelRequestSelectScalar = {
    id?: boolean
    userId?: boolean
    statusId?: boolean
    cardId?: boolean
    totalAmount?: boolean
    travelReason?: boolean
    travelObjectives?: boolean
    departureDate?: boolean
    returnDate?: boolean
    disbursementDate?: boolean
    approvalDate?: boolean
    approverId?: boolean
    comment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TravelRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "statusId" | "cardId" | "totalAmount" | "travelReason" | "travelObjectives" | "departureDate" | "returnDate" | "disbursementDate" | "approvalDate" | "approverId" | "comment" | "createdAt" | "updatedAt", ExtArgs["result"]["travelRequest"]>
  export type TravelRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    status?: boolean | StatusTravelRequestDefaultArgs<ExtArgs>
    approver?: boolean | TravelRequest$approverArgs<ExtArgs>
    card?: boolean | TravelRequest$cardArgs<ExtArgs>
    details?: boolean | TravelRequest$detailsArgs<ExtArgs>
    _count?: boolean | TravelRequestCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TravelRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TravelRequest"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      status: Prisma.$StatusTravelRequestPayload<ExtArgs>
      approver: Prisma.$UserPayload<ExtArgs> | null
      card: Prisma.$CardPayload<ExtArgs> | null
      details: Prisma.$TravelDetailPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      statusId: number
      cardId: number | null
      totalAmount: Prisma.Decimal
      travelReason: string
      travelObjectives: string
      departureDate: Date
      returnDate: Date
      disbursementDate: Date | null
      approvalDate: Date | null
      approverId: number | null
      comment: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["travelRequest"]>
    composites: {}
  }

  type TravelRequestGetPayload<S extends boolean | null | undefined | TravelRequestDefaultArgs> = $Result.GetResult<Prisma.$TravelRequestPayload, S>

  type TravelRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TravelRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TravelRequestCountAggregateInputType | true
    }

  export interface TravelRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TravelRequest'], meta: { name: 'TravelRequest' } }
    /**
     * Find zero or one TravelRequest that matches the filter.
     * @param {TravelRequestFindUniqueArgs} args - Arguments to find a TravelRequest
     * @example
     * // Get one TravelRequest
     * const travelRequest = await prisma.travelRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TravelRequestFindUniqueArgs>(args: SelectSubset<T, TravelRequestFindUniqueArgs<ExtArgs>>): Prisma__TravelRequestClient<$Result.GetResult<Prisma.$TravelRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TravelRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TravelRequestFindUniqueOrThrowArgs} args - Arguments to find a TravelRequest
     * @example
     * // Get one TravelRequest
     * const travelRequest = await prisma.travelRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TravelRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, TravelRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TravelRequestClient<$Result.GetResult<Prisma.$TravelRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TravelRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelRequestFindFirstArgs} args - Arguments to find a TravelRequest
     * @example
     * // Get one TravelRequest
     * const travelRequest = await prisma.travelRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TravelRequestFindFirstArgs>(args?: SelectSubset<T, TravelRequestFindFirstArgs<ExtArgs>>): Prisma__TravelRequestClient<$Result.GetResult<Prisma.$TravelRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TravelRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelRequestFindFirstOrThrowArgs} args - Arguments to find a TravelRequest
     * @example
     * // Get one TravelRequest
     * const travelRequest = await prisma.travelRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TravelRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, TravelRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__TravelRequestClient<$Result.GetResult<Prisma.$TravelRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TravelRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TravelRequests
     * const travelRequests = await prisma.travelRequest.findMany()
     * 
     * // Get first 10 TravelRequests
     * const travelRequests = await prisma.travelRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const travelRequestWithIdOnly = await prisma.travelRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TravelRequestFindManyArgs>(args?: SelectSubset<T, TravelRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TravelRequest.
     * @param {TravelRequestCreateArgs} args - Arguments to create a TravelRequest.
     * @example
     * // Create one TravelRequest
     * const TravelRequest = await prisma.travelRequest.create({
     *   data: {
     *     // ... data to create a TravelRequest
     *   }
     * })
     * 
     */
    create<T extends TravelRequestCreateArgs>(args: SelectSubset<T, TravelRequestCreateArgs<ExtArgs>>): Prisma__TravelRequestClient<$Result.GetResult<Prisma.$TravelRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TravelRequests.
     * @param {TravelRequestCreateManyArgs} args - Arguments to create many TravelRequests.
     * @example
     * // Create many TravelRequests
     * const travelRequest = await prisma.travelRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TravelRequestCreateManyArgs>(args?: SelectSubset<T, TravelRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TravelRequest.
     * @param {TravelRequestDeleteArgs} args - Arguments to delete one TravelRequest.
     * @example
     * // Delete one TravelRequest
     * const TravelRequest = await prisma.travelRequest.delete({
     *   where: {
     *     // ... filter to delete one TravelRequest
     *   }
     * })
     * 
     */
    delete<T extends TravelRequestDeleteArgs>(args: SelectSubset<T, TravelRequestDeleteArgs<ExtArgs>>): Prisma__TravelRequestClient<$Result.GetResult<Prisma.$TravelRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TravelRequest.
     * @param {TravelRequestUpdateArgs} args - Arguments to update one TravelRequest.
     * @example
     * // Update one TravelRequest
     * const travelRequest = await prisma.travelRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TravelRequestUpdateArgs>(args: SelectSubset<T, TravelRequestUpdateArgs<ExtArgs>>): Prisma__TravelRequestClient<$Result.GetResult<Prisma.$TravelRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TravelRequests.
     * @param {TravelRequestDeleteManyArgs} args - Arguments to filter TravelRequests to delete.
     * @example
     * // Delete a few TravelRequests
     * const { count } = await prisma.travelRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TravelRequestDeleteManyArgs>(args?: SelectSubset<T, TravelRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TravelRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TravelRequests
     * const travelRequest = await prisma.travelRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TravelRequestUpdateManyArgs>(args: SelectSubset<T, TravelRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TravelRequest.
     * @param {TravelRequestUpsertArgs} args - Arguments to update or create a TravelRequest.
     * @example
     * // Update or create a TravelRequest
     * const travelRequest = await prisma.travelRequest.upsert({
     *   create: {
     *     // ... data to create a TravelRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TravelRequest we want to update
     *   }
     * })
     */
    upsert<T extends TravelRequestUpsertArgs>(args: SelectSubset<T, TravelRequestUpsertArgs<ExtArgs>>): Prisma__TravelRequestClient<$Result.GetResult<Prisma.$TravelRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TravelRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelRequestCountArgs} args - Arguments to filter TravelRequests to count.
     * @example
     * // Count the number of TravelRequests
     * const count = await prisma.travelRequest.count({
     *   where: {
     *     // ... the filter for the TravelRequests we want to count
     *   }
     * })
    **/
    count<T extends TravelRequestCountArgs>(
      args?: Subset<T, TravelRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TravelRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TravelRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TravelRequestAggregateArgs>(args: Subset<T, TravelRequestAggregateArgs>): Prisma.PrismaPromise<GetTravelRequestAggregateType<T>>

    /**
     * Group by TravelRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TravelRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TravelRequestGroupByArgs['orderBy'] }
        : { orderBy?: TravelRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TravelRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTravelRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TravelRequest model
   */
  readonly fields: TravelRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TravelRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TravelRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    status<T extends StatusTravelRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StatusTravelRequestDefaultArgs<ExtArgs>>): Prisma__StatusTravelRequestClient<$Result.GetResult<Prisma.$StatusTravelRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    approver<T extends TravelRequest$approverArgs<ExtArgs> = {}>(args?: Subset<T, TravelRequest$approverArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    card<T extends TravelRequest$cardArgs<ExtArgs> = {}>(args?: Subset<T, TravelRequest$cardArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    details<T extends TravelRequest$detailsArgs<ExtArgs> = {}>(args?: Subset<T, TravelRequest$detailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TravelRequest model
   */
  interface TravelRequestFieldRefs {
    readonly id: FieldRef<"TravelRequest", 'Int'>
    readonly userId: FieldRef<"TravelRequest", 'Int'>
    readonly statusId: FieldRef<"TravelRequest", 'Int'>
    readonly cardId: FieldRef<"TravelRequest", 'Int'>
    readonly totalAmount: FieldRef<"TravelRequest", 'Decimal'>
    readonly travelReason: FieldRef<"TravelRequest", 'String'>
    readonly travelObjectives: FieldRef<"TravelRequest", 'String'>
    readonly departureDate: FieldRef<"TravelRequest", 'DateTime'>
    readonly returnDate: FieldRef<"TravelRequest", 'DateTime'>
    readonly disbursementDate: FieldRef<"TravelRequest", 'DateTime'>
    readonly approvalDate: FieldRef<"TravelRequest", 'DateTime'>
    readonly approverId: FieldRef<"TravelRequest", 'Int'>
    readonly comment: FieldRef<"TravelRequest", 'String'>
    readonly createdAt: FieldRef<"TravelRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"TravelRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TravelRequest findUnique
   */
  export type TravelRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelRequest
     */
    select?: TravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelRequest
     */
    omit?: TravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelRequestInclude<ExtArgs> | null
    /**
     * Filter, which TravelRequest to fetch.
     */
    where: TravelRequestWhereUniqueInput
  }

  /**
   * TravelRequest findUniqueOrThrow
   */
  export type TravelRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelRequest
     */
    select?: TravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelRequest
     */
    omit?: TravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelRequestInclude<ExtArgs> | null
    /**
     * Filter, which TravelRequest to fetch.
     */
    where: TravelRequestWhereUniqueInput
  }

  /**
   * TravelRequest findFirst
   */
  export type TravelRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelRequest
     */
    select?: TravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelRequest
     */
    omit?: TravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelRequestInclude<ExtArgs> | null
    /**
     * Filter, which TravelRequest to fetch.
     */
    where?: TravelRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelRequests to fetch.
     */
    orderBy?: TravelRequestOrderByWithRelationInput | TravelRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TravelRequests.
     */
    cursor?: TravelRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TravelRequests.
     */
    distinct?: TravelRequestScalarFieldEnum | TravelRequestScalarFieldEnum[]
  }

  /**
   * TravelRequest findFirstOrThrow
   */
  export type TravelRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelRequest
     */
    select?: TravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelRequest
     */
    omit?: TravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelRequestInclude<ExtArgs> | null
    /**
     * Filter, which TravelRequest to fetch.
     */
    where?: TravelRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelRequests to fetch.
     */
    orderBy?: TravelRequestOrderByWithRelationInput | TravelRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TravelRequests.
     */
    cursor?: TravelRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TravelRequests.
     */
    distinct?: TravelRequestScalarFieldEnum | TravelRequestScalarFieldEnum[]
  }

  /**
   * TravelRequest findMany
   */
  export type TravelRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelRequest
     */
    select?: TravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelRequest
     */
    omit?: TravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelRequestInclude<ExtArgs> | null
    /**
     * Filter, which TravelRequests to fetch.
     */
    where?: TravelRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelRequests to fetch.
     */
    orderBy?: TravelRequestOrderByWithRelationInput | TravelRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TravelRequests.
     */
    cursor?: TravelRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelRequests.
     */
    skip?: number
    distinct?: TravelRequestScalarFieldEnum | TravelRequestScalarFieldEnum[]
  }

  /**
   * TravelRequest create
   */
  export type TravelRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelRequest
     */
    select?: TravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelRequest
     */
    omit?: TravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a TravelRequest.
     */
    data: XOR<TravelRequestCreateInput, TravelRequestUncheckedCreateInput>
  }

  /**
   * TravelRequest createMany
   */
  export type TravelRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TravelRequests.
     */
    data: TravelRequestCreateManyInput | TravelRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TravelRequest update
   */
  export type TravelRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelRequest
     */
    select?: TravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelRequest
     */
    omit?: TravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a TravelRequest.
     */
    data: XOR<TravelRequestUpdateInput, TravelRequestUncheckedUpdateInput>
    /**
     * Choose, which TravelRequest to update.
     */
    where: TravelRequestWhereUniqueInput
  }

  /**
   * TravelRequest updateMany
   */
  export type TravelRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TravelRequests.
     */
    data: XOR<TravelRequestUpdateManyMutationInput, TravelRequestUncheckedUpdateManyInput>
    /**
     * Filter which TravelRequests to update
     */
    where?: TravelRequestWhereInput
    /**
     * Limit how many TravelRequests to update.
     */
    limit?: number
  }

  /**
   * TravelRequest upsert
   */
  export type TravelRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelRequest
     */
    select?: TravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelRequest
     */
    omit?: TravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the TravelRequest to update in case it exists.
     */
    where: TravelRequestWhereUniqueInput
    /**
     * In case the TravelRequest found by the `where` argument doesn't exist, create a new TravelRequest with this data.
     */
    create: XOR<TravelRequestCreateInput, TravelRequestUncheckedCreateInput>
    /**
     * In case the TravelRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TravelRequestUpdateInput, TravelRequestUncheckedUpdateInput>
  }

  /**
   * TravelRequest delete
   */
  export type TravelRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelRequest
     */
    select?: TravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelRequest
     */
    omit?: TravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelRequestInclude<ExtArgs> | null
    /**
     * Filter which TravelRequest to delete.
     */
    where: TravelRequestWhereUniqueInput
  }

  /**
   * TravelRequest deleteMany
   */
  export type TravelRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TravelRequests to delete
     */
    where?: TravelRequestWhereInput
    /**
     * Limit how many TravelRequests to delete.
     */
    limit?: number
  }

  /**
   * TravelRequest.approver
   */
  export type TravelRequest$approverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * TravelRequest.card
   */
  export type TravelRequest$cardArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Card
     */
    omit?: CardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    where?: CardWhereInput
  }

  /**
   * TravelRequest.details
   */
  export type TravelRequest$detailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelDetail
     */
    select?: TravelDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelDetail
     */
    omit?: TravelDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelDetailInclude<ExtArgs> | null
    where?: TravelDetailWhereInput
    orderBy?: TravelDetailOrderByWithRelationInput | TravelDetailOrderByWithRelationInput[]
    cursor?: TravelDetailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TravelDetailScalarFieldEnum | TravelDetailScalarFieldEnum[]
  }

  /**
   * TravelRequest without action
   */
  export type TravelRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelRequest
     */
    select?: TravelRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelRequest
     */
    omit?: TravelRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelRequestInclude<ExtArgs> | null
  }


  /**
   * Model TravelDetail
   */

  export type AggregateTravelDetail = {
    _count: TravelDetailCountAggregateOutputType | null
    _avg: TravelDetailAvgAggregateOutputType | null
    _sum: TravelDetailSumAggregateOutputType | null
    _min: TravelDetailMinAggregateOutputType | null
    _max: TravelDetailMaxAggregateOutputType | null
  }

  export type TravelDetailAvgAggregateOutputType = {
    id: number | null
    travelRequestId: number | null
    amount: Decimal | null
  }

  export type TravelDetailSumAggregateOutputType = {
    id: number | null
    travelRequestId: number | null
    amount: Decimal | null
  }

  export type TravelDetailMinAggregateOutputType = {
    id: number | null
    travelRequestId: number | null
    concept: string | null
    amount: Decimal | null
  }

  export type TravelDetailMaxAggregateOutputType = {
    id: number | null
    travelRequestId: number | null
    concept: string | null
    amount: Decimal | null
  }

  export type TravelDetailCountAggregateOutputType = {
    id: number
    travelRequestId: number
    concept: number
    amount: number
    _all: number
  }


  export type TravelDetailAvgAggregateInputType = {
    id?: true
    travelRequestId?: true
    amount?: true
  }

  export type TravelDetailSumAggregateInputType = {
    id?: true
    travelRequestId?: true
    amount?: true
  }

  export type TravelDetailMinAggregateInputType = {
    id?: true
    travelRequestId?: true
    concept?: true
    amount?: true
  }

  export type TravelDetailMaxAggregateInputType = {
    id?: true
    travelRequestId?: true
    concept?: true
    amount?: true
  }

  export type TravelDetailCountAggregateInputType = {
    id?: true
    travelRequestId?: true
    concept?: true
    amount?: true
    _all?: true
  }

  export type TravelDetailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TravelDetail to aggregate.
     */
    where?: TravelDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelDetails to fetch.
     */
    orderBy?: TravelDetailOrderByWithRelationInput | TravelDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TravelDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TravelDetails
    **/
    _count?: true | TravelDetailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TravelDetailAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TravelDetailSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TravelDetailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TravelDetailMaxAggregateInputType
  }

  export type GetTravelDetailAggregateType<T extends TravelDetailAggregateArgs> = {
        [P in keyof T & keyof AggregateTravelDetail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTravelDetail[P]>
      : GetScalarType<T[P], AggregateTravelDetail[P]>
  }




  export type TravelDetailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelDetailWhereInput
    orderBy?: TravelDetailOrderByWithAggregationInput | TravelDetailOrderByWithAggregationInput[]
    by: TravelDetailScalarFieldEnum[] | TravelDetailScalarFieldEnum
    having?: TravelDetailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TravelDetailCountAggregateInputType | true
    _avg?: TravelDetailAvgAggregateInputType
    _sum?: TravelDetailSumAggregateInputType
    _min?: TravelDetailMinAggregateInputType
    _max?: TravelDetailMaxAggregateInputType
  }

  export type TravelDetailGroupByOutputType = {
    id: number
    travelRequestId: number
    concept: string
    amount: Decimal
    _count: TravelDetailCountAggregateOutputType | null
    _avg: TravelDetailAvgAggregateOutputType | null
    _sum: TravelDetailSumAggregateOutputType | null
    _min: TravelDetailMinAggregateOutputType | null
    _max: TravelDetailMaxAggregateOutputType | null
  }

  type GetTravelDetailGroupByPayload<T extends TravelDetailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TravelDetailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TravelDetailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TravelDetailGroupByOutputType[P]>
            : GetScalarType<T[P], TravelDetailGroupByOutputType[P]>
        }
      >
    >


  export type TravelDetailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    travelRequestId?: boolean
    concept?: boolean
    amount?: boolean
    request?: boolean | TravelRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelDetail"]>



  export type TravelDetailSelectScalar = {
    id?: boolean
    travelRequestId?: boolean
    concept?: boolean
    amount?: boolean
  }

  export type TravelDetailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "travelRequestId" | "concept" | "amount", ExtArgs["result"]["travelDetail"]>
  export type TravelDetailInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | TravelRequestDefaultArgs<ExtArgs>
  }

  export type $TravelDetailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TravelDetail"
    objects: {
      request: Prisma.$TravelRequestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      travelRequestId: number
      concept: string
      amount: Prisma.Decimal
    }, ExtArgs["result"]["travelDetail"]>
    composites: {}
  }

  type TravelDetailGetPayload<S extends boolean | null | undefined | TravelDetailDefaultArgs> = $Result.GetResult<Prisma.$TravelDetailPayload, S>

  type TravelDetailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TravelDetailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TravelDetailCountAggregateInputType | true
    }

  export interface TravelDetailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TravelDetail'], meta: { name: 'TravelDetail' } }
    /**
     * Find zero or one TravelDetail that matches the filter.
     * @param {TravelDetailFindUniqueArgs} args - Arguments to find a TravelDetail
     * @example
     * // Get one TravelDetail
     * const travelDetail = await prisma.travelDetail.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TravelDetailFindUniqueArgs>(args: SelectSubset<T, TravelDetailFindUniqueArgs<ExtArgs>>): Prisma__TravelDetailClient<$Result.GetResult<Prisma.$TravelDetailPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TravelDetail that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TravelDetailFindUniqueOrThrowArgs} args - Arguments to find a TravelDetail
     * @example
     * // Get one TravelDetail
     * const travelDetail = await prisma.travelDetail.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TravelDetailFindUniqueOrThrowArgs>(args: SelectSubset<T, TravelDetailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TravelDetailClient<$Result.GetResult<Prisma.$TravelDetailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TravelDetail that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelDetailFindFirstArgs} args - Arguments to find a TravelDetail
     * @example
     * // Get one TravelDetail
     * const travelDetail = await prisma.travelDetail.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TravelDetailFindFirstArgs>(args?: SelectSubset<T, TravelDetailFindFirstArgs<ExtArgs>>): Prisma__TravelDetailClient<$Result.GetResult<Prisma.$TravelDetailPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TravelDetail that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelDetailFindFirstOrThrowArgs} args - Arguments to find a TravelDetail
     * @example
     * // Get one TravelDetail
     * const travelDetail = await prisma.travelDetail.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TravelDetailFindFirstOrThrowArgs>(args?: SelectSubset<T, TravelDetailFindFirstOrThrowArgs<ExtArgs>>): Prisma__TravelDetailClient<$Result.GetResult<Prisma.$TravelDetailPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TravelDetails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelDetailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TravelDetails
     * const travelDetails = await prisma.travelDetail.findMany()
     * 
     * // Get first 10 TravelDetails
     * const travelDetails = await prisma.travelDetail.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const travelDetailWithIdOnly = await prisma.travelDetail.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TravelDetailFindManyArgs>(args?: SelectSubset<T, TravelDetailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TravelDetail.
     * @param {TravelDetailCreateArgs} args - Arguments to create a TravelDetail.
     * @example
     * // Create one TravelDetail
     * const TravelDetail = await prisma.travelDetail.create({
     *   data: {
     *     // ... data to create a TravelDetail
     *   }
     * })
     * 
     */
    create<T extends TravelDetailCreateArgs>(args: SelectSubset<T, TravelDetailCreateArgs<ExtArgs>>): Prisma__TravelDetailClient<$Result.GetResult<Prisma.$TravelDetailPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TravelDetails.
     * @param {TravelDetailCreateManyArgs} args - Arguments to create many TravelDetails.
     * @example
     * // Create many TravelDetails
     * const travelDetail = await prisma.travelDetail.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TravelDetailCreateManyArgs>(args?: SelectSubset<T, TravelDetailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TravelDetail.
     * @param {TravelDetailDeleteArgs} args - Arguments to delete one TravelDetail.
     * @example
     * // Delete one TravelDetail
     * const TravelDetail = await prisma.travelDetail.delete({
     *   where: {
     *     // ... filter to delete one TravelDetail
     *   }
     * })
     * 
     */
    delete<T extends TravelDetailDeleteArgs>(args: SelectSubset<T, TravelDetailDeleteArgs<ExtArgs>>): Prisma__TravelDetailClient<$Result.GetResult<Prisma.$TravelDetailPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TravelDetail.
     * @param {TravelDetailUpdateArgs} args - Arguments to update one TravelDetail.
     * @example
     * // Update one TravelDetail
     * const travelDetail = await prisma.travelDetail.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TravelDetailUpdateArgs>(args: SelectSubset<T, TravelDetailUpdateArgs<ExtArgs>>): Prisma__TravelDetailClient<$Result.GetResult<Prisma.$TravelDetailPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TravelDetails.
     * @param {TravelDetailDeleteManyArgs} args - Arguments to filter TravelDetails to delete.
     * @example
     * // Delete a few TravelDetails
     * const { count } = await prisma.travelDetail.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TravelDetailDeleteManyArgs>(args?: SelectSubset<T, TravelDetailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TravelDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelDetailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TravelDetails
     * const travelDetail = await prisma.travelDetail.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TravelDetailUpdateManyArgs>(args: SelectSubset<T, TravelDetailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TravelDetail.
     * @param {TravelDetailUpsertArgs} args - Arguments to update or create a TravelDetail.
     * @example
     * // Update or create a TravelDetail
     * const travelDetail = await prisma.travelDetail.upsert({
     *   create: {
     *     // ... data to create a TravelDetail
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TravelDetail we want to update
     *   }
     * })
     */
    upsert<T extends TravelDetailUpsertArgs>(args: SelectSubset<T, TravelDetailUpsertArgs<ExtArgs>>): Prisma__TravelDetailClient<$Result.GetResult<Prisma.$TravelDetailPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TravelDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelDetailCountArgs} args - Arguments to filter TravelDetails to count.
     * @example
     * // Count the number of TravelDetails
     * const count = await prisma.travelDetail.count({
     *   where: {
     *     // ... the filter for the TravelDetails we want to count
     *   }
     * })
    **/
    count<T extends TravelDetailCountArgs>(
      args?: Subset<T, TravelDetailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TravelDetailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TravelDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelDetailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TravelDetailAggregateArgs>(args: Subset<T, TravelDetailAggregateArgs>): Prisma.PrismaPromise<GetTravelDetailAggregateType<T>>

    /**
     * Group by TravelDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelDetailGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TravelDetailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TravelDetailGroupByArgs['orderBy'] }
        : { orderBy?: TravelDetailGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TravelDetailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTravelDetailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TravelDetail model
   */
  readonly fields: TravelDetailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TravelDetail.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TravelDetailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    request<T extends TravelRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TravelRequestDefaultArgs<ExtArgs>>): Prisma__TravelRequestClient<$Result.GetResult<Prisma.$TravelRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TravelDetail model
   */
  interface TravelDetailFieldRefs {
    readonly id: FieldRef<"TravelDetail", 'Int'>
    readonly travelRequestId: FieldRef<"TravelDetail", 'Int'>
    readonly concept: FieldRef<"TravelDetail", 'String'>
    readonly amount: FieldRef<"TravelDetail", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * TravelDetail findUnique
   */
  export type TravelDetailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelDetail
     */
    select?: TravelDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelDetail
     */
    omit?: TravelDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelDetailInclude<ExtArgs> | null
    /**
     * Filter, which TravelDetail to fetch.
     */
    where: TravelDetailWhereUniqueInput
  }

  /**
   * TravelDetail findUniqueOrThrow
   */
  export type TravelDetailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelDetail
     */
    select?: TravelDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelDetail
     */
    omit?: TravelDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelDetailInclude<ExtArgs> | null
    /**
     * Filter, which TravelDetail to fetch.
     */
    where: TravelDetailWhereUniqueInput
  }

  /**
   * TravelDetail findFirst
   */
  export type TravelDetailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelDetail
     */
    select?: TravelDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelDetail
     */
    omit?: TravelDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelDetailInclude<ExtArgs> | null
    /**
     * Filter, which TravelDetail to fetch.
     */
    where?: TravelDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelDetails to fetch.
     */
    orderBy?: TravelDetailOrderByWithRelationInput | TravelDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TravelDetails.
     */
    cursor?: TravelDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TravelDetails.
     */
    distinct?: TravelDetailScalarFieldEnum | TravelDetailScalarFieldEnum[]
  }

  /**
   * TravelDetail findFirstOrThrow
   */
  export type TravelDetailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelDetail
     */
    select?: TravelDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelDetail
     */
    omit?: TravelDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelDetailInclude<ExtArgs> | null
    /**
     * Filter, which TravelDetail to fetch.
     */
    where?: TravelDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelDetails to fetch.
     */
    orderBy?: TravelDetailOrderByWithRelationInput | TravelDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TravelDetails.
     */
    cursor?: TravelDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TravelDetails.
     */
    distinct?: TravelDetailScalarFieldEnum | TravelDetailScalarFieldEnum[]
  }

  /**
   * TravelDetail findMany
   */
  export type TravelDetailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelDetail
     */
    select?: TravelDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelDetail
     */
    omit?: TravelDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelDetailInclude<ExtArgs> | null
    /**
     * Filter, which TravelDetails to fetch.
     */
    where?: TravelDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelDetails to fetch.
     */
    orderBy?: TravelDetailOrderByWithRelationInput | TravelDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TravelDetails.
     */
    cursor?: TravelDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelDetails.
     */
    skip?: number
    distinct?: TravelDetailScalarFieldEnum | TravelDetailScalarFieldEnum[]
  }

  /**
   * TravelDetail create
   */
  export type TravelDetailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelDetail
     */
    select?: TravelDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelDetail
     */
    omit?: TravelDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelDetailInclude<ExtArgs> | null
    /**
     * The data needed to create a TravelDetail.
     */
    data: XOR<TravelDetailCreateInput, TravelDetailUncheckedCreateInput>
  }

  /**
   * TravelDetail createMany
   */
  export type TravelDetailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TravelDetails.
     */
    data: TravelDetailCreateManyInput | TravelDetailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TravelDetail update
   */
  export type TravelDetailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelDetail
     */
    select?: TravelDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelDetail
     */
    omit?: TravelDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelDetailInclude<ExtArgs> | null
    /**
     * The data needed to update a TravelDetail.
     */
    data: XOR<TravelDetailUpdateInput, TravelDetailUncheckedUpdateInput>
    /**
     * Choose, which TravelDetail to update.
     */
    where: TravelDetailWhereUniqueInput
  }

  /**
   * TravelDetail updateMany
   */
  export type TravelDetailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TravelDetails.
     */
    data: XOR<TravelDetailUpdateManyMutationInput, TravelDetailUncheckedUpdateManyInput>
    /**
     * Filter which TravelDetails to update
     */
    where?: TravelDetailWhereInput
    /**
     * Limit how many TravelDetails to update.
     */
    limit?: number
  }

  /**
   * TravelDetail upsert
   */
  export type TravelDetailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelDetail
     */
    select?: TravelDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelDetail
     */
    omit?: TravelDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelDetailInclude<ExtArgs> | null
    /**
     * The filter to search for the TravelDetail to update in case it exists.
     */
    where: TravelDetailWhereUniqueInput
    /**
     * In case the TravelDetail found by the `where` argument doesn't exist, create a new TravelDetail with this data.
     */
    create: XOR<TravelDetailCreateInput, TravelDetailUncheckedCreateInput>
    /**
     * In case the TravelDetail was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TravelDetailUpdateInput, TravelDetailUncheckedUpdateInput>
  }

  /**
   * TravelDetail delete
   */
  export type TravelDetailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelDetail
     */
    select?: TravelDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelDetail
     */
    omit?: TravelDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelDetailInclude<ExtArgs> | null
    /**
     * Filter which TravelDetail to delete.
     */
    where: TravelDetailWhereUniqueInput
  }

  /**
   * TravelDetail deleteMany
   */
  export type TravelDetailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TravelDetails to delete
     */
    where?: TravelDetailWhereInput
    /**
     * Limit how many TravelDetails to delete.
     */
    limit?: number
  }

  /**
   * TravelDetail without action
   */
  export type TravelDetailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelDetail
     */
    select?: TravelDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelDetail
     */
    omit?: TravelDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelDetailInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const BranchScalarFieldEnum: {
    id: 'id',
    name: 'name',
    companyId: 'companyId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BranchScalarFieldEnum = (typeof BranchScalarFieldEnum)[keyof typeof BranchScalarFieldEnum]


  export const AreaScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AreaScalarFieldEnum = (typeof AreaScalarFieldEnum)[keyof typeof AreaScalarFieldEnum]


  export const RoleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    paternalSurname: 'paternalSurname',
    maternalSurname: 'maternalSurname',
    email: 'email',
    password: 'password',
    isActive: 'isActive',
    companyId: 'companyId',
    branchId: 'branchId',
    areaId: 'areaId',
    roleId: 'roleId',
    supervisorId: 'supervisorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CardScalarFieldEnum: {
    id: 'id',
    cardNumber: 'cardNumber',
    companyId: 'companyId',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type CardScalarFieldEnum = (typeof CardScalarFieldEnum)[keyof typeof CardScalarFieldEnum]


  export const CardAssignmentScalarFieldEnum: {
    id: 'id',
    cardId: 'cardId',
    userId: 'userId',
    assignedAt: 'assignedAt',
    unassignedAt: 'unassignedAt'
  };

  export type CardAssignmentScalarFieldEnum = (typeof CardAssignmentScalarFieldEnum)[keyof typeof CardAssignmentScalarFieldEnum]


  export const StatusTravelRequestScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type StatusTravelRequestScalarFieldEnum = (typeof StatusTravelRequestScalarFieldEnum)[keyof typeof StatusTravelRequestScalarFieldEnum]


  export const TravelRequestScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    statusId: 'statusId',
    cardId: 'cardId',
    totalAmount: 'totalAmount',
    travelReason: 'travelReason',
    travelObjectives: 'travelObjectives',
    departureDate: 'departureDate',
    returnDate: 'returnDate',
    disbursementDate: 'disbursementDate',
    approvalDate: 'approvalDate',
    approverId: 'approverId',
    comment: 'comment',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TravelRequestScalarFieldEnum = (typeof TravelRequestScalarFieldEnum)[keyof typeof TravelRequestScalarFieldEnum]


  export const TravelDetailScalarFieldEnum: {
    id: 'id',
    travelRequestId: 'travelRequestId',
    concept: 'concept',
    amount: 'amount'
  };

  export type TravelDetailScalarFieldEnum = (typeof TravelDetailScalarFieldEnum)[keyof typeof TravelDetailScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const CompanyOrderByRelevanceFieldEnum: {
    name: 'name'
  };

  export type CompanyOrderByRelevanceFieldEnum = (typeof CompanyOrderByRelevanceFieldEnum)[keyof typeof CompanyOrderByRelevanceFieldEnum]


  export const BranchOrderByRelevanceFieldEnum: {
    name: 'name'
  };

  export type BranchOrderByRelevanceFieldEnum = (typeof BranchOrderByRelevanceFieldEnum)[keyof typeof BranchOrderByRelevanceFieldEnum]


  export const AreaOrderByRelevanceFieldEnum: {
    name: 'name'
  };

  export type AreaOrderByRelevanceFieldEnum = (typeof AreaOrderByRelevanceFieldEnum)[keyof typeof AreaOrderByRelevanceFieldEnum]


  export const RoleOrderByRelevanceFieldEnum: {
    name: 'name'
  };

  export type RoleOrderByRelevanceFieldEnum = (typeof RoleOrderByRelevanceFieldEnum)[keyof typeof RoleOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    name: 'name',
    paternalSurname: 'paternalSurname',
    maternalSurname: 'maternalSurname',
    email: 'email',
    password: 'password'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const CardOrderByRelevanceFieldEnum: {
    cardNumber: 'cardNumber'
  };

  export type CardOrderByRelevanceFieldEnum = (typeof CardOrderByRelevanceFieldEnum)[keyof typeof CardOrderByRelevanceFieldEnum]


  export const StatusTravelRequestOrderByRelevanceFieldEnum: {
    name: 'name'
  };

  export type StatusTravelRequestOrderByRelevanceFieldEnum = (typeof StatusTravelRequestOrderByRelevanceFieldEnum)[keyof typeof StatusTravelRequestOrderByRelevanceFieldEnum]


  export const TravelRequestOrderByRelevanceFieldEnum: {
    travelReason: 'travelReason',
    travelObjectives: 'travelObjectives',
    comment: 'comment'
  };

  export type TravelRequestOrderByRelevanceFieldEnum = (typeof TravelRequestOrderByRelevanceFieldEnum)[keyof typeof TravelRequestOrderByRelevanceFieldEnum]


  export const TravelDetailOrderByRelevanceFieldEnum: {
    concept: 'concept'
  };

  export type TravelDetailOrderByRelevanceFieldEnum = (typeof TravelDetailOrderByRelevanceFieldEnum)[keyof typeof TravelDetailOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: IntFilter<"Company"> | number
    name?: StringFilter<"Company"> | string
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    users?: UserListRelationFilter
    branches?: BranchListRelationFilter
    cards?: CardListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    branches?: BranchOrderByRelationAggregateInput
    cards?: CardOrderByRelationAggregateInput
    _relevance?: CompanyOrderByRelevanceInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    name?: StringFilter<"Company"> | string
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    users?: UserListRelationFilter
    branches?: BranchListRelationFilter
    cards?: CardListRelationFilter
  }, "id">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _avg?: CompanyAvgOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
    _sum?: CompanySumOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Company"> | number
    name?: StringWithAggregatesFilter<"Company"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
  }

  export type BranchWhereInput = {
    AND?: BranchWhereInput | BranchWhereInput[]
    OR?: BranchWhereInput[]
    NOT?: BranchWhereInput | BranchWhereInput[]
    id?: IntFilter<"Branch"> | number
    name?: StringFilter<"Branch"> | string
    companyId?: IntFilter<"Branch"> | number
    createdAt?: DateTimeFilter<"Branch"> | Date | string
    updatedAt?: DateTimeFilter<"Branch"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    users?: UserListRelationFilter
  }

  export type BranchOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    users?: UserOrderByRelationAggregateInput
    _relevance?: BranchOrderByRelevanceInput
  }

  export type BranchWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BranchWhereInput | BranchWhereInput[]
    OR?: BranchWhereInput[]
    NOT?: BranchWhereInput | BranchWhereInput[]
    name?: StringFilter<"Branch"> | string
    companyId?: IntFilter<"Branch"> | number
    createdAt?: DateTimeFilter<"Branch"> | Date | string
    updatedAt?: DateTimeFilter<"Branch"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    users?: UserListRelationFilter
  }, "id">

  export type BranchOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BranchCountOrderByAggregateInput
    _avg?: BranchAvgOrderByAggregateInput
    _max?: BranchMaxOrderByAggregateInput
    _min?: BranchMinOrderByAggregateInput
    _sum?: BranchSumOrderByAggregateInput
  }

  export type BranchScalarWhereWithAggregatesInput = {
    AND?: BranchScalarWhereWithAggregatesInput | BranchScalarWhereWithAggregatesInput[]
    OR?: BranchScalarWhereWithAggregatesInput[]
    NOT?: BranchScalarWhereWithAggregatesInput | BranchScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Branch"> | number
    name?: StringWithAggregatesFilter<"Branch"> | string
    companyId?: IntWithAggregatesFilter<"Branch"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Branch"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Branch"> | Date | string
  }

  export type AreaWhereInput = {
    AND?: AreaWhereInput | AreaWhereInput[]
    OR?: AreaWhereInput[]
    NOT?: AreaWhereInput | AreaWhereInput[]
    id?: IntFilter<"Area"> | number
    name?: StringFilter<"Area"> | string
    createdAt?: DateTimeFilter<"Area"> | Date | string
    updatedAt?: DateTimeFilter<"Area"> | Date | string
    users?: UserListRelationFilter
  }

  export type AreaOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    _relevance?: AreaOrderByRelevanceInput
  }

  export type AreaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AreaWhereInput | AreaWhereInput[]
    OR?: AreaWhereInput[]
    NOT?: AreaWhereInput | AreaWhereInput[]
    name?: StringFilter<"Area"> | string
    createdAt?: DateTimeFilter<"Area"> | Date | string
    updatedAt?: DateTimeFilter<"Area"> | Date | string
    users?: UserListRelationFilter
  }, "id">

  export type AreaOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AreaCountOrderByAggregateInput
    _avg?: AreaAvgOrderByAggregateInput
    _max?: AreaMaxOrderByAggregateInput
    _min?: AreaMinOrderByAggregateInput
    _sum?: AreaSumOrderByAggregateInput
  }

  export type AreaScalarWhereWithAggregatesInput = {
    AND?: AreaScalarWhereWithAggregatesInput | AreaScalarWhereWithAggregatesInput[]
    OR?: AreaScalarWhereWithAggregatesInput[]
    NOT?: AreaScalarWhereWithAggregatesInput | AreaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Area"> | number
    name?: StringWithAggregatesFilter<"Area"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Area"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Area"> | Date | string
  }

  export type RoleWhereInput = {
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    id?: IntFilter<"Role"> | number
    name?: StringFilter<"Role"> | string
    createdAt?: DateTimeFilter<"Role"> | Date | string
    updatedAt?: DateTimeFilter<"Role"> | Date | string
    users?: UserListRelationFilter
  }

  export type RoleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    _relevance?: RoleOrderByRelevanceInput
  }

  export type RoleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    createdAt?: DateTimeFilter<"Role"> | Date | string
    updatedAt?: DateTimeFilter<"Role"> | Date | string
    users?: UserListRelationFilter
  }, "id" | "name">

  export type RoleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoleCountOrderByAggregateInput
    _avg?: RoleAvgOrderByAggregateInput
    _max?: RoleMaxOrderByAggregateInput
    _min?: RoleMinOrderByAggregateInput
    _sum?: RoleSumOrderByAggregateInput
  }

  export type RoleScalarWhereWithAggregatesInput = {
    AND?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    OR?: RoleScalarWhereWithAggregatesInput[]
    NOT?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Role"> | number
    name?: StringWithAggregatesFilter<"Role"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Role"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Role"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    paternalSurname?: StringFilter<"User"> | string
    maternalSurname?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    companyId?: IntFilter<"User"> | number
    branchId?: IntFilter<"User"> | number
    areaId?: IntFilter<"User"> | number
    roleId?: IntFilter<"User"> | number
    supervisorId?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    branch?: XOR<BranchScalarRelationFilter, BranchWhereInput>
    area?: XOR<AreaScalarRelationFilter, AreaWhereInput>
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    supervisor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    subordinates?: UserListRelationFilter
    cards?: CardAssignmentListRelationFilter
    travelRequests?: TravelRequestListRelationFilter
    approvedTravelRequests?: TravelRequestListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    paternalSurname?: SortOrder
    maternalSurname?: SortOrder
    email?: SortOrder
    password?: SortOrder
    isActive?: SortOrder
    companyId?: SortOrder
    branchId?: SortOrder
    areaId?: SortOrder
    roleId?: SortOrder
    supervisorId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    branch?: BranchOrderByWithRelationInput
    area?: AreaOrderByWithRelationInput
    role?: RoleOrderByWithRelationInput
    supervisor?: UserOrderByWithRelationInput
    subordinates?: UserOrderByRelationAggregateInput
    cards?: CardAssignmentOrderByRelationAggregateInput
    travelRequests?: TravelRequestOrderByRelationAggregateInput
    approvedTravelRequests?: TravelRequestOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    paternalSurname?: StringFilter<"User"> | string
    maternalSurname?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    companyId?: IntFilter<"User"> | number
    branchId?: IntFilter<"User"> | number
    areaId?: IntFilter<"User"> | number
    roleId?: IntFilter<"User"> | number
    supervisorId?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    branch?: XOR<BranchScalarRelationFilter, BranchWhereInput>
    area?: XOR<AreaScalarRelationFilter, AreaWhereInput>
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    supervisor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    subordinates?: UserListRelationFilter
    cards?: CardAssignmentListRelationFilter
    travelRequests?: TravelRequestListRelationFilter
    approvedTravelRequests?: TravelRequestListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    paternalSurname?: SortOrder
    maternalSurname?: SortOrder
    email?: SortOrder
    password?: SortOrder
    isActive?: SortOrder
    companyId?: SortOrder
    branchId?: SortOrder
    areaId?: SortOrder
    roleId?: SortOrder
    supervisorId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringWithAggregatesFilter<"User"> | string
    paternalSurname?: StringWithAggregatesFilter<"User"> | string
    maternalSurname?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    companyId?: IntWithAggregatesFilter<"User"> | number
    branchId?: IntWithAggregatesFilter<"User"> | number
    areaId?: IntWithAggregatesFilter<"User"> | number
    roleId?: IntWithAggregatesFilter<"User"> | number
    supervisorId?: IntNullableWithAggregatesFilter<"User"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CardWhereInput = {
    AND?: CardWhereInput | CardWhereInput[]
    OR?: CardWhereInput[]
    NOT?: CardWhereInput | CardWhereInput[]
    id?: IntFilter<"Card"> | number
    cardNumber?: StringFilter<"Card"> | string
    companyId?: IntFilter<"Card"> | number
    isActive?: BoolFilter<"Card"> | boolean
    createdAt?: DateTimeFilter<"Card"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    assignments?: CardAssignmentListRelationFilter
    travelRequests?: TravelRequestListRelationFilter
  }

  export type CardOrderByWithRelationInput = {
    id?: SortOrder
    cardNumber?: SortOrder
    companyId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    assignments?: CardAssignmentOrderByRelationAggregateInput
    travelRequests?: TravelRequestOrderByRelationAggregateInput
    _relevance?: CardOrderByRelevanceInput
  }

  export type CardWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    cardNumber?: string
    AND?: CardWhereInput | CardWhereInput[]
    OR?: CardWhereInput[]
    NOT?: CardWhereInput | CardWhereInput[]
    companyId?: IntFilter<"Card"> | number
    isActive?: BoolFilter<"Card"> | boolean
    createdAt?: DateTimeFilter<"Card"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    assignments?: CardAssignmentListRelationFilter
    travelRequests?: TravelRequestListRelationFilter
  }, "id" | "cardNumber">

  export type CardOrderByWithAggregationInput = {
    id?: SortOrder
    cardNumber?: SortOrder
    companyId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: CardCountOrderByAggregateInput
    _avg?: CardAvgOrderByAggregateInput
    _max?: CardMaxOrderByAggregateInput
    _min?: CardMinOrderByAggregateInput
    _sum?: CardSumOrderByAggregateInput
  }

  export type CardScalarWhereWithAggregatesInput = {
    AND?: CardScalarWhereWithAggregatesInput | CardScalarWhereWithAggregatesInput[]
    OR?: CardScalarWhereWithAggregatesInput[]
    NOT?: CardScalarWhereWithAggregatesInput | CardScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Card"> | number
    cardNumber?: StringWithAggregatesFilter<"Card"> | string
    companyId?: IntWithAggregatesFilter<"Card"> | number
    isActive?: BoolWithAggregatesFilter<"Card"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Card"> | Date | string
  }

  export type CardAssignmentWhereInput = {
    AND?: CardAssignmentWhereInput | CardAssignmentWhereInput[]
    OR?: CardAssignmentWhereInput[]
    NOT?: CardAssignmentWhereInput | CardAssignmentWhereInput[]
    id?: IntFilter<"CardAssignment"> | number
    cardId?: IntFilter<"CardAssignment"> | number
    userId?: IntFilter<"CardAssignment"> | number
    assignedAt?: DateTimeFilter<"CardAssignment"> | Date | string
    unassignedAt?: DateTimeNullableFilter<"CardAssignment"> | Date | string | null
    card?: XOR<CardScalarRelationFilter, CardWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CardAssignmentOrderByWithRelationInput = {
    id?: SortOrder
    cardId?: SortOrder
    userId?: SortOrder
    assignedAt?: SortOrder
    unassignedAt?: SortOrderInput | SortOrder
    card?: CardOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type CardAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CardAssignmentWhereInput | CardAssignmentWhereInput[]
    OR?: CardAssignmentWhereInput[]
    NOT?: CardAssignmentWhereInput | CardAssignmentWhereInput[]
    cardId?: IntFilter<"CardAssignment"> | number
    userId?: IntFilter<"CardAssignment"> | number
    assignedAt?: DateTimeFilter<"CardAssignment"> | Date | string
    unassignedAt?: DateTimeNullableFilter<"CardAssignment"> | Date | string | null
    card?: XOR<CardScalarRelationFilter, CardWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CardAssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    cardId?: SortOrder
    userId?: SortOrder
    assignedAt?: SortOrder
    unassignedAt?: SortOrderInput | SortOrder
    _count?: CardAssignmentCountOrderByAggregateInput
    _avg?: CardAssignmentAvgOrderByAggregateInput
    _max?: CardAssignmentMaxOrderByAggregateInput
    _min?: CardAssignmentMinOrderByAggregateInput
    _sum?: CardAssignmentSumOrderByAggregateInput
  }

  export type CardAssignmentScalarWhereWithAggregatesInput = {
    AND?: CardAssignmentScalarWhereWithAggregatesInput | CardAssignmentScalarWhereWithAggregatesInput[]
    OR?: CardAssignmentScalarWhereWithAggregatesInput[]
    NOT?: CardAssignmentScalarWhereWithAggregatesInput | CardAssignmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CardAssignment"> | number
    cardId?: IntWithAggregatesFilter<"CardAssignment"> | number
    userId?: IntWithAggregatesFilter<"CardAssignment"> | number
    assignedAt?: DateTimeWithAggregatesFilter<"CardAssignment"> | Date | string
    unassignedAt?: DateTimeNullableWithAggregatesFilter<"CardAssignment"> | Date | string | null
  }

  export type StatusTravelRequestWhereInput = {
    AND?: StatusTravelRequestWhereInput | StatusTravelRequestWhereInput[]
    OR?: StatusTravelRequestWhereInput[]
    NOT?: StatusTravelRequestWhereInput | StatusTravelRequestWhereInput[]
    id?: IntFilter<"StatusTravelRequest"> | number
    name?: StringFilter<"StatusTravelRequest"> | string
    travelRequests?: TravelRequestListRelationFilter
  }

  export type StatusTravelRequestOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    travelRequests?: TravelRequestOrderByRelationAggregateInput
    _relevance?: StatusTravelRequestOrderByRelevanceInput
  }

  export type StatusTravelRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: StatusTravelRequestWhereInput | StatusTravelRequestWhereInput[]
    OR?: StatusTravelRequestWhereInput[]
    NOT?: StatusTravelRequestWhereInput | StatusTravelRequestWhereInput[]
    travelRequests?: TravelRequestListRelationFilter
  }, "id" | "name">

  export type StatusTravelRequestOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: StatusTravelRequestCountOrderByAggregateInput
    _avg?: StatusTravelRequestAvgOrderByAggregateInput
    _max?: StatusTravelRequestMaxOrderByAggregateInput
    _min?: StatusTravelRequestMinOrderByAggregateInput
    _sum?: StatusTravelRequestSumOrderByAggregateInput
  }

  export type StatusTravelRequestScalarWhereWithAggregatesInput = {
    AND?: StatusTravelRequestScalarWhereWithAggregatesInput | StatusTravelRequestScalarWhereWithAggregatesInput[]
    OR?: StatusTravelRequestScalarWhereWithAggregatesInput[]
    NOT?: StatusTravelRequestScalarWhereWithAggregatesInput | StatusTravelRequestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"StatusTravelRequest"> | number
    name?: StringWithAggregatesFilter<"StatusTravelRequest"> | string
  }

  export type TravelRequestWhereInput = {
    AND?: TravelRequestWhereInput | TravelRequestWhereInput[]
    OR?: TravelRequestWhereInput[]
    NOT?: TravelRequestWhereInput | TravelRequestWhereInput[]
    id?: IntFilter<"TravelRequest"> | number
    userId?: IntFilter<"TravelRequest"> | number
    statusId?: IntFilter<"TravelRequest"> | number
    cardId?: IntNullableFilter<"TravelRequest"> | number | null
    totalAmount?: DecimalFilter<"TravelRequest"> | Decimal | DecimalJsLike | number | string
    travelReason?: StringFilter<"TravelRequest"> | string
    travelObjectives?: StringFilter<"TravelRequest"> | string
    departureDate?: DateTimeFilter<"TravelRequest"> | Date | string
    returnDate?: DateTimeFilter<"TravelRequest"> | Date | string
    disbursementDate?: DateTimeNullableFilter<"TravelRequest"> | Date | string | null
    approvalDate?: DateTimeNullableFilter<"TravelRequest"> | Date | string | null
    approverId?: IntNullableFilter<"TravelRequest"> | number | null
    comment?: StringNullableFilter<"TravelRequest"> | string | null
    createdAt?: DateTimeFilter<"TravelRequest"> | Date | string
    updatedAt?: DateTimeFilter<"TravelRequest"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    status?: XOR<StatusTravelRequestScalarRelationFilter, StatusTravelRequestWhereInput>
    approver?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    card?: XOR<CardNullableScalarRelationFilter, CardWhereInput> | null
    details?: TravelDetailListRelationFilter
  }

  export type TravelRequestOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    statusId?: SortOrder
    cardId?: SortOrderInput | SortOrder
    totalAmount?: SortOrder
    travelReason?: SortOrder
    travelObjectives?: SortOrder
    departureDate?: SortOrder
    returnDate?: SortOrder
    disbursementDate?: SortOrderInput | SortOrder
    approvalDate?: SortOrderInput | SortOrder
    approverId?: SortOrderInput | SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    status?: StatusTravelRequestOrderByWithRelationInput
    approver?: UserOrderByWithRelationInput
    card?: CardOrderByWithRelationInput
    details?: TravelDetailOrderByRelationAggregateInput
    _relevance?: TravelRequestOrderByRelevanceInput
  }

  export type TravelRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TravelRequestWhereInput | TravelRequestWhereInput[]
    OR?: TravelRequestWhereInput[]
    NOT?: TravelRequestWhereInput | TravelRequestWhereInput[]
    userId?: IntFilter<"TravelRequest"> | number
    statusId?: IntFilter<"TravelRequest"> | number
    cardId?: IntNullableFilter<"TravelRequest"> | number | null
    totalAmount?: DecimalFilter<"TravelRequest"> | Decimal | DecimalJsLike | number | string
    travelReason?: StringFilter<"TravelRequest"> | string
    travelObjectives?: StringFilter<"TravelRequest"> | string
    departureDate?: DateTimeFilter<"TravelRequest"> | Date | string
    returnDate?: DateTimeFilter<"TravelRequest"> | Date | string
    disbursementDate?: DateTimeNullableFilter<"TravelRequest"> | Date | string | null
    approvalDate?: DateTimeNullableFilter<"TravelRequest"> | Date | string | null
    approverId?: IntNullableFilter<"TravelRequest"> | number | null
    comment?: StringNullableFilter<"TravelRequest"> | string | null
    createdAt?: DateTimeFilter<"TravelRequest"> | Date | string
    updatedAt?: DateTimeFilter<"TravelRequest"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    status?: XOR<StatusTravelRequestScalarRelationFilter, StatusTravelRequestWhereInput>
    approver?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    card?: XOR<CardNullableScalarRelationFilter, CardWhereInput> | null
    details?: TravelDetailListRelationFilter
  }, "id">

  export type TravelRequestOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    statusId?: SortOrder
    cardId?: SortOrderInput | SortOrder
    totalAmount?: SortOrder
    travelReason?: SortOrder
    travelObjectives?: SortOrder
    departureDate?: SortOrder
    returnDate?: SortOrder
    disbursementDate?: SortOrderInput | SortOrder
    approvalDate?: SortOrderInput | SortOrder
    approverId?: SortOrderInput | SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TravelRequestCountOrderByAggregateInput
    _avg?: TravelRequestAvgOrderByAggregateInput
    _max?: TravelRequestMaxOrderByAggregateInput
    _min?: TravelRequestMinOrderByAggregateInput
    _sum?: TravelRequestSumOrderByAggregateInput
  }

  export type TravelRequestScalarWhereWithAggregatesInput = {
    AND?: TravelRequestScalarWhereWithAggregatesInput | TravelRequestScalarWhereWithAggregatesInput[]
    OR?: TravelRequestScalarWhereWithAggregatesInput[]
    NOT?: TravelRequestScalarWhereWithAggregatesInput | TravelRequestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TravelRequest"> | number
    userId?: IntWithAggregatesFilter<"TravelRequest"> | number
    statusId?: IntWithAggregatesFilter<"TravelRequest"> | number
    cardId?: IntNullableWithAggregatesFilter<"TravelRequest"> | number | null
    totalAmount?: DecimalWithAggregatesFilter<"TravelRequest"> | Decimal | DecimalJsLike | number | string
    travelReason?: StringWithAggregatesFilter<"TravelRequest"> | string
    travelObjectives?: StringWithAggregatesFilter<"TravelRequest"> | string
    departureDate?: DateTimeWithAggregatesFilter<"TravelRequest"> | Date | string
    returnDate?: DateTimeWithAggregatesFilter<"TravelRequest"> | Date | string
    disbursementDate?: DateTimeNullableWithAggregatesFilter<"TravelRequest"> | Date | string | null
    approvalDate?: DateTimeNullableWithAggregatesFilter<"TravelRequest"> | Date | string | null
    approverId?: IntNullableWithAggregatesFilter<"TravelRequest"> | number | null
    comment?: StringNullableWithAggregatesFilter<"TravelRequest"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TravelRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TravelRequest"> | Date | string
  }

  export type TravelDetailWhereInput = {
    AND?: TravelDetailWhereInput | TravelDetailWhereInput[]
    OR?: TravelDetailWhereInput[]
    NOT?: TravelDetailWhereInput | TravelDetailWhereInput[]
    id?: IntFilter<"TravelDetail"> | number
    travelRequestId?: IntFilter<"TravelDetail"> | number
    concept?: StringFilter<"TravelDetail"> | string
    amount?: DecimalFilter<"TravelDetail"> | Decimal | DecimalJsLike | number | string
    request?: XOR<TravelRequestScalarRelationFilter, TravelRequestWhereInput>
  }

  export type TravelDetailOrderByWithRelationInput = {
    id?: SortOrder
    travelRequestId?: SortOrder
    concept?: SortOrder
    amount?: SortOrder
    request?: TravelRequestOrderByWithRelationInput
    _relevance?: TravelDetailOrderByRelevanceInput
  }

  export type TravelDetailWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TravelDetailWhereInput | TravelDetailWhereInput[]
    OR?: TravelDetailWhereInput[]
    NOT?: TravelDetailWhereInput | TravelDetailWhereInput[]
    travelRequestId?: IntFilter<"TravelDetail"> | number
    concept?: StringFilter<"TravelDetail"> | string
    amount?: DecimalFilter<"TravelDetail"> | Decimal | DecimalJsLike | number | string
    request?: XOR<TravelRequestScalarRelationFilter, TravelRequestWhereInput>
  }, "id">

  export type TravelDetailOrderByWithAggregationInput = {
    id?: SortOrder
    travelRequestId?: SortOrder
    concept?: SortOrder
    amount?: SortOrder
    _count?: TravelDetailCountOrderByAggregateInput
    _avg?: TravelDetailAvgOrderByAggregateInput
    _max?: TravelDetailMaxOrderByAggregateInput
    _min?: TravelDetailMinOrderByAggregateInput
    _sum?: TravelDetailSumOrderByAggregateInput
  }

  export type TravelDetailScalarWhereWithAggregatesInput = {
    AND?: TravelDetailScalarWhereWithAggregatesInput | TravelDetailScalarWhereWithAggregatesInput[]
    OR?: TravelDetailScalarWhereWithAggregatesInput[]
    NOT?: TravelDetailScalarWhereWithAggregatesInput | TravelDetailScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TravelDetail"> | number
    travelRequestId?: IntWithAggregatesFilter<"TravelDetail"> | number
    concept?: StringWithAggregatesFilter<"TravelDetail"> | string
    amount?: DecimalWithAggregatesFilter<"TravelDetail"> | Decimal | DecimalJsLike | number | string
  }

  export type CompanyCreateInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    branches?: BranchCreateNestedManyWithoutCompanyInput
    cards?: CardCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    branches?: BranchUncheckedCreateNestedManyWithoutCompanyInput
    cards?: CardUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    branches?: BranchUpdateManyWithoutCompanyNestedInput
    cards?: CardUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    branches?: BranchUncheckedUpdateManyWithoutCompanyNestedInput
    cards?: CardUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchCreateInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutBranchesInput
    users?: UserCreateNestedManyWithoutBranchInput
  }

  export type BranchUncheckedCreateInput = {
    id?: number
    name: string
    companyId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutBranchesNestedInput
    users?: UserUpdateManyWithoutBranchNestedInput
  }

  export type BranchUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    companyId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type BranchCreateManyInput = {
    id?: number
    name: string
    companyId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BranchUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    companyId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AreaCreateInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutAreaInput
  }

  export type AreaUncheckedCreateInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutAreaInput
  }

  export type AreaUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutAreaNestedInput
  }

  export type AreaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutAreaNestedInput
  }

  export type AreaCreateManyInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AreaUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AreaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleCreateInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleCreateManyInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoleUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutUsersInput
    branch: BranchCreateNestedOneWithoutUsersInput
    area: AreaCreateNestedOneWithoutUsersInput
    role: RoleCreateNestedOneWithoutUsersInput
    supervisor?: UserCreateNestedOneWithoutSubordinatesInput
    subordinates?: UserCreateNestedManyWithoutSupervisorInput
    cards?: CardAssignmentCreateNestedManyWithoutUserInput
    travelRequests?: TravelRequestCreateNestedManyWithoutUserInput
    approvedTravelRequests?: TravelRequestCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    companyId: number
    branchId: number
    areaId: number
    roleId: number
    supervisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subordinates?: UserUncheckedCreateNestedManyWithoutSupervisorInput
    cards?: CardAssignmentUncheckedCreateNestedManyWithoutUserInput
    travelRequests?: TravelRequestUncheckedCreateNestedManyWithoutUserInput
    approvedTravelRequests?: TravelRequestUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUsersNestedInput
    branch?: BranchUpdateOneRequiredWithoutUsersNestedInput
    area?: AreaUpdateOneRequiredWithoutUsersNestedInput
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
    supervisor?: UserUpdateOneWithoutSubordinatesNestedInput
    subordinates?: UserUpdateManyWithoutSupervisorNestedInput
    cards?: CardAssignmentUpdateManyWithoutUserNestedInput
    travelRequests?: TravelRequestUpdateManyWithoutUserNestedInput
    approvedTravelRequests?: TravelRequestUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    companyId?: IntFieldUpdateOperationsInput | number
    branchId?: IntFieldUpdateOperationsInput | number
    areaId?: IntFieldUpdateOperationsInput | number
    roleId?: IntFieldUpdateOperationsInput | number
    supervisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subordinates?: UserUncheckedUpdateManyWithoutSupervisorNestedInput
    cards?: CardAssignmentUncheckedUpdateManyWithoutUserNestedInput
    travelRequests?: TravelRequestUncheckedUpdateManyWithoutUserNestedInput
    approvedTravelRequests?: TravelRequestUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    companyId: number
    branchId: number
    areaId: number
    roleId: number
    supervisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    companyId?: IntFieldUpdateOperationsInput | number
    branchId?: IntFieldUpdateOperationsInput | number
    areaId?: IntFieldUpdateOperationsInput | number
    roleId?: IntFieldUpdateOperationsInput | number
    supervisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardCreateInput = {
    cardNumber: string
    isActive?: boolean
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutCardsInput
    assignments?: CardAssignmentCreateNestedManyWithoutCardInput
    travelRequests?: TravelRequestCreateNestedManyWithoutCardInput
  }

  export type CardUncheckedCreateInput = {
    id?: number
    cardNumber: string
    companyId: number
    isActive?: boolean
    createdAt?: Date | string
    assignments?: CardAssignmentUncheckedCreateNestedManyWithoutCardInput
    travelRequests?: TravelRequestUncheckedCreateNestedManyWithoutCardInput
  }

  export type CardUpdateInput = {
    cardNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutCardsNestedInput
    assignments?: CardAssignmentUpdateManyWithoutCardNestedInput
    travelRequests?: TravelRequestUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    cardNumber?: StringFieldUpdateOperationsInput | string
    companyId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: CardAssignmentUncheckedUpdateManyWithoutCardNestedInput
    travelRequests?: TravelRequestUncheckedUpdateManyWithoutCardNestedInput
  }

  export type CardCreateManyInput = {
    id?: number
    cardNumber: string
    companyId: number
    isActive?: boolean
    createdAt?: Date | string
  }

  export type CardUpdateManyMutationInput = {
    cardNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cardNumber?: StringFieldUpdateOperationsInput | string
    companyId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardAssignmentCreateInput = {
    assignedAt?: Date | string
    unassignedAt?: Date | string | null
    card: CardCreateNestedOneWithoutAssignmentsInput
    user: UserCreateNestedOneWithoutCardsInput
  }

  export type CardAssignmentUncheckedCreateInput = {
    id?: number
    cardId: number
    userId: number
    assignedAt?: Date | string
    unassignedAt?: Date | string | null
  }

  export type CardAssignmentUpdateInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unassignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    card?: CardUpdateOneRequiredWithoutAssignmentsNestedInput
    user?: UserUpdateOneRequiredWithoutCardsNestedInput
  }

  export type CardAssignmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    cardId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unassignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CardAssignmentCreateManyInput = {
    id?: number
    cardId: number
    userId: number
    assignedAt?: Date | string
    unassignedAt?: Date | string | null
  }

  export type CardAssignmentUpdateManyMutationInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unassignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CardAssignmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cardId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unassignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StatusTravelRequestCreateInput = {
    name: string
    travelRequests?: TravelRequestCreateNestedManyWithoutStatusInput
  }

  export type StatusTravelRequestUncheckedCreateInput = {
    id?: number
    name: string
    travelRequests?: TravelRequestUncheckedCreateNestedManyWithoutStatusInput
  }

  export type StatusTravelRequestUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    travelRequests?: TravelRequestUpdateManyWithoutStatusNestedInput
  }

  export type StatusTravelRequestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    travelRequests?: TravelRequestUncheckedUpdateManyWithoutStatusNestedInput
  }

  export type StatusTravelRequestCreateManyInput = {
    id?: number
    name: string
  }

  export type StatusTravelRequestUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type StatusTravelRequestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TravelRequestCreateInput = {
    totalAmount: Decimal | DecimalJsLike | number | string
    travelReason: string
    travelObjectives: string
    departureDate: Date | string
    returnDate: Date | string
    disbursementDate?: Date | string | null
    approvalDate?: Date | string | null
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTravelRequestsInput
    status: StatusTravelRequestCreateNestedOneWithoutTravelRequestsInput
    approver?: UserCreateNestedOneWithoutApprovedTravelRequestsInput
    card?: CardCreateNestedOneWithoutTravelRequestsInput
    details?: TravelDetailCreateNestedManyWithoutRequestInput
  }

  export type TravelRequestUncheckedCreateInput = {
    id?: number
    userId: number
    statusId: number
    cardId?: number | null
    totalAmount: Decimal | DecimalJsLike | number | string
    travelReason: string
    travelObjectives: string
    departureDate: Date | string
    returnDate: Date | string
    disbursementDate?: Date | string | null
    approvalDate?: Date | string | null
    approverId?: number | null
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    details?: TravelDetailUncheckedCreateNestedManyWithoutRequestInput
  }

  export type TravelRequestUpdateInput = {
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    travelReason?: StringFieldUpdateOperationsInput | string
    travelObjectives?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    disbursementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTravelRequestsNestedInput
    status?: StatusTravelRequestUpdateOneRequiredWithoutTravelRequestsNestedInput
    approver?: UserUpdateOneWithoutApprovedTravelRequestsNestedInput
    card?: CardUpdateOneWithoutTravelRequestsNestedInput
    details?: TravelDetailUpdateManyWithoutRequestNestedInput
  }

  export type TravelRequestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    statusId?: IntFieldUpdateOperationsInput | number
    cardId?: NullableIntFieldUpdateOperationsInput | number | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    travelReason?: StringFieldUpdateOperationsInput | string
    travelObjectives?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    disbursementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approverId?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: TravelDetailUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type TravelRequestCreateManyInput = {
    id?: number
    userId: number
    statusId: number
    cardId?: number | null
    totalAmount: Decimal | DecimalJsLike | number | string
    travelReason: string
    travelObjectives: string
    departureDate: Date | string
    returnDate: Date | string
    disbursementDate?: Date | string | null
    approvalDate?: Date | string | null
    approverId?: number | null
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TravelRequestUpdateManyMutationInput = {
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    travelReason?: StringFieldUpdateOperationsInput | string
    travelObjectives?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    disbursementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelRequestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    statusId?: IntFieldUpdateOperationsInput | number
    cardId?: NullableIntFieldUpdateOperationsInput | number | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    travelReason?: StringFieldUpdateOperationsInput | string
    travelObjectives?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    disbursementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approverId?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelDetailCreateInput = {
    concept: string
    amount: Decimal | DecimalJsLike | number | string
    request: TravelRequestCreateNestedOneWithoutDetailsInput
  }

  export type TravelDetailUncheckedCreateInput = {
    id?: number
    travelRequestId: number
    concept: string
    amount: Decimal | DecimalJsLike | number | string
  }

  export type TravelDetailUpdateInput = {
    concept?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    request?: TravelRequestUpdateOneRequiredWithoutDetailsNestedInput
  }

  export type TravelDetailUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    travelRequestId?: IntFieldUpdateOperationsInput | number
    concept?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type TravelDetailCreateManyInput = {
    id?: number
    travelRequestId: number
    concept: string
    amount: Decimal | DecimalJsLike | number | string
  }

  export type TravelDetailUpdateManyMutationInput = {
    concept?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type TravelDetailUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    travelRequestId?: IntFieldUpdateOperationsInput | number
    concept?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type BranchListRelationFilter = {
    every?: BranchWhereInput
    some?: BranchWhereInput
    none?: BranchWhereInput
  }

  export type CardListRelationFilter = {
    every?: CardWhereInput
    some?: CardWhereInput
    none?: CardWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BranchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CardOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyOrderByRelevanceInput = {
    fields: CompanyOrderByRelevanceFieldEnum | CompanyOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type CompanyScalarRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type BranchOrderByRelevanceInput = {
    fields: BranchOrderByRelevanceFieldEnum | BranchOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type BranchCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BranchAvgOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type BranchMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BranchMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BranchSumOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type AreaOrderByRelevanceInput = {
    fields: AreaOrderByRelevanceFieldEnum | AreaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AreaCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AreaAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AreaMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AreaMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AreaSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RoleOrderByRelevanceInput = {
    fields: RoleOrderByRelevanceFieldEnum | RoleOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RoleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RoleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BranchScalarRelationFilter = {
    is?: BranchWhereInput
    isNot?: BranchWhereInput
  }

  export type AreaScalarRelationFilter = {
    is?: AreaWhereInput
    isNot?: AreaWhereInput
  }

  export type RoleScalarRelationFilter = {
    is?: RoleWhereInput
    isNot?: RoleWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type CardAssignmentListRelationFilter = {
    every?: CardAssignmentWhereInput
    some?: CardAssignmentWhereInput
    none?: CardAssignmentWhereInput
  }

  export type TravelRequestListRelationFilter = {
    every?: TravelRequestWhereInput
    some?: TravelRequestWhereInput
    none?: TravelRequestWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CardAssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TravelRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    paternalSurname?: SortOrder
    maternalSurname?: SortOrder
    email?: SortOrder
    password?: SortOrder
    isActive?: SortOrder
    companyId?: SortOrder
    branchId?: SortOrder
    areaId?: SortOrder
    roleId?: SortOrder
    supervisorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    branchId?: SortOrder
    areaId?: SortOrder
    roleId?: SortOrder
    supervisorId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    paternalSurname?: SortOrder
    maternalSurname?: SortOrder
    email?: SortOrder
    password?: SortOrder
    isActive?: SortOrder
    companyId?: SortOrder
    branchId?: SortOrder
    areaId?: SortOrder
    roleId?: SortOrder
    supervisorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    paternalSurname?: SortOrder
    maternalSurname?: SortOrder
    email?: SortOrder
    password?: SortOrder
    isActive?: SortOrder
    companyId?: SortOrder
    branchId?: SortOrder
    areaId?: SortOrder
    roleId?: SortOrder
    supervisorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    branchId?: SortOrder
    areaId?: SortOrder
    roleId?: SortOrder
    supervisorId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type CardOrderByRelevanceInput = {
    fields: CardOrderByRelevanceFieldEnum | CardOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CardCountOrderByAggregateInput = {
    id?: SortOrder
    cardNumber?: SortOrder
    companyId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type CardAvgOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type CardMaxOrderByAggregateInput = {
    id?: SortOrder
    cardNumber?: SortOrder
    companyId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type CardMinOrderByAggregateInput = {
    id?: SortOrder
    cardNumber?: SortOrder
    companyId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type CardSumOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CardScalarRelationFilter = {
    is?: CardWhereInput
    isNot?: CardWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CardAssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    cardId?: SortOrder
    userId?: SortOrder
    assignedAt?: SortOrder
    unassignedAt?: SortOrder
  }

  export type CardAssignmentAvgOrderByAggregateInput = {
    id?: SortOrder
    cardId?: SortOrder
    userId?: SortOrder
  }

  export type CardAssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    cardId?: SortOrder
    userId?: SortOrder
    assignedAt?: SortOrder
    unassignedAt?: SortOrder
  }

  export type CardAssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    cardId?: SortOrder
    userId?: SortOrder
    assignedAt?: SortOrder
    unassignedAt?: SortOrder
  }

  export type CardAssignmentSumOrderByAggregateInput = {
    id?: SortOrder
    cardId?: SortOrder
    userId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StatusTravelRequestOrderByRelevanceInput = {
    fields: StatusTravelRequestOrderByRelevanceFieldEnum | StatusTravelRequestOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type StatusTravelRequestCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type StatusTravelRequestAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StatusTravelRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type StatusTravelRequestMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type StatusTravelRequestSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StatusTravelRequestScalarRelationFilter = {
    is?: StatusTravelRequestWhereInput
    isNot?: StatusTravelRequestWhereInput
  }

  export type CardNullableScalarRelationFilter = {
    is?: CardWhereInput | null
    isNot?: CardWhereInput | null
  }

  export type TravelDetailListRelationFilter = {
    every?: TravelDetailWhereInput
    some?: TravelDetailWhereInput
    none?: TravelDetailWhereInput
  }

  export type TravelDetailOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TravelRequestOrderByRelevanceInput = {
    fields: TravelRequestOrderByRelevanceFieldEnum | TravelRequestOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TravelRequestCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    statusId?: SortOrder
    cardId?: SortOrder
    totalAmount?: SortOrder
    travelReason?: SortOrder
    travelObjectives?: SortOrder
    departureDate?: SortOrder
    returnDate?: SortOrder
    disbursementDate?: SortOrder
    approvalDate?: SortOrder
    approverId?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TravelRequestAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    statusId?: SortOrder
    cardId?: SortOrder
    totalAmount?: SortOrder
    approverId?: SortOrder
  }

  export type TravelRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    statusId?: SortOrder
    cardId?: SortOrder
    totalAmount?: SortOrder
    travelReason?: SortOrder
    travelObjectives?: SortOrder
    departureDate?: SortOrder
    returnDate?: SortOrder
    disbursementDate?: SortOrder
    approvalDate?: SortOrder
    approverId?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TravelRequestMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    statusId?: SortOrder
    cardId?: SortOrder
    totalAmount?: SortOrder
    travelReason?: SortOrder
    travelObjectives?: SortOrder
    departureDate?: SortOrder
    returnDate?: SortOrder
    disbursementDate?: SortOrder
    approvalDate?: SortOrder
    approverId?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TravelRequestSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    statusId?: SortOrder
    cardId?: SortOrder
    totalAmount?: SortOrder
    approverId?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type TravelRequestScalarRelationFilter = {
    is?: TravelRequestWhereInput
    isNot?: TravelRequestWhereInput
  }

  export type TravelDetailOrderByRelevanceInput = {
    fields: TravelDetailOrderByRelevanceFieldEnum | TravelDetailOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TravelDetailCountOrderByAggregateInput = {
    id?: SortOrder
    travelRequestId?: SortOrder
    concept?: SortOrder
    amount?: SortOrder
  }

  export type TravelDetailAvgOrderByAggregateInput = {
    id?: SortOrder
    travelRequestId?: SortOrder
    amount?: SortOrder
  }

  export type TravelDetailMaxOrderByAggregateInput = {
    id?: SortOrder
    travelRequestId?: SortOrder
    concept?: SortOrder
    amount?: SortOrder
  }

  export type TravelDetailMinOrderByAggregateInput = {
    id?: SortOrder
    travelRequestId?: SortOrder
    concept?: SortOrder
    amount?: SortOrder
  }

  export type TravelDetailSumOrderByAggregateInput = {
    id?: SortOrder
    travelRequestId?: SortOrder
    amount?: SortOrder
  }

  export type UserCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type BranchCreateNestedManyWithoutCompanyInput = {
    create?: XOR<BranchCreateWithoutCompanyInput, BranchUncheckedCreateWithoutCompanyInput> | BranchCreateWithoutCompanyInput[] | BranchUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: BranchCreateOrConnectWithoutCompanyInput | BranchCreateOrConnectWithoutCompanyInput[]
    createMany?: BranchCreateManyCompanyInputEnvelope
    connect?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
  }

  export type CardCreateNestedManyWithoutCompanyInput = {
    create?: XOR<CardCreateWithoutCompanyInput, CardUncheckedCreateWithoutCompanyInput> | CardCreateWithoutCompanyInput[] | CardUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CardCreateOrConnectWithoutCompanyInput | CardCreateOrConnectWithoutCompanyInput[]
    createMany?: CardCreateManyCompanyInputEnvelope
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type BranchUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<BranchCreateWithoutCompanyInput, BranchUncheckedCreateWithoutCompanyInput> | BranchCreateWithoutCompanyInput[] | BranchUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: BranchCreateOrConnectWithoutCompanyInput | BranchCreateOrConnectWithoutCompanyInput[]
    createMany?: BranchCreateManyCompanyInputEnvelope
    connect?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
  }

  export type CardUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<CardCreateWithoutCompanyInput, CardUncheckedCreateWithoutCompanyInput> | CardCreateWithoutCompanyInput[] | CardUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CardCreateOrConnectWithoutCompanyInput | CardCreateOrConnectWithoutCompanyInput[]
    createMany?: CardCreateManyCompanyInputEnvelope
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCompanyInput | UserUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCompanyInput | UserUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCompanyInput | UserUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type BranchUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<BranchCreateWithoutCompanyInput, BranchUncheckedCreateWithoutCompanyInput> | BranchCreateWithoutCompanyInput[] | BranchUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: BranchCreateOrConnectWithoutCompanyInput | BranchCreateOrConnectWithoutCompanyInput[]
    upsert?: BranchUpsertWithWhereUniqueWithoutCompanyInput | BranchUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: BranchCreateManyCompanyInputEnvelope
    set?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    disconnect?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    delete?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    connect?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    update?: BranchUpdateWithWhereUniqueWithoutCompanyInput | BranchUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: BranchUpdateManyWithWhereWithoutCompanyInput | BranchUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: BranchScalarWhereInput | BranchScalarWhereInput[]
  }

  export type CardUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<CardCreateWithoutCompanyInput, CardUncheckedCreateWithoutCompanyInput> | CardCreateWithoutCompanyInput[] | CardUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CardCreateOrConnectWithoutCompanyInput | CardCreateOrConnectWithoutCompanyInput[]
    upsert?: CardUpsertWithWhereUniqueWithoutCompanyInput | CardUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: CardCreateManyCompanyInputEnvelope
    set?: CardWhereUniqueInput | CardWhereUniqueInput[]
    disconnect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    delete?: CardWhereUniqueInput | CardWhereUniqueInput[]
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    update?: CardUpdateWithWhereUniqueWithoutCompanyInput | CardUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: CardUpdateManyWithWhereWithoutCompanyInput | CardUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: CardScalarWhereInput | CardScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCompanyInput | UserUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCompanyInput | UserUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCompanyInput | UserUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type BranchUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<BranchCreateWithoutCompanyInput, BranchUncheckedCreateWithoutCompanyInput> | BranchCreateWithoutCompanyInput[] | BranchUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: BranchCreateOrConnectWithoutCompanyInput | BranchCreateOrConnectWithoutCompanyInput[]
    upsert?: BranchUpsertWithWhereUniqueWithoutCompanyInput | BranchUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: BranchCreateManyCompanyInputEnvelope
    set?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    disconnect?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    delete?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    connect?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    update?: BranchUpdateWithWhereUniqueWithoutCompanyInput | BranchUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: BranchUpdateManyWithWhereWithoutCompanyInput | BranchUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: BranchScalarWhereInput | BranchScalarWhereInput[]
  }

  export type CardUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<CardCreateWithoutCompanyInput, CardUncheckedCreateWithoutCompanyInput> | CardCreateWithoutCompanyInput[] | CardUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CardCreateOrConnectWithoutCompanyInput | CardCreateOrConnectWithoutCompanyInput[]
    upsert?: CardUpsertWithWhereUniqueWithoutCompanyInput | CardUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: CardCreateManyCompanyInputEnvelope
    set?: CardWhereUniqueInput | CardWhereUniqueInput[]
    disconnect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    delete?: CardWhereUniqueInput | CardWhereUniqueInput[]
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    update?: CardUpdateWithWhereUniqueWithoutCompanyInput | CardUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: CardUpdateManyWithWhereWithoutCompanyInput | CardUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: CardScalarWhereInput | CardScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutBranchesInput = {
    create?: XOR<CompanyCreateWithoutBranchesInput, CompanyUncheckedCreateWithoutBranchesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutBranchesInput
    connect?: CompanyWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutBranchInput = {
    create?: XOR<UserCreateWithoutBranchInput, UserUncheckedCreateWithoutBranchInput> | UserCreateWithoutBranchInput[] | UserUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: UserCreateOrConnectWithoutBranchInput | UserCreateOrConnectWithoutBranchInput[]
    createMany?: UserCreateManyBranchInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutBranchInput = {
    create?: XOR<UserCreateWithoutBranchInput, UserUncheckedCreateWithoutBranchInput> | UserCreateWithoutBranchInput[] | UserUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: UserCreateOrConnectWithoutBranchInput | UserCreateOrConnectWithoutBranchInput[]
    createMany?: UserCreateManyBranchInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type CompanyUpdateOneRequiredWithoutBranchesNestedInput = {
    create?: XOR<CompanyCreateWithoutBranchesInput, CompanyUncheckedCreateWithoutBranchesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutBranchesInput
    upsert?: CompanyUpsertWithoutBranchesInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutBranchesInput, CompanyUpdateWithoutBranchesInput>, CompanyUncheckedUpdateWithoutBranchesInput>
  }

  export type UserUpdateManyWithoutBranchNestedInput = {
    create?: XOR<UserCreateWithoutBranchInput, UserUncheckedCreateWithoutBranchInput> | UserCreateWithoutBranchInput[] | UserUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: UserCreateOrConnectWithoutBranchInput | UserCreateOrConnectWithoutBranchInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutBranchInput | UserUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: UserCreateManyBranchInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutBranchInput | UserUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: UserUpdateManyWithWhereWithoutBranchInput | UserUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutBranchNestedInput = {
    create?: XOR<UserCreateWithoutBranchInput, UserUncheckedCreateWithoutBranchInput> | UserCreateWithoutBranchInput[] | UserUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: UserCreateOrConnectWithoutBranchInput | UserCreateOrConnectWithoutBranchInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutBranchInput | UserUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: UserCreateManyBranchInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutBranchInput | UserUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: UserUpdateManyWithWhereWithoutBranchInput | UserUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserCreateNestedManyWithoutAreaInput = {
    create?: XOR<UserCreateWithoutAreaInput, UserUncheckedCreateWithoutAreaInput> | UserCreateWithoutAreaInput[] | UserUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAreaInput | UserCreateOrConnectWithoutAreaInput[]
    createMany?: UserCreateManyAreaInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutAreaInput = {
    create?: XOR<UserCreateWithoutAreaInput, UserUncheckedCreateWithoutAreaInput> | UserCreateWithoutAreaInput[] | UserUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAreaInput | UserCreateOrConnectWithoutAreaInput[]
    createMany?: UserCreateManyAreaInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutAreaNestedInput = {
    create?: XOR<UserCreateWithoutAreaInput, UserUncheckedCreateWithoutAreaInput> | UserCreateWithoutAreaInput[] | UserUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAreaInput | UserCreateOrConnectWithoutAreaInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutAreaInput | UserUpsertWithWhereUniqueWithoutAreaInput[]
    createMany?: UserCreateManyAreaInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutAreaInput | UserUpdateWithWhereUniqueWithoutAreaInput[]
    updateMany?: UserUpdateManyWithWhereWithoutAreaInput | UserUpdateManyWithWhereWithoutAreaInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutAreaNestedInput = {
    create?: XOR<UserCreateWithoutAreaInput, UserUncheckedCreateWithoutAreaInput> | UserCreateWithoutAreaInput[] | UserUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAreaInput | UserCreateOrConnectWithoutAreaInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutAreaInput | UserUpsertWithWhereUniqueWithoutAreaInput[]
    createMany?: UserCreateManyAreaInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutAreaInput | UserUpdateWithWhereUniqueWithoutAreaInput[]
    updateMany?: UserUpdateManyWithWhereWithoutAreaInput | UserUpdateManyWithWhereWithoutAreaInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRoleInput | UserUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRoleInput | UserUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRoleInput | UserUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRoleInput | UserUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRoleInput | UserUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRoleInput | UserUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutUsersInput = {
    create?: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUsersInput
    connect?: CompanyWhereUniqueInput
  }

  export type BranchCreateNestedOneWithoutUsersInput = {
    create?: XOR<BranchCreateWithoutUsersInput, BranchUncheckedCreateWithoutUsersInput>
    connectOrCreate?: BranchCreateOrConnectWithoutUsersInput
    connect?: BranchWhereUniqueInput
  }

  export type AreaCreateNestedOneWithoutUsersInput = {
    create?: XOR<AreaCreateWithoutUsersInput, AreaUncheckedCreateWithoutUsersInput>
    connectOrCreate?: AreaCreateOrConnectWithoutUsersInput
    connect?: AreaWhereUniqueInput
  }

  export type RoleCreateNestedOneWithoutUsersInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput
    connect?: RoleWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSubordinatesInput = {
    create?: XOR<UserCreateWithoutSubordinatesInput, UserUncheckedCreateWithoutSubordinatesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubordinatesInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutSupervisorInput = {
    create?: XOR<UserCreateWithoutSupervisorInput, UserUncheckedCreateWithoutSupervisorInput> | UserCreateWithoutSupervisorInput[] | UserUncheckedCreateWithoutSupervisorInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSupervisorInput | UserCreateOrConnectWithoutSupervisorInput[]
    createMany?: UserCreateManySupervisorInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type CardAssignmentCreateNestedManyWithoutUserInput = {
    create?: XOR<CardAssignmentCreateWithoutUserInput, CardAssignmentUncheckedCreateWithoutUserInput> | CardAssignmentCreateWithoutUserInput[] | CardAssignmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CardAssignmentCreateOrConnectWithoutUserInput | CardAssignmentCreateOrConnectWithoutUserInput[]
    createMany?: CardAssignmentCreateManyUserInputEnvelope
    connect?: CardAssignmentWhereUniqueInput | CardAssignmentWhereUniqueInput[]
  }

  export type TravelRequestCreateNestedManyWithoutUserInput = {
    create?: XOR<TravelRequestCreateWithoutUserInput, TravelRequestUncheckedCreateWithoutUserInput> | TravelRequestCreateWithoutUserInput[] | TravelRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TravelRequestCreateOrConnectWithoutUserInput | TravelRequestCreateOrConnectWithoutUserInput[]
    createMany?: TravelRequestCreateManyUserInputEnvelope
    connect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
  }

  export type TravelRequestCreateNestedManyWithoutApproverInput = {
    create?: XOR<TravelRequestCreateWithoutApproverInput, TravelRequestUncheckedCreateWithoutApproverInput> | TravelRequestCreateWithoutApproverInput[] | TravelRequestUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: TravelRequestCreateOrConnectWithoutApproverInput | TravelRequestCreateOrConnectWithoutApproverInput[]
    createMany?: TravelRequestCreateManyApproverInputEnvelope
    connect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutSupervisorInput = {
    create?: XOR<UserCreateWithoutSupervisorInput, UserUncheckedCreateWithoutSupervisorInput> | UserCreateWithoutSupervisorInput[] | UserUncheckedCreateWithoutSupervisorInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSupervisorInput | UserCreateOrConnectWithoutSupervisorInput[]
    createMany?: UserCreateManySupervisorInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type CardAssignmentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CardAssignmentCreateWithoutUserInput, CardAssignmentUncheckedCreateWithoutUserInput> | CardAssignmentCreateWithoutUserInput[] | CardAssignmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CardAssignmentCreateOrConnectWithoutUserInput | CardAssignmentCreateOrConnectWithoutUserInput[]
    createMany?: CardAssignmentCreateManyUserInputEnvelope
    connect?: CardAssignmentWhereUniqueInput | CardAssignmentWhereUniqueInput[]
  }

  export type TravelRequestUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TravelRequestCreateWithoutUserInput, TravelRequestUncheckedCreateWithoutUserInput> | TravelRequestCreateWithoutUserInput[] | TravelRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TravelRequestCreateOrConnectWithoutUserInput | TravelRequestCreateOrConnectWithoutUserInput[]
    createMany?: TravelRequestCreateManyUserInputEnvelope
    connect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
  }

  export type TravelRequestUncheckedCreateNestedManyWithoutApproverInput = {
    create?: XOR<TravelRequestCreateWithoutApproverInput, TravelRequestUncheckedCreateWithoutApproverInput> | TravelRequestCreateWithoutApproverInput[] | TravelRequestUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: TravelRequestCreateOrConnectWithoutApproverInput | TravelRequestCreateOrConnectWithoutApproverInput[]
    createMany?: TravelRequestCreateManyApproverInputEnvelope
    connect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CompanyUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUsersInput
    upsert?: CompanyUpsertWithoutUsersInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutUsersInput, CompanyUpdateWithoutUsersInput>, CompanyUncheckedUpdateWithoutUsersInput>
  }

  export type BranchUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<BranchCreateWithoutUsersInput, BranchUncheckedCreateWithoutUsersInput>
    connectOrCreate?: BranchCreateOrConnectWithoutUsersInput
    upsert?: BranchUpsertWithoutUsersInput
    connect?: BranchWhereUniqueInput
    update?: XOR<XOR<BranchUpdateToOneWithWhereWithoutUsersInput, BranchUpdateWithoutUsersInput>, BranchUncheckedUpdateWithoutUsersInput>
  }

  export type AreaUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<AreaCreateWithoutUsersInput, AreaUncheckedCreateWithoutUsersInput>
    connectOrCreate?: AreaCreateOrConnectWithoutUsersInput
    upsert?: AreaUpsertWithoutUsersInput
    connect?: AreaWhereUniqueInput
    update?: XOR<XOR<AreaUpdateToOneWithWhereWithoutUsersInput, AreaUpdateWithoutUsersInput>, AreaUncheckedUpdateWithoutUsersInput>
  }

  export type RoleUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput
    upsert?: RoleUpsertWithoutUsersInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutUsersInput, RoleUpdateWithoutUsersInput>, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type UserUpdateOneWithoutSubordinatesNestedInput = {
    create?: XOR<UserCreateWithoutSubordinatesInput, UserUncheckedCreateWithoutSubordinatesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubordinatesInput
    upsert?: UserUpsertWithoutSubordinatesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubordinatesInput, UserUpdateWithoutSubordinatesInput>, UserUncheckedUpdateWithoutSubordinatesInput>
  }

  export type UserUpdateManyWithoutSupervisorNestedInput = {
    create?: XOR<UserCreateWithoutSupervisorInput, UserUncheckedCreateWithoutSupervisorInput> | UserCreateWithoutSupervisorInput[] | UserUncheckedCreateWithoutSupervisorInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSupervisorInput | UserCreateOrConnectWithoutSupervisorInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutSupervisorInput | UserUpsertWithWhereUniqueWithoutSupervisorInput[]
    createMany?: UserCreateManySupervisorInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutSupervisorInput | UserUpdateWithWhereUniqueWithoutSupervisorInput[]
    updateMany?: UserUpdateManyWithWhereWithoutSupervisorInput | UserUpdateManyWithWhereWithoutSupervisorInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type CardAssignmentUpdateManyWithoutUserNestedInput = {
    create?: XOR<CardAssignmentCreateWithoutUserInput, CardAssignmentUncheckedCreateWithoutUserInput> | CardAssignmentCreateWithoutUserInput[] | CardAssignmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CardAssignmentCreateOrConnectWithoutUserInput | CardAssignmentCreateOrConnectWithoutUserInput[]
    upsert?: CardAssignmentUpsertWithWhereUniqueWithoutUserInput | CardAssignmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CardAssignmentCreateManyUserInputEnvelope
    set?: CardAssignmentWhereUniqueInput | CardAssignmentWhereUniqueInput[]
    disconnect?: CardAssignmentWhereUniqueInput | CardAssignmentWhereUniqueInput[]
    delete?: CardAssignmentWhereUniqueInput | CardAssignmentWhereUniqueInput[]
    connect?: CardAssignmentWhereUniqueInput | CardAssignmentWhereUniqueInput[]
    update?: CardAssignmentUpdateWithWhereUniqueWithoutUserInput | CardAssignmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CardAssignmentUpdateManyWithWhereWithoutUserInput | CardAssignmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CardAssignmentScalarWhereInput | CardAssignmentScalarWhereInput[]
  }

  export type TravelRequestUpdateManyWithoutUserNestedInput = {
    create?: XOR<TravelRequestCreateWithoutUserInput, TravelRequestUncheckedCreateWithoutUserInput> | TravelRequestCreateWithoutUserInput[] | TravelRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TravelRequestCreateOrConnectWithoutUserInput | TravelRequestCreateOrConnectWithoutUserInput[]
    upsert?: TravelRequestUpsertWithWhereUniqueWithoutUserInput | TravelRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TravelRequestCreateManyUserInputEnvelope
    set?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    disconnect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    delete?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    connect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    update?: TravelRequestUpdateWithWhereUniqueWithoutUserInput | TravelRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TravelRequestUpdateManyWithWhereWithoutUserInput | TravelRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TravelRequestScalarWhereInput | TravelRequestScalarWhereInput[]
  }

  export type TravelRequestUpdateManyWithoutApproverNestedInput = {
    create?: XOR<TravelRequestCreateWithoutApproverInput, TravelRequestUncheckedCreateWithoutApproverInput> | TravelRequestCreateWithoutApproverInput[] | TravelRequestUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: TravelRequestCreateOrConnectWithoutApproverInput | TravelRequestCreateOrConnectWithoutApproverInput[]
    upsert?: TravelRequestUpsertWithWhereUniqueWithoutApproverInput | TravelRequestUpsertWithWhereUniqueWithoutApproverInput[]
    createMany?: TravelRequestCreateManyApproverInputEnvelope
    set?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    disconnect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    delete?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    connect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    update?: TravelRequestUpdateWithWhereUniqueWithoutApproverInput | TravelRequestUpdateWithWhereUniqueWithoutApproverInput[]
    updateMany?: TravelRequestUpdateManyWithWhereWithoutApproverInput | TravelRequestUpdateManyWithWhereWithoutApproverInput[]
    deleteMany?: TravelRequestScalarWhereInput | TravelRequestScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUncheckedUpdateManyWithoutSupervisorNestedInput = {
    create?: XOR<UserCreateWithoutSupervisorInput, UserUncheckedCreateWithoutSupervisorInput> | UserCreateWithoutSupervisorInput[] | UserUncheckedCreateWithoutSupervisorInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSupervisorInput | UserCreateOrConnectWithoutSupervisorInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutSupervisorInput | UserUpsertWithWhereUniqueWithoutSupervisorInput[]
    createMany?: UserCreateManySupervisorInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutSupervisorInput | UserUpdateWithWhereUniqueWithoutSupervisorInput[]
    updateMany?: UserUpdateManyWithWhereWithoutSupervisorInput | UserUpdateManyWithWhereWithoutSupervisorInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type CardAssignmentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CardAssignmentCreateWithoutUserInput, CardAssignmentUncheckedCreateWithoutUserInput> | CardAssignmentCreateWithoutUserInput[] | CardAssignmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CardAssignmentCreateOrConnectWithoutUserInput | CardAssignmentCreateOrConnectWithoutUserInput[]
    upsert?: CardAssignmentUpsertWithWhereUniqueWithoutUserInput | CardAssignmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CardAssignmentCreateManyUserInputEnvelope
    set?: CardAssignmentWhereUniqueInput | CardAssignmentWhereUniqueInput[]
    disconnect?: CardAssignmentWhereUniqueInput | CardAssignmentWhereUniqueInput[]
    delete?: CardAssignmentWhereUniqueInput | CardAssignmentWhereUniqueInput[]
    connect?: CardAssignmentWhereUniqueInput | CardAssignmentWhereUniqueInput[]
    update?: CardAssignmentUpdateWithWhereUniqueWithoutUserInput | CardAssignmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CardAssignmentUpdateManyWithWhereWithoutUserInput | CardAssignmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CardAssignmentScalarWhereInput | CardAssignmentScalarWhereInput[]
  }

  export type TravelRequestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TravelRequestCreateWithoutUserInput, TravelRequestUncheckedCreateWithoutUserInput> | TravelRequestCreateWithoutUserInput[] | TravelRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TravelRequestCreateOrConnectWithoutUserInput | TravelRequestCreateOrConnectWithoutUserInput[]
    upsert?: TravelRequestUpsertWithWhereUniqueWithoutUserInput | TravelRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TravelRequestCreateManyUserInputEnvelope
    set?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    disconnect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    delete?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    connect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    update?: TravelRequestUpdateWithWhereUniqueWithoutUserInput | TravelRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TravelRequestUpdateManyWithWhereWithoutUserInput | TravelRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TravelRequestScalarWhereInput | TravelRequestScalarWhereInput[]
  }

  export type TravelRequestUncheckedUpdateManyWithoutApproverNestedInput = {
    create?: XOR<TravelRequestCreateWithoutApproverInput, TravelRequestUncheckedCreateWithoutApproverInput> | TravelRequestCreateWithoutApproverInput[] | TravelRequestUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: TravelRequestCreateOrConnectWithoutApproverInput | TravelRequestCreateOrConnectWithoutApproverInput[]
    upsert?: TravelRequestUpsertWithWhereUniqueWithoutApproverInput | TravelRequestUpsertWithWhereUniqueWithoutApproverInput[]
    createMany?: TravelRequestCreateManyApproverInputEnvelope
    set?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    disconnect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    delete?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    connect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    update?: TravelRequestUpdateWithWhereUniqueWithoutApproverInput | TravelRequestUpdateWithWhereUniqueWithoutApproverInput[]
    updateMany?: TravelRequestUpdateManyWithWhereWithoutApproverInput | TravelRequestUpdateManyWithWhereWithoutApproverInput[]
    deleteMany?: TravelRequestScalarWhereInput | TravelRequestScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutCardsInput = {
    create?: XOR<CompanyCreateWithoutCardsInput, CompanyUncheckedCreateWithoutCardsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutCardsInput
    connect?: CompanyWhereUniqueInput
  }

  export type CardAssignmentCreateNestedManyWithoutCardInput = {
    create?: XOR<CardAssignmentCreateWithoutCardInput, CardAssignmentUncheckedCreateWithoutCardInput> | CardAssignmentCreateWithoutCardInput[] | CardAssignmentUncheckedCreateWithoutCardInput[]
    connectOrCreate?: CardAssignmentCreateOrConnectWithoutCardInput | CardAssignmentCreateOrConnectWithoutCardInput[]
    createMany?: CardAssignmentCreateManyCardInputEnvelope
    connect?: CardAssignmentWhereUniqueInput | CardAssignmentWhereUniqueInput[]
  }

  export type TravelRequestCreateNestedManyWithoutCardInput = {
    create?: XOR<TravelRequestCreateWithoutCardInput, TravelRequestUncheckedCreateWithoutCardInput> | TravelRequestCreateWithoutCardInput[] | TravelRequestUncheckedCreateWithoutCardInput[]
    connectOrCreate?: TravelRequestCreateOrConnectWithoutCardInput | TravelRequestCreateOrConnectWithoutCardInput[]
    createMany?: TravelRequestCreateManyCardInputEnvelope
    connect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
  }

  export type CardAssignmentUncheckedCreateNestedManyWithoutCardInput = {
    create?: XOR<CardAssignmentCreateWithoutCardInput, CardAssignmentUncheckedCreateWithoutCardInput> | CardAssignmentCreateWithoutCardInput[] | CardAssignmentUncheckedCreateWithoutCardInput[]
    connectOrCreate?: CardAssignmentCreateOrConnectWithoutCardInput | CardAssignmentCreateOrConnectWithoutCardInput[]
    createMany?: CardAssignmentCreateManyCardInputEnvelope
    connect?: CardAssignmentWhereUniqueInput | CardAssignmentWhereUniqueInput[]
  }

  export type TravelRequestUncheckedCreateNestedManyWithoutCardInput = {
    create?: XOR<TravelRequestCreateWithoutCardInput, TravelRequestUncheckedCreateWithoutCardInput> | TravelRequestCreateWithoutCardInput[] | TravelRequestUncheckedCreateWithoutCardInput[]
    connectOrCreate?: TravelRequestCreateOrConnectWithoutCardInput | TravelRequestCreateOrConnectWithoutCardInput[]
    createMany?: TravelRequestCreateManyCardInputEnvelope
    connect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
  }

  export type CompanyUpdateOneRequiredWithoutCardsNestedInput = {
    create?: XOR<CompanyCreateWithoutCardsInput, CompanyUncheckedCreateWithoutCardsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutCardsInput
    upsert?: CompanyUpsertWithoutCardsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutCardsInput, CompanyUpdateWithoutCardsInput>, CompanyUncheckedUpdateWithoutCardsInput>
  }

  export type CardAssignmentUpdateManyWithoutCardNestedInput = {
    create?: XOR<CardAssignmentCreateWithoutCardInput, CardAssignmentUncheckedCreateWithoutCardInput> | CardAssignmentCreateWithoutCardInput[] | CardAssignmentUncheckedCreateWithoutCardInput[]
    connectOrCreate?: CardAssignmentCreateOrConnectWithoutCardInput | CardAssignmentCreateOrConnectWithoutCardInput[]
    upsert?: CardAssignmentUpsertWithWhereUniqueWithoutCardInput | CardAssignmentUpsertWithWhereUniqueWithoutCardInput[]
    createMany?: CardAssignmentCreateManyCardInputEnvelope
    set?: CardAssignmentWhereUniqueInput | CardAssignmentWhereUniqueInput[]
    disconnect?: CardAssignmentWhereUniqueInput | CardAssignmentWhereUniqueInput[]
    delete?: CardAssignmentWhereUniqueInput | CardAssignmentWhereUniqueInput[]
    connect?: CardAssignmentWhereUniqueInput | CardAssignmentWhereUniqueInput[]
    update?: CardAssignmentUpdateWithWhereUniqueWithoutCardInput | CardAssignmentUpdateWithWhereUniqueWithoutCardInput[]
    updateMany?: CardAssignmentUpdateManyWithWhereWithoutCardInput | CardAssignmentUpdateManyWithWhereWithoutCardInput[]
    deleteMany?: CardAssignmentScalarWhereInput | CardAssignmentScalarWhereInput[]
  }

  export type TravelRequestUpdateManyWithoutCardNestedInput = {
    create?: XOR<TravelRequestCreateWithoutCardInput, TravelRequestUncheckedCreateWithoutCardInput> | TravelRequestCreateWithoutCardInput[] | TravelRequestUncheckedCreateWithoutCardInput[]
    connectOrCreate?: TravelRequestCreateOrConnectWithoutCardInput | TravelRequestCreateOrConnectWithoutCardInput[]
    upsert?: TravelRequestUpsertWithWhereUniqueWithoutCardInput | TravelRequestUpsertWithWhereUniqueWithoutCardInput[]
    createMany?: TravelRequestCreateManyCardInputEnvelope
    set?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    disconnect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    delete?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    connect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    update?: TravelRequestUpdateWithWhereUniqueWithoutCardInput | TravelRequestUpdateWithWhereUniqueWithoutCardInput[]
    updateMany?: TravelRequestUpdateManyWithWhereWithoutCardInput | TravelRequestUpdateManyWithWhereWithoutCardInput[]
    deleteMany?: TravelRequestScalarWhereInput | TravelRequestScalarWhereInput[]
  }

  export type CardAssignmentUncheckedUpdateManyWithoutCardNestedInput = {
    create?: XOR<CardAssignmentCreateWithoutCardInput, CardAssignmentUncheckedCreateWithoutCardInput> | CardAssignmentCreateWithoutCardInput[] | CardAssignmentUncheckedCreateWithoutCardInput[]
    connectOrCreate?: CardAssignmentCreateOrConnectWithoutCardInput | CardAssignmentCreateOrConnectWithoutCardInput[]
    upsert?: CardAssignmentUpsertWithWhereUniqueWithoutCardInput | CardAssignmentUpsertWithWhereUniqueWithoutCardInput[]
    createMany?: CardAssignmentCreateManyCardInputEnvelope
    set?: CardAssignmentWhereUniqueInput | CardAssignmentWhereUniqueInput[]
    disconnect?: CardAssignmentWhereUniqueInput | CardAssignmentWhereUniqueInput[]
    delete?: CardAssignmentWhereUniqueInput | CardAssignmentWhereUniqueInput[]
    connect?: CardAssignmentWhereUniqueInput | CardAssignmentWhereUniqueInput[]
    update?: CardAssignmentUpdateWithWhereUniqueWithoutCardInput | CardAssignmentUpdateWithWhereUniqueWithoutCardInput[]
    updateMany?: CardAssignmentUpdateManyWithWhereWithoutCardInput | CardAssignmentUpdateManyWithWhereWithoutCardInput[]
    deleteMany?: CardAssignmentScalarWhereInput | CardAssignmentScalarWhereInput[]
  }

  export type TravelRequestUncheckedUpdateManyWithoutCardNestedInput = {
    create?: XOR<TravelRequestCreateWithoutCardInput, TravelRequestUncheckedCreateWithoutCardInput> | TravelRequestCreateWithoutCardInput[] | TravelRequestUncheckedCreateWithoutCardInput[]
    connectOrCreate?: TravelRequestCreateOrConnectWithoutCardInput | TravelRequestCreateOrConnectWithoutCardInput[]
    upsert?: TravelRequestUpsertWithWhereUniqueWithoutCardInput | TravelRequestUpsertWithWhereUniqueWithoutCardInput[]
    createMany?: TravelRequestCreateManyCardInputEnvelope
    set?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    disconnect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    delete?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    connect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    update?: TravelRequestUpdateWithWhereUniqueWithoutCardInput | TravelRequestUpdateWithWhereUniqueWithoutCardInput[]
    updateMany?: TravelRequestUpdateManyWithWhereWithoutCardInput | TravelRequestUpdateManyWithWhereWithoutCardInput[]
    deleteMany?: TravelRequestScalarWhereInput | TravelRequestScalarWhereInput[]
  }

  export type CardCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<CardCreateWithoutAssignmentsInput, CardUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: CardCreateOrConnectWithoutAssignmentsInput
    connect?: CardWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCardsInput = {
    create?: XOR<UserCreateWithoutCardsInput, UserUncheckedCreateWithoutCardsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCardsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CardUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<CardCreateWithoutAssignmentsInput, CardUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: CardCreateOrConnectWithoutAssignmentsInput
    upsert?: CardUpsertWithoutAssignmentsInput
    connect?: CardWhereUniqueInput
    update?: XOR<XOR<CardUpdateToOneWithWhereWithoutAssignmentsInput, CardUpdateWithoutAssignmentsInput>, CardUncheckedUpdateWithoutAssignmentsInput>
  }

  export type UserUpdateOneRequiredWithoutCardsNestedInput = {
    create?: XOR<UserCreateWithoutCardsInput, UserUncheckedCreateWithoutCardsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCardsInput
    upsert?: UserUpsertWithoutCardsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCardsInput, UserUpdateWithoutCardsInput>, UserUncheckedUpdateWithoutCardsInput>
  }

  export type TravelRequestCreateNestedManyWithoutStatusInput = {
    create?: XOR<TravelRequestCreateWithoutStatusInput, TravelRequestUncheckedCreateWithoutStatusInput> | TravelRequestCreateWithoutStatusInput[] | TravelRequestUncheckedCreateWithoutStatusInput[]
    connectOrCreate?: TravelRequestCreateOrConnectWithoutStatusInput | TravelRequestCreateOrConnectWithoutStatusInput[]
    createMany?: TravelRequestCreateManyStatusInputEnvelope
    connect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
  }

  export type TravelRequestUncheckedCreateNestedManyWithoutStatusInput = {
    create?: XOR<TravelRequestCreateWithoutStatusInput, TravelRequestUncheckedCreateWithoutStatusInput> | TravelRequestCreateWithoutStatusInput[] | TravelRequestUncheckedCreateWithoutStatusInput[]
    connectOrCreate?: TravelRequestCreateOrConnectWithoutStatusInput | TravelRequestCreateOrConnectWithoutStatusInput[]
    createMany?: TravelRequestCreateManyStatusInputEnvelope
    connect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
  }

  export type TravelRequestUpdateManyWithoutStatusNestedInput = {
    create?: XOR<TravelRequestCreateWithoutStatusInput, TravelRequestUncheckedCreateWithoutStatusInput> | TravelRequestCreateWithoutStatusInput[] | TravelRequestUncheckedCreateWithoutStatusInput[]
    connectOrCreate?: TravelRequestCreateOrConnectWithoutStatusInput | TravelRequestCreateOrConnectWithoutStatusInput[]
    upsert?: TravelRequestUpsertWithWhereUniqueWithoutStatusInput | TravelRequestUpsertWithWhereUniqueWithoutStatusInput[]
    createMany?: TravelRequestCreateManyStatusInputEnvelope
    set?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    disconnect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    delete?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    connect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    update?: TravelRequestUpdateWithWhereUniqueWithoutStatusInput | TravelRequestUpdateWithWhereUniqueWithoutStatusInput[]
    updateMany?: TravelRequestUpdateManyWithWhereWithoutStatusInput | TravelRequestUpdateManyWithWhereWithoutStatusInput[]
    deleteMany?: TravelRequestScalarWhereInput | TravelRequestScalarWhereInput[]
  }

  export type TravelRequestUncheckedUpdateManyWithoutStatusNestedInput = {
    create?: XOR<TravelRequestCreateWithoutStatusInput, TravelRequestUncheckedCreateWithoutStatusInput> | TravelRequestCreateWithoutStatusInput[] | TravelRequestUncheckedCreateWithoutStatusInput[]
    connectOrCreate?: TravelRequestCreateOrConnectWithoutStatusInput | TravelRequestCreateOrConnectWithoutStatusInput[]
    upsert?: TravelRequestUpsertWithWhereUniqueWithoutStatusInput | TravelRequestUpsertWithWhereUniqueWithoutStatusInput[]
    createMany?: TravelRequestCreateManyStatusInputEnvelope
    set?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    disconnect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    delete?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    connect?: TravelRequestWhereUniqueInput | TravelRequestWhereUniqueInput[]
    update?: TravelRequestUpdateWithWhereUniqueWithoutStatusInput | TravelRequestUpdateWithWhereUniqueWithoutStatusInput[]
    updateMany?: TravelRequestUpdateManyWithWhereWithoutStatusInput | TravelRequestUpdateManyWithWhereWithoutStatusInput[]
    deleteMany?: TravelRequestScalarWhereInput | TravelRequestScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTravelRequestsInput = {
    create?: XOR<UserCreateWithoutTravelRequestsInput, UserUncheckedCreateWithoutTravelRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTravelRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type StatusTravelRequestCreateNestedOneWithoutTravelRequestsInput = {
    create?: XOR<StatusTravelRequestCreateWithoutTravelRequestsInput, StatusTravelRequestUncheckedCreateWithoutTravelRequestsInput>
    connectOrCreate?: StatusTravelRequestCreateOrConnectWithoutTravelRequestsInput
    connect?: StatusTravelRequestWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutApprovedTravelRequestsInput = {
    create?: XOR<UserCreateWithoutApprovedTravelRequestsInput, UserUncheckedCreateWithoutApprovedTravelRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutApprovedTravelRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type CardCreateNestedOneWithoutTravelRequestsInput = {
    create?: XOR<CardCreateWithoutTravelRequestsInput, CardUncheckedCreateWithoutTravelRequestsInput>
    connectOrCreate?: CardCreateOrConnectWithoutTravelRequestsInput
    connect?: CardWhereUniqueInput
  }

  export type TravelDetailCreateNestedManyWithoutRequestInput = {
    create?: XOR<TravelDetailCreateWithoutRequestInput, TravelDetailUncheckedCreateWithoutRequestInput> | TravelDetailCreateWithoutRequestInput[] | TravelDetailUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: TravelDetailCreateOrConnectWithoutRequestInput | TravelDetailCreateOrConnectWithoutRequestInput[]
    createMany?: TravelDetailCreateManyRequestInputEnvelope
    connect?: TravelDetailWhereUniqueInput | TravelDetailWhereUniqueInput[]
  }

  export type TravelDetailUncheckedCreateNestedManyWithoutRequestInput = {
    create?: XOR<TravelDetailCreateWithoutRequestInput, TravelDetailUncheckedCreateWithoutRequestInput> | TravelDetailCreateWithoutRequestInput[] | TravelDetailUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: TravelDetailCreateOrConnectWithoutRequestInput | TravelDetailCreateOrConnectWithoutRequestInput[]
    createMany?: TravelDetailCreateManyRequestInputEnvelope
    connect?: TravelDetailWhereUniqueInput | TravelDetailWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneRequiredWithoutTravelRequestsNestedInput = {
    create?: XOR<UserCreateWithoutTravelRequestsInput, UserUncheckedCreateWithoutTravelRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTravelRequestsInput
    upsert?: UserUpsertWithoutTravelRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTravelRequestsInput, UserUpdateWithoutTravelRequestsInput>, UserUncheckedUpdateWithoutTravelRequestsInput>
  }

  export type StatusTravelRequestUpdateOneRequiredWithoutTravelRequestsNestedInput = {
    create?: XOR<StatusTravelRequestCreateWithoutTravelRequestsInput, StatusTravelRequestUncheckedCreateWithoutTravelRequestsInput>
    connectOrCreate?: StatusTravelRequestCreateOrConnectWithoutTravelRequestsInput
    upsert?: StatusTravelRequestUpsertWithoutTravelRequestsInput
    connect?: StatusTravelRequestWhereUniqueInput
    update?: XOR<XOR<StatusTravelRequestUpdateToOneWithWhereWithoutTravelRequestsInput, StatusTravelRequestUpdateWithoutTravelRequestsInput>, StatusTravelRequestUncheckedUpdateWithoutTravelRequestsInput>
  }

  export type UserUpdateOneWithoutApprovedTravelRequestsNestedInput = {
    create?: XOR<UserCreateWithoutApprovedTravelRequestsInput, UserUncheckedCreateWithoutApprovedTravelRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutApprovedTravelRequestsInput
    upsert?: UserUpsertWithoutApprovedTravelRequestsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutApprovedTravelRequestsInput, UserUpdateWithoutApprovedTravelRequestsInput>, UserUncheckedUpdateWithoutApprovedTravelRequestsInput>
  }

  export type CardUpdateOneWithoutTravelRequestsNestedInput = {
    create?: XOR<CardCreateWithoutTravelRequestsInput, CardUncheckedCreateWithoutTravelRequestsInput>
    connectOrCreate?: CardCreateOrConnectWithoutTravelRequestsInput
    upsert?: CardUpsertWithoutTravelRequestsInput
    disconnect?: CardWhereInput | boolean
    delete?: CardWhereInput | boolean
    connect?: CardWhereUniqueInput
    update?: XOR<XOR<CardUpdateToOneWithWhereWithoutTravelRequestsInput, CardUpdateWithoutTravelRequestsInput>, CardUncheckedUpdateWithoutTravelRequestsInput>
  }

  export type TravelDetailUpdateManyWithoutRequestNestedInput = {
    create?: XOR<TravelDetailCreateWithoutRequestInput, TravelDetailUncheckedCreateWithoutRequestInput> | TravelDetailCreateWithoutRequestInput[] | TravelDetailUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: TravelDetailCreateOrConnectWithoutRequestInput | TravelDetailCreateOrConnectWithoutRequestInput[]
    upsert?: TravelDetailUpsertWithWhereUniqueWithoutRequestInput | TravelDetailUpsertWithWhereUniqueWithoutRequestInput[]
    createMany?: TravelDetailCreateManyRequestInputEnvelope
    set?: TravelDetailWhereUniqueInput | TravelDetailWhereUniqueInput[]
    disconnect?: TravelDetailWhereUniqueInput | TravelDetailWhereUniqueInput[]
    delete?: TravelDetailWhereUniqueInput | TravelDetailWhereUniqueInput[]
    connect?: TravelDetailWhereUniqueInput | TravelDetailWhereUniqueInput[]
    update?: TravelDetailUpdateWithWhereUniqueWithoutRequestInput | TravelDetailUpdateWithWhereUniqueWithoutRequestInput[]
    updateMany?: TravelDetailUpdateManyWithWhereWithoutRequestInput | TravelDetailUpdateManyWithWhereWithoutRequestInput[]
    deleteMany?: TravelDetailScalarWhereInput | TravelDetailScalarWhereInput[]
  }

  export type TravelDetailUncheckedUpdateManyWithoutRequestNestedInput = {
    create?: XOR<TravelDetailCreateWithoutRequestInput, TravelDetailUncheckedCreateWithoutRequestInput> | TravelDetailCreateWithoutRequestInput[] | TravelDetailUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: TravelDetailCreateOrConnectWithoutRequestInput | TravelDetailCreateOrConnectWithoutRequestInput[]
    upsert?: TravelDetailUpsertWithWhereUniqueWithoutRequestInput | TravelDetailUpsertWithWhereUniqueWithoutRequestInput[]
    createMany?: TravelDetailCreateManyRequestInputEnvelope
    set?: TravelDetailWhereUniqueInput | TravelDetailWhereUniqueInput[]
    disconnect?: TravelDetailWhereUniqueInput | TravelDetailWhereUniqueInput[]
    delete?: TravelDetailWhereUniqueInput | TravelDetailWhereUniqueInput[]
    connect?: TravelDetailWhereUniqueInput | TravelDetailWhereUniqueInput[]
    update?: TravelDetailUpdateWithWhereUniqueWithoutRequestInput | TravelDetailUpdateWithWhereUniqueWithoutRequestInput[]
    updateMany?: TravelDetailUpdateManyWithWhereWithoutRequestInput | TravelDetailUpdateManyWithWhereWithoutRequestInput[]
    deleteMany?: TravelDetailScalarWhereInput | TravelDetailScalarWhereInput[]
  }

  export type TravelRequestCreateNestedOneWithoutDetailsInput = {
    create?: XOR<TravelRequestCreateWithoutDetailsInput, TravelRequestUncheckedCreateWithoutDetailsInput>
    connectOrCreate?: TravelRequestCreateOrConnectWithoutDetailsInput
    connect?: TravelRequestWhereUniqueInput
  }

  export type TravelRequestUpdateOneRequiredWithoutDetailsNestedInput = {
    create?: XOR<TravelRequestCreateWithoutDetailsInput, TravelRequestUncheckedCreateWithoutDetailsInput>
    connectOrCreate?: TravelRequestCreateOrConnectWithoutDetailsInput
    upsert?: TravelRequestUpsertWithoutDetailsInput
    connect?: TravelRequestWhereUniqueInput
    update?: XOR<XOR<TravelRequestUpdateToOneWithWhereWithoutDetailsInput, TravelRequestUpdateWithoutDetailsInput>, TravelRequestUncheckedUpdateWithoutDetailsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UserCreateWithoutCompanyInput = {
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    branch: BranchCreateNestedOneWithoutUsersInput
    area: AreaCreateNestedOneWithoutUsersInput
    role: RoleCreateNestedOneWithoutUsersInput
    supervisor?: UserCreateNestedOneWithoutSubordinatesInput
    subordinates?: UserCreateNestedManyWithoutSupervisorInput
    cards?: CardAssignmentCreateNestedManyWithoutUserInput
    travelRequests?: TravelRequestCreateNestedManyWithoutUserInput
    approvedTravelRequests?: TravelRequestCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateWithoutCompanyInput = {
    id?: number
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    branchId: number
    areaId: number
    roleId: number
    supervisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subordinates?: UserUncheckedCreateNestedManyWithoutSupervisorInput
    cards?: CardAssignmentUncheckedCreateNestedManyWithoutUserInput
    travelRequests?: TravelRequestUncheckedCreateNestedManyWithoutUserInput
    approvedTravelRequests?: TravelRequestUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserCreateOrConnectWithoutCompanyInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
  }

  export type UserCreateManyCompanyInputEnvelope = {
    data: UserCreateManyCompanyInput | UserCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type BranchCreateWithoutCompanyInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutBranchInput
  }

  export type BranchUncheckedCreateWithoutCompanyInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchCreateOrConnectWithoutCompanyInput = {
    where: BranchWhereUniqueInput
    create: XOR<BranchCreateWithoutCompanyInput, BranchUncheckedCreateWithoutCompanyInput>
  }

  export type BranchCreateManyCompanyInputEnvelope = {
    data: BranchCreateManyCompanyInput | BranchCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type CardCreateWithoutCompanyInput = {
    cardNumber: string
    isActive?: boolean
    createdAt?: Date | string
    assignments?: CardAssignmentCreateNestedManyWithoutCardInput
    travelRequests?: TravelRequestCreateNestedManyWithoutCardInput
  }

  export type CardUncheckedCreateWithoutCompanyInput = {
    id?: number
    cardNumber: string
    isActive?: boolean
    createdAt?: Date | string
    assignments?: CardAssignmentUncheckedCreateNestedManyWithoutCardInput
    travelRequests?: TravelRequestUncheckedCreateNestedManyWithoutCardInput
  }

  export type CardCreateOrConnectWithoutCompanyInput = {
    where: CardWhereUniqueInput
    create: XOR<CardCreateWithoutCompanyInput, CardUncheckedCreateWithoutCompanyInput>
  }

  export type CardCreateManyCompanyInputEnvelope = {
    data: CardCreateManyCompanyInput | CardCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutCompanyInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
  }

  export type UserUpdateWithWhereUniqueWithoutCompanyInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
  }

  export type UserUpdateManyWithWhereWithoutCompanyInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutCompanyInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    paternalSurname?: StringFilter<"User"> | string
    maternalSurname?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    companyId?: IntFilter<"User"> | number
    branchId?: IntFilter<"User"> | number
    areaId?: IntFilter<"User"> | number
    roleId?: IntFilter<"User"> | number
    supervisorId?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type BranchUpsertWithWhereUniqueWithoutCompanyInput = {
    where: BranchWhereUniqueInput
    update: XOR<BranchUpdateWithoutCompanyInput, BranchUncheckedUpdateWithoutCompanyInput>
    create: XOR<BranchCreateWithoutCompanyInput, BranchUncheckedCreateWithoutCompanyInput>
  }

  export type BranchUpdateWithWhereUniqueWithoutCompanyInput = {
    where: BranchWhereUniqueInput
    data: XOR<BranchUpdateWithoutCompanyInput, BranchUncheckedUpdateWithoutCompanyInput>
  }

  export type BranchUpdateManyWithWhereWithoutCompanyInput = {
    where: BranchScalarWhereInput
    data: XOR<BranchUpdateManyMutationInput, BranchUncheckedUpdateManyWithoutCompanyInput>
  }

  export type BranchScalarWhereInput = {
    AND?: BranchScalarWhereInput | BranchScalarWhereInput[]
    OR?: BranchScalarWhereInput[]
    NOT?: BranchScalarWhereInput | BranchScalarWhereInput[]
    id?: IntFilter<"Branch"> | number
    name?: StringFilter<"Branch"> | string
    companyId?: IntFilter<"Branch"> | number
    createdAt?: DateTimeFilter<"Branch"> | Date | string
    updatedAt?: DateTimeFilter<"Branch"> | Date | string
  }

  export type CardUpsertWithWhereUniqueWithoutCompanyInput = {
    where: CardWhereUniqueInput
    update: XOR<CardUpdateWithoutCompanyInput, CardUncheckedUpdateWithoutCompanyInput>
    create: XOR<CardCreateWithoutCompanyInput, CardUncheckedCreateWithoutCompanyInput>
  }

  export type CardUpdateWithWhereUniqueWithoutCompanyInput = {
    where: CardWhereUniqueInput
    data: XOR<CardUpdateWithoutCompanyInput, CardUncheckedUpdateWithoutCompanyInput>
  }

  export type CardUpdateManyWithWhereWithoutCompanyInput = {
    where: CardScalarWhereInput
    data: XOR<CardUpdateManyMutationInput, CardUncheckedUpdateManyWithoutCompanyInput>
  }

  export type CardScalarWhereInput = {
    AND?: CardScalarWhereInput | CardScalarWhereInput[]
    OR?: CardScalarWhereInput[]
    NOT?: CardScalarWhereInput | CardScalarWhereInput[]
    id?: IntFilter<"Card"> | number
    cardNumber?: StringFilter<"Card"> | string
    companyId?: IntFilter<"Card"> | number
    isActive?: BoolFilter<"Card"> | boolean
    createdAt?: DateTimeFilter<"Card"> | Date | string
  }

  export type CompanyCreateWithoutBranchesInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    cards?: CardCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutBranchesInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    cards?: CardUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutBranchesInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutBranchesInput, CompanyUncheckedCreateWithoutBranchesInput>
  }

  export type UserCreateWithoutBranchInput = {
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutUsersInput
    area: AreaCreateNestedOneWithoutUsersInput
    role: RoleCreateNestedOneWithoutUsersInput
    supervisor?: UserCreateNestedOneWithoutSubordinatesInput
    subordinates?: UserCreateNestedManyWithoutSupervisorInput
    cards?: CardAssignmentCreateNestedManyWithoutUserInput
    travelRequests?: TravelRequestCreateNestedManyWithoutUserInput
    approvedTravelRequests?: TravelRequestCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateWithoutBranchInput = {
    id?: number
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    companyId: number
    areaId: number
    roleId: number
    supervisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subordinates?: UserUncheckedCreateNestedManyWithoutSupervisorInput
    cards?: CardAssignmentUncheckedCreateNestedManyWithoutUserInput
    travelRequests?: TravelRequestUncheckedCreateNestedManyWithoutUserInput
    approvedTravelRequests?: TravelRequestUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserCreateOrConnectWithoutBranchInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBranchInput, UserUncheckedCreateWithoutBranchInput>
  }

  export type UserCreateManyBranchInputEnvelope = {
    data: UserCreateManyBranchInput | UserCreateManyBranchInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutBranchesInput = {
    update: XOR<CompanyUpdateWithoutBranchesInput, CompanyUncheckedUpdateWithoutBranchesInput>
    create: XOR<CompanyCreateWithoutBranchesInput, CompanyUncheckedCreateWithoutBranchesInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutBranchesInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutBranchesInput, CompanyUncheckedUpdateWithoutBranchesInput>
  }

  export type CompanyUpdateWithoutBranchesInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    cards?: CardUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutBranchesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    cards?: CardUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutBranchInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutBranchInput, UserUncheckedUpdateWithoutBranchInput>
    create: XOR<UserCreateWithoutBranchInput, UserUncheckedCreateWithoutBranchInput>
  }

  export type UserUpdateWithWhereUniqueWithoutBranchInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutBranchInput, UserUncheckedUpdateWithoutBranchInput>
  }

  export type UserUpdateManyWithWhereWithoutBranchInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutBranchInput>
  }

  export type UserCreateWithoutAreaInput = {
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutUsersInput
    branch: BranchCreateNestedOneWithoutUsersInput
    role: RoleCreateNestedOneWithoutUsersInput
    supervisor?: UserCreateNestedOneWithoutSubordinatesInput
    subordinates?: UserCreateNestedManyWithoutSupervisorInput
    cards?: CardAssignmentCreateNestedManyWithoutUserInput
    travelRequests?: TravelRequestCreateNestedManyWithoutUserInput
    approvedTravelRequests?: TravelRequestCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateWithoutAreaInput = {
    id?: number
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    companyId: number
    branchId: number
    roleId: number
    supervisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subordinates?: UserUncheckedCreateNestedManyWithoutSupervisorInput
    cards?: CardAssignmentUncheckedCreateNestedManyWithoutUserInput
    travelRequests?: TravelRequestUncheckedCreateNestedManyWithoutUserInput
    approvedTravelRequests?: TravelRequestUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserCreateOrConnectWithoutAreaInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAreaInput, UserUncheckedCreateWithoutAreaInput>
  }

  export type UserCreateManyAreaInputEnvelope = {
    data: UserCreateManyAreaInput | UserCreateManyAreaInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutAreaInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutAreaInput, UserUncheckedUpdateWithoutAreaInput>
    create: XOR<UserCreateWithoutAreaInput, UserUncheckedCreateWithoutAreaInput>
  }

  export type UserUpdateWithWhereUniqueWithoutAreaInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutAreaInput, UserUncheckedUpdateWithoutAreaInput>
  }

  export type UserUpdateManyWithWhereWithoutAreaInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutAreaInput>
  }

  export type UserCreateWithoutRoleInput = {
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutUsersInput
    branch: BranchCreateNestedOneWithoutUsersInput
    area: AreaCreateNestedOneWithoutUsersInput
    supervisor?: UserCreateNestedOneWithoutSubordinatesInput
    subordinates?: UserCreateNestedManyWithoutSupervisorInput
    cards?: CardAssignmentCreateNestedManyWithoutUserInput
    travelRequests?: TravelRequestCreateNestedManyWithoutUserInput
    approvedTravelRequests?: TravelRequestCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateWithoutRoleInput = {
    id?: number
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    companyId: number
    branchId: number
    areaId: number
    supervisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subordinates?: UserUncheckedCreateNestedManyWithoutSupervisorInput
    cards?: CardAssignmentUncheckedCreateNestedManyWithoutUserInput
    travelRequests?: TravelRequestUncheckedCreateNestedManyWithoutUserInput
    approvedTravelRequests?: TravelRequestUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserCreateOrConnectWithoutRoleInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput>
  }

  export type UserCreateManyRoleInputEnvelope = {
    data: UserCreateManyRoleInput | UserCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutRoleInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutRoleInput, UserUncheckedUpdateWithoutRoleInput>
    create: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput>
  }

  export type UserUpdateWithWhereUniqueWithoutRoleInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutRoleInput, UserUncheckedUpdateWithoutRoleInput>
  }

  export type UserUpdateManyWithWhereWithoutRoleInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutRoleInput>
  }

  export type CompanyCreateWithoutUsersInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    branches?: BranchCreateNestedManyWithoutCompanyInput
    cards?: CardCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutUsersInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    branches?: BranchUncheckedCreateNestedManyWithoutCompanyInput
    cards?: CardUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutUsersInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
  }

  export type BranchCreateWithoutUsersInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutBranchesInput
  }

  export type BranchUncheckedCreateWithoutUsersInput = {
    id?: number
    name: string
    companyId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BranchCreateOrConnectWithoutUsersInput = {
    where: BranchWhereUniqueInput
    create: XOR<BranchCreateWithoutUsersInput, BranchUncheckedCreateWithoutUsersInput>
  }

  export type AreaCreateWithoutUsersInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AreaUncheckedCreateWithoutUsersInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AreaCreateOrConnectWithoutUsersInput = {
    where: AreaWhereUniqueInput
    create: XOR<AreaCreateWithoutUsersInput, AreaUncheckedCreateWithoutUsersInput>
  }

  export type RoleCreateWithoutUsersInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoleUncheckedCreateWithoutUsersInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoleCreateOrConnectWithoutUsersInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
  }

  export type UserCreateWithoutSubordinatesInput = {
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutUsersInput
    branch: BranchCreateNestedOneWithoutUsersInput
    area: AreaCreateNestedOneWithoutUsersInput
    role: RoleCreateNestedOneWithoutUsersInput
    supervisor?: UserCreateNestedOneWithoutSubordinatesInput
    cards?: CardAssignmentCreateNestedManyWithoutUserInput
    travelRequests?: TravelRequestCreateNestedManyWithoutUserInput
    approvedTravelRequests?: TravelRequestCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateWithoutSubordinatesInput = {
    id?: number
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    companyId: number
    branchId: number
    areaId: number
    roleId: number
    supervisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: CardAssignmentUncheckedCreateNestedManyWithoutUserInput
    travelRequests?: TravelRequestUncheckedCreateNestedManyWithoutUserInput
    approvedTravelRequests?: TravelRequestUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserCreateOrConnectWithoutSubordinatesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubordinatesInput, UserUncheckedCreateWithoutSubordinatesInput>
  }

  export type UserCreateWithoutSupervisorInput = {
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutUsersInput
    branch: BranchCreateNestedOneWithoutUsersInput
    area: AreaCreateNestedOneWithoutUsersInput
    role: RoleCreateNestedOneWithoutUsersInput
    subordinates?: UserCreateNestedManyWithoutSupervisorInput
    cards?: CardAssignmentCreateNestedManyWithoutUserInput
    travelRequests?: TravelRequestCreateNestedManyWithoutUserInput
    approvedTravelRequests?: TravelRequestCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateWithoutSupervisorInput = {
    id?: number
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    companyId: number
    branchId: number
    areaId: number
    roleId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    subordinates?: UserUncheckedCreateNestedManyWithoutSupervisorInput
    cards?: CardAssignmentUncheckedCreateNestedManyWithoutUserInput
    travelRequests?: TravelRequestUncheckedCreateNestedManyWithoutUserInput
    approvedTravelRequests?: TravelRequestUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserCreateOrConnectWithoutSupervisorInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSupervisorInput, UserUncheckedCreateWithoutSupervisorInput>
  }

  export type UserCreateManySupervisorInputEnvelope = {
    data: UserCreateManySupervisorInput | UserCreateManySupervisorInput[]
    skipDuplicates?: boolean
  }

  export type CardAssignmentCreateWithoutUserInput = {
    assignedAt?: Date | string
    unassignedAt?: Date | string | null
    card: CardCreateNestedOneWithoutAssignmentsInput
  }

  export type CardAssignmentUncheckedCreateWithoutUserInput = {
    id?: number
    cardId: number
    assignedAt?: Date | string
    unassignedAt?: Date | string | null
  }

  export type CardAssignmentCreateOrConnectWithoutUserInput = {
    where: CardAssignmentWhereUniqueInput
    create: XOR<CardAssignmentCreateWithoutUserInput, CardAssignmentUncheckedCreateWithoutUserInput>
  }

  export type CardAssignmentCreateManyUserInputEnvelope = {
    data: CardAssignmentCreateManyUserInput | CardAssignmentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TravelRequestCreateWithoutUserInput = {
    totalAmount: Decimal | DecimalJsLike | number | string
    travelReason: string
    travelObjectives: string
    departureDate: Date | string
    returnDate: Date | string
    disbursementDate?: Date | string | null
    approvalDate?: Date | string | null
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    status: StatusTravelRequestCreateNestedOneWithoutTravelRequestsInput
    approver?: UserCreateNestedOneWithoutApprovedTravelRequestsInput
    card?: CardCreateNestedOneWithoutTravelRequestsInput
    details?: TravelDetailCreateNestedManyWithoutRequestInput
  }

  export type TravelRequestUncheckedCreateWithoutUserInput = {
    id?: number
    statusId: number
    cardId?: number | null
    totalAmount: Decimal | DecimalJsLike | number | string
    travelReason: string
    travelObjectives: string
    departureDate: Date | string
    returnDate: Date | string
    disbursementDate?: Date | string | null
    approvalDate?: Date | string | null
    approverId?: number | null
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    details?: TravelDetailUncheckedCreateNestedManyWithoutRequestInput
  }

  export type TravelRequestCreateOrConnectWithoutUserInput = {
    where: TravelRequestWhereUniqueInput
    create: XOR<TravelRequestCreateWithoutUserInput, TravelRequestUncheckedCreateWithoutUserInput>
  }

  export type TravelRequestCreateManyUserInputEnvelope = {
    data: TravelRequestCreateManyUserInput | TravelRequestCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TravelRequestCreateWithoutApproverInput = {
    totalAmount: Decimal | DecimalJsLike | number | string
    travelReason: string
    travelObjectives: string
    departureDate: Date | string
    returnDate: Date | string
    disbursementDate?: Date | string | null
    approvalDate?: Date | string | null
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTravelRequestsInput
    status: StatusTravelRequestCreateNestedOneWithoutTravelRequestsInput
    card?: CardCreateNestedOneWithoutTravelRequestsInput
    details?: TravelDetailCreateNestedManyWithoutRequestInput
  }

  export type TravelRequestUncheckedCreateWithoutApproverInput = {
    id?: number
    userId: number
    statusId: number
    cardId?: number | null
    totalAmount: Decimal | DecimalJsLike | number | string
    travelReason: string
    travelObjectives: string
    departureDate: Date | string
    returnDate: Date | string
    disbursementDate?: Date | string | null
    approvalDate?: Date | string | null
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    details?: TravelDetailUncheckedCreateNestedManyWithoutRequestInput
  }

  export type TravelRequestCreateOrConnectWithoutApproverInput = {
    where: TravelRequestWhereUniqueInput
    create: XOR<TravelRequestCreateWithoutApproverInput, TravelRequestUncheckedCreateWithoutApproverInput>
  }

  export type TravelRequestCreateManyApproverInputEnvelope = {
    data: TravelRequestCreateManyApproverInput | TravelRequestCreateManyApproverInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutUsersInput = {
    update: XOR<CompanyUpdateWithoutUsersInput, CompanyUncheckedUpdateWithoutUsersInput>
    create: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutUsersInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutUsersInput, CompanyUncheckedUpdateWithoutUsersInput>
  }

  export type CompanyUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    branches?: BranchUpdateManyWithoutCompanyNestedInput
    cards?: CardUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    branches?: BranchUncheckedUpdateManyWithoutCompanyNestedInput
    cards?: CardUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type BranchUpsertWithoutUsersInput = {
    update: XOR<BranchUpdateWithoutUsersInput, BranchUncheckedUpdateWithoutUsersInput>
    create: XOR<BranchCreateWithoutUsersInput, BranchUncheckedCreateWithoutUsersInput>
    where?: BranchWhereInput
  }

  export type BranchUpdateToOneWithWhereWithoutUsersInput = {
    where?: BranchWhereInput
    data: XOR<BranchUpdateWithoutUsersInput, BranchUncheckedUpdateWithoutUsersInput>
  }

  export type BranchUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutBranchesNestedInput
  }

  export type BranchUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    companyId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AreaUpsertWithoutUsersInput = {
    update: XOR<AreaUpdateWithoutUsersInput, AreaUncheckedUpdateWithoutUsersInput>
    create: XOR<AreaCreateWithoutUsersInput, AreaUncheckedCreateWithoutUsersInput>
    where?: AreaWhereInput
  }

  export type AreaUpdateToOneWithWhereWithoutUsersInput = {
    where?: AreaWhereInput
    data: XOR<AreaUpdateWithoutUsersInput, AreaUncheckedUpdateWithoutUsersInput>
  }

  export type AreaUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AreaUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleUpsertWithoutUsersInput = {
    update: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutUsersInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type RoleUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutSubordinatesInput = {
    update: XOR<UserUpdateWithoutSubordinatesInput, UserUncheckedUpdateWithoutSubordinatesInput>
    create: XOR<UserCreateWithoutSubordinatesInput, UserUncheckedCreateWithoutSubordinatesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubordinatesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubordinatesInput, UserUncheckedUpdateWithoutSubordinatesInput>
  }

  export type UserUpdateWithoutSubordinatesInput = {
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUsersNestedInput
    branch?: BranchUpdateOneRequiredWithoutUsersNestedInput
    area?: AreaUpdateOneRequiredWithoutUsersNestedInput
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
    supervisor?: UserUpdateOneWithoutSubordinatesNestedInput
    cards?: CardAssignmentUpdateManyWithoutUserNestedInput
    travelRequests?: TravelRequestUpdateManyWithoutUserNestedInput
    approvedTravelRequests?: TravelRequestUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutSubordinatesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    companyId?: IntFieldUpdateOperationsInput | number
    branchId?: IntFieldUpdateOperationsInput | number
    areaId?: IntFieldUpdateOperationsInput | number
    roleId?: IntFieldUpdateOperationsInput | number
    supervisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: CardAssignmentUncheckedUpdateManyWithoutUserNestedInput
    travelRequests?: TravelRequestUncheckedUpdateManyWithoutUserNestedInput
    approvedTravelRequests?: TravelRequestUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutSupervisorInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutSupervisorInput, UserUncheckedUpdateWithoutSupervisorInput>
    create: XOR<UserCreateWithoutSupervisorInput, UserUncheckedCreateWithoutSupervisorInput>
  }

  export type UserUpdateWithWhereUniqueWithoutSupervisorInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutSupervisorInput, UserUncheckedUpdateWithoutSupervisorInput>
  }

  export type UserUpdateManyWithWhereWithoutSupervisorInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutSupervisorInput>
  }

  export type CardAssignmentUpsertWithWhereUniqueWithoutUserInput = {
    where: CardAssignmentWhereUniqueInput
    update: XOR<CardAssignmentUpdateWithoutUserInput, CardAssignmentUncheckedUpdateWithoutUserInput>
    create: XOR<CardAssignmentCreateWithoutUserInput, CardAssignmentUncheckedCreateWithoutUserInput>
  }

  export type CardAssignmentUpdateWithWhereUniqueWithoutUserInput = {
    where: CardAssignmentWhereUniqueInput
    data: XOR<CardAssignmentUpdateWithoutUserInput, CardAssignmentUncheckedUpdateWithoutUserInput>
  }

  export type CardAssignmentUpdateManyWithWhereWithoutUserInput = {
    where: CardAssignmentScalarWhereInput
    data: XOR<CardAssignmentUpdateManyMutationInput, CardAssignmentUncheckedUpdateManyWithoutUserInput>
  }

  export type CardAssignmentScalarWhereInput = {
    AND?: CardAssignmentScalarWhereInput | CardAssignmentScalarWhereInput[]
    OR?: CardAssignmentScalarWhereInput[]
    NOT?: CardAssignmentScalarWhereInput | CardAssignmentScalarWhereInput[]
    id?: IntFilter<"CardAssignment"> | number
    cardId?: IntFilter<"CardAssignment"> | number
    userId?: IntFilter<"CardAssignment"> | number
    assignedAt?: DateTimeFilter<"CardAssignment"> | Date | string
    unassignedAt?: DateTimeNullableFilter<"CardAssignment"> | Date | string | null
  }

  export type TravelRequestUpsertWithWhereUniqueWithoutUserInput = {
    where: TravelRequestWhereUniqueInput
    update: XOR<TravelRequestUpdateWithoutUserInput, TravelRequestUncheckedUpdateWithoutUserInput>
    create: XOR<TravelRequestCreateWithoutUserInput, TravelRequestUncheckedCreateWithoutUserInput>
  }

  export type TravelRequestUpdateWithWhereUniqueWithoutUserInput = {
    where: TravelRequestWhereUniqueInput
    data: XOR<TravelRequestUpdateWithoutUserInput, TravelRequestUncheckedUpdateWithoutUserInput>
  }

  export type TravelRequestUpdateManyWithWhereWithoutUserInput = {
    where: TravelRequestScalarWhereInput
    data: XOR<TravelRequestUpdateManyMutationInput, TravelRequestUncheckedUpdateManyWithoutUserInput>
  }

  export type TravelRequestScalarWhereInput = {
    AND?: TravelRequestScalarWhereInput | TravelRequestScalarWhereInput[]
    OR?: TravelRequestScalarWhereInput[]
    NOT?: TravelRequestScalarWhereInput | TravelRequestScalarWhereInput[]
    id?: IntFilter<"TravelRequest"> | number
    userId?: IntFilter<"TravelRequest"> | number
    statusId?: IntFilter<"TravelRequest"> | number
    cardId?: IntNullableFilter<"TravelRequest"> | number | null
    totalAmount?: DecimalFilter<"TravelRequest"> | Decimal | DecimalJsLike | number | string
    travelReason?: StringFilter<"TravelRequest"> | string
    travelObjectives?: StringFilter<"TravelRequest"> | string
    departureDate?: DateTimeFilter<"TravelRequest"> | Date | string
    returnDate?: DateTimeFilter<"TravelRequest"> | Date | string
    disbursementDate?: DateTimeNullableFilter<"TravelRequest"> | Date | string | null
    approvalDate?: DateTimeNullableFilter<"TravelRequest"> | Date | string | null
    approverId?: IntNullableFilter<"TravelRequest"> | number | null
    comment?: StringNullableFilter<"TravelRequest"> | string | null
    createdAt?: DateTimeFilter<"TravelRequest"> | Date | string
    updatedAt?: DateTimeFilter<"TravelRequest"> | Date | string
  }

  export type TravelRequestUpsertWithWhereUniqueWithoutApproverInput = {
    where: TravelRequestWhereUniqueInput
    update: XOR<TravelRequestUpdateWithoutApproverInput, TravelRequestUncheckedUpdateWithoutApproverInput>
    create: XOR<TravelRequestCreateWithoutApproverInput, TravelRequestUncheckedCreateWithoutApproverInput>
  }

  export type TravelRequestUpdateWithWhereUniqueWithoutApproverInput = {
    where: TravelRequestWhereUniqueInput
    data: XOR<TravelRequestUpdateWithoutApproverInput, TravelRequestUncheckedUpdateWithoutApproverInput>
  }

  export type TravelRequestUpdateManyWithWhereWithoutApproverInput = {
    where: TravelRequestScalarWhereInput
    data: XOR<TravelRequestUpdateManyMutationInput, TravelRequestUncheckedUpdateManyWithoutApproverInput>
  }

  export type CompanyCreateWithoutCardsInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    branches?: BranchCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutCardsInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    branches?: BranchUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutCardsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutCardsInput, CompanyUncheckedCreateWithoutCardsInput>
  }

  export type CardAssignmentCreateWithoutCardInput = {
    assignedAt?: Date | string
    unassignedAt?: Date | string | null
    user: UserCreateNestedOneWithoutCardsInput
  }

  export type CardAssignmentUncheckedCreateWithoutCardInput = {
    id?: number
    userId: number
    assignedAt?: Date | string
    unassignedAt?: Date | string | null
  }

  export type CardAssignmentCreateOrConnectWithoutCardInput = {
    where: CardAssignmentWhereUniqueInput
    create: XOR<CardAssignmentCreateWithoutCardInput, CardAssignmentUncheckedCreateWithoutCardInput>
  }

  export type CardAssignmentCreateManyCardInputEnvelope = {
    data: CardAssignmentCreateManyCardInput | CardAssignmentCreateManyCardInput[]
    skipDuplicates?: boolean
  }

  export type TravelRequestCreateWithoutCardInput = {
    totalAmount: Decimal | DecimalJsLike | number | string
    travelReason: string
    travelObjectives: string
    departureDate: Date | string
    returnDate: Date | string
    disbursementDate?: Date | string | null
    approvalDate?: Date | string | null
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTravelRequestsInput
    status: StatusTravelRequestCreateNestedOneWithoutTravelRequestsInput
    approver?: UserCreateNestedOneWithoutApprovedTravelRequestsInput
    details?: TravelDetailCreateNestedManyWithoutRequestInput
  }

  export type TravelRequestUncheckedCreateWithoutCardInput = {
    id?: number
    userId: number
    statusId: number
    totalAmount: Decimal | DecimalJsLike | number | string
    travelReason: string
    travelObjectives: string
    departureDate: Date | string
    returnDate: Date | string
    disbursementDate?: Date | string | null
    approvalDate?: Date | string | null
    approverId?: number | null
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    details?: TravelDetailUncheckedCreateNestedManyWithoutRequestInput
  }

  export type TravelRequestCreateOrConnectWithoutCardInput = {
    where: TravelRequestWhereUniqueInput
    create: XOR<TravelRequestCreateWithoutCardInput, TravelRequestUncheckedCreateWithoutCardInput>
  }

  export type TravelRequestCreateManyCardInputEnvelope = {
    data: TravelRequestCreateManyCardInput | TravelRequestCreateManyCardInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutCardsInput = {
    update: XOR<CompanyUpdateWithoutCardsInput, CompanyUncheckedUpdateWithoutCardsInput>
    create: XOR<CompanyCreateWithoutCardsInput, CompanyUncheckedCreateWithoutCardsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutCardsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutCardsInput, CompanyUncheckedUpdateWithoutCardsInput>
  }

  export type CompanyUpdateWithoutCardsInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    branches?: BranchUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutCardsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    branches?: BranchUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CardAssignmentUpsertWithWhereUniqueWithoutCardInput = {
    where: CardAssignmentWhereUniqueInput
    update: XOR<CardAssignmentUpdateWithoutCardInput, CardAssignmentUncheckedUpdateWithoutCardInput>
    create: XOR<CardAssignmentCreateWithoutCardInput, CardAssignmentUncheckedCreateWithoutCardInput>
  }

  export type CardAssignmentUpdateWithWhereUniqueWithoutCardInput = {
    where: CardAssignmentWhereUniqueInput
    data: XOR<CardAssignmentUpdateWithoutCardInput, CardAssignmentUncheckedUpdateWithoutCardInput>
  }

  export type CardAssignmentUpdateManyWithWhereWithoutCardInput = {
    where: CardAssignmentScalarWhereInput
    data: XOR<CardAssignmentUpdateManyMutationInput, CardAssignmentUncheckedUpdateManyWithoutCardInput>
  }

  export type TravelRequestUpsertWithWhereUniqueWithoutCardInput = {
    where: TravelRequestWhereUniqueInput
    update: XOR<TravelRequestUpdateWithoutCardInput, TravelRequestUncheckedUpdateWithoutCardInput>
    create: XOR<TravelRequestCreateWithoutCardInput, TravelRequestUncheckedCreateWithoutCardInput>
  }

  export type TravelRequestUpdateWithWhereUniqueWithoutCardInput = {
    where: TravelRequestWhereUniqueInput
    data: XOR<TravelRequestUpdateWithoutCardInput, TravelRequestUncheckedUpdateWithoutCardInput>
  }

  export type TravelRequestUpdateManyWithWhereWithoutCardInput = {
    where: TravelRequestScalarWhereInput
    data: XOR<TravelRequestUpdateManyMutationInput, TravelRequestUncheckedUpdateManyWithoutCardInput>
  }

  export type CardCreateWithoutAssignmentsInput = {
    cardNumber: string
    isActive?: boolean
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutCardsInput
    travelRequests?: TravelRequestCreateNestedManyWithoutCardInput
  }

  export type CardUncheckedCreateWithoutAssignmentsInput = {
    id?: number
    cardNumber: string
    companyId: number
    isActive?: boolean
    createdAt?: Date | string
    travelRequests?: TravelRequestUncheckedCreateNestedManyWithoutCardInput
  }

  export type CardCreateOrConnectWithoutAssignmentsInput = {
    where: CardWhereUniqueInput
    create: XOR<CardCreateWithoutAssignmentsInput, CardUncheckedCreateWithoutAssignmentsInput>
  }

  export type UserCreateWithoutCardsInput = {
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutUsersInput
    branch: BranchCreateNestedOneWithoutUsersInput
    area: AreaCreateNestedOneWithoutUsersInput
    role: RoleCreateNestedOneWithoutUsersInput
    supervisor?: UserCreateNestedOneWithoutSubordinatesInput
    subordinates?: UserCreateNestedManyWithoutSupervisorInput
    travelRequests?: TravelRequestCreateNestedManyWithoutUserInput
    approvedTravelRequests?: TravelRequestCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateWithoutCardsInput = {
    id?: number
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    companyId: number
    branchId: number
    areaId: number
    roleId: number
    supervisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subordinates?: UserUncheckedCreateNestedManyWithoutSupervisorInput
    travelRequests?: TravelRequestUncheckedCreateNestedManyWithoutUserInput
    approvedTravelRequests?: TravelRequestUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserCreateOrConnectWithoutCardsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCardsInput, UserUncheckedCreateWithoutCardsInput>
  }

  export type CardUpsertWithoutAssignmentsInput = {
    update: XOR<CardUpdateWithoutAssignmentsInput, CardUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<CardCreateWithoutAssignmentsInput, CardUncheckedCreateWithoutAssignmentsInput>
    where?: CardWhereInput
  }

  export type CardUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: CardWhereInput
    data: XOR<CardUpdateWithoutAssignmentsInput, CardUncheckedUpdateWithoutAssignmentsInput>
  }

  export type CardUpdateWithoutAssignmentsInput = {
    cardNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutCardsNestedInput
    travelRequests?: TravelRequestUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateWithoutAssignmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    cardNumber?: StringFieldUpdateOperationsInput | string
    companyId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    travelRequests?: TravelRequestUncheckedUpdateManyWithoutCardNestedInput
  }

  export type UserUpsertWithoutCardsInput = {
    update: XOR<UserUpdateWithoutCardsInput, UserUncheckedUpdateWithoutCardsInput>
    create: XOR<UserCreateWithoutCardsInput, UserUncheckedCreateWithoutCardsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCardsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCardsInput, UserUncheckedUpdateWithoutCardsInput>
  }

  export type UserUpdateWithoutCardsInput = {
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUsersNestedInput
    branch?: BranchUpdateOneRequiredWithoutUsersNestedInput
    area?: AreaUpdateOneRequiredWithoutUsersNestedInput
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
    supervisor?: UserUpdateOneWithoutSubordinatesNestedInput
    subordinates?: UserUpdateManyWithoutSupervisorNestedInput
    travelRequests?: TravelRequestUpdateManyWithoutUserNestedInput
    approvedTravelRequests?: TravelRequestUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutCardsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    companyId?: IntFieldUpdateOperationsInput | number
    branchId?: IntFieldUpdateOperationsInput | number
    areaId?: IntFieldUpdateOperationsInput | number
    roleId?: IntFieldUpdateOperationsInput | number
    supervisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subordinates?: UserUncheckedUpdateManyWithoutSupervisorNestedInput
    travelRequests?: TravelRequestUncheckedUpdateManyWithoutUserNestedInput
    approvedTravelRequests?: TravelRequestUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type TravelRequestCreateWithoutStatusInput = {
    totalAmount: Decimal | DecimalJsLike | number | string
    travelReason: string
    travelObjectives: string
    departureDate: Date | string
    returnDate: Date | string
    disbursementDate?: Date | string | null
    approvalDate?: Date | string | null
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTravelRequestsInput
    approver?: UserCreateNestedOneWithoutApprovedTravelRequestsInput
    card?: CardCreateNestedOneWithoutTravelRequestsInput
    details?: TravelDetailCreateNestedManyWithoutRequestInput
  }

  export type TravelRequestUncheckedCreateWithoutStatusInput = {
    id?: number
    userId: number
    cardId?: number | null
    totalAmount: Decimal | DecimalJsLike | number | string
    travelReason: string
    travelObjectives: string
    departureDate: Date | string
    returnDate: Date | string
    disbursementDate?: Date | string | null
    approvalDate?: Date | string | null
    approverId?: number | null
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    details?: TravelDetailUncheckedCreateNestedManyWithoutRequestInput
  }

  export type TravelRequestCreateOrConnectWithoutStatusInput = {
    where: TravelRequestWhereUniqueInput
    create: XOR<TravelRequestCreateWithoutStatusInput, TravelRequestUncheckedCreateWithoutStatusInput>
  }

  export type TravelRequestCreateManyStatusInputEnvelope = {
    data: TravelRequestCreateManyStatusInput | TravelRequestCreateManyStatusInput[]
    skipDuplicates?: boolean
  }

  export type TravelRequestUpsertWithWhereUniqueWithoutStatusInput = {
    where: TravelRequestWhereUniqueInput
    update: XOR<TravelRequestUpdateWithoutStatusInput, TravelRequestUncheckedUpdateWithoutStatusInput>
    create: XOR<TravelRequestCreateWithoutStatusInput, TravelRequestUncheckedCreateWithoutStatusInput>
  }

  export type TravelRequestUpdateWithWhereUniqueWithoutStatusInput = {
    where: TravelRequestWhereUniqueInput
    data: XOR<TravelRequestUpdateWithoutStatusInput, TravelRequestUncheckedUpdateWithoutStatusInput>
  }

  export type TravelRequestUpdateManyWithWhereWithoutStatusInput = {
    where: TravelRequestScalarWhereInput
    data: XOR<TravelRequestUpdateManyMutationInput, TravelRequestUncheckedUpdateManyWithoutStatusInput>
  }

  export type UserCreateWithoutTravelRequestsInput = {
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutUsersInput
    branch: BranchCreateNestedOneWithoutUsersInput
    area: AreaCreateNestedOneWithoutUsersInput
    role: RoleCreateNestedOneWithoutUsersInput
    supervisor?: UserCreateNestedOneWithoutSubordinatesInput
    subordinates?: UserCreateNestedManyWithoutSupervisorInput
    cards?: CardAssignmentCreateNestedManyWithoutUserInput
    approvedTravelRequests?: TravelRequestCreateNestedManyWithoutApproverInput
  }

  export type UserUncheckedCreateWithoutTravelRequestsInput = {
    id?: number
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    companyId: number
    branchId: number
    areaId: number
    roleId: number
    supervisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subordinates?: UserUncheckedCreateNestedManyWithoutSupervisorInput
    cards?: CardAssignmentUncheckedCreateNestedManyWithoutUserInput
    approvedTravelRequests?: TravelRequestUncheckedCreateNestedManyWithoutApproverInput
  }

  export type UserCreateOrConnectWithoutTravelRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTravelRequestsInput, UserUncheckedCreateWithoutTravelRequestsInput>
  }

  export type StatusTravelRequestCreateWithoutTravelRequestsInput = {
    name: string
  }

  export type StatusTravelRequestUncheckedCreateWithoutTravelRequestsInput = {
    id?: number
    name: string
  }

  export type StatusTravelRequestCreateOrConnectWithoutTravelRequestsInput = {
    where: StatusTravelRequestWhereUniqueInput
    create: XOR<StatusTravelRequestCreateWithoutTravelRequestsInput, StatusTravelRequestUncheckedCreateWithoutTravelRequestsInput>
  }

  export type UserCreateWithoutApprovedTravelRequestsInput = {
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutUsersInput
    branch: BranchCreateNestedOneWithoutUsersInput
    area: AreaCreateNestedOneWithoutUsersInput
    role: RoleCreateNestedOneWithoutUsersInput
    supervisor?: UserCreateNestedOneWithoutSubordinatesInput
    subordinates?: UserCreateNestedManyWithoutSupervisorInput
    cards?: CardAssignmentCreateNestedManyWithoutUserInput
    travelRequests?: TravelRequestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutApprovedTravelRequestsInput = {
    id?: number
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    companyId: number
    branchId: number
    areaId: number
    roleId: number
    supervisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subordinates?: UserUncheckedCreateNestedManyWithoutSupervisorInput
    cards?: CardAssignmentUncheckedCreateNestedManyWithoutUserInput
    travelRequests?: TravelRequestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutApprovedTravelRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApprovedTravelRequestsInput, UserUncheckedCreateWithoutApprovedTravelRequestsInput>
  }

  export type CardCreateWithoutTravelRequestsInput = {
    cardNumber: string
    isActive?: boolean
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutCardsInput
    assignments?: CardAssignmentCreateNestedManyWithoutCardInput
  }

  export type CardUncheckedCreateWithoutTravelRequestsInput = {
    id?: number
    cardNumber: string
    companyId: number
    isActive?: boolean
    createdAt?: Date | string
    assignments?: CardAssignmentUncheckedCreateNestedManyWithoutCardInput
  }

  export type CardCreateOrConnectWithoutTravelRequestsInput = {
    where: CardWhereUniqueInput
    create: XOR<CardCreateWithoutTravelRequestsInput, CardUncheckedCreateWithoutTravelRequestsInput>
  }

  export type TravelDetailCreateWithoutRequestInput = {
    concept: string
    amount: Decimal | DecimalJsLike | number | string
  }

  export type TravelDetailUncheckedCreateWithoutRequestInput = {
    id?: number
    concept: string
    amount: Decimal | DecimalJsLike | number | string
  }

  export type TravelDetailCreateOrConnectWithoutRequestInput = {
    where: TravelDetailWhereUniqueInput
    create: XOR<TravelDetailCreateWithoutRequestInput, TravelDetailUncheckedCreateWithoutRequestInput>
  }

  export type TravelDetailCreateManyRequestInputEnvelope = {
    data: TravelDetailCreateManyRequestInput | TravelDetailCreateManyRequestInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTravelRequestsInput = {
    update: XOR<UserUpdateWithoutTravelRequestsInput, UserUncheckedUpdateWithoutTravelRequestsInput>
    create: XOR<UserCreateWithoutTravelRequestsInput, UserUncheckedCreateWithoutTravelRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTravelRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTravelRequestsInput, UserUncheckedUpdateWithoutTravelRequestsInput>
  }

  export type UserUpdateWithoutTravelRequestsInput = {
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUsersNestedInput
    branch?: BranchUpdateOneRequiredWithoutUsersNestedInput
    area?: AreaUpdateOneRequiredWithoutUsersNestedInput
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
    supervisor?: UserUpdateOneWithoutSubordinatesNestedInput
    subordinates?: UserUpdateManyWithoutSupervisorNestedInput
    cards?: CardAssignmentUpdateManyWithoutUserNestedInput
    approvedTravelRequests?: TravelRequestUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutTravelRequestsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    companyId?: IntFieldUpdateOperationsInput | number
    branchId?: IntFieldUpdateOperationsInput | number
    areaId?: IntFieldUpdateOperationsInput | number
    roleId?: IntFieldUpdateOperationsInput | number
    supervisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subordinates?: UserUncheckedUpdateManyWithoutSupervisorNestedInput
    cards?: CardAssignmentUncheckedUpdateManyWithoutUserNestedInput
    approvedTravelRequests?: TravelRequestUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type StatusTravelRequestUpsertWithoutTravelRequestsInput = {
    update: XOR<StatusTravelRequestUpdateWithoutTravelRequestsInput, StatusTravelRequestUncheckedUpdateWithoutTravelRequestsInput>
    create: XOR<StatusTravelRequestCreateWithoutTravelRequestsInput, StatusTravelRequestUncheckedCreateWithoutTravelRequestsInput>
    where?: StatusTravelRequestWhereInput
  }

  export type StatusTravelRequestUpdateToOneWithWhereWithoutTravelRequestsInput = {
    where?: StatusTravelRequestWhereInput
    data: XOR<StatusTravelRequestUpdateWithoutTravelRequestsInput, StatusTravelRequestUncheckedUpdateWithoutTravelRequestsInput>
  }

  export type StatusTravelRequestUpdateWithoutTravelRequestsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type StatusTravelRequestUncheckedUpdateWithoutTravelRequestsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpsertWithoutApprovedTravelRequestsInput = {
    update: XOR<UserUpdateWithoutApprovedTravelRequestsInput, UserUncheckedUpdateWithoutApprovedTravelRequestsInput>
    create: XOR<UserCreateWithoutApprovedTravelRequestsInput, UserUncheckedCreateWithoutApprovedTravelRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutApprovedTravelRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutApprovedTravelRequestsInput, UserUncheckedUpdateWithoutApprovedTravelRequestsInput>
  }

  export type UserUpdateWithoutApprovedTravelRequestsInput = {
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUsersNestedInput
    branch?: BranchUpdateOneRequiredWithoutUsersNestedInput
    area?: AreaUpdateOneRequiredWithoutUsersNestedInput
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
    supervisor?: UserUpdateOneWithoutSubordinatesNestedInput
    subordinates?: UserUpdateManyWithoutSupervisorNestedInput
    cards?: CardAssignmentUpdateManyWithoutUserNestedInput
    travelRequests?: TravelRequestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutApprovedTravelRequestsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    companyId?: IntFieldUpdateOperationsInput | number
    branchId?: IntFieldUpdateOperationsInput | number
    areaId?: IntFieldUpdateOperationsInput | number
    roleId?: IntFieldUpdateOperationsInput | number
    supervisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subordinates?: UserUncheckedUpdateManyWithoutSupervisorNestedInput
    cards?: CardAssignmentUncheckedUpdateManyWithoutUserNestedInput
    travelRequests?: TravelRequestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CardUpsertWithoutTravelRequestsInput = {
    update: XOR<CardUpdateWithoutTravelRequestsInput, CardUncheckedUpdateWithoutTravelRequestsInput>
    create: XOR<CardCreateWithoutTravelRequestsInput, CardUncheckedCreateWithoutTravelRequestsInput>
    where?: CardWhereInput
  }

  export type CardUpdateToOneWithWhereWithoutTravelRequestsInput = {
    where?: CardWhereInput
    data: XOR<CardUpdateWithoutTravelRequestsInput, CardUncheckedUpdateWithoutTravelRequestsInput>
  }

  export type CardUpdateWithoutTravelRequestsInput = {
    cardNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutCardsNestedInput
    assignments?: CardAssignmentUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateWithoutTravelRequestsInput = {
    id?: IntFieldUpdateOperationsInput | number
    cardNumber?: StringFieldUpdateOperationsInput | string
    companyId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: CardAssignmentUncheckedUpdateManyWithoutCardNestedInput
  }

  export type TravelDetailUpsertWithWhereUniqueWithoutRequestInput = {
    where: TravelDetailWhereUniqueInput
    update: XOR<TravelDetailUpdateWithoutRequestInput, TravelDetailUncheckedUpdateWithoutRequestInput>
    create: XOR<TravelDetailCreateWithoutRequestInput, TravelDetailUncheckedCreateWithoutRequestInput>
  }

  export type TravelDetailUpdateWithWhereUniqueWithoutRequestInput = {
    where: TravelDetailWhereUniqueInput
    data: XOR<TravelDetailUpdateWithoutRequestInput, TravelDetailUncheckedUpdateWithoutRequestInput>
  }

  export type TravelDetailUpdateManyWithWhereWithoutRequestInput = {
    where: TravelDetailScalarWhereInput
    data: XOR<TravelDetailUpdateManyMutationInput, TravelDetailUncheckedUpdateManyWithoutRequestInput>
  }

  export type TravelDetailScalarWhereInput = {
    AND?: TravelDetailScalarWhereInput | TravelDetailScalarWhereInput[]
    OR?: TravelDetailScalarWhereInput[]
    NOT?: TravelDetailScalarWhereInput | TravelDetailScalarWhereInput[]
    id?: IntFilter<"TravelDetail"> | number
    travelRequestId?: IntFilter<"TravelDetail"> | number
    concept?: StringFilter<"TravelDetail"> | string
    amount?: DecimalFilter<"TravelDetail"> | Decimal | DecimalJsLike | number | string
  }

  export type TravelRequestCreateWithoutDetailsInput = {
    totalAmount: Decimal | DecimalJsLike | number | string
    travelReason: string
    travelObjectives: string
    departureDate: Date | string
    returnDate: Date | string
    disbursementDate?: Date | string | null
    approvalDate?: Date | string | null
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTravelRequestsInput
    status: StatusTravelRequestCreateNestedOneWithoutTravelRequestsInput
    approver?: UserCreateNestedOneWithoutApprovedTravelRequestsInput
    card?: CardCreateNestedOneWithoutTravelRequestsInput
  }

  export type TravelRequestUncheckedCreateWithoutDetailsInput = {
    id?: number
    userId: number
    statusId: number
    cardId?: number | null
    totalAmount: Decimal | DecimalJsLike | number | string
    travelReason: string
    travelObjectives: string
    departureDate: Date | string
    returnDate: Date | string
    disbursementDate?: Date | string | null
    approvalDate?: Date | string | null
    approverId?: number | null
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TravelRequestCreateOrConnectWithoutDetailsInput = {
    where: TravelRequestWhereUniqueInput
    create: XOR<TravelRequestCreateWithoutDetailsInput, TravelRequestUncheckedCreateWithoutDetailsInput>
  }

  export type TravelRequestUpsertWithoutDetailsInput = {
    update: XOR<TravelRequestUpdateWithoutDetailsInput, TravelRequestUncheckedUpdateWithoutDetailsInput>
    create: XOR<TravelRequestCreateWithoutDetailsInput, TravelRequestUncheckedCreateWithoutDetailsInput>
    where?: TravelRequestWhereInput
  }

  export type TravelRequestUpdateToOneWithWhereWithoutDetailsInput = {
    where?: TravelRequestWhereInput
    data: XOR<TravelRequestUpdateWithoutDetailsInput, TravelRequestUncheckedUpdateWithoutDetailsInput>
  }

  export type TravelRequestUpdateWithoutDetailsInput = {
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    travelReason?: StringFieldUpdateOperationsInput | string
    travelObjectives?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    disbursementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTravelRequestsNestedInput
    status?: StatusTravelRequestUpdateOneRequiredWithoutTravelRequestsNestedInput
    approver?: UserUpdateOneWithoutApprovedTravelRequestsNestedInput
    card?: CardUpdateOneWithoutTravelRequestsNestedInput
  }

  export type TravelRequestUncheckedUpdateWithoutDetailsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    statusId?: IntFieldUpdateOperationsInput | number
    cardId?: NullableIntFieldUpdateOperationsInput | number | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    travelReason?: StringFieldUpdateOperationsInput | string
    travelObjectives?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    disbursementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approverId?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyCompanyInput = {
    id?: number
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    branchId: number
    areaId: number
    roleId: number
    supervisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BranchCreateManyCompanyInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CardCreateManyCompanyInput = {
    id?: number
    cardNumber: string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type UserUpdateWithoutCompanyInput = {
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    branch?: BranchUpdateOneRequiredWithoutUsersNestedInput
    area?: AreaUpdateOneRequiredWithoutUsersNestedInput
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
    supervisor?: UserUpdateOneWithoutSubordinatesNestedInput
    subordinates?: UserUpdateManyWithoutSupervisorNestedInput
    cards?: CardAssignmentUpdateManyWithoutUserNestedInput
    travelRequests?: TravelRequestUpdateManyWithoutUserNestedInput
    approvedTravelRequests?: TravelRequestUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    branchId?: IntFieldUpdateOperationsInput | number
    areaId?: IntFieldUpdateOperationsInput | number
    roleId?: IntFieldUpdateOperationsInput | number
    supervisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subordinates?: UserUncheckedUpdateManyWithoutSupervisorNestedInput
    cards?: CardAssignmentUncheckedUpdateManyWithoutUserNestedInput
    travelRequests?: TravelRequestUncheckedUpdateManyWithoutUserNestedInput
    approvedTravelRequests?: TravelRequestUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateManyWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    branchId?: IntFieldUpdateOperationsInput | number
    areaId?: IntFieldUpdateOperationsInput | number
    roleId?: IntFieldUpdateOperationsInput | number
    supervisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchUpdateWithoutCompanyInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutBranchNestedInput
  }

  export type BranchUncheckedUpdateWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type BranchUncheckedUpdateManyWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardUpdateWithoutCompanyInput = {
    cardNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: CardAssignmentUpdateManyWithoutCardNestedInput
    travelRequests?: TravelRequestUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cardNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: CardAssignmentUncheckedUpdateManyWithoutCardNestedInput
    travelRequests?: TravelRequestUncheckedUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateManyWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cardNumber?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyBranchInput = {
    id?: number
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    companyId: number
    areaId: number
    roleId: number
    supervisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutBranchInput = {
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUsersNestedInput
    area?: AreaUpdateOneRequiredWithoutUsersNestedInput
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
    supervisor?: UserUpdateOneWithoutSubordinatesNestedInput
    subordinates?: UserUpdateManyWithoutSupervisorNestedInput
    cards?: CardAssignmentUpdateManyWithoutUserNestedInput
    travelRequests?: TravelRequestUpdateManyWithoutUserNestedInput
    approvedTravelRequests?: TravelRequestUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutBranchInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    companyId?: IntFieldUpdateOperationsInput | number
    areaId?: IntFieldUpdateOperationsInput | number
    roleId?: IntFieldUpdateOperationsInput | number
    supervisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subordinates?: UserUncheckedUpdateManyWithoutSupervisorNestedInput
    cards?: CardAssignmentUncheckedUpdateManyWithoutUserNestedInput
    travelRequests?: TravelRequestUncheckedUpdateManyWithoutUserNestedInput
    approvedTravelRequests?: TravelRequestUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateManyWithoutBranchInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    companyId?: IntFieldUpdateOperationsInput | number
    areaId?: IntFieldUpdateOperationsInput | number
    roleId?: IntFieldUpdateOperationsInput | number
    supervisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyAreaInput = {
    id?: number
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    companyId: number
    branchId: number
    roleId: number
    supervisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutAreaInput = {
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUsersNestedInput
    branch?: BranchUpdateOneRequiredWithoutUsersNestedInput
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
    supervisor?: UserUpdateOneWithoutSubordinatesNestedInput
    subordinates?: UserUpdateManyWithoutSupervisorNestedInput
    cards?: CardAssignmentUpdateManyWithoutUserNestedInput
    travelRequests?: TravelRequestUpdateManyWithoutUserNestedInput
    approvedTravelRequests?: TravelRequestUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutAreaInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    companyId?: IntFieldUpdateOperationsInput | number
    branchId?: IntFieldUpdateOperationsInput | number
    roleId?: IntFieldUpdateOperationsInput | number
    supervisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subordinates?: UserUncheckedUpdateManyWithoutSupervisorNestedInput
    cards?: CardAssignmentUncheckedUpdateManyWithoutUserNestedInput
    travelRequests?: TravelRequestUncheckedUpdateManyWithoutUserNestedInput
    approvedTravelRequests?: TravelRequestUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateManyWithoutAreaInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    companyId?: IntFieldUpdateOperationsInput | number
    branchId?: IntFieldUpdateOperationsInput | number
    roleId?: IntFieldUpdateOperationsInput | number
    supervisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyRoleInput = {
    id?: number
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    companyId: number
    branchId: number
    areaId: number
    supervisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutRoleInput = {
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUsersNestedInput
    branch?: BranchUpdateOneRequiredWithoutUsersNestedInput
    area?: AreaUpdateOneRequiredWithoutUsersNestedInput
    supervisor?: UserUpdateOneWithoutSubordinatesNestedInput
    subordinates?: UserUpdateManyWithoutSupervisorNestedInput
    cards?: CardAssignmentUpdateManyWithoutUserNestedInput
    travelRequests?: TravelRequestUpdateManyWithoutUserNestedInput
    approvedTravelRequests?: TravelRequestUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    companyId?: IntFieldUpdateOperationsInput | number
    branchId?: IntFieldUpdateOperationsInput | number
    areaId?: IntFieldUpdateOperationsInput | number
    supervisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subordinates?: UserUncheckedUpdateManyWithoutSupervisorNestedInput
    cards?: CardAssignmentUncheckedUpdateManyWithoutUserNestedInput
    travelRequests?: TravelRequestUncheckedUpdateManyWithoutUserNestedInput
    approvedTravelRequests?: TravelRequestUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateManyWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    companyId?: IntFieldUpdateOperationsInput | number
    branchId?: IntFieldUpdateOperationsInput | number
    areaId?: IntFieldUpdateOperationsInput | number
    supervisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManySupervisorInput = {
    id?: number
    name: string
    paternalSurname: string
    maternalSurname: string
    email: string
    password: string
    isActive?: boolean
    companyId: number
    branchId: number
    areaId: number
    roleId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CardAssignmentCreateManyUserInput = {
    id?: number
    cardId: number
    assignedAt?: Date | string
    unassignedAt?: Date | string | null
  }

  export type TravelRequestCreateManyUserInput = {
    id?: number
    statusId: number
    cardId?: number | null
    totalAmount: Decimal | DecimalJsLike | number | string
    travelReason: string
    travelObjectives: string
    departureDate: Date | string
    returnDate: Date | string
    disbursementDate?: Date | string | null
    approvalDate?: Date | string | null
    approverId?: number | null
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TravelRequestCreateManyApproverInput = {
    id?: number
    userId: number
    statusId: number
    cardId?: number | null
    totalAmount: Decimal | DecimalJsLike | number | string
    travelReason: string
    travelObjectives: string
    departureDate: Date | string
    returnDate: Date | string
    disbursementDate?: Date | string | null
    approvalDate?: Date | string | null
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutSupervisorInput = {
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUsersNestedInput
    branch?: BranchUpdateOneRequiredWithoutUsersNestedInput
    area?: AreaUpdateOneRequiredWithoutUsersNestedInput
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
    subordinates?: UserUpdateManyWithoutSupervisorNestedInput
    cards?: CardAssignmentUpdateManyWithoutUserNestedInput
    travelRequests?: TravelRequestUpdateManyWithoutUserNestedInput
    approvedTravelRequests?: TravelRequestUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateWithoutSupervisorInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    companyId?: IntFieldUpdateOperationsInput | number
    branchId?: IntFieldUpdateOperationsInput | number
    areaId?: IntFieldUpdateOperationsInput | number
    roleId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subordinates?: UserUncheckedUpdateManyWithoutSupervisorNestedInput
    cards?: CardAssignmentUncheckedUpdateManyWithoutUserNestedInput
    travelRequests?: TravelRequestUncheckedUpdateManyWithoutUserNestedInput
    approvedTravelRequests?: TravelRequestUncheckedUpdateManyWithoutApproverNestedInput
  }

  export type UserUncheckedUpdateManyWithoutSupervisorInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    paternalSurname?: StringFieldUpdateOperationsInput | string
    maternalSurname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    companyId?: IntFieldUpdateOperationsInput | number
    branchId?: IntFieldUpdateOperationsInput | number
    areaId?: IntFieldUpdateOperationsInput | number
    roleId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardAssignmentUpdateWithoutUserInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unassignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    card?: CardUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type CardAssignmentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    cardId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unassignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CardAssignmentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    cardId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unassignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TravelRequestUpdateWithoutUserInput = {
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    travelReason?: StringFieldUpdateOperationsInput | string
    travelObjectives?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    disbursementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StatusTravelRequestUpdateOneRequiredWithoutTravelRequestsNestedInput
    approver?: UserUpdateOneWithoutApprovedTravelRequestsNestedInput
    card?: CardUpdateOneWithoutTravelRequestsNestedInput
    details?: TravelDetailUpdateManyWithoutRequestNestedInput
  }

  export type TravelRequestUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    statusId?: IntFieldUpdateOperationsInput | number
    cardId?: NullableIntFieldUpdateOperationsInput | number | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    travelReason?: StringFieldUpdateOperationsInput | string
    travelObjectives?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    disbursementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approverId?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: TravelDetailUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type TravelRequestUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    statusId?: IntFieldUpdateOperationsInput | number
    cardId?: NullableIntFieldUpdateOperationsInput | number | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    travelReason?: StringFieldUpdateOperationsInput | string
    travelObjectives?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    disbursementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approverId?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelRequestUpdateWithoutApproverInput = {
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    travelReason?: StringFieldUpdateOperationsInput | string
    travelObjectives?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    disbursementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTravelRequestsNestedInput
    status?: StatusTravelRequestUpdateOneRequiredWithoutTravelRequestsNestedInput
    card?: CardUpdateOneWithoutTravelRequestsNestedInput
    details?: TravelDetailUpdateManyWithoutRequestNestedInput
  }

  export type TravelRequestUncheckedUpdateWithoutApproverInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    statusId?: IntFieldUpdateOperationsInput | number
    cardId?: NullableIntFieldUpdateOperationsInput | number | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    travelReason?: StringFieldUpdateOperationsInput | string
    travelObjectives?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    disbursementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: TravelDetailUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type TravelRequestUncheckedUpdateManyWithoutApproverInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    statusId?: IntFieldUpdateOperationsInput | number
    cardId?: NullableIntFieldUpdateOperationsInput | number | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    travelReason?: StringFieldUpdateOperationsInput | string
    travelObjectives?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    disbursementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardAssignmentCreateManyCardInput = {
    id?: number
    userId: number
    assignedAt?: Date | string
    unassignedAt?: Date | string | null
  }

  export type TravelRequestCreateManyCardInput = {
    id?: number
    userId: number
    statusId: number
    totalAmount: Decimal | DecimalJsLike | number | string
    travelReason: string
    travelObjectives: string
    departureDate: Date | string
    returnDate: Date | string
    disbursementDate?: Date | string | null
    approvalDate?: Date | string | null
    approverId?: number | null
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CardAssignmentUpdateWithoutCardInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unassignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutCardsNestedInput
  }

  export type CardAssignmentUncheckedUpdateWithoutCardInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unassignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CardAssignmentUncheckedUpdateManyWithoutCardInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unassignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TravelRequestUpdateWithoutCardInput = {
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    travelReason?: StringFieldUpdateOperationsInput | string
    travelObjectives?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    disbursementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTravelRequestsNestedInput
    status?: StatusTravelRequestUpdateOneRequiredWithoutTravelRequestsNestedInput
    approver?: UserUpdateOneWithoutApprovedTravelRequestsNestedInput
    details?: TravelDetailUpdateManyWithoutRequestNestedInput
  }

  export type TravelRequestUncheckedUpdateWithoutCardInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    statusId?: IntFieldUpdateOperationsInput | number
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    travelReason?: StringFieldUpdateOperationsInput | string
    travelObjectives?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    disbursementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approverId?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: TravelDetailUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type TravelRequestUncheckedUpdateManyWithoutCardInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    statusId?: IntFieldUpdateOperationsInput | number
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    travelReason?: StringFieldUpdateOperationsInput | string
    travelObjectives?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    disbursementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approverId?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelRequestCreateManyStatusInput = {
    id?: number
    userId: number
    cardId?: number | null
    totalAmount: Decimal | DecimalJsLike | number | string
    travelReason: string
    travelObjectives: string
    departureDate: Date | string
    returnDate: Date | string
    disbursementDate?: Date | string | null
    approvalDate?: Date | string | null
    approverId?: number | null
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TravelRequestUpdateWithoutStatusInput = {
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    travelReason?: StringFieldUpdateOperationsInput | string
    travelObjectives?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    disbursementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTravelRequestsNestedInput
    approver?: UserUpdateOneWithoutApprovedTravelRequestsNestedInput
    card?: CardUpdateOneWithoutTravelRequestsNestedInput
    details?: TravelDetailUpdateManyWithoutRequestNestedInput
  }

  export type TravelRequestUncheckedUpdateWithoutStatusInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    cardId?: NullableIntFieldUpdateOperationsInput | number | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    travelReason?: StringFieldUpdateOperationsInput | string
    travelObjectives?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    disbursementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approverId?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: TravelDetailUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type TravelRequestUncheckedUpdateManyWithoutStatusInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    cardId?: NullableIntFieldUpdateOperationsInput | number | null
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    travelReason?: StringFieldUpdateOperationsInput | string
    travelObjectives?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    disbursementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approverId?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelDetailCreateManyRequestInput = {
    id?: number
    concept: string
    amount: Decimal | DecimalJsLike | number | string
  }

  export type TravelDetailUpdateWithoutRequestInput = {
    concept?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type TravelDetailUncheckedUpdateWithoutRequestInput = {
    id?: IntFieldUpdateOperationsInput | number
    concept?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type TravelDetailUncheckedUpdateManyWithoutRequestInput = {
    id?: IntFieldUpdateOperationsInput | number
    concept?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}