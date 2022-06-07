from Services import ScreenShotService

def run(argv):
    if (len(argv) != 5):
        raise Exception('Necessário 5 argumentos')

    # convert str to int
    top, left, width, height, fileName = (int(x) if x.isnumeric() else x for x in argv)

    ScreenShotService.savePNGFile(width, height, top, left, fileName)
