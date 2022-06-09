from pybot.Services import ScreenShotService

def run(argv):
    if (len(argv) != 4):
        raise Exception('Necessário 4 argumentos')

    # convert str to int
    top, left, width, height = (int(x) if x.isnumeric() else x for x in argv)

    image = ScreenShotService.takeScreenShot(width, height, top, left)

    print(image.getText())
