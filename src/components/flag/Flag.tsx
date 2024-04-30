import enFlag from "@assets/flags/gb.png";
import noFlag from "@assets/flags/no.png";
import plFlag from "@assets/flags/pl.png";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";

interface FlagProps {
  symbol: string;
}
type Flags = {
  [key: string]: ImageSourcePropType;
};
export const Flag = ({ symbol }: FlagProps) => {
  const flags: Flags = {
    no: noFlag,
    pl: plFlag,
    en: enFlag,
  };

  return <Image style={styles.flag} source={flags[symbol]} />;
};

const styles = StyleSheet.create({
  flag: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
  },
});
