import { View, StyleSheet } from "react-native";

import { BackButton } from "@/components/header/BackButton";
import { HeaderShadow } from "@/components/shadow/HeaderShadow";
import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";

interface HeaderProps {
  title: string;
  hasBackButton?: boolean;
}
export function Header({ title, hasBackButton = true }: HeaderProps) {
  return (
    <View style={styles.container}>
      {hasBackButton && (
        <View style={styles.backWrapper}>
          <BackButton />
        </View>
      )}
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
