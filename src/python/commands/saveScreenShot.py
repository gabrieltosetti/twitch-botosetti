import mss
import mss.tools
import sys
import ScreenShotService

if (len(sys.argv) != 5):
    raise Exception('Necessário 4 argumentos')

# convert str to int
command, top, left, width, height, fileName = (int(x) if x.isnumeric() else x for x in sys.argv)

ScreenShotService.savePNGFile(width, height, top, left, fileName)
