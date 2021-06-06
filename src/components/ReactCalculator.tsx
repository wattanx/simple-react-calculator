import { useCalculate } from "@src/hooks/useCalculate";
import { useState } from "react";
import styled from "styled-components";
import { Button, ButtonBackgroundColor } from "./Button";
import { Calculator, Operator } from "./Calculator/Calculator";
import { Display } from './Display';

type ComponentProps = {
    onNumberClick: (input: string) => void;
    onCalculate: (operator: Operator) => void;
    onClear: () => void;
    isClearable: boolean;
    value: string;
}

export const ReactCalculator: React.FC = () => {
    const { value, isClearable, onCalculate, onClear, onNumberClick } = useCalculate();

    return (
        <CalculatorComponent 
          onCalculate={(operator: Operator) => onCalculate(operator)}
          onClear={() => onClear()}
          onNumberClick={(input: string) => onNumberClick(input)}
          isClearable={isClearable}
          value={value}/>
    )
}

const CalculatorComponent: React.FC<ComponentProps> = (props) => (
    <StyledDiv>
        <Display value={props.value}/>
        <Button value={props.isClearable ? "C" : "AC"} onClick={() => props.onClear()} backgroundColor={ButtonBackgroundColor.Black} />
        <Button value="+/-" onClick={() => props.onCalculate(Operator.sign)} backgroundColor={ButtonBackgroundColor.Black} />
        <Button value="%" onClick={() => props.onCalculate(Operator.percentage)} backgroundColor={ButtonBackgroundColor.Black} />
        <Button value={"\u00F7"} onClick={() => props.onCalculate(Operator.division)} backgroundColor={ButtonBackgroundColor.Orange} />
        <br />
        <Button value="7" onClick={() => props.onNumberClick('7')} backgroundColor={ButtonBackgroundColor.Gray} />
        <Button value="8" onClick={() => props.onNumberClick('8')} backgroundColor={ButtonBackgroundColor.Gray} />
        <Button value="9" onClick={() => props.onNumberClick('9')} backgroundColor={ButtonBackgroundColor.Gray} />
        <Button value="x" onClick={() => props.onCalculate(Operator.multiplication)} backgroundColor={ButtonBackgroundColor.Orange} />
        <br />
        <Button value="4" onClick={() => props.onNumberClick('4')} backgroundColor={ButtonBackgroundColor.Gray} />
        <Button value="5" onClick={() => props.onNumberClick('5')} backgroundColor={ButtonBackgroundColor.Gray} />
        <Button value="6" onClick={() => props.onNumberClick('6')} backgroundColor={ButtonBackgroundColor.Gray} />
        <Button value="-" onClick={() => props.onCalculate(Operator.subtraction)} backgroundColor={ButtonBackgroundColor.Orange} />
        <br />
        <Button value="1" onClick={() => props.onNumberClick('1')} backgroundColor={ButtonBackgroundColor.Gray} />
        <Button value="2" onClick={() => props.onNumberClick('2')} backgroundColor={ButtonBackgroundColor.Gray} />
        <Button value="3" onClick={() => props.onNumberClick('3')} backgroundColor={ButtonBackgroundColor.Gray} />
        <Button value="+" onClick={() => props.onCalculate(Operator.addition)} backgroundColor={ButtonBackgroundColor.Orange} />
        <br />
        <Button value="0" onClick={() => props.onNumberClick('0')} backgroundColor={ButtonBackgroundColor.Gray} isLarge={true} />
        <Button value="." onClick={() => props.onNumberClick('.')} backgroundColor={ButtonBackgroundColor.Gray} />
        <Button value="=" onClick={() => props.onCalculate(Operator.equal)} backgroundColor={ButtonBackgroundColor.Orange} />
    </StyledDiv>
);

const StyledDiv = styled.div`
    height: 100vh;
    display: block;
`;