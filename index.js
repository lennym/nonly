const Runner = require('mocha').Runner;

const run = Runner.prototype.run;

Runner.prototype.run = function (fn) {
  this.suite.afterAll(() => {
    if (this.failures) {
      return;
    }
    const total = this.total;
    const run = this.stats.passes;
    const percent = Math.round(100*run/total);
    if (run / total < 0.9) {
      this.failures++;
      // wrap in `end` event to output logs after reporter has finished
      this.on('end', () => {
        console.log(`  Only ${percent}% of the tests in this suite were executed.`);
        console.log('  You should check your code for `only` statements.');
        console.log();
        console.log(`  Total tests:    ${total}`);
        console.log(`  Executed tests: ${run}`);
        console.log(`  % executed:     ${percent}%`);
        console.log();
      });
    }
  });
  run.call(this, fn);
};
