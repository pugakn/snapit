import addFormats from "https://esm.sh/ajv-formats";
import {
  isArray,
  trim,
} from "lodash";

export default (ajv: any) => {
  addFormats(ajv);

  ajv.addKeyword({
    keyword: "transform",
    modifying: true,
    type: ["string", "boolean", "number"],
    schema: true,
    validate: (transform: any, data: any, _: any, ref: any, prop: any) => {
      transform = isArray(transform) ? transform : [transform];
      for (const transformFn of transform) {
        data = transformFn(data);
      }
      prop[ref.split(".")[1]] = data;
      return true;
    },
  });

  ajv.addKeyword({
    keyword: "emptyIsNull",
    modifying: true,
    type: ["string"],
    validate: (_: any, data: any, __: any, ref: any, prop: any) => {
      if (trim(data, undefined, undefined) === "") {
        prop[ref.split(".")[1]] = null;
      }
      return true;
    },
  });

  /**
   * The default pattern runs before addKeywords run, which can
   * throw if the pattern is not met. This is a workaround.
   */
  ajv.addKeyword({
    keyword: "patternLast",
    type: ["string"],
    validate: (pattern: any, data: any) => {
      return new RegExp(pattern).test(data);
    },
  });
};
