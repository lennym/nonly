# nonly

A plugin for mocha that will cause your test suite to fail if less than 90% of the tests in the suite are executed.

This helps to catch erroneous `.only` statements that might be added for development/debugging but get accidentally committed.

## Usage

To use simply pass `nonly` as a value to the `--require` flag for mocha

```
$ mocha --require nonly
```

Or add the following line to your `mocha.opts` file:

```
--require nonly
```

## How is this different to mocha's `--forbid-only`?

The `--forbid-only` flag causes test suites to fail completely without executing when `.only` is used. This means that if someone is using `.only` locally for development and debugging then they'll likely also remove this flag to allow the test suite to run.

That means they're potentially likely to also accidentally commit the removal of this flag.

Using `nonly` allows the test suites to run exactly as normal, and only fails if test execution falls below 90%.
