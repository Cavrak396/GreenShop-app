import type { MutableRefObject } from "react";

export interface AuthTypeTypes {
  id: number;
  type: string;
}

export interface AuthCurrentDataTypes {
  activatedId: number;
  setActivatedId?: (id: number) => void;
  inputRefs: MutableRefObject<Record<number, HTMLInputElement | null>>;
  showPassword?: { [key: number]: boolean };
  setShowPassword?: React.Dispatch<
    React.SetStateAction<{ [key: number]: boolean }>
  >;
  togglePasswordVisibility: (id: number) => void;
}

export interface AuthInputsType {
  id: number;
  type: string;
  placeholder: string;
  icon?: string;
}

export interface SocialAccountWayTypes {
  id: number;
  alt: string;
  src: string;
}

export interface AuthSocialButtonsTypes {
  activatedId: number;
}
