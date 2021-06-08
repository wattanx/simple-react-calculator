import { Calculator, Operator } from '@src/components/Calculator/Calculator';
import { useState } from 'react';

const calculator = new Calculator();

export const useCalculate = () => {
    const [value, setValue] = useState<string>('0');
    const [isOperationClicked, setOperationClicked] = useState<boolean>(false);
    const [isClearable, setIsClearable] = useState<boolean>(false);

    const onNumberClick = (input: string) => {
        if (input === '.' && value.includes('.')) return;

        setIsClearable(true);

        if (value === '0' && input !== '.') {
            setValue(input);
            return;
        }

        if (isOperationClicked) {
            if (input === '.') {
                setValue(value + input);
            } else {
                setValue(input);
            }
            setOperationClicked(false);
            return;
        }
        setValue(value + input);
    };

    const onCalculate = (operator: Operator) => {
        setOperationClicked(true);
        const num = calculator.calculate(value, operator);
        setValue(num);
    };

    const onClear = () => {
        setIsClearable(false);
        setValue(calculator.clear());
    };

    return {
        value,
        isClearable,
        isOperationClicked,
        onCalculate,
        onNumberClick,
        onClear,
    };
};
