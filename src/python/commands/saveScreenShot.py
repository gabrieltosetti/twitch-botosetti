import mss
import mss.tools
import sys

if (len(sys.argv) != 5):
    raise Exception('Necessário 4 argumentos')

# convert str to int
command, top, left, width, height = (int(x) if x.isnumeric() else x for x in sys.argv )

with mss.mss() as sct:

    found = False
    
    for monNumber, mon in enumerate(sct.monitors):
        if (mon["width"] == 1920):
            found = True
            break

    if (not found):
        raise Exception('Monitor 1920x1080 nao encontrado')

    monitor = {
        "top": mon["top"] + top,
        "left": mon["left"] + left,
        "width": width,
        "height": height,
        "mon": monNumber,
    }
    output = "sct.png"

    sct_img = sct.grab(monitor)

    mss.tools.to_png(sct_img.rgb, sct_img.size, output=output)