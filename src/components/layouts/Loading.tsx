import { theme } from "@/styles/theme";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const LoadingLayout = () => {
  return (
    <View style={styles.root}>
      <ActivityIndicator size="large" color={theme.colors.teal} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
