import { Calculator, Operator } from "../logic/Calculator";

test("addition Test", () => {
  const calculator = new Calculator();
  expect(calculator.calculate("1")).toBe("1");
  expect(calculator.calculate("1")).toBe("11");
  expect(calculator.calculate("+")).toBe("11");
  expect(calculator.calculate("3")).toBe("3");
  expect(calculator.calculate("=")).toBe("14");
});

test("subtract Test", () => {
  const calculator = new Calculator();
  expect(calculator.calculate("1")).toBe("1");
  expect(calculator.calculate("0")).toBe("10");
  expect(calculator.calculate("-")).toBe("10");
  expect(calculator.calculate("1")).toBe("1");
  expect(calculator.calculate("-")).toBe("9");
});

test("multiply Test", () => {
  const calculator = new Calculator();
  expect(calculator.calculate("1")).toBe("1");
  expect(calculator.calculate("2")).toBe("12");
  expect(calculator.calculate(Operator.Multiplication)).toBe("12");
  expect(calculator.calculate("2")).toBe("2");
  expect(calculator.calculate(Operator.Multiplication)).toBe("24");
});

test("divide Test", () => {
  const calculator = new Calculator();
  expect(calculator.calculate("1")).toBe("1");
  expect(calculator.calculate("0")).toBe("10");
  expect(calculator.calculate(Operator.Division)).toBe("10");
  expect(calculator.calculate("5")).toBe("5");
  expect(calculator.calculate(Operator.Division)).toBe("2");
});

test("divisionByZero Test1", () => {
  const calculator = new Calculator();
  expect(calculator.calculate("1")).toBe("1");
  expect(calculator.calculate("0")).toBe("10");
  expect(calculator.calculate(Operator.Division)).toBe("10");
  expect(calculator.calculate("0")).toBe("0");
  expect(calculator.calculate("=")).toBe("Error");
});

test("divisionByZero Test2", () => {
  const calculator = new Calculator();
  expect(calculator.calculate("0")).toBe("0");
  expect(calculator.calculate(Operator.Division)).toBe("0");
  expect(calculator.calculate("0")).toBe("0");
  expect(calculator.calculate("=")).toBe("Error");
});

test("percentage Test", () => {
  const calculator = new Calculator();
  expect(calculator.calculate("1")).toBe("1");
  expect(calculator.calculate("0")).toBe("10");
  expect(calculator.calculate(Operator.Percentage)).toBe("0.1");
});

test("ChangeSign Test", () => {
  const calculator = new Calculator();
  expect(calculator.calculate("1")).toBe("1");
  expect(calculator.calculate("0")).toBe("10");
  expect(calculator.calculate(Operator.Sign)).toBe("-10");
});

test("clear Test", () => {
  const calculator = new Calculator();
  expect(calculator.calculate("1")).toBe("1");
  expect(calculator.calculate("0")).toBe("10");
  expect(calculator.calculate(Operator.Division)).toBe("10");
  expect(calculator.calculate("2")).toBe("2");
  expect(calculator.calculate(Operator.Clear)).toBe("0");
  expect(calculator.calculate("2")).toBe("2");
  expect(calculator.calculate(Operator.Equal)).toBe("5");
});

test("allClear Test", () => {
  const calculator = new Calculator();
  expect(calculator.calculate("1")).toBe("1");
  expect(calculator.calculate("0")).toBe("10");
  expect(calculator.calculate(Operator.Division)).toBe("10");
  expect(calculator.calculate("2")).toBe("2");
  expect(calculator.calculate(Operator.AllClear)).toBe("0");
  expect(calculator.calculate("2")).toBe("2");
  expect(calculator.calculate(Operator.Equal)).toBe("2");
});
