import sys
from pybot.commands import runSaveScreenShot

command = sys.argv[1]
argv = sys.argv[2:]

if command == 'saveScreenShot':
    runSaveScreenShot(argv)