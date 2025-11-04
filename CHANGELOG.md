# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- ✨ **Variadic Parameters**: `add()` and `subtract()` now support multiple arguments
  - `HyperMath.add(1, 2, 3, 4, 5)` returns `15`
  - `HyperMath.subtract(100, 10, 5, 2)` returns `83`
  - Minimum 2 parameters required (maintains backward compatibility)
  - All values are validated and processed with the same precision handling

### Changed
- 🔧 **API Enhancement**: Updated `add()` and `subtract()` to use rest parameters (`...values`)
- 📝 **Documentation**: Updated README and JSDoc comments to reflect variadic parameter support

### Testing
- ✅ Added 19 new tests for variadic parameter functionality
- ✅ Test suite now includes 81 tests (up from 62)
- ✅ Comprehensive coverage of multi-parameter scenarios, edge cases, and error conditions

### Technical Notes
- **Backward Compatibility**: Existing two-parameter calls continue to work without changes
- **Type Safety**: Full TypeScript support with proper type inference for rest parameters
- **Performance**: Uses efficient `reduce()` implementation for processing multiple values

### Fixed
- 🐛 **String validation**: Changed from `parseFloat()` to `Number()` for string input validation to properly reject strings with trailing non-numeric characters (e.g., `"3.14abc"` now throws `HyperMathError` instead of being parsed as `3.14`)

## [0.1.0] - 2025-11-04

### ⚠️ BREAKING CHANGES

This release introduces **breaking changes** that will require code updates for existing users.

#### Error Handling Changes

**Previous Behavior (v0.0.x):**
- Invalid inputs (null, undefined, non-numeric strings) were silently handled
- Methods returned `0` and logged warnings to console
- Division by zero returned `0`

**New Behavior (v0.1.0+):**
- Invalid inputs now throw `HyperMathError` exceptions
- Division by zero throws `DivisionByZeroError` (extends `HyperMathError`)
- No silent failures - all errors must be handled

#### Migration Guide

**Before (v0.0.x):**
```typescript
import { HyperMath } from 'hypermath';

// Silent failure - returns 0 on error
const result = HyperMath.multiply(userInput, 5);
const quotient = HyperMath.divide(10, 0); // Returns 0
```

**After (v0.1.0+):**
```typescript
import { HyperMath, HyperMathError, DivisionByZeroError } from 'hypermath';

// Proper error handling required
try {
  const result = HyperMath.multiply(userInput, 5);
} catch (error) {
  if (error instanceof HyperMathError) {
    console.error('Invalid input:', error.message);
    // Handle error appropriately
  }
}

// Division by zero protection
try {
  const quotient = HyperMath.divide(10, divisor);
} catch (error) {
  if (error instanceof DivisionByZeroError) {
    console.error('Cannot divide by zero');
  }
}
```

#### Behavior Corrections

- **`subtract(0, n)`**: Now correctly returns `-n` instead of `0`
- **`divide(0, n)`**: Now correctly returns `0` (unchanged)
- **Edge case handling**: Proper handling of NaN, Infinity, and extreme values

### Added

- ✨ **Custom Error Classes**
  - `HyperMathError`: Base error class for all HyperMath errors
  - `DivisionByZeroError`: Specific error for division by zero operations
  
- 📚 **Comprehensive Documentation**
  - JSDoc comments for all public methods
  - Detailed parameter and return type documentation
  - Error throwing documentation with examples
  
- ✅ **Robust Test Coverage**
  - Expanded from 4 to 52 unit tests
  - Edge case testing (negative numbers, zero handling, precision)
  - Invalid input testing for all methods
  - All tests passing with 100% coverage of core functionality

- 🛡️ **Enhanced Input Validation**
  - Validates null, undefined, NaN, Infinity
  - Trims whitespace from string inputs
  - Better error messages with context
  - Type checking for unsupported types

- 📦 **Package Configuration**
  - Added `types` field for TypeScript definitions
  - Added `files` field to optimize package size
  - Only distributes necessary files (dist, README, LICENSE)

### Changed

- 🔧 **Code Refactoring**
  - Extracted `processInput()` as private helper method
  - Extracted `formatResult()` as private helper method
  - Cleaner, more maintainable code structure
  - Better separation of concerns

- 📖 **README Improvements**
  - Added error handling section with examples
  - Enhanced API documentation with parameters and throws
  - Added edge cases documentation
  - Corrected technical inaccuracies (`.toFixed()` vs `.toPrecision()`)
  - Added support section with GitHub issues link
  - Updated features list with accurate descriptions

### Fixed

- 🐛 **Subtract method**: Now correctly handles `subtract(0, n)` returning `-n` instead of `0`
- 🐛 **Precision documentation**: Corrected claims about "2 significant digits" to "2 decimal places"

### Technical Details

- **Error Types**: All methods now throw typed errors for better error handling
- **Input Processing**: Unified input validation across all methods
- **TypeScript Support**: Full type safety with exported error classes
- **Zero Dependencies**: Remains lightweight with no external dependencies

---

## [0.0.10] - Previous Release

### Features
- Basic arithmetic operations (multiply, add, divide, subtract)
- Precision handling up to 2 decimal places
- String and number input support
- Console warnings for invalid inputs

### Behavior
- Silent failure mode (returns 0 on errors)
- Console.warn for invalid inputs
- Limited edge case handling

---

## Upgrading from v0.0.x to v0.1.0

### Required Changes

1. **Wrap arithmetic operations in try-catch blocks** where invalid input is possible
2. **Import error classes** if you need to catch specific error types
3. **Remove any code** that relied on `0` being returned for invalid inputs
4. **Update tests** to expect thrown errors instead of `0` returns

### Benefits

- ✅ Better error visibility and debugging
- ✅ More predictable behavior
- ✅ Proper TypeScript error typing
- ✅ Production-ready error handling
- ✅ Comprehensive test coverage

### Support

If you encounter issues upgrading, please:
- Check the [README](README.md) for updated usage examples
- Review the error handling section
- Open an issue on [GitHub](https://github.com/hyperteksolutions/hypermath/issues)

---

[0.1.0]: https://github.com/hyperteksolutions/hypermath/compare/v0.0.10...v0.1.0
[0.0.10]: https://github.com/hyperteksolutions/hypermath/releases/tag/v0.0.10
