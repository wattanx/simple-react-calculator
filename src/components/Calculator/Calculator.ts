import { Engine } from "./Engine";

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

type Operator = typeof Operator[keyof typeof Operator];

export class Calculator {
    private prevInputValue: string = '';
    private prevOperator: Operator;
    private engine = new Engine();

    public calculate(value: string, operator: Operator): string {
        if (operator === Operator.percentage) {
            return this.percentage(value);
        }
        if (this.prevInputValue === '' && !this.prevOperator) {
            this.prevInputValue = value;
            this.prevOperator = operator;
            return this.prevInputValue;
        }

        if (operator === Operator.equal) {
            this.prevInputValue = this.calculateInner(value, this.prevOperator);
            this.prevOperator = operator;
            return this.prevInputValue;
        }

        return this.calculateInner(value, operator);
    }

    private add(value: string, operator: Operator): string {
        this.prevInputValue = this.engine.add(this.prevInputValue, value);
        this.prevOperator = operator;
        return this.prevInputValue;
    }

    private subtract(value: string, operator: Operator): string {
        this.prevInputValue = this.engine.subtract(this.prevInputValue, value);
        this.prevOperator = operator;
        return this.prevInputValue;
    }

    private multiply(value: string, operator: Operator): string {
        this.prevInputValue = this.engine.multiply(this.prevInputValue, value);
        this.prevOperator = operator;
        return this.prevInputValue;
    }

    private divide(value: string, operator: Operator): string {
        this.prevInputValue = this.engine.divide(this.prevInputValue, value);
        this.prevOperator = operator;
        return this.prevInputValue;
    }

    private percentage(value: string): string {
        return this.engine.percentage(value);
    }

    private calculateInner(value: string, operator: Operator): string {
        switch(operator){
            case Operator.addition:
                return this.add(value, operator);
            case Operator.subtraction: 
                return this.subtract(value, operator);
            case Operator.multiplication:
                return this.multiply(value, operator);
            case Operator.division:
                return this.divide(value, operator);
            default:
                return '';
        }
    }
}