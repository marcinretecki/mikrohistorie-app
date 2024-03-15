import { theme } from "@/styles/theme";
import { Text } from "@/styles/typography";
import { StoryVersion } from "@/types";
import { View, StyleSheet } from "react-native";

interface ReaderProps {
  version: StoryVersion;
}

export const Reader = ({ version }: ReaderProps) => {
  return (
    <View style={styles.root}>
      <Text type="Lora12Reg" color={theme.colors.text80}>
        {version.version}, {version.reader}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: theme.colors.bg,
  },
});
