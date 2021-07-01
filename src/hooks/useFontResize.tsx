import { useEffect, useRef } from "react";

export const useFontResize = (value: string) => {
  const divRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  const getFontSize = () => {
    return window
      .getComputedStyle(divRef.current as HTMLDivElement, "")
      .getPropertyValue("font-size");
  };

  const resetFontSize = () => {
    (divRef.current as HTMLDivElement).style.fontSize = "14vmin";
  };

  useEffect(() => {
    resetFontSize();
    const reduceFontSize = () => {
      if (
        (divRef.current as HTMLDivElement).clientWidth >
        (spanRef.current as HTMLSpanElement).offsetWidth + 40
      ) {
        return;
      }

      (divRef.current as HTMLDivElement).style.fontSize =
        parseFloat(getFontSize()) - 10 + "px";
      reduceFontSize();
    };
    reduceFontSize();
  }, [value]);

  return {
    divRef,
    spanRef,
  };
};
