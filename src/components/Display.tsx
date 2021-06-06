import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type DisplayProps = {
    value: string;
}

export const Display: React.FC<DisplayProps> = (props) => {
    const divRef = useRef<HTMLDivElement>();
    const spanRef = useRef<HTMLSpanElement>();

    const getFontSize = () => {
        return window.getComputedStyle(divRef.current, '').getPropertyValue('font-size');
    }

    const reduceFontSize = () => {
        if (divRef.current.clientWidth > spanRef.current.clientWidth + 40) { return; }

        divRef.current.style.fontSize = parseFloat(getFontSize()) - 10 + 'px';
        reduceFontSize();
    }

    const resetFontSize = () => {
        divRef.current.style.fontSize = '14vmin';
    }

    useEffect(() => {
        resetFontSize();
        reduceFontSize();
    }, [props.value]);

    return (
        <StyledDiv ref={divRef}>
            <StyledSpan ref={spanRef}>{props.value}</StyledSpan>
        </StyledDiv>
    );
}


const StyledDiv = styled.div`
    width: 100%;
    height: 20%;
    background-color: #323232;
    font-size: 14vmin;
    color: white;
    display: flex;
    align-items: flex-end;
    flex-direction: column-reverse;
`;

const StyledSpan = styled.span`
    margin: 16px;
`;