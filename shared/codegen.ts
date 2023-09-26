import type { CodegenConfig } from "@graphql-codegen/cli";

//@ts-ignore
require("dotenv").config({ path: ".env.local" });

const config: CodegenConfig = {
  overwrite: true,
  schema: ["../server/gql/schemas/*.ts"],
  documents: ["../client/graphql/**/*.gql"],
  generates: {
    "./generated/gql/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
    "../client/graphql/index.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
        "typescript-resolvers",
        "typescript-apollo-client-helpers",
      ],
    },
    "./generated/gql/graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;

/*
{
    "https://xpvvgrxgmlynmruiyjzf.supabase.co/graphql/v1": {
      headers: {
        //@ts-ignore
        apiKey: process.env.SUPABASE_PK
      }
    }
  }
*/
