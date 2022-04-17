import { createCalculator, Command } from "../logic/Calculator";
import { useCallback, useState } from "react";

const { calculate } = createCalculator();

export const useCalculate = () => {
  const [value, setValue] = useState<string>("0");
  const [isClearable, setIsClearable] = useState<boolean>(false);
  const [selectedCommand, setSelectedCommand] = useState<string>("");

  const onClickNumber = useCallback((input: string) => {
    setIsClearable(true);
    const num = calculate(input);
    setValue(num);
  }, []);

  const onCommand = useCallback((input: string) => {
    setSelectedCommand(input);
    const num = calculate(input);
    setValue(num);
  }, []);

  const onEqual = useCallback(() => {
    setSelectedCommand("");
    const num = calculate(Command.Equal);
    setValue(num);
  }, []);

  const onClear = () => {
    setIsClearable(false);
    setValue(calculate(Command.Clear));
  };

  const onAllClear = () => {
    setIsClearable(false);
    setSelectedCommand("");
    setValue(calculate(Command.AllClear));
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
