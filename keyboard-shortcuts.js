/** 
 * @author Utkarsh Priyadarshi
 **/
(function ($, window, document, undefined) {
    "use strict";

    window = (typeof window != 'undefined' && window.Math == Math)
        ? window
        : (typeof self != 'undefined' && self.Math == Math)
            ? self
            : Function('return this')()
        ;

    window.$ = $;
    var keyboardShortcut = {
        __config: {
            FIRST_KEY: null,
            SECOND_KEY: null,
            SHORTCUT_REPOSITORY: []
        },
        __private: {

            matchCombo: function () {
                const keypressed = keyboardShortcut.__config.FIRST_KEY + "+" + keyboardShortcut.__config.SECOND_KEY;
                //console.log("keypressed: ", keypressed);
                try {
                    for (let item of keyboardShortcut.__config.SHORTCUT_REPOSITORY) {
                        // console.log("stack: ", item["keyboardShortcut"]);
                        //  console.log("keypressed: ", keypressed);
                        if (item["keyboardShortcut"] === keypressed) {
                            event.preventDefault();
                            item["shortcutCallFunction"]();
                            return true;
                        }
                    }
                    throw "No such shortcut found!";
                } catch (e) {
                    console.error("matchCombo: ", e);
                }
                return false;
            },
            addComboListener: function (keyPressEvent) {
                //console.log("keyPressEvent: ", keyPressEvent);
                // DETECT COMBO PRESS INIT
                if ((keyPressEvent.keyCode != 16 && keyPressEvent.keyCode != 17 && keyPressEvent.keyCode != 18)
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
                        console.log("COMBO PRESSED!!", keyboardShortcut.__config);
                        keyboardShortcut.__private.matchCombo();
                    }

                } else {
                    keyboardShortcut.__config.FIRST_KEY = null;
                    keyboardShortcut.__config.SECOND_KEY = null;
                    // console.log("NOT COMBO PRESSED!!");
                }

                // IF MATCHED, THEN PREVENT DEFAULT AND DO THE
                // TASK

            },

            /** Show List of Shortcut Keys for the given document **/
            showShortcutKeys: function () {
                // console.log("showShortcutKeys: ");

            },

        },
        __public: {
            /** Add New Event Listener for the given shortcut key **/

            addShortcut: function (SHORTCUT_KEY, CALLBACK_FUNCTION, SHORTCUT_DESCRIPTION) {
                try {
                    if (typeof SHORTCUT_KEY == "undefined") {
                        throw "Shortcut key is invalid !";
                    }
                    if (typeof CALLBACK_FUNCTION == "undefined") {
                        throw "Callback Function not provided for " + SHORTCUT_KEY + " !!";

                    }
                    if (typeof CALLBACK_FUNCTION != "function") {
                        throw "Callback Function provided is not a function type variable!!";
                    }
                    if (typeof SHORTCUT_DESCRIPTION == "undefined") {
                        // throw "Title not provided for " + SHORTCUT_KEY + " !!";
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

    /** EXPOSING GLOBAL OUTSIDE * */
    $ = Object.assign($, keyboardShortcut.__public);
    //document.addEventListener("keypress", keyboardShortcut.__private.addComboListener);
    document.addEventListener("keydown", keyboardShortcut.__private.addComboListener);
    //document.addEventListener("keyup", keyboardShortcut.__private.addComboListener);

})(typeof $ != "undefined" ? $ : {}, window, document);
