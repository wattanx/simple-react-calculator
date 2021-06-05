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
        if (this.prevInputValue === '' && !this.prevOperator) {
            this.prevInputValue = value;
            this.prevOperator = operator;
            return this.prevInputValue;
        }
        
        switch(operator){
            case Operator.addition:
                this.prevInputValue = this.engine.add(this.prevInputValue, value);
                this.prevOperator = operator;
                return this.prevInputValue;
            case Operator.equal:
                this.prevInputValue = this.calculateInner(value, this.prevOperator);
                this.prevOperator = operator;
                return this.prevInputValue;
            default:
                return '';
        }
    }

    private calculateInner(value: string, operator: Operator): string {
        switch(operator){
            case Operator.addition:
                this.prevInputValue = this.engine.add(this.prevInputValue, value);
                this.prevOperator = operator;
                return this.prevInputValue;
            default:
                return '';
        }
    }
}