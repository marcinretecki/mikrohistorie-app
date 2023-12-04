import { Canvas, Rect, Shadow } from "@shopify/react-native-skia";
import React, { PropsWithChildren, useState } from "react";
import { PixelRatio, View } from "react-native";

import { theme } from "@/styles/theme";

interface SkiaShadowProps {
  shadowBlur: number;
}

export const HeaderShadow = ({
  shadowBlur,
  children,
}: PropsWithChildren<SkiaShadowProps>) => {
  const [layout, setLayout] = useState(null);
  const blur = shadowBlur / PixelRatio.get();

  return (
    <View style={{ position: "relative" }}>
      {children}
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0 - blur,
          zIndex: -1,
        }}
        onLayout={(e) => setLayout(e.nativeEvent.layout)}
      >
        {layout && (
          <Rect
            x={blur}
            y={blur}
            width={layout.width}
            height={layout.height - blur}
            color={theme.colors.bg}
          >
            <Shadow
              dx={0}
              dy={0}
              blur={blur}
              color={theme.shadows.viewShadowDark.color}
              shadowOnly
            />
          </Rect>
        )}
      </Canvas>
    </View>
  );
};
