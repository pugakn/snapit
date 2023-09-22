import { gql } from 'https://deno.land/x/graphql_tag@0.1.2/mod.ts'

export const typeDefs = gql`
  type Dinosaur {
    name: String
    description: String
  }

  type Query {
    dinosaurs: [Dinosaur]
        dinosaur(name: String): Dinosaur
  }
`;