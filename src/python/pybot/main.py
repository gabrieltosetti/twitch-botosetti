import sys
from pybot.commands import runSaveScreenShot, runGetTextFromScreenShot
from pytesseract import pytesseract

pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

command = sys.argv[1]
argv = sys.argv[2:]

if command == 'saveScreenShot':
    runSaveScreenShot(argv)
elif command == 'getTextFromScreenShot':
    runGetTextFromScreenShot(argv)