/** 
 * @file keyboard-shortcuts.js
 * @description Library for custom keyboard shortcuts
 * @version 1.0.0
 * @license GNU General Public License v3.0
 * 
 * @author Utkarsh Priyadarshi
 **/

(function ($, window, document, undefined) {
    "use strict";

    // Define the global window object if not defined
    window = (typeof window !== 'undefined' && window.Math === Math)
        ? window
        : (typeof self !== 'undefined' && self.Math === Math)
            ? self
            : Function('return this')();

    // Assign the $ object to the window
    window.$ = $;

    // Define the keyboardShortcut object with configuration, private, and public methods
    var keyboardShortcut = {
        __config: {
            FIRST_KEY: null,
            SECOND_KEY: null,
            SHORTCUT_REPOSITORY: []
        },
        __private: {
            /**
             * @function matchCombo
             * @description Matches the pressed key combination with the stored shortcuts
             * @returns {boolean} True if a matching shortcut is found, otherwise false
             */
            matchCombo: function () {
                const keypressed = keyboardShortcut.__config.FIRST_KEY + "+" + keyboardShortcut.__config.SECOND_KEY;
                try {
                    for (let item of keyboardShortcut.__config.SHORTCUT_REPOSITORY) {
                        if (item["keyboardShortcut"] === keypressed) {
                            event.preventDefault();
                            item["shortcutCallFunction"]();
                            return true;
                        }
                    }
                    throw new Error("No such shortcut found!");
                } catch (e) {
                    console.error("matchCombo: ", e);
                }
                return false;
            },

            /**
             * @function addComboListener
             * @description Detects key press events and identifies key combinations
             * @param {KeyboardEvent} keyPressEvent - The key press event
             */
            addComboListener: function (keyPressEvent) {
                if ((keyPressEvent.key !== 'Shift' && keyPressEvent.key !== 'Control' && keyPressEvent.key !== 'Alt')
                    && (keyPressEvent.altKey || keyPressEvent.ctrlKey || keyPressEvent.metaKey || keyPressEvent.shiftKey)) {
                    keyboardShortcut.__config.SECOND_KEY = keyPressEvent.key;
                    if (keyPressEvent.altKey) {
                        keyboardShortcut.__config.FIRST_KEY = "ALT";
                    } else if (keyPressEvent.ctrlKey) {
                        keyboardShortcut.__config.FIRST_KEY = "CTRL";
                    } else if (keyPressEvent.shiftKey) {
                        keyboardShortcut.__config.FIRST_KEY = "SHIFT";
                    } else {
                        keyboardShortcut.__config.FIRST_KEY = null;
                        keyboardShortcut.__config.SECOND_KEY = null;
                    }

                    if (!!keyboardShortcut.__config.FIRST_KEY) {
                        keyboardShortcut.__private.matchCombo();
                    }

                } else {
                    keyboardShortcut.__config.FIRST_KEY = null;
                    keyboardShortcut.__config.SECOND_KEY = null;
                }
            },

            /**
             * @function showShortcutKeys
             * @description Displays the list of defined shortcut keys
             */
            showShortcutKeys: function () {
                // TODO: Implement logic to display shortcut keys
            },
        },
        __public: {
            /**
             * @function addShortcut
             * @description Adds a new event listener for the given shortcut key
             * @param {string} SHORTCUT_KEY - The key combination for the shortcut
             * @param {function} CALLBACK_FUNCTION - The function to call when the shortcut is pressed
             * @param {string} SHORTCUT_DESCRIPTION - Optional description for the shortcut
             * @returns {boolean} True if the shortcut is added successfully, otherwise false
             */
            addShortcut: function (SHORTCUT_KEY, CALLBACK_FUNCTION, SHORTCUT_DESCRIPTION) {
                try {
                    if (typeof SHORTCUT_KEY === "undefined") {
                        throw new Error("Shortcut key is invalid!");
                    }
                    if (typeof CALLBACK_FUNCTION === "undefined") {
                        throw new Error("Callback Function not provided for " + SHORTCUT_KEY + "!!");
                    }
                    if (typeof CALLBACK_FUNCTION !== "function") {
                        throw new Error("Callback Function provided is not a function type variable!!");
                    }
                    if (typeof SHORTCUT_DESCRIPTION === "undefined") {
                        // Description is optional
                    }
                    SHORTCUT_KEY = SHORTCUT_KEY.split("+")[0].toUpperCase() + "+" + SHORTCUT_KEY.split("+")[1];
                    keyboardShortcut.__config.SHORTCUT_REPOSITORY.push({
                        keyboardShortcut: SHORTCUT_KEY,
                        shortcutCallFunction: CALLBACK_FUNCTION,
                        title: SHORTCUT_DESCRIPTION
                    });

                } catch (e) {
                    console.debug("addShortcutKey: ", e);
                    return false;
                }
            }
        }
    };

    // Expose public methods to the global $ object
    $ = Object.assign($, keyboardShortcut.__public);

    // Add event listener for keydown events
    document.addEventListener("keydown", keyboardShortcut.__private.addComboListener);

})(typeof $ !== "undefined" ? $ : {}, window, document);
