export const statusColorMap = {
  primary: "primary",
  info: "blue",
  lightPurple: "light-purple",
  lightBlue: "light-blue",
  success: "success",
  danger: "danger",
  warning: "warning",
  idle: "idle",
  static: ""
} as const;

export type StatusColorValues = (typeof statusColorMap)[keyof typeof statusColorMap];
