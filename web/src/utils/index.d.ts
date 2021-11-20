/**
 * Client
 **/

import * as runtime from "@prisma/client/runtime/index";
declare const prisma: unique symbol;
export type PrismaPromise<A> = Promise<A> & { [prisma]: true };
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P;
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}`
    ? Tuple[K] extends PrismaPromise<infer X>
      ? X
      : UnwrapPromise<Tuple[K]>
    : UnwrapPromise<Tuple[K]>;
};

/**
 * Model User
 */

export type User = {
  id: number;
  email: string | null;
  phoneNumber: number | null;
  password: string | null;
  name: string | null;
  imageUrl: string | null;
  bio: string | null;
  emailVerified: boolean;
  phoneNumberVerified: boolean;
  provider: Provider;
  githubId: string | null;
  facebookId: string | null;
  googleId: string | null;
};

/**
 * Model Note
 */

export type Note = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  authorId: number | null;
};

/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const Provider: {
  github: "github";
  facebook: "facebook";
  google: "google";
  local: "local";
};

export type Provider = typeof Provider[keyof typeof Provider];

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = "log" extends keyof T
    ? T["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<T["log"]>
      : never
    : never,
  GlobalReject = "rejectOnNotFound" extends keyof T
    ? T["rejectOnNotFound"]
    : false
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U | "beforeExit">(
    eventType: V,
    callback: (
      event: V extends "query"
        ? Prisma.QueryEvent
        : V extends "beforeExit"
        ? () => Promise<void>
        : Prisma.LogEvent
    ) => void
  ): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): PrismaPromise<T>;

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
  $transaction<P extends PrismaPromise<any>[]>(
    arg: [...P]
  ): Promise<UnwrapTuple<P>>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.note`: Exposes CRUD operations for the **Note** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Notes
   * const notes = await prisma.note.findMany()
   * ```
   */
  get note(): Prisma.NoteDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  /**
   * Prisma Client JS version: 3.4.1
   * Query Engine version: 57771c0558568c7d08bd34c7248af5244ae16bd9
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
   */
  export type JsonObject = { [Key in string]?: JsonValue };

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue =
    | string
    | number
    | boolean
    | JsonObject
    | JsonArray
    | null;

  /**
   * Same as JsonObject, but allows undefined
   */
  export type InputJsonObject = { [Key in string]?: JsonValue };

  export interface InputJsonArray extends Array<JsonValue> {}

  export type InputJsonValue =
    | string
    | number
    | boolean
    | InputJsonObject
    | InputJsonArray;

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: "DbNull";

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: "JsonNull";

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: "AnyNull";

  type SelectAndInclude = {
    select: any;
    include: any;
  };
  type HasSelect = {
    select: any;
  };
  type HasInclude = {
    include: any;
  };
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? "Please either choose `select` or `include`"
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S;

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<
    infer U
  >
    ? U
    : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> =
    PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key;
  }[keyof T];

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

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
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? "Please either choose `select` or `include`."
    : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T | U extends object
    ? (Without<T, U> & U) | (Without<U, T> & T)
    : T | U;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
    ? False
    : T extends Date
    ? False
    : T extends Buffer
    ? False
    : T extends BigInt
    ? False
    : T extends object
    ? True
    : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Exact<A, W = unknown> = W extends unknown
    ? A extends Narrowable
      ? Cast<A, W>
      : Cast<
          { [K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never },
          { [K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K] }
        >
    : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, "_avg" | "_sum" | "_count" | "_min" | "_max">
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<"OR", K>, Extends<"AND", K>>,
      Extends<"NOT", K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<
    T,
    TupleToUnion<K>
  >;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(
      prisma: PrismaClient<any, any>,
      debug?: boolean,
      hooks?: Hooks | undefined
    );
    request<T>(
      document: any,
      dataPath?: string[],
      rootField?: string,
      typeName?: string,
      isList?: boolean,
      callsite?: string
    ): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(
      document: any,
      data: any,
      path: string[],
      rootField?: string,
      isList?: boolean
    ): any;
  }

  export const ModelName: {
    User: "User";
    Note: "Note";
  };

  export type ModelName = typeof ModelName[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  export type RejectOnNotFound = boolean | ((error: Error) => Error);
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound };
  export type RejectPerOperation = {
    [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound;
  };
  type IsReject<T> = T extends true
    ? True
    : T extends (err: Error) => Error
    ? True
    : False;
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions["rejectOnNotFound"],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends boolean
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>;
  export type ErrorFormat = "pretty" | "colorless" | "minimal";

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null.
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation;
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources;

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>;
  }

  export type Hooks = {
    beforeRequest?: (options: {
      query: string;
      path: string[];
      rootField?: string;
      typeName?: string;
      document: any;
    }) => any;
  };

  /* Types for Logging */
  export type LogLevel = "info" | "query" | "warn" | "error";
  export type LogDefinition = {
    level: LogLevel;
    emit: "stdout" | "event";
  };

  export type GetLogType<T extends LogLevel | LogDefinition> =
    T extends LogDefinition
      ? T["emit"] extends "event"
        ? T["level"]
        : never
      : never;
  export type GetEvents<T extends any> = T extends Array<
    LogLevel | LogDefinition
  >
    ? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | "findUnique"
    | "findMany"
    | "findFirst"
    | "create"
    | "createMany"
    | "update"
    | "updateMany"
    | "upsert"
    | "delete"
    | "deleteMany"
    | "executeRaw"
    | "queryRaw"
    | "aggregate"
    | "count";

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>
  ) => Promise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>
  ): LogLevel | undefined;
  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    notes: number;
  };

  export type UserCountOutputTypeSelect = {
    notes?: boolean;
  };

  export type UserCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UserCountOutputTypeArgs,
    U = keyof S
  > = S extends true
    ? UserCountOutputType
    : S extends undefined
    ? never
    : S extends UserCountOutputTypeArgs
    ? "include" extends U
      ? UserCountOutputType
      : "select" extends U
      ? {
          [P in TrueKeys<S["select"]>]: P extends keyof UserCountOutputType
            ? UserCountOutputType[P]
            : never;
        }
      : UserCountOutputType
    : UserCountOutputType;

  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     *
     **/
    select?: UserCountOutputTypeSelect | null;
  };

  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserAvgAggregateOutputType = {
    id: number | null;
    phoneNumber: number | null;
  };

  export type UserSumAggregateOutputType = {
    id: number | null;
    phoneNumber: number | null;
  };

  export type UserMinAggregateOutputType = {
    id: number | null;
    email: string | null;
    phoneNumber: number | null;
    password: string | null;
    name: string | null;
    imageUrl: string | null;
    bio: string | null;
    emailVerified: boolean | null;
    phoneNumberVerified: boolean | null;
    provider: Provider | null;
    githubId: string | null;
    facebookId: string | null;
    googleId: string | null;
  };

  export type UserMaxAggregateOutputType = {
    id: number | null;
    email: string | null;
    phoneNumber: number | null;
    password: string | null;
    name: string | null;
    imageUrl: string | null;
    bio: string | null;
    emailVerified: boolean | null;
    phoneNumberVerified: boolean | null;
    provider: Provider | null;
    githubId: string | null;
    facebookId: string | null;
    googleId: string | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    phoneNumber: number;
    password: number;
    name: number;
    imageUrl: number;
    bio: number;
    emailVerified: number;
    phoneNumberVerified: number;
    provider: number;
    githubId: number;
    facebookId: number;
    googleId: number;
    _all: number;
  };

  export type UserAvgAggregateInputType = {
    id?: true;
    phoneNumber?: true;
  };

  export type UserSumAggregateInputType = {
    id?: true;
    phoneNumber?: true;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    phoneNumber?: true;
    password?: true;
    name?: true;
    imageUrl?: true;
    bio?: true;
    emailVerified?: true;
    phoneNumberVerified?: true;
    provider?: true;
    githubId?: true;
    facebookId?: true;
    googleId?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    phoneNumber?: true;
    password?: true;
    name?: true;
    imageUrl?: true;
    bio?: true;
    emailVerified?: true;
    phoneNumberVerified?: true;
    provider?: true;
    githubId?: true;
    facebookId?: true;
    googleId?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    phoneNumber?: true;
    password?: true;
    name?: true;
    imageUrl?: true;
    bio?: true;
    emailVerified?: true;
    phoneNumberVerified?: true;
    provider?: true;
    githubId?: true;
    facebookId?: true;
    googleId?: true;
    _all?: true;
  };

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     *
     **/
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     *
     **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     *
     **/
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     *
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     *
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: UserAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: UserSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs = {
    where?: UserWhereInput;
    orderBy?: Enumerable<UserOrderByWithAggregationInput>;
    by: Array<UserScalarFieldEnum>;
    having?: UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _avg?: UserAvgAggregateInputType;
    _sum?: UserSumAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
  };

  export type UserGroupByOutputType = {
    id: number;
    email: string | null;
    phoneNumber: number | null;
    password: string | null;
    name: string | null;
    imageUrl: string | null;
    bio: string | null;
    emailVerified: boolean;
    phoneNumberVerified: boolean;
    provider: Provider;
    githubId: string | null;
    facebookId: string | null;
    googleId: string | null;
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Promise<
    Array<
      PickArray<UserGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect = {
    id?: boolean;
    email?: boolean;
    phoneNumber?: boolean;
    password?: boolean;
    name?: boolean;
    notes?: boolean | NoteFindManyArgs;
    imageUrl?: boolean;
    bio?: boolean;
    emailVerified?: boolean;
    phoneNumberVerified?: boolean;
    provider?: boolean;
    githubId?: boolean;
    facebookId?: boolean;
    googleId?: boolean;
    _count?: boolean | UserCountOutputTypeArgs;
  };

  export type UserInclude = {
    notes?: boolean | NoteFindManyArgs;
    _count?: boolean | UserCountOutputTypeArgs;
  };

  export type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
  > = S extends true
    ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ? "include" extends U
      ? User & {
          [P in TrueKeys<S["include"]>]: P extends "notes"
            ? Array<NoteGetPayload<S["include"][P]>>
            : P extends "_count"
            ? UserCountOutputTypeGetPayload<S["include"][P]> | null
            : never;
        }
      : "select" extends U
      ? {
          [P in TrueKeys<S["select"]>]: P extends keyof User
            ? User[P]
            : P extends "notes"
            ? Array<NoteGetPayload<S["select"][P]>>
            : P extends "_count"
            ? UserCountOutputTypeGetPayload<S["select"][P]> | null
            : never;
        }
      : User
    : User;

  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, "select" | "include"> & {
      select?: UserCountAggregateInputType | true;
    }
  >;

  export interface UserDelegate<GlobalRejectSettings> {
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
     **/
    findUnique<
      T extends UserFindUniqueArgs,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound
        ? T["rejectOnNotFound"]
        : undefined
    >(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<
      GlobalRejectSettings,
      LocalRejectSettings,
      "findUnique",
      "User"
    > extends True
      ? CheckSelect<
          T,
          Prisma__UserClient<User>,
          Prisma__UserClient<UserGetPayload<T>>
        >
      : CheckSelect<
          T,
          Prisma__UserClient<User | null>,
          Prisma__UserClient<UserGetPayload<T> | null>
        >;

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
     **/
    findFirst<
      T extends UserFindFirstArgs,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound
        ? T["rejectOnNotFound"]
        : undefined
    >(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<
      GlobalRejectSettings,
      LocalRejectSettings,
      "findFirst",
      "User"
    > extends True
      ? CheckSelect<
          T,
          Prisma__UserClient<User>,
          Prisma__UserClient<UserGetPayload<T>>
        >
      : CheckSelect<
          T,
          Prisma__UserClient<User | null>,
          Prisma__UserClient<UserGetPayload<T> | null>
        >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
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
     **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): CheckSelect<
      T,
      PrismaPromise<Array<User>>,
      PrismaPromise<Array<UserGetPayload<T>>>
    >;

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
     **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): CheckSelect<
      T,
      Prisma__UserClient<User>,
      Prisma__UserClient<UserGetPayload<T>>
    >;

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>;

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
     **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): CheckSelect<
      T,
      Prisma__UserClient<User>,
      Prisma__UserClient<UserGetPayload<T>>
    >;

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
     **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): CheckSelect<
      T,
      Prisma__UserClient<User>,
      Prisma__UserClient<UserGetPayload<T>>
    >;

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
     **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>;

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
     **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>;

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
     **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): CheckSelect<
      T,
      Prisma__UserClient<User>,
      Prisma__UserClient<UserGetPayload<T>>
    >;

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
      args?: Subset<T, UserCountArgs>
    ): PrismaPromise<
      T extends _Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], UserCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>
    ): PrismaPromise<GetUserAggregateType<T>>;

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
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs["orderBy"] }
        : { orderBy?: UserGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends TupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
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
                  "Field ",
                  P,
                  ` in "having" needs to be provided in "by"`
                ];
          }[HavingFields]
        : "take" extends Keys<T>
        ? "orderBy" extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : "skip" extends Keys<T>
        ? "orderBy" extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields]
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetUserGroupByPayload<T> : Promise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(
      _dmmf: runtime.DMMFClass,
      _fetcher: PrismaClientFetcher,
      _queryType: "query" | "mutation",
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean
    );
    readonly [Symbol.toStringTag]: "PrismaClientPromise";

    notes<T extends NoteFindManyArgs = {}>(
      args?: Subset<T, NoteFindManyArgs>
    ): CheckSelect<
      T,
      PrismaPromise<Array<Note>>,
      PrismaPromise<Array<NoteGetPayload<T>>>
    >;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * User findUnique
   */
  export type UserFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the User
     *
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     *
     **/
    include?: UserInclude | null;
    /**
     * Throw an Error if a User can't be found
     *
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which User to fetch.
     *
     **/
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs = {
    /**
     * Select specific fields to fetch from the User
     *
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     *
     **/
    include?: UserInclude | null;
    /**
     * Throw an Error if a User can't be found
     *
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which User to fetch.
     *
     **/
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     *
     **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     *
     **/
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     *
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     *
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     *
     **/
    distinct?: Enumerable<UserScalarFieldEnum>;
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     *
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     *
     **/
    include?: UserInclude | null;
    /**
     * Filter, which Users to fetch.
     *
     **/
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     *
     **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     *
     **/
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     *
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     *
     **/
    skip?: number;
    distinct?: Enumerable<UserScalarFieldEnum>;
  };

  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     *
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     *
     **/
    include?: UserInclude | null;
    /**
     * The data needed to create a User.
     *
     **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    data: Enumerable<UserCreateManyInput>;
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     *
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     *
     **/
    include?: UserInclude | null;
    /**
     * The data needed to update a User.
     *
     **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     *
     **/
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    where?: UserWhereInput;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     *
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     *
     **/
    include?: UserInclude | null;
    /**
     * The filter to search for the User to update in case it exists.
     *
     **/
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     *
     **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     *
     **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     *
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     *
     **/
    include?: UserInclude | null;
    /**
     * Filter which User to delete.
     *
     **/
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    where?: UserWhereInput;
  };

  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     *
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     *
     **/
    include?: UserInclude | null;
  };

  /**
   * Model Note
   */

  export type AggregateNote = {
    _count: NoteCountAggregateOutputType | null;
    _avg: NoteAvgAggregateOutputType | null;
    _sum: NoteSumAggregateOutputType | null;
    _min: NoteMinAggregateOutputType | null;
    _max: NoteMaxAggregateOutputType | null;
  };

  export type NoteAvgAggregateOutputType = {
    id: number | null;
    authorId: number | null;
  };

  export type NoteSumAggregateOutputType = {
    id: number | null;
    authorId: number | null;
  };

  export type NoteMinAggregateOutputType = {
    id: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    title: string | null;
    content: string | null;
    authorId: number | null;
  };

  export type NoteMaxAggregateOutputType = {
    id: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    title: string | null;
    content: string | null;
    authorId: number | null;
  };

  export type NoteCountAggregateOutputType = {
    id: number;
    createdAt: number;
    updatedAt: number;
    title: number;
    content: number;
    authorId: number;
    _all: number;
  };

  export type NoteAvgAggregateInputType = {
    id?: true;
    authorId?: true;
  };

  export type NoteSumAggregateInputType = {
    id?: true;
    authorId?: true;
  };

  export type NoteMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    title?: true;
    content?: true;
    authorId?: true;
  };

  export type NoteMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    title?: true;
    content?: true;
    authorId?: true;
  };

  export type NoteCountAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    title?: true;
    content?: true;
    authorId?: true;
    _all?: true;
  };

  export type NoteAggregateArgs = {
    /**
     * Filter which Note to aggregate.
     *
     **/
    where?: NoteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Notes to fetch.
     *
     **/
    orderBy?: Enumerable<NoteOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     *
     **/
    cursor?: NoteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Notes from the position of the cursor.
     *
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Notes.
     *
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Notes
     **/
    _count?: true | NoteCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: NoteAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: NoteSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: NoteMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: NoteMaxAggregateInputType;
  };

  export type GetNoteAggregateType<T extends NoteAggregateArgs> = {
    [P in keyof T & keyof AggregateNote]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNote[P]>
      : GetScalarType<T[P], AggregateNote[P]>;
  };

  export type NoteGroupByArgs = {
    where?: NoteWhereInput;
    orderBy?: Enumerable<NoteOrderByWithAggregationInput>;
    by: Array<NoteScalarFieldEnum>;
    having?: NoteScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NoteCountAggregateInputType | true;
    _avg?: NoteAvgAggregateInputType;
    _sum?: NoteSumAggregateInputType;
    _min?: NoteMinAggregateInputType;
    _max?: NoteMaxAggregateInputType;
  };

  export type NoteGroupByOutputType = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    content: string;
    authorId: number | null;
    _count: NoteCountAggregateOutputType | null;
    _avg: NoteAvgAggregateOutputType | null;
    _sum: NoteSumAggregateOutputType | null;
    _min: NoteMinAggregateOutputType | null;
    _max: NoteMaxAggregateOutputType | null;
  };

  type GetNoteGroupByPayload<T extends NoteGroupByArgs> = Promise<
    Array<
      PickArray<NoteGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof NoteGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], NoteGroupByOutputType[P]>
          : GetScalarType<T[P], NoteGroupByOutputType[P]>;
      }
    >
  >;

  export type NoteSelect = {
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    title?: boolean;
    content?: boolean;
    author?: boolean | UserArgs;
    authorId?: boolean;
  };

  export type NoteInclude = {
    author?: boolean | UserArgs;
  };

  export type NoteGetPayload<
    S extends boolean | null | undefined | NoteArgs,
    U = keyof S
  > = S extends true
    ? Note
    : S extends undefined
    ? never
    : S extends NoteArgs | NoteFindManyArgs
    ? "include" extends U
      ? Note & {
          [P in TrueKeys<S["include"]>]: P extends "author"
            ? UserGetPayload<S["include"][P]> | null
            : never;
        }
      : "select" extends U
      ? {
          [P in TrueKeys<S["select"]>]: P extends keyof Note
            ? Note[P]
            : P extends "author"
            ? UserGetPayload<S["select"][P]> | null
            : never;
        }
      : Note
    : Note;

  type NoteCountArgs = Merge<
    Omit<NoteFindManyArgs, "select" | "include"> & {
      select?: NoteCountAggregateInputType | true;
    }
  >;

  export interface NoteDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Note that matches the filter.
     * @param {NoteFindUniqueArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<
      T extends NoteFindUniqueArgs,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound
        ? T["rejectOnNotFound"]
        : undefined
    >(
      args: SelectSubset<T, NoteFindUniqueArgs>
    ): HasReject<
      GlobalRejectSettings,
      LocalRejectSettings,
      "findUnique",
      "Note"
    > extends True
      ? CheckSelect<
          T,
          Prisma__NoteClient<Note>,
          Prisma__NoteClient<NoteGetPayload<T>>
        >
      : CheckSelect<
          T,
          Prisma__NoteClient<Note | null>,
          Prisma__NoteClient<NoteGetPayload<T> | null>
        >;

    /**
     * Find the first Note that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindFirstArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<
      T extends NoteFindFirstArgs,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound
        ? T["rejectOnNotFound"]
        : undefined
    >(
      args?: SelectSubset<T, NoteFindFirstArgs>
    ): HasReject<
      GlobalRejectSettings,
      LocalRejectSettings,
      "findFirst",
      "Note"
    > extends True
      ? CheckSelect<
          T,
          Prisma__NoteClient<Note>,
          Prisma__NoteClient<NoteGetPayload<T>>
        >
      : CheckSelect<
          T,
          Prisma__NoteClient<Note | null>,
          Prisma__NoteClient<NoteGetPayload<T> | null>
        >;

    /**
     * Find zero or more Notes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notes
     * const notes = await prisma.note.findMany()
     *
     * // Get first 10 Notes
     * const notes = await prisma.note.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const noteWithIdOnly = await prisma.note.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends NoteFindManyArgs>(
      args?: SelectSubset<T, NoteFindManyArgs>
    ): CheckSelect<
      T,
      PrismaPromise<Array<Note>>,
      PrismaPromise<Array<NoteGetPayload<T>>>
    >;

    /**
     * Create a Note.
     * @param {NoteCreateArgs} args - Arguments to create a Note.
     * @example
     * // Create one Note
     * const Note = await prisma.note.create({
     *   data: {
     *     // ... data to create a Note
     *   }
     * })
     *
     **/
    create<T extends NoteCreateArgs>(
      args: SelectSubset<T, NoteCreateArgs>
    ): CheckSelect<
      T,
      Prisma__NoteClient<Note>,
      Prisma__NoteClient<NoteGetPayload<T>>
    >;

    /**
     * Create many Notes.
     *     @param {NoteCreateManyArgs} args - Arguments to create many Notes.
     *     @example
     *     // Create many Notes
     *     const note = await prisma.note.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends NoteCreateManyArgs>(
      args?: SelectSubset<T, NoteCreateManyArgs>
    ): PrismaPromise<BatchPayload>;

    /**
     * Delete a Note.
     * @param {NoteDeleteArgs} args - Arguments to delete one Note.
     * @example
     * // Delete one Note
     * const Note = await prisma.note.delete({
     *   where: {
     *     // ... filter to delete one Note
     *   }
     * })
     *
     **/
    delete<T extends NoteDeleteArgs>(
      args: SelectSubset<T, NoteDeleteArgs>
    ): CheckSelect<
      T,
      Prisma__NoteClient<Note>,
      Prisma__NoteClient<NoteGetPayload<T>>
    >;

    /**
     * Update one Note.
     * @param {NoteUpdateArgs} args - Arguments to update one Note.
     * @example
     * // Update one Note
     * const note = await prisma.note.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends NoteUpdateArgs>(
      args: SelectSubset<T, NoteUpdateArgs>
    ): CheckSelect<
      T,
      Prisma__NoteClient<Note>,
      Prisma__NoteClient<NoteGetPayload<T>>
    >;

    /**
     * Delete zero or more Notes.
     * @param {NoteDeleteManyArgs} args - Arguments to filter Notes to delete.
     * @example
     * // Delete a few Notes
     * const { count } = await prisma.note.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends NoteDeleteManyArgs>(
      args?: SelectSubset<T, NoteDeleteManyArgs>
    ): PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notes
     * const note = await prisma.note.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends NoteUpdateManyArgs>(
      args: SelectSubset<T, NoteUpdateManyArgs>
    ): PrismaPromise<BatchPayload>;

    /**
     * Create or update one Note.
     * @param {NoteUpsertArgs} args - Arguments to update or create a Note.
     * @example
     * // Update or create a Note
     * const note = await prisma.note.upsert({
     *   create: {
     *     // ... data to create a Note
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Note we want to update
     *   }
     * })
     **/
    upsert<T extends NoteUpsertArgs>(
      args: SelectSubset<T, NoteUpsertArgs>
    ): CheckSelect<
      T,
      Prisma__NoteClient<Note>,
      Prisma__NoteClient<NoteGetPayload<T>>
    >;

    /**
     * Count the number of Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteCountArgs} args - Arguments to filter Notes to count.
     * @example
     * // Count the number of Notes
     * const count = await prisma.note.count({
     *   where: {
     *     // ... the filter for the Notes we want to count
     *   }
     * })
     **/
    count<T extends NoteCountArgs>(
      args?: Subset<T, NoteCountArgs>
    ): PrismaPromise<
      T extends _Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], NoteCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Note.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NoteAggregateArgs>(
      args: Subset<T, NoteAggregateArgs>
    ): PrismaPromise<GetNoteAggregateType<T>>;

    /**
     * Group by Note.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteGroupByArgs} args - Group by arguments.
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
      T extends NoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NoteGroupByArgs["orderBy"] }
        : { orderBy?: NoteGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends TupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
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
                  "Field ",
                  P,
                  ` in "having" needs to be provided in "by"`
                ];
          }[HavingFields]
        : "take" extends Keys<T>
        ? "orderBy" extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : "skip" extends Keys<T>
        ? "orderBy" extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields]
    >(
      args: SubsetIntersection<T, NoteGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetNoteGroupByPayload<T> : Promise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Note.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__NoteClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(
      _dmmf: runtime.DMMFClass,
      _fetcher: PrismaClientFetcher,
      _queryType: "query" | "mutation",
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean
    );
    readonly [Symbol.toStringTag]: "PrismaClientPromise";

    author<T extends UserArgs = {}>(
      args?: Subset<T, UserArgs>
    ): CheckSelect<
      T,
      Prisma__UserClient<User | null>,
      Prisma__UserClient<UserGetPayload<T> | null>
    >;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Note findUnique
   */
  export type NoteFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Note
     *
     **/
    select?: NoteSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     *
     **/
    include?: NoteInclude | null;
    /**
     * Throw an Error if a Note can't be found
     *
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which Note to fetch.
     *
     **/
    where: NoteWhereUniqueInput;
  };

  /**
   * Note findFirst
   */
  export type NoteFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Note
     *
     **/
    select?: NoteSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     *
     **/
    include?: NoteInclude | null;
    /**
     * Throw an Error if a Note can't be found
     *
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which Note to fetch.
     *
     **/
    where?: NoteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Notes to fetch.
     *
     **/
    orderBy?: Enumerable<NoteOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Notes.
     *
     **/
    cursor?: NoteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Notes from the position of the cursor.
     *
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Notes.
     *
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Notes.
     *
     **/
    distinct?: Enumerable<NoteScalarFieldEnum>;
  };

  /**
   * Note findMany
   */
  export type NoteFindManyArgs = {
    /**
     * Select specific fields to fetch from the Note
     *
     **/
    select?: NoteSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     *
     **/
    include?: NoteInclude | null;
    /**
     * Filter, which Notes to fetch.
     *
     **/
    where?: NoteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Notes to fetch.
     *
     **/
    orderBy?: Enumerable<NoteOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Notes.
     *
     **/
    cursor?: NoteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Notes from the position of the cursor.
     *
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Notes.
     *
     **/
    skip?: number;
    distinct?: Enumerable<NoteScalarFieldEnum>;
  };

  /**
   * Note create
   */
  export type NoteCreateArgs = {
    /**
     * Select specific fields to fetch from the Note
     *
     **/
    select?: NoteSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     *
     **/
    include?: NoteInclude | null;
    /**
     * The data needed to create a Note.
     *
     **/
    data: XOR<NoteCreateInput, NoteUncheckedCreateInput>;
  };

  /**
   * Note createMany
   */
  export type NoteCreateManyArgs = {
    data: Enumerable<NoteCreateManyInput>;
    skipDuplicates?: boolean;
  };

  /**
   * Note update
   */
  export type NoteUpdateArgs = {
    /**
     * Select specific fields to fetch from the Note
     *
     **/
    select?: NoteSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     *
     **/
    include?: NoteInclude | null;
    /**
     * The data needed to update a Note.
     *
     **/
    data: XOR<NoteUpdateInput, NoteUncheckedUpdateInput>;
    /**
     * Choose, which Note to update.
     *
     **/
    where: NoteWhereUniqueInput;
  };

  /**
   * Note updateMany
   */
  export type NoteUpdateManyArgs = {
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyInput>;
    where?: NoteWhereInput;
  };

  /**
   * Note upsert
   */
  export type NoteUpsertArgs = {
    /**
     * Select specific fields to fetch from the Note
     *
     **/
    select?: NoteSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     *
     **/
    include?: NoteInclude | null;
    /**
     * The filter to search for the Note to update in case it exists.
     *
     **/
    where: NoteWhereUniqueInput;
    /**
     * In case the Note found by the `where` argument doesn't exist, create a new Note with this data.
     *
     **/
    create: XOR<NoteCreateInput, NoteUncheckedCreateInput>;
    /**
     * In case the Note was found with the provided `where` argument, update it with this data.
     *
     **/
    update: XOR<NoteUpdateInput, NoteUncheckedUpdateInput>;
  };

  /**
   * Note delete
   */
  export type NoteDeleteArgs = {
    /**
     * Select specific fields to fetch from the Note
     *
     **/
    select?: NoteSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     *
     **/
    include?: NoteInclude | null;
    /**
     * Filter which Note to delete.
     *
     **/
    where: NoteWhereUniqueInput;
  };

  /**
   * Note deleteMany
   */
  export type NoteDeleteManyArgs = {
    where?: NoteWhereInput;
  };

  /**
   * Note without action
   */
  export type NoteArgs = {
    /**
     * Select specific fields to fetch from the Note
     *
     **/
    select?: NoteSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     *
     **/
    include?: NoteInclude | null;
  };

  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const UserScalarFieldEnum: {
    id: "id";
    email: "email";
    phoneNumber: "phoneNumber";
    password: "password";
    name: "name";
    imageUrl: "imageUrl";
    bio: "bio";
    emailVerified: "emailVerified";
    phoneNumberVerified: "phoneNumberVerified";
    provider: "provider";
    githubId: "githubId";
    facebookId: "facebookId";
    googleId: "googleId";
  };

  export type UserScalarFieldEnum =
    typeof UserScalarFieldEnum[keyof typeof UserScalarFieldEnum];

  export const NoteScalarFieldEnum: {
    id: "id";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
    title: "title";
    content: "content";
    authorId: "authorId";
  };

  export type NoteScalarFieldEnum =
    typeof NoteScalarFieldEnum[keyof typeof NoteScalarFieldEnum];

  export const SortOrder: {
    asc: "asc";
    desc: "desc";
  };

  export type SortOrder = typeof SortOrder[keyof typeof SortOrder];

  export const QueryMode: {
    default: "default";
    insensitive: "insensitive";
  };

  export type QueryMode = typeof QueryMode[keyof typeof QueryMode];

  /**
   * Deep Input Types
   */

  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>;
    OR?: Enumerable<UserWhereInput>;
    NOT?: Enumerable<UserWhereInput>;
    id?: IntFilter | number;
    email?: StringNullableFilter | string | null;
    phoneNumber?: IntNullableFilter | number | null;
    password?: StringNullableFilter | string | null;
    name?: StringNullableFilter | string | null;
    notes?: NoteListRelationFilter;
    imageUrl?: StringNullableFilter | string | null;
    bio?: StringNullableFilter | string | null;
    emailVerified?: BoolFilter | boolean;
    phoneNumberVerified?: BoolFilter | boolean;
    provider?: EnumProviderFilter | Provider;
    githubId?: StringNullableFilter | string | null;
    facebookId?: StringNullableFilter | string | null;
    googleId?: StringNullableFilter | string | null;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    email?: SortOrder;
    phoneNumber?: SortOrder;
    password?: SortOrder;
    name?: SortOrder;
    notes?: NoteOrderByRelationAggregateInput;
    imageUrl?: SortOrder;
    bio?: SortOrder;
    emailVerified?: SortOrder;
    phoneNumberVerified?: SortOrder;
    provider?: SortOrder;
    githubId?: SortOrder;
    facebookId?: SortOrder;
    googleId?: SortOrder;
  };

  export type UserWhereUniqueInput = {
    id?: number;
    email?: string;
    phoneNumber?: number;
  };

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    email?: SortOrder;
    phoneNumber?: SortOrder;
    password?: SortOrder;
    name?: SortOrder;
    imageUrl?: SortOrder;
    bio?: SortOrder;
    emailVerified?: SortOrder;
    phoneNumberVerified?: SortOrder;
    provider?: SortOrder;
    githubId?: SortOrder;
    facebookId?: SortOrder;
    googleId?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _avg?: UserAvgOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
    _sum?: UserSumOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>;
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>;
    id?: IntWithAggregatesFilter | number;
    email?: StringNullableWithAggregatesFilter | string | null;
    phoneNumber?: IntNullableWithAggregatesFilter | number | null;
    password?: StringNullableWithAggregatesFilter | string | null;
    name?: StringNullableWithAggregatesFilter | string | null;
    imageUrl?: StringNullableWithAggregatesFilter | string | null;
    bio?: StringNullableWithAggregatesFilter | string | null;
    emailVerified?: BoolWithAggregatesFilter | boolean;
    phoneNumberVerified?: BoolWithAggregatesFilter | boolean;
    provider?: EnumProviderWithAggregatesFilter | Provider;
    githubId?: StringNullableWithAggregatesFilter | string | null;
    facebookId?: StringNullableWithAggregatesFilter | string | null;
    googleId?: StringNullableWithAggregatesFilter | string | null;
  };

  export type NoteWhereInput = {
    AND?: Enumerable<NoteWhereInput>;
    OR?: Enumerable<NoteWhereInput>;
    NOT?: Enumerable<NoteWhereInput>;
    id?: IntFilter | number;
    createdAt?: DateTimeFilter | Date | string;
    updatedAt?: DateTimeFilter | Date | string;
    title?: StringFilter | string;
    content?: StringFilter | string;
    author?: XOR<UserRelationFilter, UserWhereInput> | null;
    authorId?: IntNullableFilter | number | null;
  };

  export type NoteOrderByWithRelationInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    title?: SortOrder;
    content?: SortOrder;
    author?: UserOrderByWithRelationInput;
    authorId?: SortOrder;
  };

  export type NoteWhereUniqueInput = {
    id?: number;
  };

  export type NoteOrderByWithAggregationInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    title?: SortOrder;
    content?: SortOrder;
    authorId?: SortOrder;
    _count?: NoteCountOrderByAggregateInput;
    _avg?: NoteAvgOrderByAggregateInput;
    _max?: NoteMaxOrderByAggregateInput;
    _min?: NoteMinOrderByAggregateInput;
    _sum?: NoteSumOrderByAggregateInput;
  };

  export type NoteScalarWhereWithAggregatesInput = {
    AND?: Enumerable<NoteScalarWhereWithAggregatesInput>;
    OR?: Enumerable<NoteScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<NoteScalarWhereWithAggregatesInput>;
    id?: IntWithAggregatesFilter | number;
    createdAt?: DateTimeWithAggregatesFilter | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter | Date | string;
    title?: StringWithAggregatesFilter | string;
    content?: StringWithAggregatesFilter | string;
    authorId?: IntNullableWithAggregatesFilter | number | null;
  };

  export type UserCreateInput = {
    email?: string | null;
    phoneNumber?: number | null;
    password?: string | null;
    name?: string | null;
    imageUrl?: string | null;
    bio?: string | null;
    emailVerified?: boolean;
    phoneNumberVerified?: boolean;
    provider: Provider;
    githubId?: string | null;
    facebookId?: string | null;
    googleId?: string | null;
    notes?: NoteCreateNestedManyWithoutAuthorInput;
  };

  export type UserUncheckedCreateInput = {
    id?: number;
    email?: string | null;
    phoneNumber?: number | null;
    password?: string | null;
    name?: string | null;
    imageUrl?: string | null;
    bio?: string | null;
    emailVerified?: boolean;
    phoneNumberVerified?: boolean;
    provider: Provider;
    githubId?: string | null;
    facebookId?: string | null;
    googleId?: string | null;
    notes?: NoteUncheckedCreateNestedManyWithoutAuthorInput;
  };

  export type UserUpdateInput = {
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: NullableIntFieldUpdateOperationsInput | number | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    phoneNumberVerified?: BoolFieldUpdateOperationsInput | boolean;
    provider?: EnumProviderFieldUpdateOperationsInput | Provider;
    githubId?: NullableStringFieldUpdateOperationsInput | string | null;
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null;
    googleId?: NullableStringFieldUpdateOperationsInput | string | null;
    notes?: NoteUpdateManyWithoutAuthorInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: NullableIntFieldUpdateOperationsInput | number | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    phoneNumberVerified?: BoolFieldUpdateOperationsInput | boolean;
    provider?: EnumProviderFieldUpdateOperationsInput | Provider;
    githubId?: NullableStringFieldUpdateOperationsInput | string | null;
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null;
    googleId?: NullableStringFieldUpdateOperationsInput | string | null;
    notes?: NoteUncheckedUpdateManyWithoutAuthorInput;
  };

  export type UserCreateManyInput = {
    id?: number;
    email?: string | null;
    phoneNumber?: number | null;
    password?: string | null;
    name?: string | null;
    imageUrl?: string | null;
    bio?: string | null;
    emailVerified?: boolean;
    phoneNumberVerified?: boolean;
    provider: Provider;
    githubId?: string | null;
    facebookId?: string | null;
    googleId?: string | null;
  };

  export type UserUpdateManyMutationInput = {
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: NullableIntFieldUpdateOperationsInput | number | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    phoneNumberVerified?: BoolFieldUpdateOperationsInput | boolean;
    provider?: EnumProviderFieldUpdateOperationsInput | Provider;
    githubId?: NullableStringFieldUpdateOperationsInput | string | null;
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null;
    googleId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: NullableIntFieldUpdateOperationsInput | number | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    phoneNumberVerified?: BoolFieldUpdateOperationsInput | boolean;
    provider?: EnumProviderFieldUpdateOperationsInput | Provider;
    githubId?: NullableStringFieldUpdateOperationsInput | string | null;
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null;
    googleId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type NoteCreateInput = {
    createdAt?: Date | string;
    updatedAt?: Date | string;
    title: string;
    content: string;
    author?: UserCreateNestedOneWithoutNotesInput;
  };

  export type NoteUncheckedCreateInput = {
    id?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    title: string;
    content: string;
    authorId?: number | null;
  };

  export type NoteUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: StringFieldUpdateOperationsInput | string;
    author?: UserUpdateOneWithoutNotesInput;
  };

  export type NoteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: StringFieldUpdateOperationsInput | string;
    authorId?: NullableIntFieldUpdateOperationsInput | number | null;
  };

  export type NoteCreateManyInput = {
    id?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    title: string;
    content: string;
    authorId?: number | null;
  };

  export type NoteUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: StringFieldUpdateOperationsInput | string;
  };

  export type NoteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: StringFieldUpdateOperationsInput | string;
    authorId?: NullableIntFieldUpdateOperationsInput | number | null;
  };

  export type IntFilter = {
    equals?: number;
    in?: Enumerable<number>;
    notIn?: Enumerable<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntFilter | number;
  };

  export type StringNullableFilter = {
    equals?: string | null;
    in?: Enumerable<string> | null;
    notIn?: Enumerable<string> | null;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    mode?: QueryMode;
    not?: NestedStringNullableFilter | string | null;
  };

  export type IntNullableFilter = {
    equals?: number | null;
    in?: Enumerable<number> | null;
    notIn?: Enumerable<number> | null;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntNullableFilter | number | null;
  };

  export type NoteListRelationFilter = {
    every?: NoteWhereInput;
    some?: NoteWhereInput;
    none?: NoteWhereInput;
  };

  export type BoolFilter = {
    equals?: boolean;
    not?: NestedBoolFilter | boolean;
  };

  export type EnumProviderFilter = {
    equals?: Provider;
    in?: Enumerable<Provider>;
    notIn?: Enumerable<Provider>;
    not?: NestedEnumProviderFilter | Provider;
  };

  export type NoteOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    phoneNumber?: SortOrder;
    password?: SortOrder;
    name?: SortOrder;
    imageUrl?: SortOrder;
    bio?: SortOrder;
    emailVerified?: SortOrder;
    phoneNumberVerified?: SortOrder;
    provider?: SortOrder;
    githubId?: SortOrder;
    facebookId?: SortOrder;
    googleId?: SortOrder;
  };

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder;
    phoneNumber?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    phoneNumber?: SortOrder;
    password?: SortOrder;
    name?: SortOrder;
    imageUrl?: SortOrder;
    bio?: SortOrder;
    emailVerified?: SortOrder;
    phoneNumberVerified?: SortOrder;
    provider?: SortOrder;
    githubId?: SortOrder;
    facebookId?: SortOrder;
    googleId?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    phoneNumber?: SortOrder;
    password?: SortOrder;
    name?: SortOrder;
    imageUrl?: SortOrder;
    bio?: SortOrder;
    emailVerified?: SortOrder;
    phoneNumberVerified?: SortOrder;
    provider?: SortOrder;
    githubId?: SortOrder;
    facebookId?: SortOrder;
    googleId?: SortOrder;
  };

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder;
    phoneNumber?: SortOrder;
  };

  export type IntWithAggregatesFilter = {
    equals?: number;
    in?: Enumerable<number>;
    notIn?: Enumerable<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntWithAggregatesFilter | number;
    _count?: NestedIntFilter;
    _avg?: NestedFloatFilter;
    _sum?: NestedIntFilter;
    _min?: NestedIntFilter;
    _max?: NestedIntFilter;
  };

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null;
    in?: Enumerable<string> | null;
    notIn?: Enumerable<string> | null;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    mode?: QueryMode;
    not?: NestedStringNullableWithAggregatesFilter | string | null;
    _count?: NestedIntNullableFilter;
    _min?: NestedStringNullableFilter;
    _max?: NestedStringNullableFilter;
  };

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null;
    in?: Enumerable<number> | null;
    notIn?: Enumerable<number> | null;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntNullableWithAggregatesFilter | number | null;
    _count?: NestedIntNullableFilter;
    _avg?: NestedFloatNullableFilter;
    _sum?: NestedIntNullableFilter;
    _min?: NestedIntNullableFilter;
    _max?: NestedIntNullableFilter;
  };

  export type BoolWithAggregatesFilter = {
    equals?: boolean;
    not?: NestedBoolWithAggregatesFilter | boolean;
    _count?: NestedIntFilter;
    _min?: NestedBoolFilter;
    _max?: NestedBoolFilter;
  };

  export type EnumProviderWithAggregatesFilter = {
    equals?: Provider;
    in?: Enumerable<Provider>;
    notIn?: Enumerable<Provider>;
    not?: NestedEnumProviderWithAggregatesFilter | Provider;
    _count?: NestedIntFilter;
    _min?: NestedEnumProviderFilter;
    _max?: NestedEnumProviderFilter;
  };

  export type DateTimeFilter = {
    equals?: Date | string;
    in?: Enumerable<Date> | Enumerable<string>;
    notIn?: Enumerable<Date> | Enumerable<string>;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: NestedDateTimeFilter | Date | string;
  };

  export type StringFilter = {
    equals?: string;
    in?: Enumerable<string>;
    notIn?: Enumerable<string>;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    mode?: QueryMode;
    not?: NestedStringFilter | string;
  };

  export type UserRelationFilter = {
    is?: UserWhereInput | null;
    isNot?: UserWhereInput | null;
  };

  export type NoteCountOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    title?: SortOrder;
    content?: SortOrder;
    authorId?: SortOrder;
  };

  export type NoteAvgOrderByAggregateInput = {
    id?: SortOrder;
    authorId?: SortOrder;
  };

  export type NoteMaxOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    title?: SortOrder;
    content?: SortOrder;
    authorId?: SortOrder;
  };

  export type NoteMinOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    title?: SortOrder;
    content?: SortOrder;
    authorId?: SortOrder;
  };

  export type NoteSumOrderByAggregateInput = {
    id?: SortOrder;
    authorId?: SortOrder;
  };

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string;
    in?: Enumerable<Date> | Enumerable<string>;
    notIn?: Enumerable<Date> | Enumerable<string>;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: NestedDateTimeWithAggregatesFilter | Date | string;
    _count?: NestedIntFilter;
    _min?: NestedDateTimeFilter;
    _max?: NestedDateTimeFilter;
  };

  export type StringWithAggregatesFilter = {
    equals?: string;
    in?: Enumerable<string>;
    notIn?: Enumerable<string>;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter | string;
    _count?: NestedIntFilter;
    _min?: NestedStringFilter;
    _max?: NestedStringFilter;
  };

  export type NoteCreateNestedManyWithoutAuthorInput = {
    create?: XOR<
      Enumerable<NoteCreateWithoutAuthorInput>,
      Enumerable<NoteUncheckedCreateWithoutAuthorInput>
    >;
    connectOrCreate?: Enumerable<NoteCreateOrConnectWithoutAuthorInput>;
    createMany?: NoteCreateManyAuthorInputEnvelope;
    connect?: Enumerable<NoteWhereUniqueInput>;
  };

  export type NoteUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<
      Enumerable<NoteCreateWithoutAuthorInput>,
      Enumerable<NoteUncheckedCreateWithoutAuthorInput>
    >;
    connectOrCreate?: Enumerable<NoteCreateOrConnectWithoutAuthorInput>;
    createMany?: NoteCreateManyAuthorInputEnvelope;
    connect?: Enumerable<NoteWhereUniqueInput>;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type EnumProviderFieldUpdateOperationsInput = {
    set?: Provider;
  };

  export type NoteUpdateManyWithoutAuthorInput = {
    create?: XOR<
      Enumerable<NoteCreateWithoutAuthorInput>,
      Enumerable<NoteUncheckedCreateWithoutAuthorInput>
    >;
    connectOrCreate?: Enumerable<NoteCreateOrConnectWithoutAuthorInput>;
    upsert?: Enumerable<NoteUpsertWithWhereUniqueWithoutAuthorInput>;
    createMany?: NoteCreateManyAuthorInputEnvelope;
    connect?: Enumerable<NoteWhereUniqueInput>;
    set?: Enumerable<NoteWhereUniqueInput>;
    disconnect?: Enumerable<NoteWhereUniqueInput>;
    delete?: Enumerable<NoteWhereUniqueInput>;
    update?: Enumerable<NoteUpdateWithWhereUniqueWithoutAuthorInput>;
    updateMany?: Enumerable<NoteUpdateManyWithWhereWithoutAuthorInput>;
    deleteMany?: Enumerable<NoteScalarWhereInput>;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type NoteUncheckedUpdateManyWithoutAuthorInput = {
    create?: XOR<
      Enumerable<NoteCreateWithoutAuthorInput>,
      Enumerable<NoteUncheckedCreateWithoutAuthorInput>
    >;
    connectOrCreate?: Enumerable<NoteCreateOrConnectWithoutAuthorInput>;
    upsert?: Enumerable<NoteUpsertWithWhereUniqueWithoutAuthorInput>;
    createMany?: NoteCreateManyAuthorInputEnvelope;
    connect?: Enumerable<NoteWhereUniqueInput>;
    set?: Enumerable<NoteWhereUniqueInput>;
    disconnect?: Enumerable<NoteWhereUniqueInput>;
    delete?: Enumerable<NoteWhereUniqueInput>;
    update?: Enumerable<NoteUpdateWithWhereUniqueWithoutAuthorInput>;
    updateMany?: Enumerable<NoteUpdateManyWithWhereWithoutAuthorInput>;
    deleteMany?: Enumerable<NoteScalarWhereInput>;
  };

  export type UserCreateNestedOneWithoutNotesInput = {
    create?: XOR<
      UserCreateWithoutNotesInput,
      UserUncheckedCreateWithoutNotesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutNotesInput;
    connect?: UserWhereUniqueInput;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type UserUpdateOneWithoutNotesInput = {
    create?: XOR<
      UserCreateWithoutNotesInput,
      UserUncheckedCreateWithoutNotesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutNotesInput;
    upsert?: UserUpsertWithoutNotesInput;
    connect?: UserWhereUniqueInput;
    disconnect?: boolean;
    delete?: boolean;
    update?: XOR<
      UserUpdateWithoutNotesInput,
      UserUncheckedUpdateWithoutNotesInput
    >;
  };

  export type NestedIntFilter = {
    equals?: number;
    in?: Enumerable<number>;
    notIn?: Enumerable<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntFilter | number;
  };

  export type NestedStringNullableFilter = {
    equals?: string | null;
    in?: Enumerable<string> | null;
    notIn?: Enumerable<string> | null;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: NestedStringNullableFilter | string | null;
  };

  export type NestedIntNullableFilter = {
    equals?: number | null;
    in?: Enumerable<number> | null;
    notIn?: Enumerable<number> | null;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntNullableFilter | number | null;
  };

  export type NestedBoolFilter = {
    equals?: boolean;
    not?: NestedBoolFilter | boolean;
  };

  export type NestedEnumProviderFilter = {
    equals?: Provider;
    in?: Enumerable<Provider>;
    notIn?: Enumerable<Provider>;
    not?: NestedEnumProviderFilter | Provider;
  };

  export type NestedIntWithAggregatesFilter = {
    equals?: number;
    in?: Enumerable<number>;
    notIn?: Enumerable<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntWithAggregatesFilter | number;
    _count?: NestedIntFilter;
    _avg?: NestedFloatFilter;
    _sum?: NestedIntFilter;
    _min?: NestedIntFilter;
    _max?: NestedIntFilter;
  };

  export type NestedFloatFilter = {
    equals?: number;
    in?: Enumerable<number>;
    notIn?: Enumerable<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedFloatFilter | number;
  };

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null;
    in?: Enumerable<string> | null;
    notIn?: Enumerable<string> | null;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: NestedStringNullableWithAggregatesFilter | string | null;
    _count?: NestedIntNullableFilter;
    _min?: NestedStringNullableFilter;
    _max?: NestedStringNullableFilter;
  };

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null;
    in?: Enumerable<number> | null;
    notIn?: Enumerable<number> | null;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntNullableWithAggregatesFilter | number | null;
    _count?: NestedIntNullableFilter;
    _avg?: NestedFloatNullableFilter;
    _sum?: NestedIntNullableFilter;
    _min?: NestedIntNullableFilter;
    _max?: NestedIntNullableFilter;
  };

  export type NestedFloatNullableFilter = {
    equals?: number | null;
    in?: Enumerable<number> | null;
    notIn?: Enumerable<number> | null;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedFloatNullableFilter | number | null;
  };

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean;
    not?: NestedBoolWithAggregatesFilter | boolean;
    _count?: NestedIntFilter;
    _min?: NestedBoolFilter;
    _max?: NestedBoolFilter;
  };

  export type NestedEnumProviderWithAggregatesFilter = {
    equals?: Provider;
    in?: Enumerable<Provider>;
    notIn?: Enumerable<Provider>;
    not?: NestedEnumProviderWithAggregatesFilter | Provider;
    _count?: NestedIntFilter;
    _min?: NestedEnumProviderFilter;
    _max?: NestedEnumProviderFilter;
  };

  export type NestedDateTimeFilter = {
    equals?: Date | string;
    in?: Enumerable<Date> | Enumerable<string>;
    notIn?: Enumerable<Date> | Enumerable<string>;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: NestedDateTimeFilter | Date | string;
  };

  export type NestedStringFilter = {
    equals?: string;
    in?: Enumerable<string>;
    notIn?: Enumerable<string>;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: NestedStringFilter | string;
  };

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string;
    in?: Enumerable<Date> | Enumerable<string>;
    notIn?: Enumerable<Date> | Enumerable<string>;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: NestedDateTimeWithAggregatesFilter | Date | string;
    _count?: NestedIntFilter;
    _min?: NestedDateTimeFilter;
    _max?: NestedDateTimeFilter;
  };

  export type NestedStringWithAggregatesFilter = {
    equals?: string;
    in?: Enumerable<string>;
    notIn?: Enumerable<string>;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: NestedStringWithAggregatesFilter | string;
    _count?: NestedIntFilter;
    _min?: NestedStringFilter;
    _max?: NestedStringFilter;
  };

  export type NoteCreateWithoutAuthorInput = {
    createdAt?: Date | string;
    updatedAt?: Date | string;
    title: string;
    content: string;
  };

  export type NoteUncheckedCreateWithoutAuthorInput = {
    id?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    title: string;
    content: string;
  };

  export type NoteCreateOrConnectWithoutAuthorInput = {
    where: NoteWhereUniqueInput;
    create: XOR<
      NoteCreateWithoutAuthorInput,
      NoteUncheckedCreateWithoutAuthorInput
    >;
  };

  export type NoteCreateManyAuthorInputEnvelope = {
    data: Enumerable<NoteCreateManyAuthorInput>;
    skipDuplicates?: boolean;
  };

  export type NoteUpsertWithWhereUniqueWithoutAuthorInput = {
    where: NoteWhereUniqueInput;
    update: XOR<
      NoteUpdateWithoutAuthorInput,
      NoteUncheckedUpdateWithoutAuthorInput
    >;
    create: XOR<
      NoteCreateWithoutAuthorInput,
      NoteUncheckedCreateWithoutAuthorInput
    >;
  };

  export type NoteUpdateWithWhereUniqueWithoutAuthorInput = {
    where: NoteWhereUniqueInput;
    data: XOR<
      NoteUpdateWithoutAuthorInput,
      NoteUncheckedUpdateWithoutAuthorInput
    >;
  };

  export type NoteUpdateManyWithWhereWithoutAuthorInput = {
    where: NoteScalarWhereInput;
    data: XOR<
      NoteUpdateManyMutationInput,
      NoteUncheckedUpdateManyWithoutNotesInput
    >;
  };

  export type NoteScalarWhereInput = {
    AND?: Enumerable<NoteScalarWhereInput>;
    OR?: Enumerable<NoteScalarWhereInput>;
    NOT?: Enumerable<NoteScalarWhereInput>;
    id?: IntFilter | number;
    createdAt?: DateTimeFilter | Date | string;
    updatedAt?: DateTimeFilter | Date | string;
    title?: StringFilter | string;
    content?: StringFilter | string;
    authorId?: IntNullableFilter | number | null;
  };

  export type UserCreateWithoutNotesInput = {
    email?: string | null;
    phoneNumber?: number | null;
    password?: string | null;
    name?: string | null;
    imageUrl?: string | null;
    bio?: string | null;
    emailVerified?: boolean;
    phoneNumberVerified?: boolean;
    provider: Provider;
    githubId?: string | null;
    facebookId?: string | null;
    googleId?: string | null;
  };

  export type UserUncheckedCreateWithoutNotesInput = {
    id?: number;
    email?: string | null;
    phoneNumber?: number | null;
    password?: string | null;
    name?: string | null;
    imageUrl?: string | null;
    bio?: string | null;
    emailVerified?: boolean;
    phoneNumberVerified?: boolean;
    provider: Provider;
    githubId?: string | null;
    facebookId?: string | null;
    googleId?: string | null;
  };

  export type UserCreateOrConnectWithoutNotesInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutNotesInput,
      UserUncheckedCreateWithoutNotesInput
    >;
  };

  export type UserUpsertWithoutNotesInput = {
    update: XOR<
      UserUpdateWithoutNotesInput,
      UserUncheckedUpdateWithoutNotesInput
    >;
    create: XOR<
      UserCreateWithoutNotesInput,
      UserUncheckedCreateWithoutNotesInput
    >;
  };

  export type UserUpdateWithoutNotesInput = {
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: NullableIntFieldUpdateOperationsInput | number | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    phoneNumberVerified?: BoolFieldUpdateOperationsInput | boolean;
    provider?: EnumProviderFieldUpdateOperationsInput | Provider;
    githubId?: NullableStringFieldUpdateOperationsInput | string | null;
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null;
    googleId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type UserUncheckedUpdateWithoutNotesInput = {
    id?: IntFieldUpdateOperationsInput | number;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    phoneNumber?: NullableIntFieldUpdateOperationsInput | number | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: BoolFieldUpdateOperationsInput | boolean;
    phoneNumberVerified?: BoolFieldUpdateOperationsInput | boolean;
    provider?: EnumProviderFieldUpdateOperationsInput | Provider;
    githubId?: NullableStringFieldUpdateOperationsInput | string | null;
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null;
    googleId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type NoteCreateManyAuthorInput = {
    id?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    title: string;
    content: string;
  };

  export type NoteUpdateWithoutAuthorInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: StringFieldUpdateOperationsInput | string;
  };

  export type NoteUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: StringFieldUpdateOperationsInput | string;
  };

  export type NoteUncheckedUpdateManyWithoutNotesInput = {
    id?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: StringFieldUpdateOperationsInput | string;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}
