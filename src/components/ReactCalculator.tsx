import styled from "styled-components";
import { Button } from "./Button";
import { Display } from './Display';

type ComponentProps = {
    onNumberClick: () => string;
    onCalculate: () => string;
    onClear: () => string;
    isClearable: boolean;
}

export const ReactCalculator: React.FC = () => {
    return (
        <CalculatorComponent 
          onCalculate={() => null}
          onClear={() => null}
          onNumberClick={() => null}
          isClearable={true}/>
    )
}

const CalculatorComponent: React.FC<ComponentProps> = (props) => (
    <StyledDiv>
        <Display />
        <Button value={props.isClearable ? "C" : "AC"} onClick={() => null} backgroundColor="#434343" />
        <Button value="+/-" onClick={() => null} backgroundColor="#434343" />
        <Button value="%" onClick={() => null} backgroundColor="#434343" />
        <Button value={"\u00F7"} onClick={() => null} backgroundColor="#f2a23c" />
        <br />
        <Button value="7" onClick={() => null} backgroundColor="#5d5e5e" />
        <Button value="8" onClick={() => null} backgroundColor="#5d5e5e" />
        <Button value="9" onClick={() => null} backgroundColor="#5d5e5e" />
        <Button value="x" onClick={() => null} backgroundColor="#f2a23c" />
        <br />
        <Button value="4" onClick={() => null} backgroundColor="#5d5e5e" />
        <Button value="5" onClick={() => null} backgroundColor="#5d5e5e" />
        <Button value="6" onClick={() => null} backgroundColor="#5d5e5e" />
        <Button value="-" onClick={() => null} backgroundColor="#f2a23c" />
        <br />
        <Button value="1" onClick={() => null} backgroundColor="#5d5e5e" />
        <Button value="2" onClick={() => null} backgroundColor="#5d5e5e" />
        <Button value="3" onClick={() => null} backgroundColor="#5d5e5e" />
        <Button value="+" onClick={() => null} backgroundColor="#f2a23c" />
        <br />
        <Button value="0" onClick={() => null} backgroundColor="#5d5e5e" isLarge={true} />
        <Button value="." onClick={() => null} backgroundColor="#5d5e5e" />
        <Button value="=" onClick={() => null} backgroundColor="#f2a23c" />
    </StyledDiv>
);

const StyledDiv = styled.div`
    height: 100vh;
    display: block;
`;