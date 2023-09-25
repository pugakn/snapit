import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  UUID: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteImage?: Maybe<Scalars['Boolean']['output']>;
  postImage?: Maybe<Post>;
  signup?: Maybe<SignUpResponse>;
};


export type MutationDeleteImageArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationPostImageArgs = {
  asset: Scalars['Upload']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSignupArgs = {
  avatar: Scalars['Upload']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  kind: Scalars['String']['output'];
  s3_object: S3Object;
  updated_at: Scalars['DateTime']['output'];
  user_id: Scalars['UUID']['output'];
};

export type Profile = {
  __typename?: 'Profile';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  s3_avatar?: Maybe<S3Object>;
  updated_at: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  followers?: Maybe<Array<Maybe<Profile>>>;
  following?: Maybe<Array<Maybe<Profile>>>;
  profile?: Maybe<Profile>;
  userFeed?: Maybe<Array<Maybe<Post>>>;
};


export type QueryFollowersArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryFollowingArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryProfileArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryUserFeedArgs = {
  id: Scalars['UUID']['input'];
};

export type S3Object = {
  __typename?: 'S3Object';
  bucket: Scalars['String']['output'];
  key: Scalars['String']['output'];
  region?: Maybe<Scalars['String']['output']>;
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  accessToken: Scalars['String']['output'];
  profile: Profile;
  refreshToken: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  Profile: ResolverTypeWrapper<Profile>;
  Query: ResolverTypeWrapper<{}>;
  S3Object: ResolverTypeWrapper<S3Object>;
  SignUpResponse: ResolverTypeWrapper<SignUpResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  Mutation: {};
  Post: Post;
  Profile: Profile;
  Query: {};
  S3Object: S3Object;
  SignUpResponse: SignUpResponse;
  String: Scalars['String']['output'];
  UUID: Scalars['UUID']['output'];
  Upload: Scalars['Upload']['output'];
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  deleteImage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteImageArgs, 'id'>>;
  postImage?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationPostImageArgs, 'asset'>>;
  signup?: Resolver<Maybe<ResolversTypes['SignUpResponse']>, ParentType, ContextType, RequireFields<MutationSignupArgs, 'avatar' | 'email' | 'name' | 'password' | 'username'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  s3_object?: Resolver<ResolversTypes['S3Object'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = {
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  s3_avatar?: Resolver<Maybe<ResolversTypes['S3Object']>, ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  followers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Profile']>>>, ParentType, ContextType, RequireFields<QueryFollowersArgs, 'id'>>;
  following?: Resolver<Maybe<Array<Maybe<ResolversTypes['Profile']>>>, ParentType, ContextType, RequireFields<QueryFollowingArgs, 'id'>>;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryProfileArgs, 'id'>>;
  userFeed?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType, RequireFields<QueryUserFeedArgs, 'id'>>;
};

export type S3ObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['S3Object'] = ResolversParentTypes['S3Object']> = {
  bucket?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  region?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SignUpResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignUpResponse'] = ResolversParentTypes['SignUpResponse']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  S3Object?: S3ObjectResolvers<ContextType>;
  SignUpResponse?: SignUpResponseResolvers<ContextType>;
  UUID?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
};

