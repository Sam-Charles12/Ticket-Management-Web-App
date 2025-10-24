"use client";

import type { ComponentProps } from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

type AspectRatioProps = ComponentProps<typeof AspectRatioPrimitive.Root>;

function AspectRatio({ ...props }: AspectRatioProps) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };
