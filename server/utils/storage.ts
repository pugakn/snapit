import * as uuid from "https://deno.land/std@0.194.0/uuid/mod.ts";

export const generateFileId = () => uuid.v1.generate();
export const generateTimestamp = () => new Date();
