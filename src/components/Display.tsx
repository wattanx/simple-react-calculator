import styled from "styled-components";

export const Display: React.FC = (props) => {
    return (
        <StyledDiv>
            <StyledSpan></StyledSpan>
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