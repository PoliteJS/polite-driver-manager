/**
 * services/driver-collector specs
 */

	// Global Dependencies
var path = require('path'),

	// PoliteJS Dependencies
	DriverCollector = require('../src/pdm')
	;

describe('Polite Driver Collector', function () {

	beforeEach(function () {
		DriverCollector.init();
	});

	afterEach(function () {
		DriverCollector.dispose();
	});


	/**
	 * this test the behavior of the registered driver
	 */
	it('should register a driverFn', function () {
		var now = new Date().getTime(),
			driverFn = function () {
				return now;
			};
		DriverCollector.register('get-time', driverFn);
		expect(
			DriverCollector.locate('get-time')()
		).to.equal(now);
	});


	/**
	 * this test the behavior of a give fallback driver
	 * when locating a non existent driver
	 */
	it('should return false if no driver was found', function () {
		expect(
			DriverCollector.locate('get-time')
		).to.equal(false);
	});


	it('should load drivers from a folder', function () {
		DriverCollector.registerMany(path.resolve(__dirname + '/driver-collector-fixtures'));
		expect(
			DriverCollector.locate('double-a-number')(2)
		).to.equal(4);
	});


});