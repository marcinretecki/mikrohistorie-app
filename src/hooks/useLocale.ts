import { getLocales } from "expo-localization";

export const useLocale = () => {
  const deviceLanguage = getLocales()[0].languageCode;
  const supportedLanguages = ["pl", "en"];
  const isSupportedLanguge = deviceLanguage
    ? supportedLanguages.includes(deviceLanguage)
    : false;
  const defaultLanguage =
    isSupportedLanguge && deviceLanguage ? deviceLanguage : "en";

  return { deviceLanguage, supportedLanguages, defaultLanguage };
};
