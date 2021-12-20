import { useCalculate } from "../hooks/useCalculate";
import styled from "@emotion/styled";
import { Button, ButtonBackgroundColor } from "./Button";
import { Command } from "../logic/Calculator";
import { Display } from "./Display";
import React, { useCallback } from "react";

type ComponentProps = {
  onClickNumber: (input: string) => void;
  onEqual: () => void;
  onCommand: (input: string) => void;
  onClear: () => void;
  onAllClear: () => void;
  isClearable: boolean;
  value: string;
  selectedCommand: string;
};

export const ReactCalculator: React.VFC = () => {
  const props = useCalculate();

  return <CalculatorComponent {...props} />;
};

const CalculatorComponent: React.VFC<ComponentProps> = (props) => {
  const onClear = useCallback(() => {
    props.isClearable ? props.onClear() : props.onAllClear();
  }, [props.isClearable, props.onClear, props.onAllClear]);

  const onClickNumber = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      props.onClickNumber(e.currentTarget.value);
    },
    [props.onClickNumber]
  );

  const onCommand = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      props.onCommand(e.currentTarget.value);
    },
    [props.onCommand]
  );

  return (
    <StyledDiv>
      <Display value={props.value} />
      <Button
        value={props.isClearable ? "C" : "AC"}
        onClick={onClear}
        backgroundColor={ButtonBackgroundColor.Black}
      />
      <Button
        value="+/-"
        onClick={onCommand}
        backgroundColor={ButtonBackgroundColor.Black}
      />
      <Button
        value="%"
        onClick={onCommand}
        backgroundColor={ButtonBackgroundColor.Black}
      />
      <Button
        value={"\u00F7"}
        onClick={onCommand}
        backgroundColor={ButtonBackgroundColor.Orange}
        isSelected={props.selectedCommand === Command.Division}
      />
      <br />
      <Button
        value="7"
        onClick={onClickNumber}
        backgroundColor={ButtonBackgroundColor.Gray}
      />
      <Button
        value="8"
        onClick={onClickNumber}
        backgroundColor={ButtonBackgroundColor.Gray}
      />
      <Button
        value="9"
        onClick={onClickNumber}
        backgroundColor={ButtonBackgroundColor.Gray}
      />
      <Button
        value="x"
        onClick={onCommand}
        backgroundColor={ButtonBackgroundColor.Orange}
        isSelected={props.selectedCommand === Command.Multiplication}
      />
      <br />
      <Button
        value="4"
        onClick={onClickNumber}
        backgroundColor={ButtonBackgroundColor.Gray}
      />
      <Button
        value="5"
        onClick={onClickNumber}
        backgroundColor={ButtonBackgroundColor.Gray}
      />
      <Button
        value="6"
        onClick={onClickNumber}
        backgroundColor={ButtonBackgroundColor.Gray}
      />
      <Button
        value="-"
        onClick={onCommand}
        backgroundColor={ButtonBackgroundColor.Orange}
        isSelected={props.selectedCommand === Command.Subtraction}
      />
      <br />
      <Button
        value="1"
        onClick={onClickNumber}
        backgroundColor={ButtonBackgroundColor.Gray}
      />
      <Button
        value="2"
        onClick={onClickNumber}
        backgroundColor={ButtonBackgroundColor.Gray}
      />
      <Button
        value="3"
        onClick={onClickNumber}
        backgroundColor={ButtonBackgroundColor.Gray}
      />
      <Button
        value="+"
        onClick={onCommand}
        backgroundColor={ButtonBackgroundColor.Orange}
        isSelected={props.selectedCommand === Command.Addition}
      />
      <br />
      <Button
        value="0"
        onClick={onClickNumber}
        backgroundColor={ButtonBackgroundColor.Gray}
        isLarge={true}
      />
      <Button
        value="."
        onClick={onCommand}
        backgroundColor={ButtonBackgroundColor.Gray}
      />
      <Button
        value="="
        onClick={props.onEqual}
        backgroundColor={ButtonBackgroundColor.Orange}
      />
    </StyledDiv>
  );
};
const StyledDiv = styled.div`
  height: 100vh;
  display: block;
`;
