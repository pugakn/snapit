import { gql } from "https://deno.land/x/graphql_tag@0.1.2/mod.ts";

export default gql`
  type Profile {
    id: UUID!
    username: String!
    name: String!
    avatar_path: String

    updated_at: DateTime!
    created_at: DateTime!
  }

  type Image {
    id: UUID!
    user_id: UUID!
    path: String
    description: String

    updated_at: DateTime!
    created_at: DateTime!
  }

  type Dinosaur {
    name: String
    description: String
  }

  type Query {
    dinosaurs: [Dinosaur]
    dinosaur(name: String): Dinosaur
  }
`;
