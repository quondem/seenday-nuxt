import type { OneOrManyEmit } from "~/shared/lib/handle-one-or-many-emit";

type BaseFieldProps = {
  onBlur: OneOrManyEmit;
  onChange: OneOrManyEmit;
  onInput: OneOrManyEmit;
};

export type InputProps = {
  type?: string;

  placeholder?: string;
  modelValue?: string | number;

  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  /** Native input allows inputting */
  editable?: boolean;

  textAlign?: "left" | "center";
} & Partial<BaseFieldProps>;

export type WrapperProps = {
  readonly?: boolean;
  label?: string;
  size?: "large" | "medium" | "small" | "fill";
  pseudoFocus?: boolean;
  modelValue?: InputProps["modelValue"];
  error?: string;
  valid?: boolean;
  theme?: "default" | "solid";
  disabled?: boolean;
  widthByContent?: boolean;
};

export type BaseTextFieldProps = InputProps &
  WrapperProps & {
    hint?: string;

    withCheckmark?: boolean;
  };
