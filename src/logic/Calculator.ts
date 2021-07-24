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
  Addition: "+",
  Subtraction: "-",
  Multiplication: "x",
  Division: "\u00F7",
  Percentage: "%",
  Sign: "+/-",
  Equal: "=",
  AllClear: "AC",
  Clear: "C",
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
    if (value === "." && this.currentDisplayNumber.includes(".")) {
      return this.currentDisplayNumber;
    }

    if (isOperation(this.prevInputValue)) {
      this.currentDisplayNumber = "0";
    }

    if (this.currentDisplayNumber === "0" && value !== ".") {
      this.updatePreviousInputValue(value);
      return value;
    }

    this.updatePreviousInputValue(value);

    return (this.currentDisplayNumber += value);
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
    return "0";
  }

  private allClear(): string {
    this.prevDisplayNumber = "0";
    this.prevInputValue = "";
    this.prevOperator = "";
    return "0";
  }

  private updatePreviousInputValue(value: string): void {
    this.prevInputValue = value;
  }

  private updatePreviousOperator(value: string): void {
    this.prevOperator = value;
  }

  private updatePreviousDisplayNumber(value: string): void {
    this.prevDisplayNumber = value;
  }

  private handleOperation(result: string): string {
    this.updatePreviousDisplayNumber(result);
    return this.prevDisplayNumber;
  }

  private percentage(): string {
    return percentage(this.currentDisplayNumber);
  }

  private changeSign(): string {
    return changeSign(this.currentDisplayNumber);
  }

  private handleBasicOperation(value: string): string {
    // first input
    if (!this.prevOperator) {
      this.updatePreviousInputValue(value);
      this.updatePreviousOperator(value);
      this.updatePreviousDisplayNumber(this.currentDisplayNumber);
      return this.currentDisplayNumber;
    }

    // after equal
    if (isBasicOperator(this.prevInputValue)) {
      this.updatePreviousInputValue(value);
      this.updatePreviousOperator(value);
      return this.prevDisplayNumber;
    }

    this.updatePreviousInputValue(value);
    const result = this.calculateInner(this.prevOperator);
    this.updatePreviousOperator(value);
    return result;
  }

  private calculateInner(value: string): string {
    switch (value) {
      case Operator.Addition:
        return this.handleOperation(
          add(this.prevDisplayNumber, this.currentDisplayNumber)
        );
      case Operator.Subtraction:
        return this.handleOperation(
          subtract(this.prevDisplayNumber, this.currentDisplayNumber)
        );
      case Operator.Multiplication:
        return this.handleOperation(
          multiply(this.prevDisplayNumber, this.currentDisplayNumber)
        );
      case Operator.Division:
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

    this.updatePreviousInputValue(value);
    this.updatePreviousDisplayNumber(this.calculateInner(value));
    return this.prevDisplayNumber;
  }
}
