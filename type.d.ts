import { ReactNode } from "react";

declare global {
  interface TabIconProps {
    focused: boolean;
    color: string;
    size: number;
  }
  interface AppTab {
    name: string;
    title: string;
    icon: ({ focused, color, size }: TabIconProps) => ReactNode;
  }
}

export {};
