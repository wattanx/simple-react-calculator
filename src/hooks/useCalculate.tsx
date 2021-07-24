import { Calculator, Operator } from "../logic/Calculator";
import { isBasicOperator } from "../logic/Utils";
import { useState } from "react";

const calculator = new Calculator();

export const useCalculate = () => {
  const [value, setValue] = useState<string>("0");
  const [isClearable, setIsClearable] = useState<boolean>(false);
  const [selectedOperator, setSelectedOperator] = useState<string>("");

  const onCalculate = (input: string) => {
    if (isBasicOperator(input)) {
      setSelectedOperator(input);
    } else {
      if (input === Operator.Equal) {
        setSelectedOperator("");
      }
      setIsClearable(true);
    }

    const num = calculator.calculate(input);
    setValue(num);
  };

  const onClear = () => {
    setIsClearable(false);
    setValue(calculator.calculate(Operator.Clear));
  };

  const onAllClear = () => {
    setIsClearable(false);
    setSelectedOperator("");
    setValue(calculator.calculate(Operator.AllClear));
  };

  return {
    value,
    isClearable,
    selectedOperator,
    onCalculate,
    onClear,
    onAllClear,
  };
};
