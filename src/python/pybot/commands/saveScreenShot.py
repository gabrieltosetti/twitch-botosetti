from pybot.Services import ScreenShotService
from pybot.Libraries import Image

def run(argv):
    if (len(argv) != 5):
        raise Exception('Necessário 5 argumentos')

    # convert str to int
    top, left, width, height, fileName = (int(x) if x.isnumeric() else x for x in argv)

    image: Image = ScreenShotService.takeScreenShot(width, height, top, left)

    image.pilImage.save(fileName)
