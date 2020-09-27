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
#front
WORKDIR /front
COPY front /front
RUN npm install create-react-app -y
RUN npm install -g -y serve
RUN npm run build
#back
COPY back /back
EXPOSE 3000 5000
ENV PUBLIC_FOLDER="/front/build"
RUN echo "python3 -u /back/main.py &" > start.sh && \
    echo "serve -s build -l tcp://0.0.0.0:3000" >> start.sh
CMD ["sh", "start.sh"]
