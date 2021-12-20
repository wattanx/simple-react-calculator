import { Calculator, Command } from "../logic/Calculator";
import { useCallback, useEffect, useRef, useState } from "react";

export const useCalculate = () => {
  const calculator = useRef<Calculator>(new Calculator());
  const [value, setValue] = useState<string>("0");
  const [isClearable, setIsClearable] = useState<boolean>(false);
  const [selectedCommand, setSelectedCommand] = useState<string>("");

  useEffect(() => {
    calculator.current = new Calculator();

    return () => {
      calculator.current = new Calculator();
    };
  }, []);

  const onClickNumber = useCallback((input: string) => {
    setIsClearable(true);
    const num = calculator.current.calculate(input);
    setValue(num);
  }, []);

  const onCommand = useCallback((input: string) => {
    setSelectedCommand(input);
    const num = calculator.current.calculate(input);
    setValue(num);
  }, []);

  const onEqual = useCallback(() => {
    setSelectedCommand("");
    const num = calculator.current.calculate(Command.Equal);
    setValue(num);
  }, []);

  const onClear = () => {
    setIsClearable(false);
    setValue(calculator.current.calculate(Command.Clear));
  };

  const onAllClear = () => {
    setIsClearable(false);
    setSelectedCommand("");
    setValue(calculator.current.calculate(Command.AllClear));
  };

  return {
    value,
    isClearable,
    selectedCommand,
    onClickNumber,
    onEqual,
    onCommand,
    onClear,
    onAllClear,
  };
};
