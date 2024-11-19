export interface AuthType {
  id: number;
  type: string;
}

export interface AuthInput {
  id: number;
  type: string;
  placeholder: string;
  icon?: string;
}

export interface SocialButton {
  id: number;
  alt: string;
  src: string;
}

export interface AuthSocialButtonsProps {
  activatedId: number;
}

export interface AuthFormProps {
  activatedId: number;
  setActivatedId?: (id: number) => void;
  inputRefs: React.MutableRefObject<Record<string, HTMLInputElement | null>>;
  showPassword?: Record<number, boolean>;
  setShowPassword?: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  togglePasswordVisibility: (id: number) => void;
}

export interface AuthFormInputProps {
  input: AuthInput;
  refHandler: (el: HTMLInputElement | null) => void;
  showPassword?: boolean;
  togglePasswordVisibility?: (id: number) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AuthCurrentDataTypes {
  activatedId: number;
  setActivatedId?: (id: number) => void;
  inputRefs: React.MutableRefObject<Record<string, HTMLInputElement | null>>;
  showPassword?: Record<number, boolean>;
  setShowPassword?: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  togglePasswordVisibility: (id: number) => void;
}
