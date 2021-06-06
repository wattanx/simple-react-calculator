import { useFontResize } from "@src/hooks/useFontResize";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type DisplayProps = {
    value: string;
}

export const Display: React.FC<DisplayProps> = (props) => {
    const { divRef, spanRef } = useFontResize(props.value);

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