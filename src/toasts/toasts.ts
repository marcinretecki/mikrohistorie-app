import { toast, ToastPosition } from "@backpackapp-io/react-native-toast";

import { toastStyles } from "@/styles/styles";

export const normalToast = (message: string) =>
  toast(message, {
    position: ToastPosition.TOP,
    styles: {
      view: toastStyles.view,
      pressable: toastStyles.pressable,
      text: toastStyles.text,
    },
  });

export const errorToast = (message: string) =>
  toast.error(message, {
    position: ToastPosition.TOP,
    styles: {
      view: toastStyles.view,
      pressable: toastStyles.pressable,
      text: toastStyles.text,
      indicator: toastStyles.indicatorError,
    },
  });

export const successToast = (message: string) =>
  toast.success(message, {
    position: ToastPosition.TOP,
    styles: {
      view: toastStyles.view,
      pressable: toastStyles.pressable,
      text: toastStyles.text,
      indicator: toastStyles.indicatorSuccess,
    },
  });

export const loadingToast = (message: string, id?: string) =>
  toast.error(message, {
    position: ToastPosition.TOP,
    styles: {
      view: toastStyles.view,
      pressable: toastStyles.pressable,
      text: toastStyles.text,
      indicator: toastStyles.indicatorError,
    },
    id,
    duration: Infinity,
  });
