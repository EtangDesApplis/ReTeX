from flask import Flask, request
from flask_cors import CORS
import time
import os
import shutil
app = Flask(__name__)
CORS(app)

PUBLIC_FOLDER="../front/public"

@app.route('/', methods=['POST'])
def post_route():
    print(request.method)
    try:
      data = request.get_json()
      print(data)
      # processing
      #time.sleep(5)
      #create epoch folder
      workdir=os.path.join(PUBLIC_FOLDER,str(int(time.time())))
      print(workdir)
      os.makedirs(workdir)

      #clone git repo

      #compile pdflatex
      outputfile=os.path.join(workdir,data["main"].replace(".tex",".pdf"))
      shutil.copy(os.path.join(PUBLIC_FOLDER,"cv.pdf"), outputfile) 

      #read log to base64 (avoid string issue)

      #return
      return {"Status":"OK","Output":outputfile.replace(PUBLIC_FOLDER,""),"Log":"Sucessful"}
    except:
      return {"Status":"KO"}

if __name__=="__main__":
  #to test with curl: curl localhost:5000 -d "{\"foo\": \"ok\"}" -H 'Content-Type: application/json'
  app.run()

