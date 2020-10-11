FROM ubuntu:20.04

RUN ln -snf /usr/share/zoneinfo/Etc/UTC /etc/localtime \
    && echo "Etc/UTC" > /etc/timezone \
    && apt-get update \
    && apt-get upgrade -y \
    && apt-get install texlive-latex-base texlive-latex-extra texlive-fonts-recommended xzdec -y \
    && apt-get install texlive-fonts-extra -y
RUN apt-get install git -y
RUN apt install python3 -y
RUN apt install python3-pip -y
RUN pip3 install flask flask_cors
RUN rm -rf /var/lib/apt/lists/*

#back
COPY main.py /back
EXPOSE 5000
#ENV PUBLIC_FOLDER="/front/build"
RUN echo "python3 -u /back/main.py" > start.sh
CMD ["sh", "start.sh"]
