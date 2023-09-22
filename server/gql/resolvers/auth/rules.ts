import { cloneDeep } from "lodash";
import { ApolloErr } from "../../../utils/server.ts";
import permitAndValidate from "../../../utils/permitAndValidate.ts";
import { rule } from "graphql-shield";

export const validateQuery = (argsJsonSchema: any) =>
  rule({ cache: "contextual" })(async (_: any, args: any) => {
    try {
      const newArgs = cloneDeep(permitAndValidate(args, argsJsonSchema));
      // permitAndValidate may coerce args or omit disallowed keys,
      // so we need to overwrite the original args
      Object.keys(args).forEach((key) => delete args[key]);
      Object.assign(args, newArgs);
    } catch (e: any) {
      return new ApolloErr(e.name, ...(e.logs || []));
    }
    return true;
  });

export const isDenied = rule()(() => {
  return new ApolloErr("DENIED");
});

export const isAllowed = rule()(() => {
  return true;
});
