/*jslint node: true */
'use strict';

var assert = require('chai').assert;


suite('envfig Module TestSuite', function () {
    suite('envfig.config function', function () {
        var envfig = require('../src/envfig'),
            config = envfig.config,
            settings;

        test('should return default value provided when setting is undefined in process.env', function(){
            assert.isUndefined(process.env.HOST_SETTING_DOES_NOT_EXIST);
            assert.isUndefined(process.env.PORT_SETTING_DOES_NOT_EXIST);
            assert.isUndefined(process.env.BOOL_SETTING_DOES_NOT_EXIST);

            settings = {
                host: config('HOST_SETTING_DOES_NOT_EXIST', 'ahost'),
                port: config('PORT_SETTING_DOES_NOT_EXIST', 80),
                boo:  config('BOOL_SETTING_DOES_NOT_EXIST', true)
            };

            assert.strictEqual(settings.host, 'ahost');
            assert.strictEqual(settings.port, 80);
            assert.strictEqual(settings.boo, true);

        });

        test('should return setting when it is defined in process.env', function(){
            process.env.host = 'localhost';

            settings = {
                host: config('host', 'another')
            };

            assert.strictEqual(settings.host, 'localhost');
        });

        test("should return setting converted to number when this is default's type", function(){
            process.env.port = String(80);

            settings = {
                port: config('port', 9999)
            };

            assert.strictEqual(settings.port, 80);
        });

        test("should return setting converted to boolean when this is default's type", function(){
            process.env.boo = 'true';

            settings = {
                boo: config('boo', false)
            };

            assert.strictEqual(settings.boo, true);
        });

        test("should return false when envar is 'false' and default is boolean", function(){
            process.env.boo = 'false';

            settings = {
                boo: config('boo', true)
            };

            assert.strictEqual(settings.boo, false);
        });

        test("should return true when envar is 'true' abd default is boolean", function(){
            process.env.boo = 'true';

            settings = {
                boo: config('boo', false)
            };

            assert.strictEqual(settings.boo, true);
        });

        test("should return false when envar is invalid boolean and default is boolean", function(){
            process.env.boo = 'INVALID-BOOLEAN';

            settings = {
                boo: config('boo', true)
            };

            assert.strictEqual(settings.boo, false);
        });


        test("should accept case-insensitive values for boolean settings", function(){
            ['True', 'true', 'TRUE', 'tRue'].forEach(function(settingValue){
                process.env.boo = settingValue;
                settings = {
                    boo: config('boo', false)
                };
                assert.strictEqual(settings.boo, true);
            });

            ['False', 'false', 'FALSE', 'fALSe'].forEach(function(settingValue){
                process.env.boo = settingValue;
                settings = {
                    boo: config('boo', true)
                };
                assert.strictEqual(settings.boo, false);
            });
        });

        test("should provide false value for incorrect boolean stringSetting", function(){
            process.env.boo = 'non-boolean';

            settings = {
                boo: config('boo', true)
            };
            assert.strictEqual(settings.boo, false);
        });

        test("should provide given default value for undefined setting", function(){
            settings = {
                boo: config(undefined, 'default-expected-value')
            };
            assert.strictEqual(settings['boo'], 'default-expected-value');
        });

        test("should provide given default value for null setting", function(){
            settings = {
                boo: config(null, 'default-expected-value')
            };
            assert.strictEqual(settings['boo'], 'default-expected-value');
        });

        test("should properly parse integer numbers", function(){
            var strAndNumbers = [
                ['1', 1],
                ['33344', 33344],
                ['-34', -34],
                ['0', 0],
                ['+34', 34]
            ];

            strAndNumbers.forEach(function(strAndNumber){
                var str = strAndNumber[0];
                var number = strAndNumber[1];

                process.env.MY_NUMBER = str;

                settings = {
                    num: config('MY_NUMBER', -99999)
                };
                assert.strictEqual(settings['num'], number);
            });

        });

        test("should properly parse float numbers", function(){
            var strAndNumbers = [
                ['1.8', 1.8],
                ['33344.445566', 33344.445566],
                ['-34.22', -34.22],
                ['0.0', 0.0],
                ['+34.55', 34.55]
            ];

            strAndNumbers.forEach(function(strAndNumber){
                var str = strAndNumber[0];
                var number = strAndNumber[1];

                process.env.MY_NUMBER = str;

                settings = {
                    num: config('MY_NUMBER', -99999)
                };
                assert.strictEqual(settings['num'], number);
            });
        });


        test("should properly parse objects", function(){
            var strAndObjs = [
                ['{"a": 1, "b": "b", "c": true}', {"a": 1, "b": "b", "c": true}],
                ['{"a": 1, "b": "b", "c": {"d": 99, "e": "e"}}', {"a": 1, "b": "b", "c": {"d": 99, "e": "e"}}]
            ];

            strAndObjs.forEach(function(strAndObj){
                var str = strAndObj[0];
                var obj = strAndObj[1];

                process.env.MY_OBJ = str;

                settings = {
                    obj: config('MY_OBJ', {attr: 999})
                };
                assert.deepEqual(settings['obj'], obj);
            });
        });
    })
});