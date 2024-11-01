import { ReactNode } from "react";

export interface OverlayModalTypes {
  children: ReactNode;
  setIsAppear: (value: boolean) => void;
}
