# Change Log

## 1.1.0 (TBD)

New:

* Added `lov.alternatives()` and `lov.either()`

Improved:

* Result value now contains original value on error events, and error is set to `null` when validation is successful.
* No longer requires a schema object to validate a single value.

Changes:

* No longer updates the value automatically. Use `updateValues = true` option to update the value object.

## 1.0.1 (2016-04-26)

Initial Release
