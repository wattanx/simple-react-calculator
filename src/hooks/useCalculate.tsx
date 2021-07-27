import { Calculator, Command } from "../logic/Calculator";
import { isBasicOperator } from "../logic/Utils";
import { useState } from "react";

const calculator = new Calculator();

export const useCalculate = () => {
  const [value, setValue] = useState<string>("0");
  const [isClearable, setIsClearable] = useState<boolean>(false);
  const [selectedCommand, setSelectedCommand] = useState<string>("");

  const onCalculate = (input: string) => {
    if (isBasicOperator(input)) {
      setSelectedCommand(input);
    } else if (input === Command.Equal) {
      setSelectedCommand("");
    }
    setIsClearable(true);

    const num = calculator.calculate(input);
    setValue(num);
  };

  const onClear = () => {
    setIsClearable(false);
    setValue(calculator.calculate(Command.Clear));
  };

  const onAllClear = () => {
    setIsClearable(false);
    setSelectedCommand("");
    setValue(calculator.calculate(Command.AllClear));
  };

  return {
    value,
    isClearable,
    selectedCommand,
    onCalculate,
    onClear,
    onAllClear,
  };
};
