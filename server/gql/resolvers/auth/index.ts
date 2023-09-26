import { shield } from "graphql-shield";
import { isAllowed, isDenied, validateQuery } from "./rules.ts";
import { ProfileSchema } from "./inputs.ts";

export default shield(
  {
    Query: {
      "*": isDenied,
    },

    Mutation: {
      signup: validateQuery(ProfileSchema),
      "*": isDenied,
    },
  },
  {
    // All queries must be allowlisted
    allowExternalErrors: true,
  }
);
