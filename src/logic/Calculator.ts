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
  isCommand,
  isBasicOperator,
} from "./Utils";

export const Command = {
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

export type CommandType = typeof Command[keyof typeof Command];

export class Calculator {
  private prevInputValue: string = "";
  private prevCommand: string = "";
  private prevDisplayNumber: string = "0";
  private currentDisplayNumber: string = "0";

  public calculate(value: string): string {
    this.currentDisplayNumber = isCommand(value)
      ? this.handleOperationInput(value)
      : this.handleNumberInput(value);

    return this.currentDisplayNumber;
  }

  private handleNumberInput(value: string): string {
    if (value === "." && this.currentDisplayNumber.includes(".")) {
      return this.currentDisplayNumber;
    }

    if (isCommand(this.prevInputValue)) {
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

    if (isEqual(value)) return this.handleEqualOperation(this.prevCommand);

    return this.handleBasicOperation(value);
  }

  private clear(): string {
    return "0";
  }

  private allClear(): string {
    this.prevDisplayNumber = "0";
    this.prevInputValue = "";
    this.prevCommand = "";
    return "0";
  }

  private percentage(): string {
    return percentage(this.currentDisplayNumber);
  }

  private changeSign(): string {
    return changeSign(this.currentDisplayNumber);
  }

  private handleBasicOperation(value: string): string {
    // first input or after equal
    if (!this.prevCommand || isBasicOperator(this.prevInputValue)) {
      this.updatePreviousInputValue(value);
      this.updatePreviousCommand(value);
      this.updatePreviousDisplayNumber(this.currentDisplayNumber);
      return this.currentDisplayNumber;
    }

    const result = this.calculateInner(
      this.prevCommand,
      this.prevDisplayNumber,
      this.currentDisplayNumber
    );

    this.updatePreviousInputValue(value);
    this.updatePreviousDisplayNumber(result);
    this.updatePreviousCommand(value);
    return result;
  }

  private handleEqualOperation(value: string): string {
    if (!this.prevCommand && this.prevDisplayNumber === "0") {
      return this.currentDisplayNumber;
    }

    if (!this.prevCommand) return this.prevDisplayNumber;

    this.updatePreviousInputValue(value);
    return this.calculateInner(
      value,
      this.prevDisplayNumber,
      this.currentDisplayNumber
    );
  }

  private calculateInner(
    value: string,
    prevDisplayNumber: string,
    currentDisplayNumber: string
  ): string {
    switch (value) {
      case Command.Addition:
        return add(prevDisplayNumber, currentDisplayNumber);
      case Command.Subtraction:
        return subtract(prevDisplayNumber, currentDisplayNumber);
      case Command.Multiplication:
        return multiply(prevDisplayNumber, currentDisplayNumber);
      case Command.Division:
        return divide(prevDisplayNumber, currentDisplayNumber);
      default:
        return "Error";
    }
  }

  private updatePreviousInputValue(value: string): void {
    this.prevInputValue = value;
  }

  private updatePreviousCommand(value: string): void {
    this.prevCommand = value;
  }

  private updatePreviousDisplayNumber(value: string): void {
    this.prevDisplayNumber = value;
  }
}
