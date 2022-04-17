import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { useCalculate } from "../hooks/useCalculate";
import { Button, ButtonBackgroundColor } from "./Button";
import { Command } from "../logic/Calculator";
import { Display } from "./Display";
import { GlobalHotKeys } from "react-hotkeys";

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

const keyMap = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  0: "0",
  EQUAL: "=",
  MULTIPLY: "shift+8",
  ADD: "shift+=",
  SUBTRACT: "-",
  DIVIDE: "/",
  AC: "c",
  DOT: ".",
  PERCENT: "shift+5",
  ENTER: "enter",
};

const getHandlers = (
  onCommand: (input: string) => void,
  onClickNumber: (input: string) => void,
  onClear: () => void
) => {
  return {
    1: () => {
      onClickNumber("1");
    },
    2: () => {
      onClickNumber("2");
    },
    3: () => {
      onClickNumber("3");
    },
    4: () => {
      onClickNumber("4");
    },
    5: () => {
      onClickNumber("5");
    },
    6: () => {
      onClickNumber("6");
    },
    7: () => {
      onClickNumber("7");
    },
    8: () => {
      onClickNumber("8");
    },
    9: () => {
      onClickNumber("9");
    },
    0: () => {
      onClickNumber("0");
    },
    EQUAL: () => {
      onCommand("=");
    },
    MULTIPLY: () => {
      onCommand("x");
    },
    SUBTRACT: () => {
      onCommand("-");
    },
    ADD: () => {
      onCommand("+");
    },
    DIVIDE: () => {
      onCommand("\u00F7");
    },
    AC: () => {
      onClear();
    },
    DOT: () => {
      onCommand(".");
    },
    PERCENT: () => {
      onCommand("%");
    },
    ENTER: () => {
      onCommand("=");
    },
  };
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

  const handlers = getHandlers(props.onCommand, props.onClickNumber, onClear);

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges={true}>
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
    </GlobalHotKeys>
  );
};
const StyledDiv = styled.div`
  height: 100vh;
  display: block;
`;
