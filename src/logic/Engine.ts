export class Engine {
  public add(prevValue: string, value: string): string {
    return (parseFloat(prevValue) + parseFloat(value)).toString();
  }

  public subtract(prevValue: string, value: string): string {
    return (parseFloat(prevValue) - parseFloat(value)).toString();
  }

  public multiply(prevValue: string, value: string): string {
    return (parseFloat(prevValue) * parseFloat(value)).toString();
  }

  public divide(prevValue: string, value: string): string {
    if (this.isDivisionByZero(prevValue, value)) return "Error";
    return (parseFloat(prevValue) / parseFloat(value)).toString();
  }

  public percentage(value: string): string {
    return (parseFloat(value) / 100).toString();
  }

  public changeSign(value: string): string {
    return parseFloat(value) === 0 ? "0" : (parseFloat(value) * -1).toString();
  }

  private isDivisionByZero(prevValue: string, value: string): boolean {
    const num = parseFloat(value);
    return (parseFloat(prevValue) === 0 && num === 0) || num === 0;
  }
}
