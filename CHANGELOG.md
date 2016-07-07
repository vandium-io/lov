# Change Log

## 1.3.1 (2016-07-07)

### Fixed:

* Email validation not working properly

## 1.3.0 (2016-06-21)

### New:

* Added `lov.array().ordered()` with multiple type validation.

### Improved:

* Updated `lov.array().items()` to validate using multiple types.

## 1.2.1 (2016-06-14)

### Fixed:

* Empty values were being assigned value of `undefined` when empty.


## 1.2.0 (2016-06-08)

### Improved:

* String validator calling `toString()` on objects an other values that should not be parsed.

### Fixed:

* Single value case for `undefined` values was causing a new object to be created.

## 1.1.0 (2016-05-26)

### New:

* Added `lov.alternatives()` and `lov.either()`

### Improved:

* Result value now contains original value on error events, and error is set to `null` when validation is successful.
* No longer requires a schema object to validate a single value.

### Changes:

* No longer updates the value automatically. Use `updateValues = true` option to update the value object.

## 1.0.1 (2016-04-26)

Initial Release
