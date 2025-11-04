import { HyperMath, HyperMathError, DivisionByZeroError } from './hypermath';

describe('HyperMath', () => {
  describe('multiply', () => {
    // Basic functionality
    it('should multiply two numbers correctly', () => {
      const result = HyperMath.multiply(2, 3);
      expect(result).toBe(6);
    });

    it('should multiply two values with decimals correctly', () => {
      const result = HyperMath.multiply(4, '2.5');
      expect(result).toBe(10);
    });

    it('should multiply two strings that represent numbers correctly', () => {
      const result = HyperMath.multiply('2', '3');
      expect(result).toBe(6);
    });

    // Precision handling
    it('should handle floating-point precision issues', () => {
      const result = HyperMath.multiply(0.1, 0.2);
      expect(result).toBe(0.02);
    });

    // Edge cases
    it('should return 0 when multiplying by 0', () => {
      expect(HyperMath.multiply(5, 0)).toBe(0);
      expect(HyperMath.multiply(0, 10)).toBe(0);
      expect(HyperMath.multiply(0, 0)).toBe(0);
    });

    it('should handle negative numbers', () => {
      expect(HyperMath.multiply(-2, 3)).toBe(-6);
      expect(HyperMath.multiply(-2, -3)).toBe(6);
      expect(HyperMath.multiply(2, -3)).toBe(-6);
    });

    // Invalid inputs
    it('should throw HyperMathError for invalid string input', () => {
      expect(() => HyperMath.multiply('abc', 3)).toThrow(HyperMathError);
      expect(() => HyperMath.multiply(5, 'xyz')).toThrow(HyperMathError);
    });

    it('should throw HyperMathError for null or undefined', () => {
      expect(() => HyperMath.multiply(null as any, 5)).toThrow(HyperMathError);
      expect(() => HyperMath.multiply(5, undefined as any)).toThrow(
        HyperMathError,
      );
      expect(() => HyperMath.multiply(null as any, undefined as any)).toThrow(
        HyperMathError,
      );
    });

    it('should throw HyperMathError for empty strings', () => {
      expect(() => HyperMath.multiply('', 5)).toThrow(HyperMathError);
      expect(() => HyperMath.multiply('  ', 10)).toThrow(HyperMathError);
    });

    it('should throw HyperMathError for NaN and Infinity', () => {
      expect(() => HyperMath.multiply(NaN, 5)).toThrow(HyperMathError);
      expect(() => HyperMath.multiply(Infinity, 5)).toThrow(HyperMathError);
      expect(() => HyperMath.multiply(-Infinity, 5)).toThrow(HyperMathError);
    });

    it('should trim whitespace from string inputs', () => {
      expect(HyperMath.multiply('  2.5  ', '  4  ')).toBe(10);
    });
  });

  describe('add', () => {
    // Basic functionality
    it('should add two numbers correctly', () => {
      const result = HyperMath.add(2, 3);
      expect(result).toBe(5);
    });

    it('should add two values with decimals correctly', () => {
      const result = HyperMath.add(2.5, '3.3');
      expect(result).toBe(5.8);
    });

    it('should add two strings that represent numbers correctly', () => {
      const result = HyperMath.add('2', '3');
      expect(result).toBe(5);
    });

    // Precision handling
    it('should handle floating-point precision issues', () => {
      const result = HyperMath.add(0.1, 0.2);
      expect(result).toBe(0.3);
    });

    // Edge cases
    it('should handle adding 0', () => {
      expect(HyperMath.add(5, 0)).toBe(5);
      expect(HyperMath.add(0, 10)).toBe(10);
      expect(HyperMath.add(0, 0)).toBe(0);
    });

    it('should handle negative numbers', () => {
      expect(HyperMath.add(-2, 3)).toBe(1);
      expect(HyperMath.add(-2, -3)).toBe(-5);
      expect(HyperMath.add(2, -3)).toBe(-1);
    });

    // Invalid inputs
    it('should throw HyperMathError for invalid string input', () => {
      expect(() => HyperMath.add('abc', 3)).toThrow(HyperMathError);
      expect(() => HyperMath.add(5, 'xyz')).toThrow(HyperMathError);
    });

    it('should throw HyperMathError for null or undefined', () => {
      expect(() => HyperMath.add(null as any, 5)).toThrow(HyperMathError);
      expect(() => HyperMath.add(5, undefined as any)).toThrow(HyperMathError);
      expect(() => HyperMath.add(null as any, undefined as any)).toThrow(
        HyperMathError,
      );
    });

    it('should throw HyperMathError for NaN and Infinity', () => {
      expect(() => HyperMath.add(NaN, 5)).toThrow(HyperMathError);
      expect(() => HyperMath.add(Infinity, 5)).toThrow(HyperMathError);
      expect(() => HyperMath.add(-Infinity, 5)).toThrow(HyperMathError);
    });

    // Variadic parameter tests
    describe('variadic parameters', () => {
      it('should throw HyperMathError when no parameters provided', () => {
        expect(() => (HyperMath.add as any)()).toThrow(HyperMathError);
        expect(() => (HyperMath.add as any)()).toThrow(
          'At least two values are required for addition',
        );
      });

      it('should throw HyperMathError when only one parameter provided', () => {
        expect(() => (HyperMath.add as any)(5)).toThrow(HyperMathError);
        expect(() => (HyperMath.add as any)(5)).toThrow(
          'At least two values are required for addition',
        );
      });

      it('should add three numbers correctly', () => {
        expect(HyperMath.add(1, 2, 3)).toBe(6);
        expect(HyperMath.add(10, 5, 2.5)).toBe(17.5);
      });

      it('should add multiple numbers correctly', () => {
        expect(HyperMath.add(1, 2, 3, 4, 5)).toBe(15);
        expect(HyperMath.add(0.1, 0.2, 0.3, 0.4)).toBe(1);
      });

      it('should handle mix of numbers and strings', () => {
        expect(HyperMath.add(1, '2', 3, '4', 5)).toBe(15);
        expect(HyperMath.add('10.5', 2.3, '5.2')).toBe(18);
      });

      it('should handle negative numbers in variadic calls', () => {
        expect(HyperMath.add(-1, -2, -3)).toBe(-6);
        expect(HyperMath.add(10, -5, 3, -2)).toBe(6);
      });

      it('should maintain precision with multiple values', () => {
        expect(HyperMath.add(0.1, 0.1, 0.1, 0.1, 0.1)).toBe(0.5);
        expect(HyperMath.add(1.11, 2.22, 3.33)).toBe(6.66);
      });

      it('should throw HyperMathError if any value is invalid', () => {
        expect(() => HyperMath.add(1, 2, 'abc', 4)).toThrow(HyperMathError);
        expect(() => HyperMath.add(1, null as any, 3)).toThrow(HyperMathError);
        expect(() => HyperMath.add(1, 2, NaN)).toThrow(HyperMathError);
      });

      it('should handle many parameters (10+)', () => {
        expect(HyperMath.add(1, 1, 1, 1, 1, 1, 1, 1, 1, 1)).toBe(10);
        expect(HyperMath.add(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)).toBe(4);
      });
    });
  });

  describe('divide', () => {
    // Basic functionality
    it('should divide two numbers correctly', () => {
      const result = HyperMath.divide(6, 2);
      expect(result).toBe(3);
    });

    it('should divide two values with decimals correctly', () => {
      const result = HyperMath.divide(6, '0.5');
      expect(result).toBe(12);
    });

    it('should divide two strings that represent numbers correctly', () => {
      const result = HyperMath.divide('6', '2');
      expect(result).toBe(3);
    });

    // Precision handling
    it('should handle floating-point precision issues', () => {
      const result = HyperMath.divide(0.3, 0.1);
      expect(result).toBe(3);
    });

    // Edge cases - Division by zero
    it('should throw DivisionByZeroError when dividing by 0', () => {
      expect(() => HyperMath.divide(5, 0)).toThrow(DivisionByZeroError);
      expect(() => HyperMath.divide(0, 0)).toThrow(DivisionByZeroError);
    });

    it('should return 0 when dividing 0 by a number', () => {
      expect(HyperMath.divide(0, 5)).toBe(0);
    });

    it('should handle negative numbers', () => {
      expect(HyperMath.divide(-6, 2)).toBe(-3);
      expect(HyperMath.divide(-6, -2)).toBe(3);
      expect(HyperMath.divide(6, -2)).toBe(-3);
    });

    it('should handle fractional division', () => {
      expect(HyperMath.divide(1, 3)).toBe(0.33);
      expect(HyperMath.divide(2, 3)).toBe(0.67);
    });

    // Invalid inputs
    it('should throw HyperMathError for invalid string input', () => {
      expect(() => HyperMath.divide('abc', 3)).toThrow(HyperMathError);
      expect(() => HyperMath.divide(5, 'xyz')).toThrow(HyperMathError);
    });

    it('should throw HyperMathError for null or undefined', () => {
      expect(() => HyperMath.divide(null as any, 5)).toThrow(HyperMathError);
      expect(() => HyperMath.divide(5, undefined as any)).toThrow(
        HyperMathError,
      );
    });

    it('should throw HyperMathError for NaN and Infinity', () => {
      expect(() => HyperMath.divide(NaN, 5)).toThrow(HyperMathError);
      expect(() => HyperMath.divide(Infinity, 5)).toThrow(HyperMathError);
    });
  });

  describe('subtract', () => {
    // Basic functionality
    it('should subtract two numbers correctly', () => {
      const result = HyperMath.subtract(7, 5);
      expect(result).toBe(2);
    });

    it('should subtract two values with decimals correctly', () => {
      const result = HyperMath.subtract(8.5, '3.3');
      expect(result).toBe(5.2);
    });

    it('should subtract two strings that represent numbers correctly', () => {
      const result = HyperMath.subtract('9', '5');
      expect(result).toBe(4);
    });

    // Precision handling
    it('should handle floating-point precision issues', () => {
      const result = HyperMath.subtract(0.3, 0.1);
      expect(result).toBe(0.2);
    });

    // Edge cases
    it('should handle subtracting 0', () => {
      expect(HyperMath.subtract(5, 0)).toBe(5);
      expect(HyperMath.subtract(0, 10)).toBe(-10);
      expect(HyperMath.subtract(0, 0)).toBe(0);
    });

    it('should handle negative numbers', () => {
      expect(HyperMath.subtract(-2, 3)).toBe(-5);
      expect(HyperMath.subtract(-2, -3)).toBe(1);
      expect(HyperMath.subtract(2, -3)).toBe(5);
    });

    it('should handle subtracting larger number from smaller', () => {
      expect(HyperMath.subtract(2, 5)).toBe(-3);
    });

    // Invalid inputs
    it('should throw HyperMathError for invalid string input', () => {
      expect(() => HyperMath.subtract('abc', 3)).toThrow(HyperMathError);
      expect(() => HyperMath.subtract(5, 'xyz')).toThrow(HyperMathError);
    });

    it('should throw HyperMathError for null or undefined', () => {
      expect(() => HyperMath.subtract(null as any, 5)).toThrow(HyperMathError);
      expect(() => HyperMath.subtract(5, undefined as any)).toThrow(
        HyperMathError,
      );
      expect(() => HyperMath.subtract(null as any, undefined as any)).toThrow(
        HyperMathError,
      );
    });

    it('should throw HyperMathError for NaN and Infinity', () => {
      expect(() => HyperMath.subtract(NaN, 5)).toThrow(HyperMathError);
      expect(() => HyperMath.subtract(Infinity, 5)).toThrow(HyperMathError);
    });

    // Variadic parameter tests
    describe('variadic parameters', () => {
      it('should throw HyperMathError when no parameters provided', () => {
        expect(() => (HyperMath.subtract as any)()).toThrow(HyperMathError);
        expect(() => (HyperMath.subtract as any)()).toThrow(
          'At least two values are required for subtraction',
        );
      });

      it('should throw HyperMathError when only one parameter provided', () => {
        expect(() => (HyperMath.subtract as any)(5)).toThrow(HyperMathError);
        expect(() => (HyperMath.subtract as any)(5)).toThrow(
          'At least two values are required for subtraction',
        );
      });

      it('should subtract three numbers correctly (left to right)', () => {
        expect(HyperMath.subtract(10, 3, 2)).toBe(5); // 10 - 3 - 2 = 5
        expect(HyperMath.subtract(100, 25, 5)).toBe(70); // 100 - 25 - 5 = 70
      });

      it('should subtract multiple numbers correctly', () => {
        expect(HyperMath.subtract(100, 10, 5, 2, 1)).toBe(82); // 100 - 10 - 5 - 2 - 1
        expect(HyperMath.subtract(20, 5, 3, 2, 1)).toBe(9); // 20 - 5 - 3 - 2 - 1
      });

      it('should handle mix of numbers and strings', () => {
        expect(HyperMath.subtract(100, '10', 5, '2')).toBe(83);
        expect(HyperMath.subtract('50.5', 10.2, '5.3')).toBe(35);
      });

      it('should handle negative numbers in variadic calls', () => {
        expect(HyperMath.subtract(10, -5, -3)).toBe(18); // 10 - (-5) - (-3) = 18
        expect(HyperMath.subtract(-10, -5, -3)).toBe(-2); // -10 - (-5) - (-3) = -2
      });

      it('should maintain precision with multiple values', () => {
        expect(HyperMath.subtract(1, 0.1, 0.1, 0.1, 0.1, 0.1)).toBe(0.5);
        expect(HyperMath.subtract(10.5, 1.1, 2.2, 3.3)).toBe(3.9);
      });

      it('should throw HyperMathError if any value is invalid', () => {
        expect(() => HyperMath.subtract(100, 10, 'abc', 5)).toThrow(
          HyperMathError,
        );
        expect(() => HyperMath.subtract(100, null as any, 5)).toThrow(
          HyperMathError,
        );
        expect(() => HyperMath.subtract(100, 10, NaN)).toThrow(HyperMathError);
      });

      it('should handle many parameters (10+)', () => {
        expect(HyperMath.subtract(100, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)).toBe(90);
        expect(HyperMath.subtract(10, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)).toBe(7);
      });

      it('should handle results that go negative', () => {
        expect(HyperMath.subtract(5, 10, 3)).toBe(-8); // 5 - 10 - 3 = -8
        expect(HyperMath.subtract(1, 2, 3, 4)).toBe(-8); // 1 - 2 - 3 - 4 = -8
      });
    });
  });

  describe('formatNumber', () => {
    // Basic functionality
    it('should format a number with more than 2 decimals correctly', () => {
      const result = HyperMath.formatNumber(3.14159);
      expect(result).toBe(3.14);
    });

    it('should format a number with less than 2 decimals correctly', () => {
      const result = HyperMath.formatNumber(5.1);
      expect(result).toBe(5.1);
    });

    it('should format an integer correctly', () => {
      const result = HyperMath.formatNumber(7);
      expect(result).toBe(7);
    });

    // Edge cases
    it('should handle zero correctly', () => {
      const result = HyperMath.formatNumber(0);
      expect(result).toBe(0);
    });

    it('should handle negative numbers correctly', () => {
      expect(HyperMath.formatNumber(-2.567)).toBe(-2.57);
      expect(HyperMath.formatNumber(-0.1)).toBe(-0.1);
    });

    it('should handle very small numbers', () => {
      expect(HyperMath.formatNumber(0.001)).toBe(0);
      expect(HyperMath.formatNumber(0.009)).toBe(0.01);
    });

    it('should handle very large numbers', () => {
      expect(HyperMath.formatNumber(123456789.999)).toBe(123456790);
    });

    // String inputs
    it('should handle string numbers correctly', () => {
      expect(HyperMath.formatNumber('3.14159' as any)).toBe(3.14);
      expect(HyperMath.formatNumber('  2.567  ' as any)).toBe(2.57);
    });

    // Invalid inputs
    it('should throw HyperMathError for invalid input', () => {
      expect(() => HyperMath.formatNumber(null as any)).toThrow(HyperMathError);
      expect(() => HyperMath.formatNumber(undefined as any)).toThrow(
        HyperMathError,
      );
      expect(() => HyperMath.formatNumber(NaN)).toThrow(HyperMathError);
      expect(() => HyperMath.formatNumber(Infinity)).toThrow(HyperMathError);
    });

    it('should throw HyperMathError for invalid string input', () => {
      expect(() => HyperMath.formatNumber('abc' as any)).toThrow(
        HyperMathError,
      );
      expect(() => HyperMath.formatNumber('' as any)).toThrow(HyperMathError);
    });

    it('should round correctly', () => {
      // Basic rounding verification
      expect(HyperMath.formatNumber(1.126)).toBe(1.13);
      expect(HyperMath.formatNumber(2.224)).toBe(2.22);
    });
  });
describe('HyperMath.processInput', () => {
  // Valid numbers
  it('should return the same number for valid number input', () => {
    expect((HyperMath as any).processInput(42)).toBe(42);
    expect((HyperMath as any).processInput(-3.14)).toBe(-3.14);
    expect((HyperMath as any).processInput(0)).toBe(0);
  });

  // Valid strings
  it('should parse valid numeric strings', () => {
    expect((HyperMath as any).processInput('42')).toBe(42);
    expect((HyperMath as any).processInput('  -3.14  ')).toBe(-3.14);
    expect((HyperMath as any).processInput('0')).toBe(0);
    expect((HyperMath as any).processInput('2.5')).toBe(2.5);
    expect((HyperMath as any).processInput('1.63575')).toBe(1.63575);
  });

  // Empty string
  it('should throw HyperMathError for empty string', () => {
    expect(() => (HyperMath as any).processInput('')).toThrow(HyperMathError);
    expect(() => (HyperMath as any).processInput('   ')).toThrow(
      HyperMathError,
    );
  });

  // Invalid strings
  it('should throw HyperMathError for non-numeric strings', () => {
    expect(() => (HyperMath as any).processInput('abc')).toThrow(
      HyperMathError,
    );
    expect(() => (HyperMath as any).processInput('3.14abc')).toThrow(
      HyperMathError,
    );
    expect(() => (HyperMath as any).processInput('NaN')).toThrow(
      HyperMathError,
    );
    expect(() => (HyperMath as any).processInput('Infinity')).toThrow(
      HyperMathError,
    );
  });

  // Null and undefined
  it('should throw HyperMathError for null or undefined', () => {
    expect(() => (HyperMath as any).processInput(null)).toThrow(HyperMathError);
    expect(() => (HyperMath as any).processInput(undefined)).toThrow(
      HyperMathError,
    );
  });

  // NaN and Infinity
  it('should throw HyperMathError for NaN and Infinity number inputs', () => {
    expect(() => (HyperMath as any).processInput(NaN)).toThrow(HyperMathError);
    expect(() => (HyperMath as any).processInput(Infinity)).toThrow(
      HyperMathError,
    );
    expect(() => (HyperMath as any).processInput(-Infinity)).toThrow(
      HyperMathError,
    );
  });

  // Unsupported types
  it('should throw HyperMathError for unsupported types', () => {
    expect(() => (HyperMath as any).processInput({})).toThrow(HyperMathError);
    expect(() => (HyperMath as any).processInput([])).toThrow(HyperMathError);
    expect(() => (HyperMath as any).processInput(true)).toThrow(HyperMathError);
    expect(() => (HyperMath as any).processInput(Symbol('sym'))).toThrow(
      HyperMathError,
    );
    expect(() => (HyperMath as any).processInput(() => 1)).toThrow(
      HyperMathError,
    );
  });
});
describe('HyperMath.formatResult', () => {
  // Valid finite numbers
  it('should format a number to 2 decimal places', () => {
    expect((HyperMath as any).formatResult(3.14159)).toBe(3.14);
    expect((HyperMath as any).formatResult(5.1)).toBe(5.1);
    expect((HyperMath as any).formatResult(7)).toBe(7);
    expect((HyperMath as any).formatResult(-2.567)).toBe(-2.57);
    expect((HyperMath as any).formatResult(-0.1)).toBe(-0.1);
    expect((HyperMath as any).formatResult(0.001)).toBe(0);
    expect((HyperMath as any).formatResult(0.009)).toBe(0.01);
    expect((HyperMath as any).formatResult(123456789.999)).toBe(123456790);
    expect((HyperMath as any).formatResult(1.126)).toBe(1.13);
    expect((HyperMath as any).formatResult(2.224)).toBe(2.22);
    expect((HyperMath as any).formatResult(0)).toBe(0);
  });

  // Non-finite numbers
  it('should throw HyperMathError for NaN', () => {
    expect(() => (HyperMath as any).formatResult(NaN)).toThrow(HyperMathError);
  });

  it('should throw HyperMathError for Infinity', () => {
    expect(() => (HyperMath as any).formatResult(Infinity)).toThrow(
      HyperMathError,
    );
    expect(() => (HyperMath as any).formatResult(-Infinity)).toThrow(
      HyperMathError,
    );
  });
});
});
