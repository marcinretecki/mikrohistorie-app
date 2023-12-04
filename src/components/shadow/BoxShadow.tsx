import { Canvas, Rect, Shadow } from "@shopify/react-native-skia";
import React, { PropsWithChildren, useState } from "react";
import { PixelRatio, View } from "react-native";

import { theme } from "@/styles/theme";

interface SkiaShadowProps {
  shadowBlur: number;
}

export const BoxShadow = ({
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
          top: -blur,
          left: -blur,
          right: -blur,
          bottom: -blur,
          zIndex: -1,
        }}
        onLayout={(e) => setLayout(e.nativeEvent.layout)}
      >
        {layout && (
          <Rect
            x={blur}
            y={blur}
            width={layout.width - blur * 2}
            height={layout.height - blur * 2}
            color={theme.colors.bg}
          >
            <Shadow
              dx={0}
              dy={0}
              blur={blur}
              color={theme.shadows.viewShadowTeal.color}
              shadowOnly
            />
          </Rect>
        )}
      </Canvas>
    </View>
  );
};
