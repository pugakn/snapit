import { Profile, Resolvers } from "../../../shared/generated/gql/types.ts";
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
      const image = await Image.decode(avatar);
      const encoded = await image.resize(400, 400).encodeJPEG(80);

      const avatarKey = generateFileId(username, "jpg");
      await context.supabaseClient.storage
        .from("avatars")
        .upload(avatarKey, encoded);

      const user = await context.supabaseClient.auth.signUp({
        email: email,
        password: password,
      });
      context.supabaseUser = user.data.user;

      await context.supabaseClient.from("profiles").insert([
        {
          id: context.supabaseUser!.id,
          username: username,
          name: name,
          s3_avatar: {
            bucket: "avatars",
            key: avatarKey,
          },
        },
      ]);

      const p = (
        await context.supabaseClient
          .from("profiles")
          .select("*")
          .eq("id", context.supabaseUser!.id)
      ).data?.[0];
      return p.data as Profile;
    },
  },
} as Partial<Resolvers>;
