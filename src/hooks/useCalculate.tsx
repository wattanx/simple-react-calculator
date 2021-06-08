import { Calculator, Operator } from '@src/components/Calculator/Calculator';
import { useState } from 'react';

const calculator = new Calculator();

export const useCalculate = () => {
    const [value, setValue] = useState<string>('0');
    const [isOperationClicked, setOperationClicked] = useState<boolean>(false);
    const [isClearable, setIsClearable] = useState<boolean>(false);

    const onNumberClick = (input: string) => {
        if (input === '.' && value.includes('.')) return;
        setOperationClicked(false);
        setIsClearable(true);

        if (value === '0' && input !== '.') {
            setValue(input);
            return;
        }

        if (!isOperationClicked) {
            setValue(value + input);
            return;
        }

        input === '.' ? setValue(value + input) : setValue(input);
    };

    const onCalculate = (operator: Operator) => {
        setOperationClicked(true);
        const num = calculator.calculate(value, operator);
        setValue(num);
    };

    const onClear = () => {
        setIsClearable(false);
        setValue('0');
    };

    const onAllClear = () => {
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
        onAllClear,
    };
};
