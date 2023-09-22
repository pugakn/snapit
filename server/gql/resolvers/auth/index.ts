import { shield } from "graphql-shield";
import { isAllowed, isDenied } from "./rules.ts";


export default shield(
  {
    Query: {
        dinosaurs: isAllowed,
      '*': isDenied,
    },

    // Mutation: {
    //   '*': isDenied,
    // },
  },
  {
    // All queries must be allowlisted
    allowExternalErrors: true,
  }
)