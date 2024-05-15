import type { ComboboxItem, ComboboxItems } from "./types";

const getItemByValue = (items: ComboboxItems, value: string) => {
  return items.find(item => {
    return value === item.title || value === item.value;
  });
};

export const toInnerModelValue = (items: ComboboxItems, value: string | string[]) => {
  if (Array.isArray(value)) {
    return value.reduce((acc, val) => {
      const item = getItemByValue(items, val);

      if (!item) return acc;

      if (item.title) {
        acc.push(item.title);
      } else {
        acc.push(item.value);
      }

      return acc;
    }, [] as string[]);
  }

  const item = getItemByValue(items, value) as ComboboxItem;

  return item?.title || item?.value;
};

export const toModelValue = (items: ComboboxItems, value: string | string[]) => {
  if (!value) return "";

  if (Array.isArray(value)) {
    return value.reduce((acc, val) => {
      const item = getItemByValue(items, val);

      if (!item) return acc;

      acc.push(item.value);

      return acc;
    }, [] as string[]);
  }

  const item = getItemByValue(items, value) as ComboboxItem;

  return item?.value;
};
