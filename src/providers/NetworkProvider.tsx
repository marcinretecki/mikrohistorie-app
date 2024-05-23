import { toast } from "@backpackapp-io/react-native-toast";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import NetInfo, { NetInfoStateType } from "@react-native-community/netinfo";
import React, { createContext, useState, useEffect, ReactNode } from "react";

import { loadingToast } from "@/toasts/toasts";

type NetworkState = {
  isInternetReachable: boolean | null;
  type: NetInfoStateType | null;
};

type NetworkContextType = {
  networkState: NetworkState | null;
};

export const NetworkContext = createContext<NetworkContextType | undefined>(
  undefined,
);

export const NetworkProvider = ({ children }: { children: ReactNode }) => {
  const [networkState, setNetworkState] = useState<NetworkState | null>(null);
  const toastId = "no-internet";
  const { _ } = useLingui();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkState({
        isInternetReachable: state?.isInternetReachable,
        type: state.type,
      });
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // show a toast if the network is not reachable

    if (networkState !== null) {
      if (!networkState.isInternetReachable) {
        console.log("Network state", networkState);
        loadingToast(_(msg`No internet connection`), toastId);
      } else if (networkState.isInternetReachable) {
        toast.dismiss(toastId);
      }
    }
  }, [networkState]);

  return (
    <NetworkContext.Provider value={{ networkState }}>
      {children}
    </NetworkContext.Provider>
  );
};
