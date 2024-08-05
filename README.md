# HyperMath

HyperMath is a simple JavaScript/TypeScript library designed to address common pitfalls in JavaScript math operations. It provides a set of static methods for basic arithmetic operations with improved precision and input handling.

![Codecov](https://img.shields.io/codecov/c/github/hyperteksolutions/hypermath)
[![Npm package version](https://badgen.net/npm/v/hypermath)](https://npmjs.com/package/hypermath)
[![NPM Package Downloads](https://badgen.net/npm/dt/hypermath)](https://npmjs.com/package/hypermath)
[![Try on RunKit](https://badge.runkitcdn.com/hypermath.svg)](https://runkit.com/npm/hypermath)
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
```

## Features

- Handles both number and string inputs
- Attempts to maintain precision up to 2 significant digits
- Provides static methods for multiplication, addition, and division
- Throws an error for invalid string inputs

## API

### `HyperMath.multiply(firstValue: number | string, secondValue: number | string): number`

Multiplies two numbers with improved precision.

### `HyperMath.add(firstValue: number | string, secondValue: number | string): number`

Adds two numbers with improved precision.

### `HyperMath.divide(firstValue: number | string, secondValue: number | string): number`

Divides two numbers with improved precision.

### `HyperMath.subtract(firstValue: number | string, secondValue: number | string): number`

Subtracts two numbers with improved precision.

## Notes

- This library uses `toPrecision(2)` internally, which may lead to rounding in some cases. Be aware of this limitation when using the library for calculations requiring high precision.
- Input strings are parsed to numbers. Invalid string inputs will throw an error.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
