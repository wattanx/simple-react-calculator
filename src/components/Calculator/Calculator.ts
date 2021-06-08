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
} as const;

export type Operator = typeof Operator[keyof typeof Operator];

export class Calculator {
    private prevInputValue: string = '0';
    private prevOperator: Operator;
    private repeatValue: string = '0';
    private repeatOperator: Operator;

    private engine = new Engine();

    public calculate(value: string, operator: Operator): string {
        if (this.isPercentage(operator)) return this.percentage(value);

        if (this.isSign(operator)) return this.changeSign(value);

        // first input
        if (this.prevInputValue === '0' && !this.prevOperator) {
            this.prevInputValue = value;
            this.prevOperator = operator;
            return this.prevInputValue;
        }

        if (this.isEqual(operator)) return this.handleEqualOperation(value, operator);

        // Enter a series of equals
        if (this.isEqual(this.prevOperator)) {
            this.updatePreviousValue(value, operator);
            return value;
        }

        return this.calculateInner(value, operator);
    }

    public setOperator(operator: Operator): void {
        this.prevOperator = operator;
    }

    public clear(): string {
        this.prevInputValue = '0';
        this.prevOperator = null;
        return '0';
    }

    private updatePreviousValue(value: string, operator: Operator): void {
        this.prevInputValue = value;
        this.prevOperator = operator;
    }

    private handleOperation(result: string, operator: Operator): string {
        this.updatePreviousValue(result, operator);
        return this.prevInputValue;
    }

    private percentage(value: string): string {
        return this.engine.percentage(value);
    }

    private changeSign(value: string): string {
        return this.engine.changeSign(value);
    }

    private calculateInner(value: string, operator: Operator): string {
        switch (operator) {
            case Operator.addition:
                return this.handleOperation(this.engine.add(this.prevInputValue, value), operator);
            case Operator.subtraction:
                return this.handleOperation(
                    this.engine.subtract(this.prevInputValue, value),
                    operator,
                );
            case Operator.multiplication:
                return this.handleOperation(
                    this.engine.multiply(this.prevInputValue, value),
                    operator,
                );
            case Operator.division:
                return this.handleOperation(
                    this.engine.divide(this.prevInputValue, value),
                    operator,
                );
            default:
                return 'Error';
        }
    }

    private handleEqualOperation(value: string, operator: Operator): string {
        if (!this.isEqual(this.prevOperator)) {
            this.prevInputValue = this.calculateInner(value, this.prevOperator);
            this.repeatValue = value;
            this.repeatOperator = this.prevOperator;
            this.prevOperator = operator;
            return this.prevInputValue;
        } else {
            this.prevInputValue = this.calculateInner(this.repeatValue, this.repeatOperator);
            this.prevOperator = operator;
            return this.prevInputValue;
        }
    }

    private isPercentage(oprator: Operator): boolean {
        return oprator === Operator.percentage;
    }

    private isSign(oprator: Operator): boolean {
        return oprator === Operator.sign;
    }

    private isEqual(operator: Operator): boolean {
        return operator === Operator.equal;
    }
}
