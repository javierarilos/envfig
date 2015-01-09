'use strict';

(function (exports) {

    function getSettingValue(setting) {
        return process.env[setting];
    }

    /**
     * case-insensitive parsing of a string.
     * @param strBool
     * @return {boolean} true for strBool === true or True or TRUE ... false for all the rest
     */
    function parseBool(strBool) {
        return strBool.toLowerCase() === 'true';
    }

    function parseNumber(strNumber) {
        return +strNumber;
    }

    function parseJsonObject(strJson) {
        try {
            return JSON.parse(strJson);
        } catch (e) {
            return null;
        }
    }

    /**
     * parses a setting. defaultValue is used to infer the setting desired type.
     * @param settingValue the setting to parse
     * @param defaultValue used to infer which type of setting we want to parse.
     * @return parsed setting of the same type as defaultValue.
     */
    function parseSetting(settingValue, defaultValue) {
        var targetType = typeof defaultValue;
        switch (targetType) {
        case 'boolean':
            return parseBool(settingValue);
        case 'number':
            var parsedNumber = parseNumber(settingValue);
            return isNaN(parsedNumber) ? defaultValue : parsedNumber;
        case 'object':
            var parsedObject = parseJsonObject(settingValue);
            return parsedObject ? parsedObject : defaultValue;
        default:
            throw new Error('Unable to parse setting: Unsupported type: ' +
                targetType + ' for value: ' + defaultValue);
        }
    }

    function config(setting, defaultValue) {
        var settingValue = getSettingValue(setting);
        if (setting && settingValue) {
            if (typeof settingValue === typeof defaultValue) {
                return settingValue;
            } else if (typeof settingValue === 'string') {
                return parseSetting(settingValue, defaultValue);
            }
        }
        return defaultValue;
    }

    exports.config = config;

}(this));