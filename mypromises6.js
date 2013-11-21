require('traceur').require.makeDefault(function (filename) {
	return /\.traceur\.js$/.test(filename);
});

module.exports = require('./mypromises6.traceur');
