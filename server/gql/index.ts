import { serve } from "https://deno.land/std@0.157.0/http/server.ts";

import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import { createSchema } from "graphql-yoga";
import { createYoga } from "graphql-yoga";
import { applyMiddleware } from "graphql-middleware";
import { EnvelopArmor } from "@escape.tech/graphql-armor";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.33.2";
import * as postgres from "https://deno.land/x/postgres@v0.14.2/mod.ts";

import { resolvers } from "./resolvers/index.ts";
import auth from "./resolvers/auth/index.ts";
import typeDefs from "./schemas/index.ts";
import { Resolvers } from "../../shared/generated/gql/types.ts";
import { Context } from "./types.ts";

const armor = new EnvelopArmor();
const enhancements = armor.protect();
const databaseUrl = Deno.env.get("SUPABASE_DB_URL")!;
const pool = new postgres.Pool(databaseUrl, 3, true);

const schema = createSchema({
  typeDefs: [typeDefs, ...scalarTypeDefs],
  resolvers: {
    ...resolvers,
  } as Resolvers,
});

const yogaServer = createYoga({
  schema: applyMiddleware(schema, auth.generate(schema)),
  plugins: [...enhancements.plugins],
  async context(req: Request) {
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get("SUPABASE_URL") ?? "",
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // Now we can get the session or user object
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    const supabaseDb = await pool.connect();

    return {
      req,
      supabaseClient,
      supabaseUser: user,
      supabaseDb,
    } as Context;
  },
});

export const start = async () => {
  serve(yogaServer, {
    onListen({ hostname, port }) {
      console.log(
        `Listening on http://${hostname}:${port}/${yogaServer.graphqlEndpoint}`
      );
    },
  });
};
