import {
  Profile,
  Resolvers,
  SignUpResponse,
} from "../../../shared/generated/gql/types.ts";
import { YogaErr, Info } from "../../utils/server.ts";
import { generateFileId } from "../../utils/storage.ts";
import { Context } from "../types.ts";
import { Image } from "https://deno.land/x/imagescript@1.2.15/mod.ts";

export const resolvers = {
  Query: {},
  Mutation: {
    signup: async (
      _: unknown,
      { email, password, name, username, avatar },
      context: Context
    ) => {
      new Info("Resolver:signup", { email, name, username });

      let avatarKey: string | undefined = undefined;
      if (avatar) {
        const image = await Image.decode(avatar);
        const encoded = await image.resize(400, 400).encodeJPEG(80);

        avatarKey = generateFileId(username, "jpg");
        await context.supabaseClientAdmin.storage
          .from("avatars")
          .upload(avatarKey, encoded);
      }

      const user = await context.supabaseClientAdmin.auth.signUp({
        email: email,
        password: password,
      });
      context.supabaseUser = user.data.user;

      if (user.error) {
        throw new YogaErr(user.error.message, user.error);
      }

      await context.supabaseClientAdmin.from("profiles").insert({
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

      const p = (
        await context.supabaseClientAdmin
          .from("profiles")
          .select("*")
          .eq("id", context.supabaseUser!.id)
      ).data?.[0];

      return {
        profile: p.data as Profile,
        accessToken: user.data?.session?.access_token,
        refreshToken: user.data?.session?.refresh_token,
      } as SignUpResponse;
    },
  },
} as Partial<Resolvers>;
