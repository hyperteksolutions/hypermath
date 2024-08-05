export class HyperMath {
  static processInput(value: number | string): number {
    if (!value) {
      throw new Error('Invalid input');
    }
    if (typeof value === 'string') {
      if (isNaN(parseInt(value))) {
        throw new Error('Invalid input');
      }
      value = parseFloat(parseFloat(value).toPrecision(2));
    }
    return value;
  }

  public static multiply(
    firstValue: number | string,
    secondValue: number | string,
  ): number {
    let a = this.processInput(firstValue);
    let b = this.processInput(secondValue);
    let numberOne = parseFloat(a.toPrecision(2));
    let numberTwo = parseFloat(b.toPrecision(2));
    let result = numberOne * numberTwo;
    result = parseFloat(result.toPrecision(2));
    return result;
  }

  public static add(
    firstValue: number | string,
    secondValue: number | string,
  ): number {
    let a = this.processInput(firstValue);
    let b = this.processInput(secondValue);
    let numberOne = parseFloat(a.toPrecision(2));
    let numberTwo = parseFloat(b.toPrecision(2));
    let result = numberOne + numberTwo;
    result = parseFloat(result.toPrecision(2));
    return result;
  }

  public static divide(
    firstValue: number | string,
    secondValue: number | string,
  ): number {
    let a = this.processInput(firstValue);
    let b = this.processInput(secondValue);
    let numberOne = parseFloat(a.toPrecision(2));
    let numberTwo = parseFloat(b.toPrecision(2));
    let result = numberOne / numberTwo;
    result = parseFloat(result.toPrecision(2));
    return result;
  }

  public static subtract(
    firstValue: number | string,
    secondValue: number | string,
  ): number {
    let a = this.processInput(firstValue);
    let b = this.processInput(secondValue);
    let numberOne = parseFloat(a.toPrecision(2));
    let numberTwo = parseFloat(b.toPrecision(2));
    let result = numberOne - numberTwo;
    result = parseFloat(result.toPrecision(2));
    return result;
  }
}
