import { useEffect, useRef } from 'react';

export const useFontResize = (value: string) => {
    const divRef = useRef<HTMLDivElement>();
    const spanRef = useRef<HTMLSpanElement>();

    const getFontSize = () => {
        return window.getComputedStyle(divRef.current, '').getPropertyValue('font-size');
    };

    const resetFontSize = () => {
        divRef.current.style.fontSize = '14vmin';
    };

    useEffect(() => {
        resetFontSize();
        const reduceFontSize = () => {
            if (divRef.current.clientWidth > spanRef.current.offsetWidth + 40) {
                return;
            }

            divRef.current.style.fontSize = parseFloat(getFontSize()) - 10 + 'px';
            reduceFontSize();
        };
        reduceFontSize();
    }, [value]);

    return {
        divRef,
        spanRef,
    };
};
