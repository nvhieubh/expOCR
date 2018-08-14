define(['jquery', 'appConfig','ojs/ojvalidation-datetime'
], function ($, appConfig) {


	function random(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function uniqueID() {
		var prefix = '';
		var moreEntropy = true;
		var retId;
		var formatSeed = function(seed, reqWidth) {
			seed = parseInt(seed, 10).toString(16); // to hex str
			if (reqWidth < seed.length) { // so long we split
				return seed.slice(seed.length - reqWidth);
			}
			if (reqWidth > seed.length) { // so short we pad
			return Array(1 + (reqWidth - seed.length)).join('0') + seed;
			}
			return seed;
		};
		var phpJS = {};
		if (!phpJS.uniqidSeed) { // init seed with big random int
			phpJS.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
		}
		phpJS.uniqidSeed++;
		retId = prefix; // start with prefix, add current milliseconds hex string
		retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
		retId += formatSeed(phpJS.uniqidSeed, 5); // add seed hex string
		if (moreEntropy) {
			// for more entropy we add a float lower to 10
			retId += (Math.random() * 10).toFixed(8).toString();
		}
		return retId;
	}

	function setStorageData(name, data) {
		if (typeof data === "undefined") {
			return null;
		}
		sessionStorage.setItem(name, JSON.stringify(data));
	}

	// Retrieve the JSON data string from browser session storage
	function getStorageData(name) {
		var data = sessionStorage.getItem(name);
		if (typeof data === "undefined" || data === null) {
			return null;
		}
		data = JSON.parse(data);
		return data;
	}

	function removeStorageData(name) {
		sessionStorage.removeItem(name);
	}

	function formatDate(date,format){
		if(date == null)
			return null
		var formartType = (format) ? format : "dd MMM yy";
		var dateOptions = { pattern: formartType };
        var dateConverter = oj.Validation.converterFactory("datetime").createConverter(dateOptions);
        return dateConverter.format(date);
	}
	return {
		random: random,
		uniqueID: uniqueID,
		setStorageData: setStorageData,
		getStorageData: getStorageData,
		removeStorageData: removeStorageData,
		formatDate:formatDate

	};
});
