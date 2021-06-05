import { Calculator, Operator } from "../../src/components/Calculator/Calculator";

test('addition Test', () => {
    const calculator = new Calculator();
    expect(calculator.calculate('1', Operator.addition)).toBe('1');
    expect(calculator.calculate('1', Operator.addition)).toBe('2');
    expect(calculator.calculate('1', Operator.equal)).toBe('3');
});

test('subtract Test', () => {
    const calculator = new Calculator();
    expect(calculator.calculate('10', Operator.subtraction)).toBe('10');
    expect(calculator.calculate('1', Operator.subtraction)).toBe('9');
    expect(calculator.calculate('2', Operator.equal)).toBe('7');
});

test('multiply Test', () => {
    const calculator = new Calculator();
    expect(calculator.calculate('10', Operator.multiplication)).toBe('10');
    expect(calculator.calculate('2', Operator.multiplication)).toBe('20');
    expect(calculator.calculate('2', Operator.equal)).toBe('40');
});

test('divide Test', () => {
    const calculator = new Calculator();
    expect(calculator.calculate('10', Operator.division)).toBe('10');
    expect(calculator.calculate('2', Operator.division)).toBe('5');
    expect(calculator.calculate('5', Operator.equal)).toBe('1');
});

test('divisionByZero Test1', () => {
    const calculator = new Calculator();
    expect(calculator.calculate('10', Operator.division)).toBe('10');
    expect(calculator.calculate('0', Operator.division)).toBe('Error');
});

test('divisionByZero Test2', () => {
    const calculator = new Calculator();
    expect(calculator.calculate('0', Operator.division)).toBe('0');
    expect(calculator.calculate('0', Operator.division)).toBe('Error');
});

test('percentage Test', () => {
    const calculator = new Calculator();
    expect(calculator.calculate('10', Operator.percentage)).toBe('0.1');
    expect(calculator.calculate('0.1', Operator.percentage)).toBe('0.001');
});

test('ChangeSign Test', () => {
    const calculator = new Calculator();
    expect(calculator.calculate('10', Operator.sign)).toBe('-10');
    expect(calculator.calculate('-10', Operator.sign)).toBe('10');
});