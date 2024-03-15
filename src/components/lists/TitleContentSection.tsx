import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { Text } from "@/styles/typography";

interface TitleContentSectionProps {
  title: string;
  children: ReactNode;
}

export const TitleContentSection = ({
  title,
  children,
}: TitleContentSectionProps) => {
  return (
    <View style={styles.root}>
      <View style={styles.titleWrapper}>
        <Text type="BSText20Bold">{title}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  root: { gap: 0, paddingLeft: 0 },
  titleWrapper: {
    paddingLeft: 16,
  },
});
