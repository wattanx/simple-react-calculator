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
  private prevDisplayNumber: string = "0";
  private currentDisplayNumber: string = "0";

  public calculate(value: string): string {
    this.currentDisplayNumber = isOperation(value)
      ? this.handleOperationInput(value)
      : this.handleNumberInput(value);

    return this.currentDisplayNumber;
  }

  private handleNumberInput(value: string): string {
    if (value === "." && this.currentDisplayNumber.includes("."))
      return this.currentDisplayNumber;

    if (isOperation(this.prevInputValue)) {
      this.currentDisplayNumber = "0";
    }

    if (this.currentDisplayNumber === "0" && value !== ".") {
      this.currentDisplayNumber = value;
      this.prevInputValue = value;
      return this.currentDisplayNumber;
    }

    this.currentDisplayNumber += value;
    this.prevInputValue = value;

    return this.currentDisplayNumber;
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
    this.currentDisplayNumber = "0";
    return this.currentDisplayNumber;
  }

  private allClear(): string {
    this.prevDisplayNumber = "0";
    this.prevInputValue = "";
    this.prevOperator = "";
    return "0";
  }

  private updatePreviousOperator(value: string): void {
    this.prevOperator = value;
  }

  private updatePreviousInputNumber(value: string): void {
    this.prevDisplayNumber = value;
  }

  private handleOperation(result: string): string {
    this.updatePreviousInputNumber(result);
    return this.prevDisplayNumber;
  }

  private percentage(): string {
    this.currentDisplayNumber = percentage(this.currentDisplayNumber);
    return this.currentDisplayNumber;
  }

  private changeSign(): string {
    this.currentDisplayNumber = changeSign(this.currentDisplayNumber);
    return this.currentDisplayNumber;
  }

  private handleBasicOperation(value: string): string {
    // first input
    if (!this.prevOperator) {
      this.prevInputValue = value;
      this.updatePreviousOperator(value);
      this.updatePreviousInputNumber(this.currentDisplayNumber);
      return this.currentDisplayNumber;
    }

    // after equal
    if (isBasicOperator(this.prevInputValue)) {
      this.prevInputValue = value;
      this.updatePreviousOperator(value);
      return this.prevDisplayNumber;
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
          add(this.prevDisplayNumber, this.currentDisplayNumber)
        );
      case Operator.subtraction:
        return this.handleOperation(
          subtract(this.prevDisplayNumber, this.currentDisplayNumber)
        );
      case Operator.multiplication:
        return this.handleOperation(
          multiply(this.prevDisplayNumber, this.currentDisplayNumber)
        );
      case Operator.division:
        return this.handleOperation(
          divide(this.prevDisplayNumber, this.currentDisplayNumber)
        );
      default:
        return "Error";
    }
  }

  private handleEqualOperation(value: string): string {
    if (!this.prevOperator && this.prevDisplayNumber === "0") {
      return this.currentDisplayNumber;
    }

    if (!this.prevOperator) return this.prevDisplayNumber;

    this.prevInputValue = value;
    this.prevDisplayNumber = this.calculateInner(value);
    return this.prevDisplayNumber;
  }
}
