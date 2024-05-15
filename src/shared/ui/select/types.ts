import type { SelectContentProps as PrimitiveSelectContentProps } from "radix-vue";

import type { BaseTextFieldProps } from "~/shared/ui/inputs/base-textfield";

import type { BaseDropdownMenuItemProps } from "../base-dropdown-menu/types";

type SelectItem = Omit<BaseDropdownMenuItemProps, "value"> & Required<Pick<BaseDropdownMenuItemProps, "value">>;

export type SelectItems = SelectItem[];

export type SelectContentProps = Omit<PrimitiveSelectContentProps, "asChild"> & {
  contentWidth?: number;
  description?: string;
  items: SelectItems;
};

export type SelectTriggerProps = BaseTextFieldProps & {
  items: SelectItems;
  modelValue?: string;
  readonly?: boolean;
  open: boolean;
  trigger?: "icon" | "text" | "text-width-icon";
};
