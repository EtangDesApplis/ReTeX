from flask import Flask, request
from flask_cors import CORS
import time
import os
import shutil
from subprocess import Popen, PIPE

app = Flask(__name__)
CORS(app)
PUBLIC_FOLDER=os.getenv('PUBLIC_FOLDER')
if PUBLIC_FOLDER==None:
  PUBLIC_FOLDER="../front/public"
print(PUBLIC_FOLDER)
PRIVATE_FOLDER="/tmp"
#PUBLIC_FOLDER="/tmp"

def executeShell(cmd):
  #cmd is a list, e.g. ["ls","-lrt"]
  output = Popen(cmd,stdout=PIPE)
  response = output.communicate()
  print(response[0].decode('utf-8'))

@app.route('/', methods=['POST'])
def post_route():
    #print(request.method)
    try:
      data = request.get_json()
      print(data)
      # processing
      
      #create epoch folder
      epoch=str(int(time.time()))
      workdir=os.path.join(PRIVATE_FOLDER,"tmp-"+epoch)
      destdir=os.path.join(PUBLIC_FOLDER,"tmp-"+epoch)
      print(workdir)
      print(destdir)
      os.makedirs(workdir)
      os.makedirs(destdir)

      #clone git repo
      executeShell(["git","clone",data["url"],workdir])

      #compile pdflatex
      texfile=os.path.join(workdir,data["main"]) #<------------------
      executeShell(["pdflatex","-interaction=batchmode", "-output-directory", workdir, texfile])

      #copy output to public folder
      outputfile=os.path.join(workdir,os.path.basename(texfile.replace(".tex",".pdf")))
      logfile=os.path.join(workdir,os.path.basename(texfile.replace(".tex",".log")))
      destoutputfile=os.path.join(destdir,os.path.basename(outputfile))
      destlogfile=os.path.join(destdir,os.path.basename(logfile))
      print(outputfile+" -> "+destoutputfile)
      print(logfile+" -> "+destlogfile)
      shutil.copy(outputfile, destoutputfile)
      shutil.copy(logfile, destlogfile)

      #clean up git clone folder
      shutil.rmtree(workdir)

      return {"Status":"OK","OutputFile":destoutputfile.replace(PUBLIC_FOLDER,""),"LogFile":destlogfile.replace(PUBLIC_FOLDER,"")}
    except:
      return {"Status":"KO"}

if __name__=="__main__":
  #to test with curl: curl localhost:5000 -d "{\"foo\": \"ok\"}" -H 'Content-Type: application/json'
  app.run()

