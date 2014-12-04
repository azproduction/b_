/* global define: true */
(/* istanbul ignore next */
function (root, factory) {
    'use strict';
    if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.functionCallApply = factory();
    }
})
(this, function () {
    /**
     *
     * @param {object} [options]
     * @param {string} [options.tailSpace='']
     * @param {string} [options.elementSeparator='__']
     * @param {string} [options.modSeparator='_']
     * @param {string} [options.modValueSeparator='_']
     * @param {string} [options.classSeparator=' ']
     *
     * @constructor
     */
    function B(options) {
        // Case call B() without new
        if (!(this instanceof  B)) {
            var b = new B(options);

            return b.stringify.bind(b);
        }

        options = options || {};
        this.tailSpace = options.tailSpace || '';
        this.elementSeparator = options.elementSeparator || '__';
        this.modSeparator = options.modSeparator || '_';
        this.modValueSeparator = options.modValueSeparator || '_';
        this.classSeparator = options.classSeparator || ' ';
    }

    B.prototype = {
        /**
         *
         * @param {string} base
         * @param {object} modifiers
         * @returns {string}
         * @private
         */
        _stringifyModifiers: function (base, modifiers) {
            var result = '';

            for (var modifierKey in modifiers) {
                if (!modifiers.hasOwnProperty(modifierKey)) {
                    continue;
                }

                var modifierValue = modifiers[modifierKey];

                // Ignore false values
                if (modifierValue === false) {
                    continue;
                }

                // Makes block__elem_{modifierKey}
                result += this.classSeparator + base + this.modSeparator + modifierKey;

                // If modifier value is just true skip `modifierValue`
                if (modifierValue !== true) {
                    // Makes block__elem_{modifierKey}_{modifierValue}
                    result += this.modValueSeparator + String(modifierValue);
                }
            }

            return result;
        },

        /**
         *
         * @param {string} block
         * @param {string} [element]
         * @param {object} [modifiers]
         */
        stringify: function (block, element, modifiers) {
            var className = String(block);

            // case b_(block, modifiers)
            if (element && typeof element === 'object' && typeof modifiers === 'undefined') {
                modifiers = element;
                element = null;
            }

            if (element) {
                className += this.elementSeparator + String(element);
            }

            if (modifiers) {
                className += this._stringifyModifiers(className, modifiers);
            }

            return className + this.tailSpace;
        }
    };

    var b = new B();

    /**
     *
     * @type {function(this:B)}
     *
     * @example
     *
     * var v = require('b_');
     *
     * b('block'); // 'block'
     * b('block', {mod1: true, mod2: false, mod3: 'mod3'}); // 'block block_mod1 block_mod3_mod3'
     * b('block', 'elem'); // 'block__elem'
     * b('block', 'elem', {mod1: true, mod2: false, mod3: 'mod3'}); // 'block__elem block__elem_mod1 block__elem_mod3_mod3'
     */
    b = b.stringify.bind(b);

    /**
     *
     * @type {B}
     *
     * @example
     *
     * var b = new (require('b_').B)({
     *   tailSpace: ' ',
     *   elementSeparator: '-',
     *   modSeparator: '--',
     *   modValueSeparator: '-',
     *   classSeparator: ' '
     * });
     *
     * b.stringify('block'); // 'block '
     * b.stringify('block', {mod1: true, mod2: false, mod3: 'mod3'}); // 'block block--mod1 block--mod3-mod3 '
     * b.stringify('block', 'elem'); // 'block-elem '
     * b.stringify('block', 'elem', {mod1: true, mod2: false, mod3: 'mod3'}); // 'block-elem block-elem--mod1 block-elem--mod3-mod3'
     */
    b.B = B;

    return b;
});
