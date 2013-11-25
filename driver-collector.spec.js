/**
 * services/driver-collector specs
 */

	// Global Dependencies
var path = require('path'),

	// PoliteJS Dependencies
	driverCollector = require('../src/services/driver-collector')
	;

describe('Driver Collector', function () {

	beforeEach(function () {
		driverCollector.init();
	});

	afterEach(function () {
		driverCollector.dispose();
	});


	/**
	 * this test the behavior of the registered driver
	 */
	it('should register a driverFn', function () {
		var now = new Date().getTime(),
			driverFn = function () {
				return now;
			};
		driverCollector.register('get-time', driverFn);
		expect(
			driverCollector.locate('get-time')()
		).to.equal(now);
	});


	/**
	 * this test the behavior of a give fallback driver
	 * when locating a non existent driver
	 */
	it('should return false if no driver was found', function () {
		expect(
			driverCollector.locate('get-time')
		).to.equal(false);
	});


	it('should load drivers from a folder', function () {
		driverCollector.registerMany(path.resolve(__dirname + '/driver-collector-fixtures'));
		expect(
			driverCollector.locate('double-a-number')(2)
		).to.equal(4);
	});


});