'use strict';

(function (exports) {

    function getSettingValue (setting) {
        return process.env[setting];
    }

    /**
     * case-insensitive parsing of a string.
     * @param strBool
     * @return {boolean} true for strBool === true or True or TRUE ... false for all the rest
     */
    function parseBool (strBool) {
        if (strBool && (typeof strBool === 'string')) {
            return strBool.toLowerCase() === 'true';
        } else {
            return false;
        }
    }

    function parseNumber (strNumber) {
        return +strNumber;
    }

    function parseJsonObject (strJson) {
        return JSON.parse(strJson);
    }

    /**
     * parses a setting. defaultValue is used to infer the setting desired type.
     * @param settingValue the setting to parse
     * @param defaultValue used to infer which type of setting we want to parse.
     * @return parsed setting of the same type as defaultValue.
     */
    function parseSetting (settingValue, defaultValue) {
        var targetType = typeof defaultValue;
        switch (targetType){
            case 'boolean':
                return parseBool(settingValue);
            case 'number':
                return parseNumber(settingValue);
            case 'object':
                return parseJsonObject(settingValue);
            default:
                throw new Error('Unable to parse setting: Unsupported type: '
                                 + targetType + ' for value: ' + defaultValue);
        }
    }

    function config (setting, defaultValue) {
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

})(this);