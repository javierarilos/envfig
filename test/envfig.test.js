'use strict';
var assert = require('chai').assert;


suite('envfig', function(){
    suite('#config', function(){
        var envfig = require('../src/envfig'),
            config = envfig.config,
            settings;

        test('should return default when setting is undefined in process.env', function(){
            assert.isUndefined(process.env['HOST_SETTING_DOES_NOT_EXIST']);
            assert.isUndefined(process.env['PORT_SETTING_DOES_NOT_EXIST']);
            assert.isUndefined(process.env['BOOL_SETTING_DOES_NOT_EXIST']);

            settings = {
                host: config('HOST_SETTING_DOES_NOT_EXIST', 'ahost'),
                port: config('PORT_SETTING_DOES_NOT_EXIST', 80),
                boo:  config('BOOL_SETTING_DOES_NOT_EXIST', true)
            };

            assert.strictEqual(settings['host'], 'ahost');
            assert.strictEqual(settings['port'], 80);
            assert.strictEqual(settings['boo'], true);

        });

        test('should return setting when it is defined in process.env', function(){
            process.env['host'] = 'localhost';

            settings = {
                host: config('host', 'another')
            };

            assert.strictEqual(settings['host'], 'localhost');
        });

        test("should return setting converted to number when this is default's type", function(){
            process.env['port'] = String(80);

            settings = {
                port: config('port', 9999)
            };

            assert.strictEqual(settings['port'], 80);
        });

        test("should return setting converted to boolean when this is default's type", function(){
            process.env['boo'] = 'true';

            settings = {
                boo: config('boo', false)
            };

            assert.strictEqual(settings['boo'], true);
        });

    })
});