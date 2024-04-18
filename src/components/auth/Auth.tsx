import { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";

import { ButtonPrimary } from "../buttons/ButtonPrimary";

import { BoxShadow } from "@/components/shadow/BoxShadow";
import { supabase } from "@/lib/supabase";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";
import { NumberFields } from "./NumberField";

export const Auth = () => {
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const verifyOTP = async () => {
    console.log("verifyOTP", email, token);
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    console.log("data", data);
    console.log("error", error);
  };

  const sendOTP = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) throw error;
    // Email sent.
    console.log("Email sent");

    setUserData(data);
  };

  return (
    <View style={styles.root}>
      <Text>Email</Text>
      <BoxShadow shadow="viewShadowTealMedium">
        <View style={[styles.phraseWrapper]}>
          <TextInput
            style={styles.phraseInput}
            onChangeText={setEmail}
            autoFocus
            cursorColor={theme.colors.teal}
            keyboardType="email-address"
            onSubmitEditing={sendOTP}
            keyboardAppearance="dark"
          />
        </View>
      </BoxShadow>
      <ButtonPrimary onPress={sendOTP}>Next</ButtonPrimary>
      <Text>Token</Text>

      <TextInput
        style={styles.phraseInput}
        onChangeText={setToken}
        autoFocus
        keyboardType="number-pad"
        onSubmitEditing={verifyOTP}
        keyboardAppearance="dark"
      />

      <NumberFields value={token} />
      <Text>{userData ? "userData" : "Not logged in"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 16,
    paddingHorizontal: 32,
  },
  phraseWrapper: {
    flexDirection: "row",
    alignSelf: "stretch",
    backgroundColor: theme.colors.bg2,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    borderColor: theme.colors.teal,
  },
  phraseInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    justifyContent: "center",
    color: theme.colors.text,
    fontFamily: "Lora_400Regular",
    fontSize: 14,
    lineHeight: 20,
  },
});
