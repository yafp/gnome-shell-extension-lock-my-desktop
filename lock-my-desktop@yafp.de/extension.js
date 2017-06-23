/*
// Name:        Lock My Desktop
// Function:    Add a menu to the Gnome-Shell panel featuring a lock function (using gnome-screensaver-command)
// Developer:   yafp
// Github:      https://github.com/yafp/gnome-shell-extension-lock-my-desktop
*/

const St = imports.gi.St;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const PanelMenu = imports.ui.panelMenu;
const Gtk = imports.gi.Gtk;
const Lang = imports.lang;
const Util = imports.misc.util; // used to run external commands
const GLib = imports.gi.GLib; // used to check existance of executables

//const Gettext = imports.gettext.domain("gnome-shell-extension-lock-my-desktop");
const Gettext = imports.gettext.domain("lock-my-desktop");
const _ = Gettext.gettext;

const EXTENSION_NAME = "lock-my-desktop"; // Extension name
const EXTENSION_URL = "https://github.com/yafp/gnome-shell-extension-lock-my-desktop"; // Extension URL


// Put your extension initialization code here
//function init(metadata) {
//    Convenience.initTranslations();
//}


const ScrollableMenu = new Lang.Class({
    Name: 'ScrollableMenu.ScrollableMenu',
    Extends: PopupMenu.PopupMenuSection,

    _init: function() {
        this.parent();
        let scrollView = new St.ScrollView({
            x_fill: true,
            y_fill: false,
            y_align: St.Align.START,
            overlay_scrollbars: true,
            style_class: 'vfade'
        });
        this.innerMenu = new PopupMenu.PopupMenuSection();
        scrollView.add_actor(this.innerMenu.actor);
        this.actor.add_actor(scrollView);
    },

    addMenuItem: function(item) {
        this.innerMenu.addMenuItem(item);
    },

    removeAll: function() {
        this.innerMenu.removeAll();
    }
});


const lockMyDesktopItem = new Lang.Class({
    Name: 'lockMyDesktopItem.lockMyDesktopItem',
    Extends: PopupMenu.PopupBaseMenuItem,

    _init: function(text, icon_name, gicon, callback) {
        this.parent(0.0, text);

        let icon_cfg = { style_class: 'popup-menu-icon' };
        if (icon_name != null) {
          icon_cfg.icon_name = icon_name;
        } else if (gicon != null) {
          icon_cfg.gicon = gicon;
        }

        this.icon = new St.Icon(icon_cfg);
        this.actor.add_child(this.icon);
        this.label = new St.Label({ text: text });
        this.actor.add_child(this.label);

        this.connect('activate', callback);
    },

    destroy: function() {
        this.parent();
    }
});


const MainMenu = new Lang.Class({
    Name: 'MainMenu.MainMenu',
    Extends: PanelMenu.Button,

    _init: function() {
        global.log(EXTENSION_NAME + " - Initializing menu"); // log
        this.parent(0.0, _("Menu"));
        this.extensionIcon = new St.Icon({ icon_name: 'system-lock-screen-symbolic', style_class: 'popup-menu-icon' })
        this.actor.add_actor(this.extensionIcon);
        this._addConstMenuItems();      // add menu items to icon/button
    },

    _addConstMenuItems: function() {
        global.log(EXTENSION_NAME + " - Adding menu items"); // log

        // Menu: Lock
        this.lock_item = new lockMyDesktopItem(_("Lock my desktop"), "system-lock-screen-symbolic", null, Lang.bind(this, this._onLock));
        this.menu.addMenuItem(this.lock_item);

        // Separator
        this.separator = new PopupMenu.PopupSeparatorMenuItem();
        this.menu.addMenuItem(this.separator);

        // Menu: Preferences (Disabled so far)
        //this.preference_item = new lockMyDesktopItem(_("Preferences"), "preferences-system-symbolic", null, Lang.bind(this, this._onPreferences));
        //this.menu.addMenuItem(this.preference_item);

        // Menu: About
        this.about_item = new lockMyDesktopItem(_("About"), "help-about-symbolic", null, Lang.bind(this, this._onAbout));
        this.menu.addMenuItem(this.about_item);
    },

    destroy: function() {
        this.parent();
    },


    // ########################################################################
    // Lock - Tries to lock the current desktop session
    // ########################################################################
    _onLock: function() {
        global.log(EXTENSION_NAME + " - Starting _lock()"); // log

        // v1: using xscreensaver-command --lock
        //
        var checkExistanceOfXScreensaverCommand=GLib.find_program_in_path('xscreensaver-command')
        if(checkExistanceOfXScreensaverCommand == null)
        {
            global.log(EXTENSION_NAME + " - xscreensaver-command not in path or not found");
        }
        else
        {
            global.log(EXTENSION_NAME + " - Trying lock using xscreensaver-command");
            Util.spawn(['xscreensaver-command', '--lock']) // do the actual lock
        }


        // v2: using gnome-screensaver-command --lock
        //
        var checkExistanceOfGnomeScreensaverCommand=GLib.find_program_in_path('gnome-screensaver-command')
        if(checkExistanceOfGnomeScreensaverCommand == null)
        {
            global.log(EXTENSION_NAME + " - gnome-screensaver-command not in path or not found");
        }
        else
        {
            global.log(EXTENSION_NAME + " - Trying lock using gnome-screensaver-command");
            Util.spawn(['gnome-screensaver-command', '--lock']) // do the actual lock
        }

        global.log(EXTENSION_NAME + " - Finished _lock()");
    },


    // ########################################################################
    // Preferences - Not in use so far - should open a preference dialog
    // ########################################################################
    _onPreferences: function() {
        global.log(EXTENSION_NAME + " - Starting _onPreferences()");
        Util.spawn(['notify-send', 'Lock my desktop', 'On Preferences - Dummy']) // show notification
        global.log(EXTENSION_NAME + " - Finished _onPreferences()");
    },


    // ########################################################################
    // About - Opens the project Github page
    // ########################################################################
    _onAbout: function() {
        global.log(EXTENSION_NAME + " - Starting _onAbout()"); // log
        Util.spawn(['xdg-open', EXTENSION_URL]) // open project url
        global.log(EXTENSION_NAME + " - Finished _onAbout()"); // log
    }

});


// ############################################################################
//
// ############################################################################
function init(extensionMeta) {
    //imports.gettext.bindtextdomain("gnome-shell-extension-lock-my-desktop", extensionMeta.path + "/locale");
    imports.gettext.bindtextdomain("lock-my-desktop", extensionMeta.path + "/locale");
}

let _indicator;



// ############################################################################
// Enable the extension
// ############################################################################
function enable() {
    _indicator = new MainMenu;
    Main.panel.addToStatusArea('lockMyDesktopMain_button', _indicator);
    global.log(EXTENSION_NAME +" - Extension enabled"); // log
}



// ############################################################################
// Disable the extension
// ############################################################################
function disable() {
    _indicator.destroy();
    global.log(EXTENSION_NAME + " - Extension disabled"); // log
}

