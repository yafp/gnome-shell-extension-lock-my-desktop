Notes
============

![logo](https://raw.githubusercontent.com/yafp/gnome-shell-extension-lock-my-desktop/master/.github/lock_icon.png)


# Links
* https://stackoverflow.com/questions/13107743/documentation-for-writing-gnome-shell-extensions
* https://developer.gnome.org/gi/stable/
* http://mathematicalcoffee.blogspot.de/2012/09/gnome-shell-javascript-source.html

# Debug
## Log
Depending on your distro there are several places to check for log output

1. journalctl -f | grep gnome-session
2. journalctl -f /usr/bin/gnome-session
3. tail -f ~/.cache/gdm/session.log (GDM users)
4. tail -f ~/.xsession-errors


## Looking glass (GNOME Shell's integrated debugger and inspector )
You can see extensions and errors etc via Looking glass
* ALT+F2 -> lg

More: 
* https://wiki.gnome.org/Projects/GnomeShell/LookingGlass

## gnome-shell-extension-prefs
You might start gnome-shell-extension-prefs via
  gnome-shell-extension-prefs
  
or to limit to a specific extension uuid via:
  gnome-shell extension [UUID]


# Publishing
## http://extensions.gnome.org
* Upload extension on https://extensions.gnome.org/
* It should be a zip file containing at least the two files 
  * metadata.json and 
  * extension.js. 
* Note that the UUID inside your metadata.json must conform to GNOME Shell UUID guidelines. These guidelines can be found on the GNOME Wiki (https://wiki.gnome.org/Projects/GnomeShell/Extensions/UUIDGuidelines).
* These files need to be in the root directory of the zip file. 
* Use zip -j when making your zipfile to ensure this. Other files like stylesheet.css are optional. 
