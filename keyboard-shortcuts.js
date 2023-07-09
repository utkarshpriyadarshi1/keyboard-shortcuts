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

    $ = (typeof $ != 'undefined') ? $ : {};

    var keyboardShortcut = {
        
        config(){
            
        }
        options(){
        
        }
        
    };
    $.__private.keyboardShortcut = {};
    $.__public.keyboardShortcut = {};

    $.__config.keyboardShortcut.FIRST_KEY = null;
    $.__config.keyboardShortcut.SECOND_KEY = null;
    $.__config.keyboardShortcut.SHORTCUT_REPOSITORY = [];


    $.__private.executeKeyboardShortcut = function (keypress) {
        try {
            for (item of $.__config.keyboardShortcut.SHORTCUT_REPOSITORY) {
                if (item["keypress"] === keypress) {
                    item["shortcutCallBack"]();
                    return true;
                }
            }
            throw "No such shortcut found!";
        } catch (e) {
            console.log("executeKeyboardShortcut: ", executeKeyboardShortcut);
        }
        return false;
    };

    $.__private.bindKeyboardShortcut = function (keyPressEvent) {

        // DETECT COMBO PRESS INIT
        if ((keyPressEvent.keyCode != 16 && keyPressEvent.keyCode != 17 && keyPressEvent.keyCode != 18) &&
            (keyPressEvent.altKey || keyPressEvent.ctrlKey || keyPressEvent.metaKey || keyPressEvent.shiftKey)) {
            if (keyPressEvent.altKey) {
                $.__config.keyboardShortcut.FIRST_KEY = "altKey";
            } else if (keyPressEvent.ctrlKey) {
                $.__config.keyboardShortcut.FIRST_KEY = "ctrlKey";
            } else if (keyPressEvent.shiftKey) {
                $.__config.keyboardShortcut.FIRST_KEY = "altKey";
            }

            $.__config.keyboardShortcut.SECOND_KEY = keyPressEvent.keyCode;
            // MATCH DIRECTORY
            console.log("COMBO PRESSED!!", $.__config.keyboardShortcut);
            keyPressEvent.preventDefault();
            $.__config.executeKeyboardShortcut($.__config.keyboardShortcut);

        } else {
            $.__config.keyboardShortcut.FIRST_KEY = null;
            $.__config.keyboardShortcut.SECOND_KEY = null;
            console.log("NOT COMBO PRESSED!!");
        }

        // IF MATCHED, THEN PREVENT DEFAULT AND DO THE
        // TASK

    };

    /** Show List of Shortcut Keys for the given page **/
    $.__private.showShortcutKeys = function () {

    };

    /** Add New Event Listener for the given shortcut key **/
    $.__public.addShortcutKey = function (SHORTCUT_KEY, CALLBACK_FUNCTION, SHORTCUT_DESCRIPTION) {
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
                throw "Title not provided for " + SHORTCUT_KEY + " !!";
            }
            $.__config.keyboardShortcut.SHORTCUT_REPOSITORY.append({
                keyboardShortcut: SHORTCUT_KEY,
                shortcutCallFunction: CALLBACK_FUNCTION,
                title: SHORTCUT_DESCRIPTION
            });

            // TODO: append in JSON


        } catch (e) {
            console.debug("addShortcutKey: ", e);
            return false;
        }
    };

    /** EXPOSING GLOBAL OUTSIDE * */
    $ = Object.assign($, $.__public.keyboardShortcut);

})($, window, document);
