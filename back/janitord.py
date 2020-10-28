"""
This is a deamon running behinds the screen to clean up workspace
It is mandatory to avoid disk pressure

Usage:
  python -u janitord.py [workdir] [prefix] [live-time]

Example:
  python -u janitord.py "/tmp" "case-" 300

will clean up all folder having pattern /tmp/case-* which is created since more than 300s

"""

import os
import sys
import time
#import subprocess
#import json
from datetime import datetime
import glob
import shutil

def getTimeStamp():
    return datetime.now().strftime("[%Y-%m-%d][%H:%M:%S]")

def printERROR(data):
    print(getTimeStamp()+"[ERROR] "+data)

def printINFO(data):
    print(getTimeStamp()+"[INFO] "+data)

def printWARN(data):
    print(getTimeStamp()+"[WARN] "+data)

if __name__=="__main__":
    workdir=sys.argv[1]
    prefix=sys.argv[2]
    liveTime=float(sys.argv[3])
    while True:
        now=time.time()
        paths=glob.glob(os.path.join(workdir,prefix+"*"))
        # list all folder
        for folder in paths:
            if (abs(os.path.getmtime(folder)-now)>liveTime):
                #clean up
                printINFO("removing "+folder)
                shutil.rmtree(folder)
        # cooldown
        time.sleep(5)