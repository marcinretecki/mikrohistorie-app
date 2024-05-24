import arrowBackIMG from "@assets/arrow_back.png";
import { Trans } from "@lingui/macro";
import { AuthError } from "@supabase/supabase-js";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TextInput, Pressable, Image } from "react-native";

import { NumberFields } from "./NumberField";
import { ButtonPrimary } from "../buttons/ButtonPrimary";
import { Header } from "../header/Header";
import { EmailInput } from "../inputs/EmailInput";

import { useNetwork } from "@/hooks/useNetwork";
import { typedClient } from "@/lib/supabase";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";

export const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [step, setStep] = useState(1);
  const tokenInputRef = useRef<TextInput | null>(null);
  const [error, setError] = useState<AuthError>();
  const { networkState } = useNetwork();

  useEffect(() => {
    if (token.length === 6) {
      verifyOTP();
    }
  }, [token]);

  const verifyOTP = async () => {
    console.log("verifyOTP", email, token);
    const { data, error } = await typedClient.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    console.log("data", data);
    console.log("error", error);

    if (error) {
      setError(error);
      throw error;
    }
  };

  const sendOTP = async () => {
    setLoading(true);
    const { data, error } = await typedClient.auth.signInWithOtp({
      email,
    });
    setLoading(false);

    console.log("data", data);
    console.log("error", error);

    if (error) {
      setError(error);
      throw error;
    }
    // Email sent.
    console.log("Email sent");

    setStep(2);
  };

  const stepBack = () => {
    setStep(1);
    setToken("");
    setError(undefined);
  };

  const handleFocus = () => {
    tokenInputRef.current?.focus();
  };

  if (step === 1) {
    return (
      <View style={styles.root}>
        <Header title="Mikrohistorie" />
        <View style={styles.contentWrapper}>
          <View style={styles.titleWrapper}>
            <Text type="BSText24Bold">Enter your address email</Text>
            <Text type="Lora12Reg">
              We will send a verification code to this address.
            </Text>
          </View>

          <EmailInput
            onChangeText={setEmail}
            onSubmitEditing={sendOTP}
            error={error}
          />

          <View style={styles.buttonWrapper}>
            <ButtonPrimary
              onPress={sendOTP}
              loading={loading}
              disabled={networkState?.isInternetReachable === false}
            >
              <Trans>Next</Trans>
            </ButtonPrimary>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Header title="Mikrohistorie" />
      <View style={styles.contentWrapper}>
        <View style={styles.titleWrapper}>
          <Text type="BSText24Bold">
            <Trans>Check your inbox</Trans>
          </Text>
          <Text type="Lora12Reg">
            <Trans>We sent you a verification code.</Trans>
          </Text>
        </View>

        <TextInput
          style={styles.hiddenInput}
          onChangeText={setToken}
          autoFocus
          keyboardType="number-pad"
          onSubmitEditing={verifyOTP}
          keyboardAppearance="dark"
          ref={tokenInputRef}
        />

        <NumberFields value={token} onPress={handleFocus} error={error} />

        <View style={styles.buttonWrapper}>
          <Pressable onPress={stepBack} style={styles.backButton}>
            <Image source={arrowBackIMG} />
            <Text type="Lora12Reg" color={theme.colors.text80}>
              <Trans>Change email address</Trans>
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 24,
    paddingBottom: 16,
    maxWidth: 360,
    alignItems: "stretch",
  },
  titleWrapper: {
    alignItems: "center",
    gap: 8,
  },
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
    left: -1000,
    top: -1000,
  },
  buttonWrapper: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
