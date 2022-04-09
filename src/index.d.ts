import { AriaAttributes } from "react";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    negative?: string;
    isSelected?: boolean;
    horizontal?: string;
    vertical?: string;
    width?: string;
    height?: string;
    justify_content?: string;
    align_items?: string;
    flex?: number;
    selected?: boolean;
    forPopup?: boolean;
    isOpened?: boolean;
  }
}
