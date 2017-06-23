![logo](https://raw.githubusercontent.com/yafp/gnome-shell-extension-lock-my-desktop/master/.github/lock_icon.png)

# gnome-shell-extension-lock-my-desktop
Extension for gnome-shell to lock the desktop via the gnome-shell panel

## Requirements
The `lock` function is using the `xscreensaver-command` and/or the `gnome-screensaver-command` command with the `--lock` parameter.


## Supported gnome-shell versions
The extension was tested on the following `gnome-shell` versions.
- 3.18
- 3.22
- 3.24


## Changelog
The file [CHANGELOG.md](CHANGELOG.md) provides an overview of the major changes of this project; for a more detailed look at changes to the code, view individual commits.


## Howto
### Install
#### Version 1: Manual
* Copy `lock-my-desktop@yafp.de` to `$HOME/.local/share/gnome-shell/extensions/`
* Restart Gnome-Shell (ALT+F2 -> r)

#### Version 2: Makefile
* Navigate to extracted archive
* Run `make install`
* Restart Gnome-Shell (ALT+F2 -> r)


### Uninstall
#### Version 1: Manual
* Delete `lock-my-desktop@yafp.de` from `$HOME/.local/share/gnome-shell/extensions/`
* Restart Gnome-Shell (ALT+F2 -> r)

#### Version 2: Makefile
* Navigate to extracted archive
* Run `make uninstall`
* Restart Gnome-Shell (ALT+F2 -> r)


## Known Issues
### No screensaver
If your system has no configured screensaver the extension will most likely not work.


## Troubleshooting
Try running either `xscreensaver-command --lock` and/or `gnome-screensaver-command --lock` from your terminal.
If one of the above commands locks your desktop you should be fine.
