'use strict';
const expect    = require('chai').expect;
const GeoPoint  = require('../index');
const Typed     = require('fully-typed');

Typed.controllers.register(GeoPoint);

describe('GeoPoint', () => {

    describe('configuration', () => {

        it('can be empty', () => {
            expect(() => Typed({ type: GeoPoint })).not.to.throw(Error);
        });

        describe('latitude', () => {

            it('can be an array of numbers of length 2', () => {
                expect(() => Typed({ type: GeoPoint, latitudeRange: [0, 10] })).not.to.throw(Error);
            });
            
            it('cannot be array of non-numbers', () => {
                expect(() => Typed({ type: GeoPoint, latitudeRange: ['a', 'b'] })).to.throw(Error);
            });

            it('cannot be array of length less than two', () => {
                expect(() => Typed({ type: GeoPoint, latitudeRange: [] })).to.throw(Error);
            });

        });

        describe('longitude', () => {

            it('can be an array of numbers of length 2', () => {
                expect(() => Typed({ type: GeoPoint, longitudeRange: [0, 10] })).not.to.throw(Error);
            });

            it('cannot be array of non-numbers', () => {
                expect(() => Typed({ type: GeoPoint, longitudeRange: ['a', 'b'] })).to.throw(Error);
            });

            it('cannot be array of length less than two', () => {
                expect(() => Typed({ type: GeoPoint, longitudeRange: [] })).to.throw(Error);
            });

        });

    });

    describe('error', () => {
        let schema;

        before(() => {
            schema = Typed({ type: GeoPoint });
        });

        it('must be a non-null object', () => {
            expect(schema.error(null)).to.be.a('string');
        });

        it('accepts valid coordinates', () => {
            expect(schema.error({ latitude: 0, longitude: 0 })).to.be.null;
        });

        describe('latitude', () => {

            it('must be specified', () => {
                expect(schema.error({ longitude: 0 })).to.be.a('string');
            });

            it('must be in range', () => {
                expect(schema.error({ latitude: 1000, longitude: 0 })).to.be.a('string');
            });

            it('must be in range 2', () => {
                expect(schema.error({ latitude: -1000, longitude: 0 })).to.be.a('string');
            });

        });

        describe('longitude', () => {

            it('must be specified', () => {
                expect(schema.error({ latitude: 0 })).to.be.a('string');
            });

            it('must be in range', () => {
                expect(schema.error({ latitude: 0, longitude: 1000 })).to.be.a('string');
            });

            it('must be in range2', () => {
                expect(schema.error({ latitude: 0, longitude: -1000 })).to.be.a('string');
            });

        });

    });

});