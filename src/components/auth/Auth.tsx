import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";

import { supabase } from "@/lib/supabase";
import { ButtonPrimary } from "../buttons/ButtonPrimary";
import { Text } from "@/styles/typography";

export const Auth = () => {
  const redirectTo = makeRedirectUri();

  console.log(redirectTo);
  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);

    if (errorCode) throw new Error(errorCode);
    const { access_token, refresh_token } = params;

    if (!access_token) return;

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) throw error;
    return data.session;
  };

  const sendMagicLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email: "grenaten@gmail.com",
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) throw error;
    // Email sent.
    console.log("Email sent");
  };

  // Handle linking into app from email app.
  const url = Linking.useURL();
  const session = url ? createSessionFromUrl(url) : null;

  return (
    <>
      <ButtonPrimary onPress={sendMagicLink}>Send Magic Link</ButtonPrimary>
      <Text>{session ? "Logged in" : "Not logged in"}</Text>
    </>
  );
};
