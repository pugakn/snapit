import { gql } from "https://deno.land/x/graphql_tag@0.1.2/mod.ts";

export default gql`
  scalar Upload
  scalar UUID
  scalar DateTime

  type S3Object {
    key: String!
    bucket: String!
    region: String
  }

  type Profile {
    id: UUID!
    username: String!
    name: String!

    s3_avatar: S3Object

    updated_at: DateTime!
    created_at: DateTime!
  }

  type Post {
    id: UUID!
    user_id: UUID!
    kind: String!
    description: String

    s3_object: S3Object!

    updated_at: DateTime!
    created_at: DateTime!
  }

  type Query {
    profile(id: UUID!): Profile
    following(id: UUID!): [Profile]
    followers(id: UUID!): [Profile]
    userFeed(id: UUID!): [Post]
  }

  type Mutation {
    signup(username: String!, name: String!, email: String!, password: String!, avatar: Upload! ): Profile
    postImage(asset: Upload!, description: String): Post
    deleteImage(id: UUID!): Boolean
  }
`;
