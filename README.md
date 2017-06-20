# gnome-shell-extension-lock-my-desktop
Extension for gnome-shell to lock the desktop via the gnome panel

## Requirements
The `lock` function is using the `gnome-screensaver-command` with the `--lock` parameter.


## Supported gnome-shell versions
The extension was tested on the following `gnome-shell` versions.
- 3.18
- 3.22
- 3.24


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
