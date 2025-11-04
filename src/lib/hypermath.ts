/**
 * Custom error class for HyperMath operations
 */
export class HyperMathError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HyperMathError';
  }
}

/**
 * Custom error class for division by zero
 */
export class DivisionByZeroError extends HyperMathError {
  constructor() {
    super('Division by zero is not allowed');
    this.name = 'DivisionByZeroError';
  }
}

/**
 * HyperMath - A precision-focused arithmetic library for JavaScript/TypeScript
 *
 * Solves common floating-point precision issues in JavaScript by maintaining
 * precision up to 2 decimal places for all arithmetic operations.
 */
export class HyperMath {
  private static readonly DECIMAL_PLACES = 2;
  private static readonly MAX_SAFE_NUMBER = Number.MAX_SAFE_INTEGER;
  private static readonly MIN_SAFE_NUMBER = Number.MIN_SAFE_INTEGER;

  /**
   * Validates and converts input to a properly formatted number
   *
   * @param value - Input value (number or string)
   * @returns Parsed number
   * @throws {HyperMathError} If input is null, undefined, NaN, Infinity, non-numeric string, or unsupported type
   */
  private static processInput(value: unknown): number {
    // Handle null and undefined
    if (value === null || value === undefined) {
      throw new HyperMathError(`Invalid input: received ${value}`);
    }

    // Handle numbers
    if (typeof value === 'number') {
      // Check for NaN and Infinity
      if (!Number.isFinite(value)) {
        throw new HyperMathError(`Invalid input: received ${value}`);
      }
      return value;
    }

    // Handle strings
    if (typeof value === 'string') {
      const trimmedValue = value.trim();

      // Empty string check
      if (trimmedValue === '') {
        throw new HyperMathError('Invalid input: empty string');
      }

      // Use Number() instead of parseFloat() to ensure the entire string is valid
      // Number() returns NaN for strings with trailing non-numeric characters
      // while parseFloat() would parse '3.14abc' as 3.14
      const parsedNumber = Number(trimmedValue);

      // Check if parsing was successful and result is finite
      if (!Number.isFinite(parsedNumber)) {
        throw new HyperMathError(
          `Invalid input: "${value}" cannot be parsed to a valid number`,
        );
      }

      return parsedNumber;
    }

    // Any other type
    throw new HyperMathError(
      `Invalid input: unsupported type "${typeof value}"`,
    );
  }

  /**
   * Formats a number to the specified decimal places
   *
   * @param value - Number to format
   * @returns Formatted number
   * @throws {HyperMathError} If the result is not a finite number
   */
  private static formatResult(value: number): number {
    // Guard against extreme values
    if (!Number.isFinite(value)) {
      throw new HyperMathError(
        `Operation resulted in non-finite number: ${value}`,
      );
    }
    return parseFloat(value.toFixed(this.DECIMAL_PLACES));
  }

  /**
   * Multiplies two numbers with precision handling
   *
   * @param firstValue - First number (number or string)
   * @param secondValue - Second number (number or string)
   * @returns Product of the two numbers, formatted to 2 decimal places
   *
   * @example
   * HyperMath.multiply(0.1, 0.2) // Returns 0.02 instead of 0.020000000000000004
   * HyperMath.multiply('10.5', '2.5') // Returns 26.25
   */
  public static multiply(firstValue: unknown, secondValue: unknown): number {
    const a = this.processInput(firstValue);
    const b = this.processInput(secondValue);

    // Both values are 0 or one of them became 0 due to invalid input
    const result = a * b;
    return this.formatResult(result);
  }

  /**
   * Adds two numbers with precision handling
   *
   * @param firstValue - First number (number or string)
   * @param secondValue - Second number (number or string)
   * @returns Sum of the two numbers, formatted to 2 decimal places
   *
   * @example
   * HyperMath.add(0.1, 0.2) // Returns 0.3 instead of 0.30000000000000004
   * HyperMath.add('10.5', '2.3') // Returns 12.8
   */
  public static add(firstValue: unknown, secondValue: unknown): number {
    const a = this.processInput(firstValue);
    const b = this.processInput(secondValue);

    const result = a + b;
    return this.formatResult(result);
  }

  /**
   * Divides two numbers with precision handling
   *
   * @param firstValue - Dividend (number or string)
   * @param secondValue - Divisor (number or string)
   * @returns Quotient of the two numbers, formatted to 2 decimal places
   * @throws {DivisionByZeroError} If divisor is 0
   * @throws {HyperMathError} If inputs are invalid
   *
   * @example
   * HyperMath.divide(0.3, 0.1) // Returns 3 instead of 2.9999999999999996
   * HyperMath.divide('10', '2.5') // Returns 4
   */
  public static divide(firstValue: unknown, secondValue: unknown): number {
    const a = this.processInput(firstValue);
    const b = this.processInput(secondValue);

    // Division by zero protection
    if (b === 0) {
      throw new DivisionByZeroError();
    }

    const result = a / b;
    return this.formatResult(result);
  }

  /**
   * Subtracts two numbers with precision handling
   *
   * @param firstValue - Minuend (number or string)
   * @param secondValue - Subtrahend (number or string)
   * @returns Difference of the two numbers, formatted to 2 decimal places
   *
   * @example
   * HyperMath.subtract(0.3, 0.1) // Returns 0.2 instead of 0.19999999999999998
   * HyperMath.subtract('10.5', '2.3') // Returns 8.2
   */
  public static subtract(firstValue: unknown, secondValue: unknown): number {
    const a = this.processInput(firstValue);
    const b = this.processInput(secondValue);

    const result = a - b;
    return this.formatResult(result);
  }

  /**
   * Formats a number to 2 decimal places without performing arithmetic
   *
   * @param value - Number to format (number or string)
   * @returns Number formatted to 2 decimal places
   *
   * @example
   * HyperMath.formatNumber(3.14159) // Returns 3.14
   * HyperMath.formatNumber('2.567') // Returns 2.57
   * HyperMath.formatNumber(0.1 + 0.2) // Returns 0.3
   */
  public static formatNumber(value: unknown): number {
    const processed = this.processInput(value);
    return this.formatResult(processed);
  }
}
