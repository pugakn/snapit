import { createClient } from "https://esm.sh/@supabase/supabase-js@2.33.2";
import {
  Profile,
  Resolvers,
  SignUpResponse,
} from "../../../shared/generated/gql/types.ts";
import { ERROR_MAP } from "../../constants/index.ts";
import { YogaErr, Info } from "../../utils/server.ts";
import { generateFileId } from "../../utils/storage.ts";
import { Context } from "../types.ts";
import { Image } from "https://deno.land/x/imagescript@1.2.15/mod.ts";
import * as base64 from "https://denopkg.com/chiefbiiko/base64@master/mod.ts";

export const resolvers = {
  Query: {},
  Mutation: {
    signup: async (
      _: unknown,
      { email, password, name, username, avatar },
      context: Context
    ) => {
      new Info("Resolver:signup", { email, name, username });

      const user = await context.supabaseClientAdmin.auth.signUp({
        email: email,
        password: password,
      });
      context.supabaseUser = user.data.user;

      if (user.error) {
        return Promise.reject(new YogaErr(user.error.message, user.error));
      }

      let avatarKey: string | undefined = undefined;
      if (avatar) {
        const avatarUin8Array = base64.toUint8Array(avatar);
        const image = await Image.decode(avatarUin8Array);
        const encoded = await image.resize(400, 400).encodeJPEG(80);

        avatarKey =
          context.supabaseUser!.id +
          "/" +
          generateFileId(context.supabaseUser!.id, "jpeg");

        // Create a new client with a user's auth context.
        const supabaseUr = Deno.env.get("SUPABASE_URL") ?? "";
        const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
        const supabaseClient = createClient(supabaseUr, supabaseAnonKey, {
          global: {
            headers: {
              Authorization: `Bearer ${user.data?.session?.access_token!}`,
            },
          },
          auth: {
            persistSession: false,
          },
        });

        const res = await supabaseClient.storage
          .from("avatars")
          .upload(avatarKey, encoded, {
            contentType: "image/jpeg",
          });

        if (res.error) {
          await context.supabaseClientAdmin.auth.admin.deleteUser(
            context.supabaseUser!.id
          );
          return Promise.reject(new YogaErr(res.error.message, res.error));
        }
      }

      const res = await context.supabaseClientAdmin.from("profiles").insert({
        id: context.supabaseUser!.id,
        username: username,
        name: name,
        s3_avatar: avatarKey
          ? {
              bucket: "avatars",
              key: avatarKey,
            }
          : undefined,
      });

      if (res.error) {
        await context.supabaseClientAdmin.auth.admin.deleteUser(
          context.supabaseUser!.id
        );
        const message = ERROR_MAP[res.error.message] || res.error.message;
        return Promise.reject(new YogaErr(message, res.error));
      }

      const p = (
        await context.supabaseClientAdmin
          .from("profiles")
          .select("*")
          .eq("id", context.supabaseUser!.id)
      ).data?.[0];

      return {
        profile: p as Profile,
        accessToken: user.data?.session?.access_token,
        refreshToken: user.data?.session?.refresh_token,
      } as SignUpResponse;
    },
  },
} as Partial<Resolvers>;
