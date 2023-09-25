import { shield } from "graphql-shield";
import { isAllowed, isDenied } from "./rules.ts";

export default shield(
  {
    Query: {
      "*": isDenied,
    },

    Mutation: {
      signup: isAllowed,
      "*": isDenied,
    },
  },
  {
    // All queries must be allowlisted
    allowExternalErrors: true,
  }
);
