import { HyperMath } from './hypermath';

describe('HyperMath', () => {
  describe('multiply', () => {
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

    it('should throw an error if the input is invalid', () => {
      expect(() => {
        HyperMath.multiply('abc', 3);
      }).toThrow('Invalid input');
    });
  });

  describe('add', () => {
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

    it('should throw an error if the input is invalid', () => {
      expect(() => {
        HyperMath.add('abc', 3);
      }).toThrow('Invalid input');
    });
  });

  describe('divide', () => {
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

    it('should throw an error if the input is invalid', () => {
      expect(() => {
        HyperMath.divide('abc', 3);
      }).toThrow('Invalid input');
    });
  });
});
