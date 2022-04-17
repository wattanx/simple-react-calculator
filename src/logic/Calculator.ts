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

export const createCalculator = () => {
  const state = {
    prevInputValue: "",
    prevCommand: "",
    prevDisplayNumber: "0",
    currentDisplayNumber: "0",
  };

  const calculate = (value: string): string => {
    state.currentDisplayNumber = isCommand(value)
      ? handleOperationInput(value)
      : handleNumberInput(value);

    return state.currentDisplayNumber;
  };

  const handleNumberInput = (value: string): string => {
    if (value === "." && state.currentDisplayNumber.includes(".")) {
      return state.currentDisplayNumber;
    }

    if (isCommand(state.prevInputValue)) {
      state.currentDisplayNumber = "0";
    }

    if (isAfterPressingEqual()) {
      state.prevDisplayNumber = "0";
    }

    if (state.currentDisplayNumber === "0" && value !== ".") {
      updatePreviousInputValue(value);
      return value;
    }

    updatePreviousInputValue(value);

    return (state.currentDisplayNumber += value);
  };

  const handleOperationInput = (value: string): string => {
    if (isPercentage(value)) return execPercentage();

    if (isSign(value)) return execChangeSign();

    if (isClear(value)) return clear();

    if (isAllClear(value)) return allClear();

    if (isEqual(value)) return handleEqualOperation(value);

    return handleBasicOperation(value);
  };

  const clear = (): string => {
    return "0";
  };

  const allClear = (): string => {
    state.prevDisplayNumber = "0";
    state.prevInputValue = "";
    state.prevCommand = "";
    return "0";
  };

  const execPercentage = (): string => {
    return percentage(state.currentDisplayNumber);
  };

  const execChangeSign = (): string => {
    return changeSign(state.currentDisplayNumber);
  };

  const handleBasicOperation = (value: string): string => {
    const result =
      isFirstInput() || isAfterPressingEqual()
        ? state.currentDisplayNumber
        : calculateInner(
            state.prevCommand,
            state.prevDisplayNumber,
            state.currentDisplayNumber
          );

    // first input is operator
    if (state.prevInputValue === "") {
      return state.currentDisplayNumber;
    }

    updatePreviousInputValue(value);
    updatePreviousDisplayNumber(result);
    updatePreviousCommand(value);
    return result;
  };

  const handleEqualOperation = (value: string): string => {
    if (!state.prevCommand && state.prevDisplayNumber === "0") {
      return state.currentDisplayNumber;
    }

    if (!state.prevCommand) return state.prevDisplayNumber;

    const result = !isEqual(state.prevInputValue)
      ? calculateInner(
          state.prevCommand,
          state.prevDisplayNumber,
          state.currentDisplayNumber
        )
      : calculateInner(
          state.prevCommand,
          state.currentDisplayNumber,
          state.prevDisplayNumber
        );

    if (!isEqual(state.prevInputValue)) {
      updatePreviousDisplayNumber(state.currentDisplayNumber);
    }

    updatePreviousInputValue(value);

    return result;
  };

  const calculateInner = (
    value: string,
    prevDisplayNumber: string,
    currentDisplayNumber: string
  ): string => {
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
  };

  const updatePreviousInputValue = (value: string): void => {
    state.prevInputValue = value;
  };

  const updatePreviousCommand = (value: string): void => {
    state.prevCommand = value;
  };

  const updatePreviousDisplayNumber = (value: string): void => {
    state.prevDisplayNumber = value;
  };

  const isFirstInput = (): boolean => {
    return !state.prevCommand;
  };

  const isAfterPressingEqual = (): boolean => {
    return isEqual(state.prevInputValue);
  };

  return { calculate };
};
