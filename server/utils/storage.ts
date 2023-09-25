import * as uuid from "https://deno.land/std@0.194.0/uuid/mod.ts";

export const generateFileId = (prefix?: string, ext?: "jpg") => {
  const id = uuid.v1.generate();
  return `${prefix ?? ""}${prefix ? "_" : ""}${id}${ext ? "." : ""}${
    ext ?? ""
  }`;
};
export const generateTimestamp = () => new Date();
