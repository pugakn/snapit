import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
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

export type SignupMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  name: Scalars['String']['input'];
  username: Scalars['String']['input'];
  avatar: Scalars['Upload']['input'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: { __typename: 'SignUpResponse', accessToken: string, refreshToken: string, profile: { __typename: 'Profile', id: any, name: string, username: string } } | null };


export const SignupDocument = gql`
    mutation signup($email: String!, $password: String!, $name: String!, $username: String!, $avatar: Upload!) {
  signup(
    email: $email
    password: $password
    name: $name
    username: $username
    avatar: $avatar
  ) {
    accessToken
    refreshToken
    profile {
      id
      name
      username
      __typename
    }
    __typename
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *      username: // value for 'username'
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;


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


export type MutationKeySpecifier = ('deleteImage' | 'postImage' | 'signup' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	deleteImage?: FieldPolicy<any> | FieldReadFunction<any>,
	postImage?: FieldPolicy<any> | FieldReadFunction<any>,
	signup?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PostKeySpecifier = ('created_at' | 'description' | 'id' | 'kind' | 's3_object' | 'updated_at' | 'user_id' | PostKeySpecifier)[];
export type PostFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	kind?: FieldPolicy<any> | FieldReadFunction<any>,
	s3_object?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	user_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProfileKeySpecifier = ('created_at' | 'id' | 'name' | 's3_avatar' | 'updated_at' | 'username' | ProfileKeySpecifier)[];
export type ProfileFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	s3_avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('followers' | 'following' | 'profile' | 'userFeed' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	followers?: FieldPolicy<any> | FieldReadFunction<any>,
	following?: FieldPolicy<any> | FieldReadFunction<any>,
	profile?: FieldPolicy<any> | FieldReadFunction<any>,
	userFeed?: FieldPolicy<any> | FieldReadFunction<any>
};
export type S3ObjectKeySpecifier = ('bucket' | 'key' | 'region' | S3ObjectKeySpecifier)[];
export type S3ObjectFieldPolicy = {
	bucket?: FieldPolicy<any> | FieldReadFunction<any>,
	key?: FieldPolicy<any> | FieldReadFunction<any>,
	region?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SignUpResponseKeySpecifier = ('accessToken' | 'profile' | 'refreshToken' | SignUpResponseKeySpecifier)[];
export type SignUpResponseFieldPolicy = {
	accessToken?: FieldPolicy<any> | FieldReadFunction<any>,
	profile?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshToken?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Post?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PostKeySpecifier | (() => undefined | PostKeySpecifier),
		fields?: PostFieldPolicy,
	},
	Profile?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProfileKeySpecifier | (() => undefined | ProfileKeySpecifier),
		fields?: ProfileFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	S3Object?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | S3ObjectKeySpecifier | (() => undefined | S3ObjectKeySpecifier),
		fields?: S3ObjectFieldPolicy,
	},
	SignUpResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SignUpResponseKeySpecifier | (() => undefined | SignUpResponseKeySpecifier),
		fields?: SignUpResponseFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;