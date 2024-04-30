import { AuthError } from "@supabase/supabase-js";
import { View, StyleSheet, Pressable } from "react-native";

import { BoxShadow } from "@/components/shadow/BoxShadow";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";

interface NumberFieldsProps {
  value?: string;
  error?: AuthError;
  onPress: () => void;
}
export const NumberFields = ({ value, error, onPress }: NumberFieldsProps) => {
  const maxLength = 6;
  const valueLength = value?.length || 0;

  const fields = Array.from({ length: maxLength }, (_, index) => {
    const fieldValue = value ? value[index] : "";
    const state = valueLength === index ? "active" : "empty";

    return <NumberField key={index} value={fieldValue} state={state} />;
  });

  return (
    <View style={styles.root}>
      <Pressable onPress={onPress} style={styles.numberFieldsWrapper}>
        {fields}
      </Pressable>
      {error ? (
        <Text type="Lora14Reg" color={theme.colors.pink}>
          {"Error: " + error.message}
        </Text>
      ) : null}
    </View>
  );
};

interface NumberFieldProps {
  value?: string;
  state?: "empty" | "active";
}
const NumberField = ({ value = "", state = "empty" }: NumberFieldProps) => {
  return (
    <BoxShadow
      shadow={state === "active" ? "viewShadowTealMedium" : "viewShadowTeal"}
    >
      <View
        style={[
          styles.numberField,
          (state === "active" || value !== "") && styles.numberFieldActive,
        ].filter(Boolean)}
      >
        <Text type="BSText20Bold">{value}</Text>
      </View>
    </BoxShadow>
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
  numberFieldsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  numberField: {
    backgroundColor: theme.colors.bg2,
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "transparent",
  },
  numberFieldActive: {
    borderColor: theme.colors.teal,
  },
  text: {},
});
