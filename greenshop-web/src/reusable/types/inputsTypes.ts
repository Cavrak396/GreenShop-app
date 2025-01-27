export interface RangeType {
  className: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export interface TextInputType {
  type: string;
  inputClass: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText: string;
  buttonClass: string;
  onButtonClick: (event: React.FormEvent) => void;
}

export interface FormInputTypes {
  type: string;
  placeholder?: string;
  className: string;
  min?: string;
  value?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
}
