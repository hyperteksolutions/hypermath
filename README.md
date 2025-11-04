# HyperMath

HyperMath is a simple JavaScript/TypeScript library designed to address common pitfalls in JavaScript math operations. It provides a set of static methods for basic arithmetic operations with improved precision and robust error handling.

![Codecov](https://img.shields.io/codecov/c/github/hyperteksolutions/hypermath)
[![Npm package version](https://badgen.net/npm/v/hypermath)](https://npmjs.com/package/hypermath)
[![NPM Package Downloads](https://badgen.net/npm/dt/hypermath)](https://npmjs.com/package/hypermath)
[![License](https://img.shields.io/github/license/hyperteksolutions/hypermath)](https://github.com/HypertekSolutions/hypermath/blob/master/LICENSE)

## Installation

```bash
npm install hypermath
```

## Usage

```typescript
import { HyperMath } from 'hypermath';

// Multiplication
console.log(HyperMath.multiply(0.1, 0.2)); // 0.02 (instead of 0.020000000000000004)

// Addition
console.log(HyperMath.add(0.1, 0.2)); // 0.3 (instead of 0.30000000000000004)

// Division
console.log(HyperMath.divide(0.3, 0.1)); // 3 (instead of 2.9999999999999996)

// Subtraction
console.log(HyperMath.subtract(0.3, 0.1)); // 0.2 (instead of 0.19999999999999998)

// Format a number
console.log(HyperMath.formatNumber(1.12345)); // 1.12

// String inputs are supported
console.log(HyperMath.multiply('10.5', '2.5')); // 26.25
```

## Error Handling

The library now throws `HyperMathError` for invalid inputs:

```typescript
import { HyperMath, HyperMathError } from 'hypermath';

try {
  HyperMath.add(null, 5); // Throws HyperMathError
} catch (error) {
  if (error instanceof HyperMathError) {
    console.error(error.message); // "Invalid input provided: null"
  }
}

// Invalid string inputs also throw errors
HyperMath.multiply('abc', '123'); // Throws HyperMathError: "Invalid input provided: abc"

// Division by zero throws an error
HyperMath.divide(10, 0); // Throws HyperMathError: "Division by zero is not allowed"
```

## Features

- **Precision handling**: Maintains precision up to 2 decimal places using `.toFixed(2)`
- **Flexible inputs**: Handles both number and string inputs seamlessly
- **Robust error handling**: Throws descriptive `HyperMathError` exceptions for invalid inputs
- **Edge case protection**: Proper handling of division by zero and invalid operations
- **TypeScript support**: Full TypeScript definitions included
- **Zero dependencies**: Lightweight with no external dependencies
- **Comprehensive tests**: 52+ unit tests ensuring reliability

## API

### `HyperMath.multiply(firstValue: number | string, secondValue: number | string): number`

Multiplies two numbers with improved precision.

**Parameters:**
- `firstValue`: Number or string to multiply
- `secondValue`: Number or string to multiply

**Returns:** The product rounded to 2 decimal places

**Throws:** `HyperMathError` if inputs are invalid (null, undefined, or non-numeric strings)

---

### `HyperMath.add(firstValue: number | string, secondValue: number | string): number`

Adds two numbers with improved precision.

**Parameters:**
- `firstValue`: Number or string to add
- `secondValue`: Number or string to add

**Returns:** The sum rounded to 2 decimal places

**Throws:** `HyperMathError` if inputs are invalid

---

### `HyperMath.divide(firstValue: number | string, secondValue: number | string): number`

Divides two numbers with improved precision.

**Parameters:**
- `firstValue`: Dividend (number or string)
- `secondValue`: Divisor (number or string)

**Returns:** The quotient rounded to 2 decimal places

**Throws:** 
- `HyperMathError` if inputs are invalid
- `HyperMathError` with message "Division by zero is not allowed" if divisor is 0

---

### `HyperMath.subtract(firstValue: number | string, secondValue: number | string): number`

Subtracts two numbers with improved precision.

**Parameters:**
- `firstValue`: Number or string (minuend)
- `secondValue`: Number or string to subtract (subtrahend)

**Returns:** The difference rounded to 2 decimal places

**Throws:** `HyperMathError` if inputs are invalid

---

### `HyperMath.formatNumber(number: number | string): number`

Formats a number to maintain precision up to 2 decimal places.

**Parameters:**
- `number`: Number or string to format

**Returns:** The formatted number rounded to 2 decimal places

**Throws:** `HyperMathError` if input is invalid

## Migration from v0.0.x

⚠️ **Version 0.1.0 introduces breaking changes.** If you're upgrading from v0.0.x, please note:

### What Changed

In previous versions (v0.0.x), invalid inputs would silently return `0` with a console warning. **Now, errors are thrown** for better error handling and debugging.

**Old Behavior (v0.0.x):**
```typescript
HyperMath.multiply('invalid', 5);  // Returned 0 (with console warning)
HyperMath.divide(10, 0);           // Returned 0
```

**New Behavior (v0.1.0+):**
```typescript
HyperMath.multiply('invalid', 5);  // Throws HyperMathError ❌
HyperMath.divide(10, 0);           // Throws DivisionByZeroError ❌
```

### How to Update Your Code

Wrap operations in try-catch blocks where invalid input is possible:

```typescript
// Before (v0.0.x) - unsafe
const result = HyperMath.multiply(userInput, 5);

// After (v0.1.0+) - safe
try {
  const result = HyperMath.multiply(userInput, 5);
  // Use result...
} catch (error) {
  if (error instanceof HyperMathError) {
    console.error('Invalid input:', error.message);
    // Handle error appropriately
  }
}
```

See [CHANGELOG.md](CHANGELOG.md) for complete migration guide.

## Notes

- **Precision**: This library uses `.toFixed(2)` internally to maintain precision up to 2 decimal places. This may lead to rounding in some cases. Be aware of this limitation when using the library for calculations requiring higher precision.
- **Error handling**: The library now throws `HyperMathError` exceptions instead of returning 0 for invalid inputs. Make sure to handle these errors appropriately in your code.
- **Edge cases**:
  - **Division by zero**: Throws `DivisionByZeroError` instead of returning 0
  - **Invalid inputs**: Any null, undefined, or non-numeric string values will throw `HyperMathError`
  - **String parsing**: String inputs are validated using `Number()` to ensure the entire string is numeric. Strings with trailing non-numeric characters (e.g., `"123abc"`) will throw `HyperMathError`
- **Type safety**: TypeScript users benefit from full type definitions and the custom `HyperMathError` class for better error handling

## Support

If you encounter any issues or have questions, please open an issue on the [GitHub repository](https://github.com/hyperteksolutions/hypermath/issues).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
