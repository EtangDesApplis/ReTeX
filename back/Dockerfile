FROM ubuntu:18.04

RUN ln -snf /usr/share/zoneinfo/Etc/UTC /etc/localtime \
    && echo "Etc/UTC" > /etc/timezone \
    && apt-get update \
    && apt-get upgrade -y \
    && apt-get install texlive-latex-base texlive-latex-extra texlive-fonts-recommended xzdec -y \
    && apt-get install texlive-fonts-extra -y
RUN apt-get install git -y
RUN apt install python3 -y
RUN apt install python3-pip -y

COPY requirements.txt /back/requirements.txt
COPY main.py /back/main.py
COPY janitord.py /back/janitord.py
COPY api_spec.py /back/api_spec.py
COPY swagger.py /back/swagger.py

RUN pip3 install -r /back/requirements.txt
RUN rm -rf /var/lib/apt/lists/*

EXPOSE 5000
#ENV PUBLIC_FOLDER="/front/build"
RUN echo "python3 -u /back/janitord.py /tmp case 300 &" > start.sh && \
    echo "python3 -u /back/main.py" >> start.sh
CMD ["sh", "start.sh"]
