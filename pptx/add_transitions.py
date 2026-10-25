"""Add a fade transition to every slide of a .pptx (pptxgenjs can't write them)."""
import sys, zipfile, shutil, re, os
src = sys.argv[1]; tmp = src + ".tmp"
with zipfile.ZipFile(src) as zin, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        data = zin.read(item.filename)
        if re.match(r"ppt/slides/slide\d+\.xml$", item.filename):
            x = data.decode("utf8")
            if "<p:transition" not in x:
                t = '<p:transition spd="med"><p:fade/></p:transition>'
                x = x.replace("</p:clrMapOvr>", "</p:clrMapOvr>" + t, 1) if "</p:clrMapOvr>" in x else x.replace("</p:cSld>", "</p:cSld>" + t, 1)
            data = x.encode("utf8")
        zout.writestr(item, data)
shutil.move(tmp, src)
