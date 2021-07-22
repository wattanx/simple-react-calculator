import {
  add,
  subtract,
  multiply,
  divide,
  changeSign,
  percentage,
} from "./Core";
import {
  isPercentage,
  isSign,
  isEqual,
  isClear,
  isAllClear,
  isOperation,
  isBasicOperator,
} from "./Utils";

export const Operator = {
  addition: "+",
  subtraction: "-",
  multiplication: "x",
  division: "\u00F7",
  percentage: "%",
  sign: "+/-",
  equal: "=",
  allClear: "AC",
  clear: "C",
} as const;

export type OperatorType = typeof Operator[keyof typeof Operator];

export class Calculator {
  private prevInputValue: string = "";
  private prevOperator: string = "";
  private prevInputNumber: string = "0";
  private inputNumber: string = "0";

  public calculate(value: string): string {
    this.inputNumber = isOperation(value)
      ? this.handleOperationInput(value)
      : this.handleNumberInput(value);

    return this.inputNumber;
  }

  private handleNumberInput(value: string): string {
    if (value === "." && this.inputNumber.includes("."))
      return this.inputNumber;

    if (isOperation(this.prevInputValue)) {
      this.inputNumber = "0";
    }

    if (this.inputNumber === "0" && value !== ".") {
      this.inputNumber = value;
      this.prevInputValue = value;
      return this.inputNumber;
    }

    this.inputNumber += value;
    this.prevInputValue = value;

    return this.inputNumber;
  }

  private handleOperationInput(value: string): string {
    if (isPercentage(value)) return this.percentage();

    if (isSign(value)) return this.changeSign();

    if (isClear(value)) return this.clear();

    if (isAllClear(value)) return this.allClear();

    if (isEqual(value)) return this.handleEqualOperation(this.prevOperator);

    return this.handleBasicOperation(value);
  }

  private clear(): string {
    this.inputNumber = "0";
    return this.inputNumber;
  }

  private allClear(): string {
    this.prevInputNumber = "0";
    this.prevInputValue = "";
    this.prevOperator = "";
    return "0";
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
    this.inputNumber = percentage(this.inputNumber);
    return this.inputNumber;
  }

  private changeSign(): string {
    this.inputNumber = changeSign(this.inputNumber);
    return this.inputNumber;
  }

  private handleBasicOperation(value: string): string {
    // first input
    if (!this.prevOperator) {
      this.prevInputValue = value;
      this.updatePreviousOperator(value);
      this.updatePreviousInputNumber(this.inputNumber);
      return this.inputNumber;
    }

    // after equal
    if (isBasicOperator(this.prevInputValue)) {
      this.prevInputValue = value;
      this.updatePreviousOperator(value);
      return this.prevInputNumber;
    }

    this.prevInputValue = value;
    const result = this.calculateInner(this.prevOperator);
    this.updatePreviousOperator(value);
    return result;
  }

  private calculateInner(value: string): string {
    switch (value) {
      case Operator.addition:
        return this.handleOperation(
          add(this.prevInputNumber, this.inputNumber)
        );
      case Operator.subtraction:
        return this.handleOperation(
          subtract(this.prevInputNumber, this.inputNumber)
        );
      case Operator.multiplication:
        return this.handleOperation(
          multiply(this.prevInputNumber, this.inputNumber)
        );
      case Operator.division:
        return this.handleOperation(
          divide(this.prevInputNumber, this.inputNumber)
        );
      default:
        return "Error";
    }
  }

  private handleEqualOperation(value: string): string {
    if (!this.prevOperator && this.prevInputNumber === "0") {
      return this.inputNumber;
    }

    if (!this.prevOperator) return this.prevInputNumber;

    this.prevInputValue = value;
    this.prevInputNumber = this.calculateInner(value);
    return this.prevInputNumber;
  }
}
