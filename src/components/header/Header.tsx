import { View, StyleSheet } from "react-native";

import { BackButton } from "@/components/header/BackButton";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";
import { HeaderShadow } from "@/components/shadow/HeaderShadow";

export function Header({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <View style={styles.backWrapper}>
        <BackButton />
      </View>
      <Text type="BSInlineDisplay76Bold">{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 92,
    paddingBottom: 40,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.bg,
  },
  backWrapper: {
    position: "absolute",
    top: 48,
    left: 16,
  },
});
