import { View, StyleSheet } from "react-native";

import { BoxShadow } from "@/components/shadow/BoxShadow";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";

interface NumberFieldsProps {
  value?: string;
}
export const NumberFields = ({ value }: NumberFieldsProps) => {
  const maxLength = 6;
  const valueLength = value.length;

  const fields = Array.from({ length: maxLength }, (_, index) => {
    const fieldValue = value[index] || "";
    const state = valueLength === index ? "active" : "empty";

    return <NumberField key={index} value={fieldValue} state={state} />;
  });

  return <View style={styles.numberFieldsWrapper}>{fields}</View>;
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
        ]}
      >
        <Text type="BSText20Bold">{value}</Text>
      </View>
    </BoxShadow>
  );
};

const styles = StyleSheet.create({
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
    borderWidth: 1,
    borderColor: "transparent",
  },
  numberFieldActive: {
    borderColor: theme.colors.teal,
  },
  text: {},
});
