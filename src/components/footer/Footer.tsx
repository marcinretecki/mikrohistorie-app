import { View, StyleSheet } from "react-native";
import { Text } from "@/styles/typography";
import { theme } from "@/styles/theme";

export const Footer = () => {
  return (
    <View style={styles.root}>
      <Text type="Lora14Reg" color={theme.colors.text80}>
        Fortellingen av Dark Space Studio AS
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.bg,
    alignItems: "center",
  },
});
