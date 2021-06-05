import { Engine } from "../components/Calculator/Engine";

test('Engine Test', () => {
    const engine = new Engine();
    expect(engine.add('135', '100')).toBe('235');
    expect(engine.subtract('135', '100')).toBe('35');
    expect(engine.multiply('100', '400')).toBe('40000');
    expect(engine.divide('100', '25')).toBe('4');
    expect(engine.divide('0', '0')).toBe('Error');
    expect(engine.divide('30', '0')).toBe('Error');
    expect(engine.percentage('30')).toBe('0.3');
    expect(engine.changeSign('-5')).toBe('5');
    expect(engine.changeSign('5')).toBe('-5');
});