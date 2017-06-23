SRC=lock-my-desktop@yafp.de
DESTFOLDER=lock-my-desktop@yafp.de
DESTPATH=~/.local/share/gnome-shell/extensions/

install:
	rm -rf $(DESTPATH)/$(DESTFOLDER)
	mkdir -p $(DESTPATH)/$(DESTFOLDER)
	cp -r --preserve=timestamps $(SRC)/* $(DESTPATH)/$(DESTFOLDER)
	echo Installed in $(DESTPATH)/$(DESTFOLDER)


uninstall:
	rm -rf $(DESTPATH)/$(DESTFOLDER)
	echo Uninstalled  $(DESTFOLDER) from $(DESTPATH)

