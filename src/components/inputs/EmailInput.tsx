import { AuthError } from "@supabase/supabase-js";
import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

import { BoxShadow } from "@/components/shadow/BoxShadow";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";

interface InputProps {
  autoFocus?: boolean;
  placeholder?: string;
  error?: AuthError;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
}
export const EmailInput = ({
  autoFocus = true,
  placeholder = "youremail@gmail.com",
  error,
  onChangeText,
  onSubmitEditing,
}: InputProps) => {
  return (
    <View style={styles.root}>
      <BoxShadow shadow="viewShadowTealMedium">
        <View style={styles.emailInputWrapper}>
          <TextInput
            style={styles.emailInput}
            onChangeText={onChangeText}
            autoFocus={autoFocus}
            cursorColor={theme.colors.teal}
            keyboardType="email-address"
            onSubmitEditing={onSubmitEditing}
            keyboardAppearance="dark"
            placeholder={placeholder}
            autoCapitalize="none"
            enterKeyHint="next"
            returnKeyType="next"
            textContentType="emailAddress"
          />
        </View>
      </BoxShadow>
      {error ? (
        <Text type="Lora14Reg" color={theme.colors.pink}>
          {"Error: " + error.message}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    gap: 8,
  },
  emailInputWrapper: {
    flexDirection: "row",
    backgroundColor: theme.colors.bg2,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    borderColor: theme.colors.teal,
  },
  emailInput: {
    height: 48,
    width: "100%",
    paddingHorizontal: 16,
    justifyContent: "center",
    color: theme.colors.text,
    fontFamily: "Lora_400Regular",
    fontSize: 16,
    lineHeight: 20,
    verticalAlign: "middle",
  },
});
