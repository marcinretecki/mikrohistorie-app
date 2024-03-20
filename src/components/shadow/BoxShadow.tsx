import { Blur, Canvas, Rect } from "@shopify/react-native-skia";
import React, { PropsWithChildren, useState } from "react";
import { PixelRatio, View } from "react-native";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { theme } from "@/styles/theme";

interface SkiaShadowProps {
  shadow?: "viewShadowTealMedium" | "viewShadowTeal";
}

export const BoxShadow = ({
  shadow = "viewShadowTeal",
  children,
}: PropsWithChildren<SkiaShadowProps>) => {
  const [layout, setLayout] = useState(null);
  const blur = theme.shadows[shadow].blur;

  const blur2 = blur * 2;

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
            width={layout.width - blur2}
            height={layout.height - blur2}
            color={theme.shadows[shadow].color}
          >
            <Blur blur={theme.shadows[shadow].blur / PixelRatio.get()} />
          </Rect>
        )}
      </Canvas>
    </View>
  );
};
