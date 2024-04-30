import { ActivityIndicator, View, StyleSheet } from "react-native";

import { Header } from "@/components/header/Header";
import { theme } from "@/styles/theme";

export const Loading = () => {
  return (
    <View style={styles.root}>
      <Header title="Mikrohistorie" />
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.teal} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
