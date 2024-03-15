import { getLocales } from "expo-localization";

export const useLocale = () => {
  const deviceLanguage = getLocales()[0].languageCode;
  return deviceLanguage;
};
