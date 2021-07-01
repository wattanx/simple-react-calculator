import { useCalculate } from "../hooks/useCalculate";
import styled from "@emotion/styled";
import { Button, ButtonBackgroundColor } from "./Button";
import { Operator, OperatorType } from "./Calculator/Calculator";
import { Display } from "./Display";

type ComponentProps = {
  onCalculate: (input: string) => void;
  onClear: () => void;
  onAllClear: () => void;
  isClearable: boolean;
  value: string;
  selectedOperator: OperatorType;
};

export const ReactCalculator: React.VFC = () => {
  const {
    value,
    isClearable,
    selectedOperator,
    onCalculate,
    onClear,
    onAllClear,
  } = useCalculate();

  return (
    <CalculatorComponent
      onCalculate={(input: string) => onCalculate(input)}
      onClear={() => onClear()}
      onAllClear={() => onAllClear()}
      isClearable={isClearable}
      value={value}
      selectedOperator={selectedOperator}
    />
  );
};

const CalculatorComponent: React.VFC<ComponentProps> = (props) => (
  <StyledDiv>
    <Display value={props.value} />
    <Button
      value={props.isClearable ? "C" : "AC"}
      onClick={() => (props.isClearable ? props.onClear() : props.onAllClear())}
      backgroundColor={ButtonBackgroundColor.Black}
    />
    <Button
      value="+/-"
      onClick={() => props.onCalculate(Operator.sign)}
      backgroundColor={ButtonBackgroundColor.Black}
    />
    <Button
      value="%"
      onClick={() => props.onCalculate(Operator.percentage)}
      backgroundColor={ButtonBackgroundColor.Black}
    />
    <Button
      value={"\u00F7"}
      onClick={() => props.onCalculate(Operator.division)}
      backgroundColor={ButtonBackgroundColor.Orange}
      isSelected={props.selectedOperator === Operator.division}
    />
    <br />
    <Button
      value="7"
      onClick={() => props.onCalculate("7")}
      backgroundColor={ButtonBackgroundColor.Gray}
    />
    <Button
      value="8"
      onClick={() => props.onCalculate("8")}
      backgroundColor={ButtonBackgroundColor.Gray}
    />
    <Button
      value="9"
      onClick={() => props.onCalculate("9")}
      backgroundColor={ButtonBackgroundColor.Gray}
    />
    <Button
      value="x"
      onClick={() => props.onCalculate(Operator.multiplication)}
      backgroundColor={ButtonBackgroundColor.Orange}
      isSelected={props.selectedOperator === Operator.multiplication}
    />
    <br />
    <Button
      value="4"
      onClick={() => props.onCalculate("4")}
      backgroundColor={ButtonBackgroundColor.Gray}
    />
    <Button
      value="5"
      onClick={() => props.onCalculate("5")}
      backgroundColor={ButtonBackgroundColor.Gray}
    />
    <Button
      value="6"
      onClick={() => props.onCalculate("6")}
      backgroundColor={ButtonBackgroundColor.Gray}
    />
    <Button
      value="-"
      onClick={() => props.onCalculate(Operator.subtraction)}
      backgroundColor={ButtonBackgroundColor.Orange}
      isSelected={props.selectedOperator === Operator.subtraction}
    />
    <br />
    <Button
      value="1"
      onClick={() => props.onCalculate("1")}
      backgroundColor={ButtonBackgroundColor.Gray}
    />
    <Button
      value="2"
      onClick={() => props.onCalculate("2")}
      backgroundColor={ButtonBackgroundColor.Gray}
    />
    <Button
      value="3"
      onClick={() => props.onCalculate("3")}
      backgroundColor={ButtonBackgroundColor.Gray}
    />
    <Button
      value="+"
      onClick={() => props.onCalculate(Operator.addition)}
      backgroundColor={ButtonBackgroundColor.Orange}
      isSelected={props.selectedOperator === Operator.addition}
    />
    <br />
    <Button
      value="0"
      onClick={() => props.onCalculate("0")}
      backgroundColor={ButtonBackgroundColor.Gray}
      isLarge={true}
    />
    <Button
      value="."
      onClick={() => props.onCalculate(".")}
      backgroundColor={ButtonBackgroundColor.Gray}
    />
    <Button
      value="="
      onClick={() => props.onCalculate(Operator.equal)}
      backgroundColor={ButtonBackgroundColor.Orange}
    />
  </StyledDiv>
);
const StyledDiv = styled.div`
  height: 100vh;
  display: block;
`;
