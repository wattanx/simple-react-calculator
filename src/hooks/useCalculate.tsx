import { Calculator, Operator } from '@src/components/Calculator/Calculator';
import { useState } from 'react';

const calculator = new Calculator();

export const useCalculate = () => {
    const [value, setValue] = useState<string>('0');
    const [isOperationClicked, setOperationClicked] = useState<boolean>(false);
    const [isClearable, setIsClearable] = useState<boolean>(false);
    const [selectedOperator, setSelectedOperator] = useState<Operator>(null);

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
        if (isBasicOperator(operator)) {
            setSelectedOperator(operator);
        }
        if (operator === Operator.equal) {
            setSelectedOperator(null);
        }
        setOperationClicked(true);
        const num = calculator.calculate(value, operator);
        setValue(num);
    };

    const onClear = () => {
        setIsClearable(false);
        setSelectedOperator(null);
        setValue('0');
    };

    const onAllClear = () => {
        setIsClearable(false);
        setSelectedOperator(null);
        setValue(calculator.clear());
    };

    return {
        value,
        isClearable,
        isOperationClicked,
        selectedOperator,
        onCalculate,
        onNumberClick,
        onClear,
        onAllClear,
    };
};

const isBasicOperator = (operator: Operator): boolean => {
    return (
        operator === Operator.addition ||
        operator === Operator.subtraction ||
        operator === Operator.division ||
        operator === Operator.multiplication
    );
};
