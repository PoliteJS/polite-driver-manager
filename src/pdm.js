/**
 * Polite Driver Manager
 * register and run hooks granting extendability
 *
 */


var fs = require('fs'),
	path = require('path');

// ------------------------------------------------------------------------------------ //
// ---[[   C O N S T R U C T O R   A N D   L I F E C Y C L E   U T I L I T I E S   ]]-- //
// ------------------------------------------------------------------------------------ //

var drivers = {};

module.exports.init = function() {
	drivers = {};
};

module.exports.dispose = function() {
	drivers = {};
};





// --------------------------------------------------- //
// ---[[   A P I   I M P L E M E N T A T I O N   ]]--- //
// --------------------------------------------------- //

/**
 * register a driver overriding existing one
 */
module.exports.register = function(driverName, driverFn) {
	drivers[driverName] = driverFn;
	return this;
};

/**
 * - true if register happen
 * - false if a driver was already defined
 */
module.exports.registerSafe = function() {};

/**
 * syncronous utility to load all drivers in a folder
 * @param sourceFolder
 * @param callback
 */
module.exports.registerMany = function(sourceFolder) {
	var self = this,
		sourcePath = path.resolve(sourceFolder);

	if (fs.existsSync(sourcePath)) {
		fs.readdirSync(sourcePath).forEach(function(item) {
			var itemPath = sourcePath + '/' + item,
				itemStat = fs.lstatSync(itemPath);

			if (itemStat.isDirectory()) {
				self.register(item, require(itemPath));
			}
		});
	}

	return this;
};

module.exports.locate = function(driverName) {
	if (drivers[driverName]) {
		return drivers[driverName];
	} else {
		return false;
	}
};

