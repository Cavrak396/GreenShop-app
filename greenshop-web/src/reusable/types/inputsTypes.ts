export interface RangeType {
  className: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export interface TextInputType {
  type: string;
  inputClass?: string;
  placeholder?: string;
  buttonText: string;
  buttonClass: string;
}

export interface FormInputTypes {
  type: string;
  placeholder?: string;
  className: string;
  ref?: React.Ref<HTMLInputElement>;
}
