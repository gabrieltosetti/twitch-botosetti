# https://github.dev/BoboTiG/python-mss
# https://www.youtube.com/watch?v=0sOvCWFmrtA

import mss

class ScreenShotService:
    @staticmethod
    def getMonitorConfig():
        with mss.mss() as sct:
            monitors = enumerate(sct.monitors)

        found = False
        for monNumber, mon in monitors:
            if (mon["width"] == 1920):
                found = True
                break

        if (not found):
            raise Exception('Monitor 1920x1080 nao encontrado')

        mon["number"] = monNumber
        return mon

    @staticmethod
    def takeScreenShot(
        width: int = 1920,
        height: int = 1080,
        top: int = 0,
        left: int = 0
    ):
        monitor = ScreenShotService.getMonitorConfig(sct)
        shotConfig = {
            "top": monitor["top"] + top,
            "left": monitor["left"] + left,
            "width": width,
            "height": height,
            "mon": monitor["number"],
        }

        with mss.mss() as sct:
            sctImg = sct.grab(shotConfig)
        
        return sctImg

    @staticmethod
    def savePNGFile(
        width: int = 1920,
        height: int = 1080,
        top: int = 0,
        left: int = 0,
        fileName: str = 'outputScreenShot.png'
    ):
        sctImg = ScreenShotService.takeScreenShot(width, height, top, left)
        mss.tools.to_png(sctImg.rgb, sctImg.size, output=fileName)