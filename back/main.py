from flask import Flask, request
from flask_cors import CORS
import time
import os
import shutil
from subprocess import Popen, PIPE
from flask import send_from_directory

app = Flask(__name__)
CORS(app)
PUBLIC_FOLDER=os.getenv('PUBLIC_FOLDER')
if PUBLIC_FOLDER==None or PUBLIC_FOLDER=="":
  PUBLIC_FOLDER="../front/public"
print(PUBLIC_FOLDER)
PRIVATE_FOLDER="/tmp"
#PUBLIC_FOLDER="/tmp"

def executeShell(cmd):
  #cmd is a list, e.g. ["ls","-lrt"]
  output = Popen(cmd,stdout=PIPE)
  response = output.communicate()
  print(response[0].decode('utf-8'))

@app.route('/<path:filePath>')
def get_file(filePath):
  #serve file from path
  tmp=os.path.join(PRIVATE_FOLDER,filePath)
  try:
    #text file will be return as html format
    f=open(tmp,'r')
    content=""
    for line in f.readlines():
      content=content+line.replace('\n',"<br/>")
    f.close()
    return content
  except:
    #binary file will be send as attachement
    return send_from_directory(os.path.dirname(tmp), os.path.basename(tmp), as_attachment=True)

@app.route('/', methods=['POST'])
def post_route():

    #print(request.method)
    try:
      data = request.get_json()
      print(data)
      # processing
      
      #create epoch folder
      epoch=str(int(time.time()))
      workdir=os.path.join(PRIVATE_FOLDER,"case-"+epoch)
      #destdir=os.path.join(PUBLIC_FOLDER,"tmp-"+epoch)
      print(workdir)
      #print(destdir)
      os.makedirs(workdir)
      #os.makedirs(destdir)

      #clone git repo
      executeShell(["git","clone",data["url"],workdir])

      #compile pdflatex
      texfile=os.path.join(workdir,data["main"]) #<------------------
      #executeShell(["pdflatex","-interaction=batchmode", "-output-directory", workdir, texfile])
      homedir=os.getcwd()
      os.chdir(os.path.dirname(os.path.abspath(texfile)))
      executeShell(["pdflatex","-interaction=batchmode", os.path.basename(texfile)])
      #double compilation is required for some latex feature
      executeShell(["pdflatex","-interaction=batchmode", os.path.basename(texfile)])
      os.chdir(homedir)

      #copy output to public folder
      #outputfile=os.path.join(workdir,os.path.basename(texfile.replace(".tex",".pdf")))
      #logfile=os.path.join(workdir,os.path.basename(texfile.replace(".tex",".log")))
      outputfile=texfile.replace(".tex",".pdf")
      logfile=texfile.replace(".tex",".log")
      #destoutputfile=os.path.join(destdir,os.path.basename(outputfile))
      #destlogfile=os.path.join(destdir,os.path.basename(logfile))
      #print(outputfile+" -> "+destoutputfile)
      #print(logfile+" -> "+destlogfile)
      #try:
      #  shutil.copy(outputfile, destoutputfile)
      #except:
        #build might have been failed, but log is still available
      #  pass
      #we do not protect this log file to make sure compilation is ok
      #shutil.copy(logfile, destlogfile)

      #clean up git clone folder
      #shutil.rmtree(workdir)

      return {"Status":"OK","OutputFile":outputfile.replace(PRIVATE_FOLDER,""),"LogFile":logfile.replace(PRIVATE_FOLDER,"")}
    except:
      return {"Status":"KO"}

if __name__=="__main__":
  #to test with curl: curl localhost:5000 -d "{\"foo\": \"ok\"}" -H 'Content-Type: application/json'
  #curl localhost:5000/Mandat.pdf

  app.run(host='0.0.0.0')

