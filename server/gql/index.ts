import { serve } from "https://deno.land/std@0.157.0/http/server.ts";

import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import { createSchema } from "graphql-yoga";
import { createYoga } from "graphql-yoga";
import { applyMiddleware } from "graphql-middleware";

import { resolvers } from "./resolvers/index.ts";
import auth from "./resolvers/auth/index.ts";
import { typeDefs } from "./schemas/index.ts";
import { EnvelopArmor } from "@escape.tech/graphql-armor";

const env = Deno.env.toObject();
const armor = new EnvelopArmor();
const enhancements = armor.protect();

const schema = createSchema({
  typeDefs: [typeDefs, ...scalarTypeDefs],
  resolvers: {
    ...resolvers,
  },
});

const yogaServer = createYoga({
  schema: applyMiddleware(schema, auth.generate(schema)),
  plugins: [...enhancements.plugins],
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
