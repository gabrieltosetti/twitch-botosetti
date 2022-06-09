from PIL.Image import Image as PILImage, frombytes
from mss.screenshot import ScreenShot
from pytesseract import pytesseract

class Image():
    pilImage: PILImage

    def __init__(self, image: PILImage):
        self.pilImage = image

    @classmethod
    def fromScreenShot(cls, screenShotImage: ScreenShot):
        return Image(frombytes("RGB", screenShotImage.size, screenShotImage.bgra, "raw", "BGRX"))

    def getText(self):
        return pytesseract.image_to_string(self.pilImage)