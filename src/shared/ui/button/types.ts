import type { NuxtLinkProps } from "nuxt/app";

export type ButtonIconProps = {
  icon?: string;
  iconSize?: "medium" | "large";
  iconSide?: "left" | "right";
};

export type ButtonProps = {
  tagname?: "button" | "label" | "div";
  target?: NuxtLinkProps["target"];
  mode?: "normal" | "icon" | "text" | "tag";
  color?:
    | "green"
    | "purple"
    | "gray"
    | "light-purple"
    | "light-purple-reverse"
    | "red"
    | "purple-reverse"
    | "lightness-purple"
    | "blue"
    | "light-blue"
    | "orange"
    | "tinkoff"
    | "heart"
    | "select"
    | "light-purple"
    | "gray-light"
    | "gray-outline";
  size?: "l" | "m" | "xs" | "s" | "default";
  width?: "inline" | "full" | "full-lg";
  multicolor?: boolean;
  disabled?: boolean;
  textOrientation?: "center" | "left";
  pending?: boolean;
  external?: NuxtLinkProps["external"];
} & ButtonIconProps &
  NuxtLinkProps;
