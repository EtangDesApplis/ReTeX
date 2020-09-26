FROM ubuntu:20.04
RUN ln -snf /usr/share/zoneinfo/Etc/UTC /etc/localtime \
    && echo "Etc/UTC" > /etc/timezone \
    && apt-get update \
    && apt-get upgrade -y \
    && apt-get install texlive-latex-base texlive-latex-extra texlive-fonts-recommended xzdec -y \
    && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install git -y
RUN apt install python3 -y
RUN apt install python3-pip -y
RUN pip3 install flask flask_cors
RUN apt install nodejs -y
RUN apt install npm -y
WORKDIR /front
COPY front /front
COPY back /back
EXPOSE 3000
EXPOSE 5000
RUN npm install create-react-app -y
#RUN npm run build
#CMD HOST=0.0.0.0 npm run start
#CMD ["npm", "start"]
RUN npm install -g -y serve
RUN npm run build
#RUN serve -s build -l 3000
RUN echo "python3 /back/main.py &" > start.sh && \
    echo "serve -s build -l tcp://0.0.0.0:3000" >> start.sh
CMD ["sh", "start.sh"]
#CMD serve -s build -l tcp://0.0.0.0:3000
#CMD python3 /back/main.py
#CMD ["npm", "start"]
#CMD npm start
#RUN make /app
