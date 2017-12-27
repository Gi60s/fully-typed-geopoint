'use strict';

module.exports = GeoPoint;

// Define the controller constructor
function GeoPoint (config) {
    if (config.latitudeRange) {
        validateRange(config.latitudeRange, 'latitude');
    } else {
        config.latitudeRange = [-90, 90];
    }

    if (config.longitudeRange) {
        validateRange(config.longitudeRange, 'longitude');
    } else {
        config.longitudeRange = [-180, 180];
    }

    Object.freeze(config.latitude);
    Object.freeze(config.longitude);

    // define properties
    Object.defineProperties(this, {

        latitudeRange: {
            /**
             * @property
             * @name GeoPoint#latitudeRange
             * @type {Array.<number>}
             */
            value: config.latitudeRange,
            writable: false
        },

        longitudeRange: {
            /**
             * @property
             * @name GeoPoint#latitudeRange
             * @type {Array.<number>}
             */
            value: config.longitudeRange,
            writable: false
        },

    });
}

// Define the error generator function
GeoPoint.prototype.error = function(value, prefix) {
    if (!value || typeof value !== 'object' ||
        typeof value.latitude !== 'number' || isNaN(value.latitude) ||
        typeof value.longitude !== 'number' || isNaN(value.longitude)) {
        return prefix + 'Expected an object with numeric latitude and longitude values.';
    }

    if (value.latitude < this.latitudeRange[0] || value.latitude > this.latitudeRange[1]) {
        return prefix + 'Latitude must be between ' +
            this.latitudeRange[0] + ' and ' + this.latitudeRange[1] + '.';
    }

    if (value.longitude < this.longitudeRange[0] || value.longitude > this.longitudeRange[1]) {
        return prefix + 'Longitude must be between ' +
            this.longitudeRange[0] + ' and ' + this.longitudeRange[1] + '.';
    }

    return null;
};

// Define the registration directive
GeoPoint.register = {
    aliases: ['geoPoint', GeoPoint],
    dependencies: []
};




function validateRange(value, key) {
    const valid = Array.isArray(value) &&
        value.length >= 2 &&
        typeof value[0] === 'number' && !isNaN(value[0]) &&
        typeof value[1] === 'number' && !isNaN(value[1]) &&
        value[0] <= value[1];
    if (!valid) {
        throw Error('Error in GeoPoint configuration: ' + key +
            ' value must be an array of two numbers where the first item in' +
            ' the array is less than or equal to the second item.')
    }
}