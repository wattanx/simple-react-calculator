import { Engine } from './Engine';

export const Operator = {
    addition: '+',
    subtraction: '-',
    multiplication: 'x',
    division: '\u00F7',
    percentage: '%',
    sign: '+/-',
    equal: '=',
    allClear: 'AC',
    clear: 'C',
};

export type OperatorType = typeof Operator[keyof typeof Operator];

export class Calculator {
    private prevInputValue: string = '';
    private prevOperator: OperatorType;
    private prevInputNumber: string = '0';
    private inputNumber: string = '0';

    private engine = new Engine();

    public calculate(value: string): string {
        if (this.isOperation(value)) return this.handleOperationInput(value);

        return this.handleNumberInput(value);
    }

    private handleNumberInput(value: string): string {
        if (value === '.' && this.inputNumber.includes('.')) return this.inputNumber;

        if (this.isOperation(this.prevInputValue)) {
            this.inputNumber = '0';
        }

        if (this.inputNumber === '0' && value !== '.') {
            this.inputNumber = value;
            this.prevInputValue = value;
            return this.inputNumber;
        }

        this.inputNumber += value;
        this.prevInputValue = value;

        return this.inputNumber;
    }

    private handleOperationInput(value: string): string {
        if (this.prevInputValue === value) return this.inputNumber;

        if (this.isPercentage(value)) return this.percentage();

        if (this.isSign(value)) return this.changeSign();

        if (this.isEqual(value)) return this.handleEqualOperation(this.prevOperator);

        if (this.isClear(value)) return this.clear();

        if (this.isAllClear(value)) return this.allClear();

        if (!this.prevOperator) {
            this.prevInputValue = value;
            this.updatePreviousOperator(value);
            this.updatePreviousInputNumber(this.inputNumber);
            return this.inputNumber;
        }

        return this.calculateInner(value);
    }

    private clear(): string {
        this.inputNumber = '0';
        return this.inputNumber;
    }

    private allClear(): string {
        this.prevInputNumber = '0';
        this.prevInputValue = '';
        this.prevOperator = '';
        return '0';
    }

    private updatePreviousOperator(value: string): void {
        this.prevOperator = value;
    }

    private updatePreviousInputNumber(value: string): void {
        this.prevInputNumber = value;
    }

    private handleOperation(result: string): string {
        this.updatePreviousInputNumber(result);
        return this.prevInputNumber;
    }

    private percentage(): string {
        this.inputNumber = this.engine.percentage(this.inputNumber);
        return this.inputNumber;
    }

    private changeSign(): string {
        this.inputNumber = this.engine.changeSign(this.inputNumber);
        return this.inputNumber;
    }

    private calculateInner(value: string): string {
        switch (value) {
            case Operator.addition:
                return this.handleOperation(
                    this.engine.add(this.prevInputNumber, this.inputNumber),
                );
            case Operator.subtraction:
                return this.handleOperation(
                    this.engine.subtract(this.prevInputNumber, this.inputNumber),
                );
            case Operator.multiplication:
                return this.handleOperation(
                    this.engine.multiply(this.prevInputNumber, this.inputNumber),
                );
            case Operator.division:
                return this.handleOperation(
                    this.engine.divide(this.prevInputNumber, this.inputNumber),
                );
            default:
                return 'Error';
        }
    }

    private handleEqualOperation(value: string): string {
        if (!this.prevOperator) return this.prevInputNumber;

        this.prevInputValue = value;
        this.prevInputNumber = this.calculateInner(value);
        this.prevOperator = value;
        return this.prevInputNumber;
    }

    private isPercentage(value: string): boolean {
        return value === Operator.percentage;
    }

    private isSign(value: string): boolean {
        return value === Operator.sign;
    }

    private isEqual(value: string): boolean {
        return value === Operator.equal;
    }

    private isClear(operator: string): boolean {
        return operator === Operator.clear;
    }

    private isAllClear(value: string): boolean {
        return value === Operator.allClear;
    }

    private isOperation(value: string): boolean {
        return Object.values(Operator).includes(value);
    }
}
