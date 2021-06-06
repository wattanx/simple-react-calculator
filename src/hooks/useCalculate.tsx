import { Calculator, Operator } from "@src/components/Calculator/Calculator";
import { useState } from "react";

const calculator = new Calculator();

export const useCalculate = () => {
    const [value, setValue] = useState<string>('0');
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isOperationClicked, setOperationClicked] = useState<boolean>(false);
    const [isClearable, setIsClearable] = useState<boolean>(false);

    const onNumberClick = (input: string) => {
        setIsEdit(true);
        setIsClearable(true);
        if (value === '0' && input !== '.') {
            setValue(input);
            return;
        }
        
        if (input === '.' && value.includes('.')) { return; }

        if (isOperationClicked) {
            
            setValue(input);
            setOperationClicked(false);
            return;
        }
        setValue(value + input);
    }

    const onCalculate = (operator: Operator) => {
        if (!isEdit && isBasicOperation(operator)) {
            calculator.setOperator(operator);
            return; 
        }
        setIsEdit(false);
        setOperationClicked(true);
        const num = calculator.calculate(value, operator);
        setValue(num);
    }

    const onClear = () => {
        setIsClearable(false);
        setValue(calculator.clear());
    }

    return {
        value,
        isClearable,
        isOperationClicked,
        onCalculate,
        onNumberClick,
        onClear
    };
}

const isBasicOperation = (operator: Operator): boolean => {
    return (
      operator === Operator.addition
      || operator === Operator.subtraction
      || operator === Operator.multiplication
      || operator === Operator.division
    )
}